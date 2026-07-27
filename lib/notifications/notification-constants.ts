import { NotificationChannel, NotificationPriority } from '@/types/notification-engine';

export const NOTIFICATION_CONFIG = {
  MAX_RETRY_ATTEMPTS: 3,
  INITIAL_RETRY_DELAY_MS: 1000, // 1 saniye
  BACKOFF_FACTOR: 2, // Exponential backoff (1s -> 2s -> 4s)
  
  CHANNEL_DEFAULTS: {
    IN_APP: { maxRetries: 1 },
    EMAIL: { maxRetries: 3 },
    SMS: { maxRetries: 2 },
    WHATSAPP: { maxRetries: 2 },
    PUSH: { maxRetries: 2 },
    BROWSER: { maxRetries: 1 },
  } as Record<NotificationChannel, { maxRetries: number }>,

  PRIORITY_WEIGHTS: {
    URGENT: 1,  // Immediate processing
    HIGH: 2,
    NORMAL: 3,
    LOW: 4
  } as Record<NotificationPriority, number>
} as const;