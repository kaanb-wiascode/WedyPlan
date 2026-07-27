import { NextRequest, NextResponse } from 'next/server';
import { UniversalNotificationEngine, InAppNotificationItem } from '@/lib/notifications/application/universal-notification.engine';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') || 'usr_couple_1';

  const notifications = await UniversalNotificationEngine.getUserInAppNotifications(userId);

  return NextResponse.json({
    userId,
    unreadCount: notifications.filter((n: InAppNotificationItem) => n.status === 'UNSEEN' || n.status === 'SEEN').length,
    notifications
  });
}