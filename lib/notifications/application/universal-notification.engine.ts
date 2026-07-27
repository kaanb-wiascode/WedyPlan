import {
    DispatchNotificationPayload,
    NotificationDeliveryResult,
    NotificationStatus,
    NotificationCategory,
    NotificationPriority
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
  
  // In-memory In-App Notification Store Mock
  const inAppNotificationsStore: InAppNotificationItem[] = [];
  
  export class UniversalNotificationEngine {
    /**
     * Universal Dispatch Entry Point for all system notifications
     */
    static async dispatch(payload: DispatchNotificationPayload): Promise<NotificationDeliveryResult[]> {
      const results: NotificationDeliveryResult[] = [];
  
      // 1. Compile i18n Content
      const compiled = TemplateI18nEngine.compile(
        payload.templateCode,
        payload.locale,
        payload.variables
      );
  
      // 2. Check Quiet Hours
      const isQuiet = QuietHoursEngine.isQuietHoursActive(
        payload.category,
        payload.priority || 'NORMAL'
      );
  
      for (const channel of payload.channels) {
        if (isQuiet && (channel === 'SMS' || channel === 'PUSH_MOBILE' || channel === 'WHATSAPP')) {
          results.push({
            channel,
            success: true,
            deliveryState: 'DEFERRED_QUIET_HOURS',
            executionMs: 0
          });
          continue;
        }
  
        // 3. Process Channels via Queue Worker
        const deliveryResult = await RedisQueueWorker.processQueueJob(channel, payload, async () => {
          if (channel === 'IN_APP') {
            const notificationId = `notif_${Date.now()}`;
            const inAppObj: InAppNotificationItem = {
              id: notificationId,
              userId: payload.userId,
              category: payload.category,
              priority: payload.priority || 'NORMAL',
              title: compiled.subject,
              body: compiled.body,
              actionUrl: compiled.actionUrl,
              status: 'UNSEEN',
              createdAt: new Date()
            };
            inAppNotificationsStore.push(inAppObj);
  
            // Broadcast via WebSocket
            WebSocketEventBus.broadcastToUser(payload.userId, {
              notificationId,
              userId: payload.userId,
              title: compiled.subject,
              body: compiled.body,
              priority: payload.priority || 'NORMAL',
              actionUrl: compiled.actionUrl,
              timestamp: new Date().toISOString()
            });
  
            return { externalMessageId: notificationId };
          }
  
          return { externalMessageId: `msg_${channel.toLowerCase()}_${Date.now()}` };
        });
  
        results.push(deliveryResult);
      }
  
      return results;
    }
  
    /**
     * Fetches user In-App notifications
     */
    static async getUserInAppNotifications(userId: string): Promise<InAppNotificationItem[]> {
      return inAppNotificationsStore.filter((n) => n.userId === userId);
    }
  
    /**
     * Updates notification lifecycle status
     */
    static async updateStatus(notificationId: string, status: NotificationStatus): Promise<boolean> {
      const item = inAppNotificationsStore.find((n) => n.id === notificationId);
      if (!item) return false;
  
      item.status = status;
      if (status === 'SEEN') item.seenAt = new Date();
      if (status === 'READ') item.readAt = new Date();
      if (status === 'DISMISSED') item.dismissedAt = new Date();
      if (status === 'ARCHIVED') item.archivedAt = new Date();
  
      return true;
    }
  }