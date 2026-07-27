import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const success = await EnterpriseMediaService.restoreAsset(resolvedParams.id);

  if (!success) {
    return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Asset restored successfully' });
}