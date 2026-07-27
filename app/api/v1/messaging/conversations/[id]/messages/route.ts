import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const messages = await EnterpriseMessagingService.getMessages(resolvedParams.id);

  return NextResponse.json({ conversationId: resolvedParams.id, count: messages.length, messages });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();

    const message = await EnterpriseMessagingService.sendMessage({
      conversationId: resolvedParams.id,
      senderUserId: body.senderUserId || 'usr_couple_1',
      type: body.type || 'TEXT',
      bodyText: body.bodyText,
      attachments: body.attachments
    });

    return NextResponse.json(message);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to send message' }, { status: 400 });
  }
}