import { describe, it } from 'node:test';
import assert from 'node:assert';
import { EnterpriseMediaService } from '../lib/media/application/enterprise-media.service';
import { StorageAdapterFactory } from '../lib/media/infrastructure/storage-adapters';
import { MediaOptimizer } from '../lib/media/infrastructure/media-optimizer';

describe('Phase 03: Enterprise File & Media Platform Test Suite', () => {
  it('should generate valid presigned upload URL via S3 adapter', async () => {
    const presigned = await EnterpriseMediaService.getPresignedUploadUrl({
      ownerId: 'usr_test_101',
      fileName: 'gallery_photo.png',
      mimeType: 'image/png',
      fileSizeBytes: 2000000
    });

    assert.ok(presigned.uploadUrl.includes('s3.amazonaws.com'));
    assert.strictEqual(presigned.provider, 'AMAZON_S3');
    assert.ok(presigned.storageKey.includes('usr_test_101'));
  });

  it('should process image variants and WebP/AVIF URLs', async () => {
    const variants = await MediaOptimizer.processImageVariants(
      'https://cdn.wedyplan.com',
      'owners/usr_1/photo.jpg'
    );

    assert.ok(variants.avif?.endsWith('.avif'));
    assert.ok(variants.responsive?.md?.includes('1024w'));
  });

  it('should register uploaded asset, calculate quota and soft-delete/restore', async () => {
    const presigned = await EnterpriseMediaService.getPresignedUploadUrl({
      ownerId: 'usr_test_102',
      fileName: 'contract.pdf',
      mimeType: 'application/pdf',
      fileSizeBytes: 1000000
    });

    const registered = await EnterpriseMediaService.registerUploadedAsset({
      assetId: presigned.assetId,
      ownerId: 'usr_test_102',
      storageKey: presigned.storageKey,
      originalFileName: 'contract.pdf',
      mimeType: 'application/pdf',
      fileSizeBytes: 1000000
    });

    assert.strictEqual(registered.type, 'DOCUMENT');
    assert.strictEqual(registered.scanStatus, 'CLEAN');

    const deleted = await EnterpriseMediaService.softDeleteAsset(registered.id);
    assert.strictEqual(deleted, true);

    const restored = await EnterpriseMediaService.restoreAsset(registered.id);
    assert.strictEqual(restored, true);
  });
});