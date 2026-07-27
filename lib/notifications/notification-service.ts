import { 
    NotificationPayload, 
    ChannelDeliveryResult, 
    NotificationAnalyticsSummary,
    NotificationChannel
  } from '@/types/notification-engine';
  import { TemplateEngine } from './template-engine';
  import { PreferenceEngine } from './preference-engine';
  import { ChannelAdapters } from './channel-adapters';
  import { QueueProcessor } from './queue-processor';
  
  // In-Memory In-App Notification Store Mock
  const inAppStore: any[] = [];
  const deliveryLogs: any[] = [];
  
  export class NotificationService {
    /**
     * Universal Dispatch Entry Point for any system event
     */
    static async dispatch(payload: NotificationPayload): Promise<ChannelDeliveryResult[]> {
      const results: ChannelDeliveryResult[] = [];
  
      for (const channel of payload.channels) {
        // 1. Check user preference opt-in
        const isAllowed = await PreferenceEngine.isChannelAllowed(
          payload.userId,
          'TRANSACTIONAL',
          channel
        );
  
        if (!isAllowed) {
          results.push({
            channel,
            success: false,
            error: 'User opted out of this channel'
          });
          continue;
        }
  
        // 2. Render Template
        const sampleTemplate = `Merhaba {{fullName}}, {{title}} bildirimi: {{message}}`;
        const renderedText = TemplateEngine.render(sampleTemplate, payload.variables);
  
        // 3. Dispatch based on channel with async retry queue
        const deliveryResult = await QueueProcessor.executeWithRetry(channel, async () => {
          switch (channel) {
            case 'EMAIL':
              return ChannelAdapters.sendEmail(
                payload.recipients.email || '',
                'WedyPlan Bildirimi',
                renderedText
              );
            case 'SMS':
              return ChannelAdapters.sendSms(
                payload.recipients.phone || '',
                renderedText
              );
            case 'WHATSAPP':
              return ChannelAdapters.sendWhatsApp(
                payload.recipients.phone || '',
                renderedText
              );
            case 'PUSH':
              return ChannelAdapters.sendPush(
                payload.recipients.pushToken || '',
                'WedyPlan',
                renderedText
              );
            case 'IN_APP':
              inAppStore.push({
                id: `inapp_${Date.now()}`,
                userId: payload.userId,
                title: String(payload.variables.title || 'WedyPlan Bildirimi'),
                message: renderedText,
                isRead: false,
                createdAt: new Date()
              });
              return { channel: 'IN_APP', success: true };
            default:
              return { channel, success: false, error: 'Unsupported channel' };
          }
        });
  
        // 4. Log for analytics
        deliveryLogs.push({
          userId: payload.userId,
          channel,
          status: deliveryResult.success ? 'DELIVERED' : 'FAILED',
          timestamp: new Date()
        });
  
        results.push(deliveryResult);
      }
  
      return results;
    }
  
    /**
     * Fetches user in-app notification center items
     */
    static async getInAppNotifications(userId: string) {
      return inAppStore.filter((n) => n.userId === userId);
    }
  
    /**
     * Marks in-app notification as read
     */
    static async markInAppAsRead(notificationId: string): Promise<boolean> {
      const item = inAppStore.find((n) => n.id === notificationId);
      if (item) {
        item.isRead = true;
        return true;
      }
      return false;
    }
  
    /**
     * Aggregates notification delivery analytics
     */
    static async getAnalyticsSummary(): Promise<NotificationAnalyticsSummary> {
      const total = deliveryLogs.length;
      const delivered = deliveryLogs.filter((l) => l.status === 'DELIVERED').length;
      const failed = deliveryLogs.filter((l) => l.status === 'FAILED').length;
  
      const channelBreakdown: Record<NotificationChannel, number> = {
        IN_APP: 0, EMAIL: 0, SMS: 0, WHATSAPP: 0, PUSH: 0, BROWSER: 0
      };
  
      deliveryLogs.forEach((l) => {
        if (channelBreakdown[l.channel as NotificationChannel] !== undefined) {
          channelBreakdown[l.channel as NotificationChannel]++;
        }
      });
  
      return {
        totalDispatched: total,
        deliveredCount: delivered,
        readCount: 0,
        failedCount: failed,
        channelBreakdown
      };
    }
  }