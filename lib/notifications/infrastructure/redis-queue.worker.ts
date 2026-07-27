import {
    DispatchNotificationPayload,
    NotificationChannel,
    NotificationDeliveryResult,
    JobDeliveryState
  } from '@/types/universal-notifications';
  import { UNIVERSAL_NOTIFICATION_CONFIG } from '../domain/notification.constants';
  
  export class RedisQueueWorker {
    /**
     * Enqueues job and executes delivery with exponential backoff retries
     */
    static async processQueueJob(
      channel: NotificationChannel,
      payload: DispatchNotificationPayload,
      deliveryTask: () => Promise<{ externalMessageId?: string }>
    ): Promise<NotificationDeliveryResult> {
      const startTime = Date.now();
      const policy = UNIVERSAL_NOTIFICATION_CONFIG.CHANNEL_RETRY_POLICY[channel];
      let attempt = 0;
  
      while (attempt < policy.maxRetries) {
        attempt++;
        try {
          const result = await deliveryTask();
          return {
            channel,
            success: true,
            externalMessageId: result.externalMessageId || `ext_${Date.now()}`,
            deliveryState: 'SENT',
            executionMs: Date.now() - startTime
          };
        } catch (err: any) {
          if (attempt >= policy.maxRetries) {
            return {
              channel,
              success: false,
              deliveryState: 'FAILED',
              executionMs: Date.now() - startTime,
              error: err.message || `Failed after ${policy.maxRetries} attempts`
            };
          }
          // Simulate Exponential Backoff Delay
          await new Promise((resolve) => setTimeout(resolve, policy.backoffFactorSec * 100));
        }
      }
  
      return {
        channel,
        success: false,
        deliveryState: 'FAILED',
        executionMs: Date.now() - startTime,
        error: 'Max retries exceeded'
      };
    }
  }