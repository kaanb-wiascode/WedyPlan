import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const body = await req.json();

    const response = await EnterpriseMediaService.getPresignedUploadUrl({
      ownerId: session.userId,
      fileName: body.fileName,
      mimeType: body.mimeType,
      fileSizeBytes: body.fileSizeBytes,
      folderId: body.folderId,
      accessLevel: body.accessLevel || 'PRIVATE',
    });

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Dosya yükleme bağlantısı üretilemedi.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
