import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const asset = await EnterpriseMediaService.registerUploadedAsset({
      assetId: body.assetId,
      ownerId: body.ownerId || 'usr_couple_1',
      storageKey: body.storageKey,
      originalFileName: body.originalFileName,
      mimeType: body.mimeType,
      fileSizeBytes: body.fileSizeBytes,
      folderId: body.folderId
    });

    return NextResponse.json(asset);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Asset registration failed' }, { status: 400 });
  }
}