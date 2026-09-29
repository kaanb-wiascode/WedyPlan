import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { UniversalNotificationEngine } from '@/lib/notifications/application/universal-notification.engine';
import { NotificationStatus } from '@/types/universal-notifications';

const VALID_STATUSES = new Set<NotificationStatus>([
  'UNSEEN',
  'SEEN',
  'READ',
  'DISMISSED',
  'ARCHIVED',
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
  const status = body.status as NotificationStatus;

  if (!VALID_STATUSES.has(status)) {
    return NextResponse.json({ error: 'Geçersiz bildirim durumu.' }, { status: 400 });
  }

  const success = await UniversalNotificationEngine.updateStatus(
    resolvedParams.id,
    status,
    session.userId,
  );

  if (!success) {
    return NextResponse.json(
      { error: 'Bildirim bulunamadı veya bu işlem için yetkiniz yok.' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    notificationId: resolvedParams.id,
    newStatus: status,
  });
}
