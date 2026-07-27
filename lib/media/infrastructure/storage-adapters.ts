import { PresignedUploadResponse, StorageProviderType } from '@/types/enterprise-media';
import { MEDIA_CONFIG } from '../domain/media.constants';

export interface IStorageAdapter {
  generatePresignedUploadUrl(
    storageKey: string,
    mimeType: string,
    expiresInSec?: number
  ): Promise<string>;
  deleteFile(storageKey: string): Promise<boolean>;
  getPublicCdnUrl(storageKey: string): string;
}

export class S3StorageAdapter implements IStorageAdapter {
  private bucketName: string;
  private cdnDomain: string;

  constructor(bucketName = 'wedyplan-media', cdnDomain = 'https://cdn.wedyplan.com') {
    this.bucketName = bucketName;
    this.cdnDomain = cdnDomain;
  }

  async generatePresignedUploadUrl(
    storageKey: string,
    mimeType: string,
    expiresInSec = MEDIA_CONFIG.PRESIGNED_URL_EXPIRATION_SEC
  ): Promise<string> {
    // Integration point for AWS S3 / Cloudflare R2 @aws-sdk/s3-request-presigner
    return `https://${this.bucketName}.s3.amazonaws.com/${storageKey}?X-Amz-Expires=${expiresInSec}&X-Amz-Signature=mock_sig_${Date.now()}`;
  }

  async deleteFile(storageKey: string): Promise<boolean> {
    return true;
  }

  getPublicCdnUrl(storageKey: string): string {
    return `${this.cdnDomain}/${storageKey}`;
  }
}

export class LocalStorageAdapter implements IStorageAdapter {
  async generatePresignedUploadUrl(storageKey: string): Promise<string> {
    return `http://localhost:3000/api/v1/media/upload-local?key=${storageKey}`;
  }

  async deleteFile(): Promise<boolean> {
    return true;
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
      default:
        return new S3StorageAdapter();
    }
  }
}