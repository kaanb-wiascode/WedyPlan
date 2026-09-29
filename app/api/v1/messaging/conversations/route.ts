import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const body = await req.json();
    const requestedParticipants = Array.isArray(body.participantUserIds)
      ? body.participantUserIds.filter((id: unknown): id is string => typeof id === 'string' && id.trim().length > 0)
      : [];

    const participantUserIds = Array.from(
      new Set([session.userId, ...requestedParticipants.map((id: string) => id.trim())]),
    );

    if (participantUserIds.length < 2) {
      return NextResponse.json(
        { error: 'Konuşma oluşturmak için en az bir başka katılımcı seçilmelidir.' },
        { status: 400 },
      );
    }

    const conversation = await EnterpriseMessagingService.createConversation({
      type: body.type || 'COUPLE_VENDOR',
      participantUserIds,
      title: body.title,
      relatedEntityId: body.relatedEntityId,
      initialMessageText: body.initialMessageText,
    });

    return NextResponse.json(conversation);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Konuşma oluşturulamadı.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
