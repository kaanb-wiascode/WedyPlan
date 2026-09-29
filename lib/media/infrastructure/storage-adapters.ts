import { createHash, createHmac } from 'node:crypto';
import { StorageProviderType } from '@/types/enterprise-media';
import { MEDIA_CONFIG } from '../domain/media.constants';

export interface IStorageAdapter {
  generatePresignedUploadUrl(
    storageKey: string,
    mimeType: string,
    expiresInSec?: number,
  ): Promise<string>;
  deleteFile(storageKey: string): Promise<boolean>;
  getPublicCdnUrl(storageKey: string): string;
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} medya depolama entegrasyonu için zorunludur.`);
  }
  return value;
}

function hmac(key: Buffer | string, value: string): Buffer {
  return createHmac('sha256', key).update(value, 'utf8').digest();
}

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function encodeRfc3986(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function encodePath(path: string): string {
  return path
    .split('/')
    .map((part) => encodeRfc3986(part))
    .join('/');
}

function amzTimestamp(date: Date): { dateStamp: string; amzDate: string } {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, '');
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

export class S3StorageAdapter implements IStorageAdapter {
  private readonly bucketName: string;
  private readonly cdnDomain: string;
  private readonly region: string;
  private readonly endpoint?: string;

  constructor(
    bucketName = process.env.S3_BUCKET?.trim() || '',
    cdnDomain = process.env.MEDIA_CDN_URL?.trim() || '',
    region = process.env.AWS_REGION?.trim() || 'eu-central-1',
    endpoint = process.env.S3_ENDPOINT?.trim(),
  ) {
    this.bucketName = bucketName;
    this.cdnDomain = cdnDomain;
    this.region = region;
    this.endpoint = endpoint;
  }

  async generatePresignedUploadUrl(
    storageKey: string,
    _mimeType: string,
    expiresInSec = MEDIA_CONFIG.PRESIGNED_URL_EXPIRATION_SEC,
  ): Promise<string> {
    const accessKeyId = requiredEnv('AWS_ACCESS_KEY_ID');
    const secretAccessKey = requiredEnv('AWS_SECRET_ACCESS_KEY');
    const bucket = this.bucketName || requiredEnv('S3_BUCKET');

    if (!Number.isInteger(expiresInSec) || expiresInSec <= 0 || expiresInSec > 604800) {
      throw new Error('Presigned URL geçerlilik süresi 1 ile 604800 saniye arasında olmalıdır.');
    }

    const now = new Date();
    const { dateStamp, amzDate } = amzTimestamp(now);
    const service = 's3';
    const credentialScope = `${dateStamp}/${this.region}/${service}/aws4_request`;

    const baseEndpoint =
      this.endpoint ||
      `https://${bucket}.s3.${this.region}.amazonaws.com`;

    const endpointUrl = new URL(baseEndpoint);
    const usesPathStyle = Boolean(this.endpoint);
    const canonicalUri = usesPathStyle
      ? `/${encodePath(bucket)}/${encodePath(storageKey)}`
      : `/${encodePath(storageKey)}`;

    const query: Record<string, string> = {
      'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
      'X-Amz-Credential': `${accessKeyId}/${credentialScope}`,
      'X-Amz-Date': amzDate,
      'X-Amz-Expires': String(expiresInSec),
      'X-Amz-SignedHeaders': 'host',
    };

    const canonicalQuery = Object.entries(query)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${encodeRfc3986(key)}=${encodeRfc3986(value)}`)
      .join('&');

    const canonicalHeaders = `host:${endpointUrl.host}\n`;
    const canonicalRequest = [
      'PUT',
      canonicalUri,
      canonicalQuery,
      canonicalHeaders,
      'host',
      'UNSIGNED-PAYLOAD',
    ].join('\n');

    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      sha256(canonicalRequest),
    ].join('\n');

    const dateKey = hmac(`AWS4${secretAccessKey}`, dateStamp);
    const regionKey = hmac(dateKey, this.region);
    const serviceKey = hmac(regionKey, service);
    const signingKey = hmac(serviceKey, 'aws4_request');
    const signature = createHmac('sha256', signingKey)
      .update(stringToSign, 'utf8')
      .digest('hex');

    return `${endpointUrl.origin}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
  }

  async deleteFile(_storageKey: string): Promise<boolean> {
    // Physical deletion is intentionally not exposed until a signed server-side
    // DELETE implementation and retention policy are wired. Media uses soft delete.
    return false;
  }

  getPublicCdnUrl(storageKey: string): string {
    const cdnDomain = this.cdnDomain || requiredEnv('MEDIA_CDN_URL');
    return `${cdnDomain.replace(/\/$/, '')}/${storageKey}`;
  }
}

export class LocalStorageAdapter implements IStorageAdapter {
  async generatePresignedUploadUrl(storageKey: string): Promise<string> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('LOCAL_DISK production ortamında kullanılamaz.');
    }
    return `http://localhost:3000/api/v1/media/upload-local?key=${encodeURIComponent(storageKey)}`;
  }

  async deleteFile(): Promise<boolean> {
    return false;
  }

  getPublicCdnUrl(storageKey: string): string {
    return `http://localhost:3000/uploads/${storageKey}`;
  }
}

export class StorageAdapterFactory {
  static getAdapter(provider: StorageProviderType = 'AMAZON_S3'): IStorageAdapter {
    switch (provider) {
      case 'AMAZON_S3':
      case 'CLOUDFLARE_R2':
        return new S3StorageAdapter();
      case 'LOCAL_DISK':
        return new LocalStorageAdapter();
      case 'GOOGLE_CLOUD':
      case 'AZURE_BLOB':
        throw new Error(`${provider} depolama sağlayıcısı henüz aktif değil.`);
      default: {
        const exhaustiveCheck: never = provider;
        throw new Error(`Desteklenmeyen depolama sağlayıcısı: ${exhaustiveCheck}`);
      }
    }
  }
}
