import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const resolvedParams = await params;
    const messages = await EnterpriseMessagingService.getMessages(
      resolvedParams.id,
      session.userId,
    );

    return NextResponse.json({
      conversationId: resolvedParams.id,
      count: messages.length,
      messages,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Mesajlar alınamadı.';
    return NextResponse.json({ error: message }, { status: 403 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const resolvedParams = await params;
    const body = await req.json();

    const message = await EnterpriseMessagingService.sendMessage({
      conversationId: resolvedParams.id,
      senderUserId: session.userId,
      type: body.type || 'TEXT',
      bodyText: body.bodyText,
      attachments: body.attachments,
    });

    return NextResponse.json(message);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Mesaj gönderilemedi.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
