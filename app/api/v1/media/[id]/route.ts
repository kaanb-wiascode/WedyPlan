import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const asset = await EnterpriseMediaService.getAssetById(resolvedParams.id);

  if (!asset) {
    return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
  }

  return NextResponse.json(asset);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const success = await EnterpriseMediaService.softDeleteAsset(resolvedParams.id);

  if (!success) {
    return NextResponse.json({ error: 'Asset not found or already deleted' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Asset moved to recycle bin' });
}