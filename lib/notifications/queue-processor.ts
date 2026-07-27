import { NotificationChannel, ChannelDeliveryResult } from '@/types/notification-engine';
import { NOTIFICATION_CONFIG } from './notification-constants';

export class QueueProcessor {
  /**
   * Executes channel dispatch with exponential backoff retries
   */
  static async executeWithRetry(
    channel: NotificationChannel,
    taskFn: () => Promise<ChannelDeliveryResult>
  ): Promise<ChannelDeliveryResult> {
    const maxRetries = NOTIFICATION_CONFIG.CHANNEL_DEFAULTS[channel]?.maxRetries || 2;
    let attempt = 0;
    let delay = NOTIFICATION_CONFIG.INITIAL_RETRY_DELAY_MS;

    while (attempt < maxRetries) {
      attempt++;
      const result = await taskFn();

      if (result.success) {
        return result;
      }

      if (attempt < maxRetries) {
        // Wait for backoff period before next attempt
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= NOTIFICATION_CONFIG.BACKOFF_FACTOR;
      } else {
        return {
          channel,
          success: false,
          error: `Max retry attempts (${maxRetries}) reached. Last error: ${result.error}`
        };
      }
    }

    return {
      channel,
      success: false,
      error: 'Queue execution failed unexpectedly'
    };
  }
}