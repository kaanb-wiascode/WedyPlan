import { prisma } from '@/lib/db';
import {
  DispatchNotificationPayload,
  NotificationDeliveryResult,
  NotificationStatus,
  NotificationCategory,
  NotificationPriority,
} from '@/types/universal-notifications';
import { TemplateI18nEngine } from '../infrastructure/template-i18n.engine';
import { QuietHoursEngine } from '../infrastructure/quiet-hours.engine';
import { RedisQueueWorker } from '../infrastructure/redis-queue.worker';
import { WebSocketEventBus } from '../shared/websocket-event.bus';

export interface InAppNotificationItem {
  id: string;
  userId: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  body: string;
  actionUrl?: string;
  status: NotificationStatus;
  createdAt: Date;
  seenAt?: Date;
  readAt?: Date;
  dismissedAt?: Date;
  archivedAt?: Date;
}

function toItem(notification: {
  id: string;
  userId: string;
  category: string;
  priority: string;
  title: string;
  body: string;
  actionUrl: string | null;
  status: string;
  createdAt: Date;
  seenAt: Date | null;
  readAt: Date | null;
  dismissedAt: Date | null;
  archivedAt: Date | null;
}): InAppNotificationItem {
  return {
    id: notification.id,
    userId: notification.userId,
    category: notification.category as NotificationCategory,
    priority: notification.priority as NotificationPriority,
    title: notification.title,
    body: notification.body,
    actionUrl: notification.actionUrl || undefined,
    status: notification.status as NotificationStatus,
    createdAt: notification.createdAt,
    seenAt: notification.seenAt || undefined,
    readAt: notification.readAt || undefined,
    dismissedAt: notification.dismissedAt || undefined,
    archivedAt: notification.archivedAt || undefined,
  };
}

export class UniversalNotificationEngine {
  static async dispatch(
    payload: DispatchNotificationPayload,
  ): Promise<NotificationDeliveryResult[]> {
    const results: NotificationDeliveryResult[] = [];

    const compiled = TemplateI18nEngine.compile(
      payload.templateCode,
      payload.locale,
      payload.variables,
    );

    const isQuiet = QuietHoursEngine.isQuietHoursActive(
      payload.category,
      payload.priority || 'NORMAL',
    );

    for (const channel of payload.channels) {
      if (
        isQuiet &&
        (channel === 'SMS' || channel === 'PUSH_MOBILE' || channel === 'WHATSAPP')
      ) {
        results.push({
          channel,
          success: true,
          deliveryState: 'DEFERRED_QUIET_HOURS',
          executionMs: 0,
        });
        continue;
      }

      const deliveryResult = await RedisQueueWorker.processQueueJob(
        channel,
        payload,
        async () => {
          if (channel === 'IN_APP') {
            const notification = await prisma.universalNotification.create({
              data: {
                userId: payload.userId,
                category: payload.category,
                priority: payload.priority || 'NORMAL',
                title: compiled.subject,
                body: compiled.body,
                actionUrl: compiled.actionUrl,
                status: 'UNSEEN',
                batchGroupId: payload.batchGroupId,
                metadata: payload.metadata,
              },
            });

            WebSocketEventBus.broadcastToUser(payload.userId, {
              notificationId: notification.id,
              userId: payload.userId,
              title: compiled.subject,
              body: compiled.body,
              priority: payload.priority || 'NORMAL',
              actionUrl: compiled.actionUrl,
              timestamp: notification.createdAt.toISOString(),
            });

            return { externalMessageId: notification.id };
          }

          return { externalMessageId: `msg_${channel.toLowerCase()}_${Date.now()}` };
        },
      );

      results.push(deliveryResult);
    }

    return results;
  }

  static async getUserInAppNotifications(
    userId: string,
  ): Promise<InAppNotificationItem[]> {
    const notifications = await prisma.universalNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return notifications.map(toItem);
  }

  static async updateStatus(
    notificationId: string,
    status: NotificationStatus,
    userId?: string,
  ): Promise<boolean> {
    const existing = await prisma.universalNotification.findFirst({
      where: {
        id: notificationId,
        ...(userId ? { userId } : {}),
      },
      select: { id: true },
    });

    if (!existing) return false;

    const now = new Date();
    await prisma.universalNotification.update({
      where: { id: notificationId },
      data: {
        status,
        ...(status === 'SEEN' ? { seenAt: now } : {}),
        ...(status === 'READ' ? { readAt: now } : {}),
        ...(status === 'DISMISSED' ? { dismissedAt: now } : {}),
        ...(status === 'ARCHIVED' ? { archivedAt: now } : {}),
      },
    });

    return true;
  }
}
