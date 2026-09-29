import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import {
  UniversalNotificationEngine,
  InAppNotificationItem,
} from '@/lib/notifications/application/universal-notification.engine';

export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  }

  const notifications =
    await UniversalNotificationEngine.getUserInAppNotifications(session.userId);

  return NextResponse.json({
    userId: session.userId,
    unreadCount: notifications.filter(
      (n: InAppNotificationItem) => n.status === 'UNSEEN' || n.status === 'SEEN',
    ).length,
    notifications,
  });
}
