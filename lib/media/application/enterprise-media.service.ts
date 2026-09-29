import { createHash, randomUUID } from 'node:crypto';
import { prisma } from '@/lib/db';
import {
  PresignedUploadRequest,
  PresignedUploadResponse,
  RegisterAssetRequest,
  MediaAssetDTO,
  MediaType,
} from '@/types/enterprise-media';
import { StorageAdapterFactory } from '../infrastructure/storage-adapters';
import { MediaOptimizer } from '../infrastructure/media-optimizer';
import { MediaSecurityEvaluator } from '../infrastructure/media-security';
import { MEDIA_CONFIG } from '../domain/media.constants';

function mediaTypeFor(mimeType: string): MediaType {
  return MEDIA_CONFIG.MIME_TYPE_MAP[mimeType] || 'DOCUMENT';
}

function extensionOf(fileName: string): string {
  const ext = fileName.split('.').pop()?.trim().toLowerCase();
  return ext || 'bin';
}

function toDto(asset: {
  id: string;
  ownerId: string;
  type: string;
  originalFileName: string;
  mimeType: string;
  fileSizeBytes: bigint;
  cdnUrl: string;
  avifUrl: string | null;
  webpUrl: string | null;
  thumbnailUrl: string | null;
  responsiveUrls: unknown;
  scanStatus: string;
  createdAt: Date;
}): MediaAssetDTO {
  const responsive =
    asset.responsiveUrls && typeof asset.responsiveUrls === 'object'
      ? (asset.responsiveUrls as Record<string, string>)
      : undefined;

  return {
    id: asset.id,
    ownerId: asset.ownerId,
    type: asset.type as MediaType,
    fileName: asset.originalFileName,
    mimeType: asset.mimeType,
    fileSizeBytes: Number(asset.fileSizeBytes),
    cdnUrl: asset.cdnUrl,
    variants: {
      thumbnail: asset.thumbnailUrl || undefined,
      avif: asset.avifUrl || undefined,
      webp: asset.webpUrl || undefined,
      responsive,
    },
    scanStatus: asset.scanStatus as MediaAssetDTO['scanStatus'],
    createdAt: asset.createdAt.toISOString(),
  };
}

export class EnterpriseMediaService {
  static async getPresignedUploadUrl(
    request: PresignedUploadRequest,
  ): Promise<PresignedUploadResponse> {
    if (!request.fileName?.trim() || !request.mimeType?.trim()) {
      throw new Error('Dosya adı ve MIME tipi zorunludur.');
    }

    if (!Number.isFinite(request.fileSizeBytes) || request.fileSizeBytes <= 0) {
      throw new Error('Geçerli bir dosya boyutu gereklidir.');
    }

    const quota = await prisma.storageQuota.upsert({
      where: { ownerId: request.ownerId },
      update: {},
      create: {
        ownerId: request.ownerId,
        allocatedBytes: BigInt(MEDIA_CONFIG.DEFAULT_QUOTA_BYTES),
        usedBytes: 0,
        fileCount: 0,
      },
    });

    if (
      quota.usedBytes + BigInt(request.fileSizeBytes) >
      quota.allocatedBytes
    ) {
      throw new Error('Depolama kotası aşıldı.');
    }

    const assetId = randomUUID();
    const fileExt = extensionOf(request.fileName);
    const storageKey = `owners/${request.ownerId}/${assetId}.${fileExt}`;

    const adapter = StorageAdapterFactory.getAdapter('AMAZON_S3');
    const uploadUrl = await adapter.generatePresignedUploadUrl(
      storageKey,
      request.mimeType,
    );

    return {
      assetId,
      uploadUrl,
      storageKey,
      provider: 'AMAZON_S3',
      expiresInSeconds: MEDIA_CONFIG.PRESIGNED_URL_EXPIRATION_SEC,
    };
  }

  static async registerUploadedAsset(
    request: RegisterAssetRequest,
  ): Promise<MediaAssetDTO> {
    const adapter = StorageAdapterFactory.getAdapter('AMAZON_S3');
    const cdnUrl = adapter.getPublicCdnUrl(request.storageKey);
    const fileExtension = extensionOf(request.originalFileName);

    const isImage = request.mimeType.startsWith('image/');
    const variants = isImage
      ? await MediaOptimizer.processImageVariants(cdnUrl, request.storageKey)
      : undefined;

    const scanStatus = await MediaSecurityEvaluator.scanForViruses(
      request.storageKey,
    );

    const fingerprint = createHash('sha256')
      .update(
        [
          request.ownerId,
          request.storageKey,
          request.fileSizeBytes,
          request.mimeType,
        ].join(':'),
      )
      .digest('hex');

    const bucketName = process.env.S3_BUCKET?.trim();
    if (!bucketName) {
      throw new Error('S3_BUCKET medya kaydı için zorunludur.');
    }

    const asset = await prisma.$transaction(async (tx) => {
      const existing = await tx.mediaAsset.findUnique({
        where: { id: request.assetId },
      });

      if (existing) {
        if (existing.ownerId !== request.ownerId) {
          throw new Error('Bu dosya başka bir kullanıcıya ait.');
        }
        return existing;
      }

      const created = await tx.mediaAsset.create({
        data: {
          id: request.assetId,
          ownerId: request.ownerId,
          folderId: request.folderId,
          type: mediaTypeFor(request.mimeType),
          originalFileName: request.originalFileName,
          fileExtension,
          mimeType: request.mimeType,
          fileSizeBytes: BigInt(request.fileSizeBytes),
          fileHashSha256: fingerprint,
          accessLevel: request.accessLevel || 'PRIVATE',
          storageProvider: 'AMAZON_S3',
          storageBucket: bucketName,
          storageKey: request.storageKey,
          cdnUrl,
          avifUrl: variants?.avif,
          webpUrl: variants?.webp,
          thumbnailUrl: variants?.thumbnail,
          responsiveUrls: variants?.responsive,
          scanStatus,
        },
      });

      await tx.storageQuota.upsert({
        where: { ownerId: request.ownerId },
        update: {
          usedBytes: { increment: BigInt(request.fileSizeBytes) },
          fileCount: { increment: 1 },
        },
        create: {
          ownerId: request.ownerId,
          allocatedBytes: BigInt(MEDIA_CONFIG.DEFAULT_QUOTA_BYTES),
          usedBytes: BigInt(request.fileSizeBytes),
          fileCount: 1,
        },
      });

      return created;
    });

    return toDto(asset);
  }

  static async softDeleteAsset(
    assetId: string,
    ownerId: string,
  ): Promise<boolean> {
    const result = await prisma.mediaAsset.updateMany({
      where: {
        id: assetId,
        ownerId,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return result.count > 0;
  }

  static async restoreAsset(
    assetId: string,
    ownerId: string,
  ): Promise<boolean> {
    const result = await prisma.mediaAsset.updateMany({
      where: {
        id: assetId,
        ownerId,
        isDeleted: true,
      },
      data: {
        isDeleted: false,
        deletedAt: null,
      },
    });

    return result.count > 0;
  }

  static async getAssetById(
    assetId: string,
    ownerId?: string,
  ): Promise<MediaAssetDTO | null> {
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        id: assetId,
        ...(ownerId ? { ownerId } : {}),
        isDeleted: false,
      },
    });

    return asset ? toDto(asset) : null;
  }
}
