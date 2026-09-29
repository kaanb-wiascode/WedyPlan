import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  }

  const resolvedParams = await params;
  const success = await EnterpriseMediaService.restoreAsset(
    resolvedParams.id,
    session.userId,
  );

  if (!success) {
    return NextResponse.json({ error: 'Dosya bulunamadı veya bu işlem için yetkiniz yok.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Dosya geri yüklendi.' });
}
