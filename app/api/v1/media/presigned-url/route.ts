import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMediaService } from '@/lib/media/application/enterprise-media.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await EnterpriseMediaService.getPresignedUploadUrl({
      ownerId: body.ownerId || 'usr_couple_1',
      fileName: body.fileName,
      mimeType: body.mimeType,
      fileSizeBytes: body.fileSizeBytes,
      folderId: body.folderId,
      accessLevel: body.accessLevel || 'PUBLIC'
    });

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Presigned URL generation failed' }, { status: 400 });
  }
}