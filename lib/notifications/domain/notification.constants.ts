import { NotificationChannel, NotificationPriority } from '@/types/universal-notifications';

export const UNIVERSAL_NOTIFICATION_CONFIG = {
  DEFAULT_LOCALE: 'tr',
  SUPPORTED_LOCALES: ['tr', 'en', 'de'],
  
  CHANNEL_RETRY_POLICY: {
    EMAIL: { maxRetries: 3, backoffFactorSec: 5 },
    SMS: { maxRetries: 2, backoffFactorSec: 10 },
    WHATSAPP: { maxRetries: 2, backoffFactorSec: 10 },
    PUSH_MOBILE: { maxRetries: 2, backoffFactorSec: 3 },
    BROWSER_PUSH: { maxRetries: 2, backoffFactorSec: 3 },
    IN_APP: { maxRetries: 1, backoffFactorSec: 0 },
    VOICE_CALL: { maxRetries: 1, backoffFactorSec: 30 }
  } as Record<NotificationChannel, { maxRetries: number; backoffFactorSec: number }>,

  PRIORITY_PROCESSING_ORDER: {
    URGENT: 1,
    HIGH: 2,
    NORMAL: 3,
    LOW: 4
  } as Record<NotificationPriority, number>,

  DEFAULT_QUIET_HOURS: {
    start: '23:00',
    end: '08:00',
    timezone: 'Europe/Istanbul'
  }
} as const;