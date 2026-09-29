import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterpriseMessagingService } from '@/lib/messaging/application/enterprise-messaging.service';
import { MessageDeliveryStatus } from '@/types/enterprise-messaging';

const VALID_STATUSES = new Set<MessageDeliveryStatus>([
  'SENT',
  'DELIVERED',
  'READ',
  'FAILED',
]);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  }

  const resolvedParams = await params;
  const body = await req.json();
  const status = body.status as MessageDeliveryStatus;

  if (!VALID_STATUSES.has(status)) {
    return NextResponse.json({ error: 'Geçersiz mesaj durumu.' }, { status: 400 });
  }

  const success = await EnterpriseMessagingService.updateMessageStatus(
    resolvedParams.id,
    status,
    session.userId,
  );

  if (!success) {
    return NextResponse.json(
      { error: 'Mesaj bulunamadı veya bu işlem için yetkiniz yok.' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    messageId: resolvedParams.id,
    status,
  });
}
