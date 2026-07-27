import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const conversation = await EnterpriseMessagingService.createConversation({
      type: body.type || 'COUPLE_VENDOR',
      participantUserIds: body.participantUserIds || ['usr_couple_1', 'usr_vendor_1'],
      title: body.title,
      relatedEntityId: body.relatedEntityId,
      initialMessageText: body.initialMessageText
    });

    return NextResponse.json(conversation);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create conversation' }, { status: 400 });
  }
}