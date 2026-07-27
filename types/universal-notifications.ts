export type NotificationChannel =
  | 'EMAIL'
  | 'SMS'
  | 'WHATSAPP'
  | 'PUSH_MOBILE'
  | 'BROWSER_PUSH'
  | 'IN_APP'
  | 'VOICE_CALL';

export type NotificationCategory =
  | 'AUTHENTICATION'
  | 'SECURITY'
  | 'WEDDING_PLANNING'
  | 'VENDOR_LEADS'
  | 'OFFERS'
  | 'CONTRACTS'
  | 'PAYMENTS'
  | 'INVOICES'
  | 'CALENDAR'
  | 'CAMPAIGNS'
  | 'SUPPORT'
  | 'MARKETING'
  | 'AI'
  | 'SYSTEM';

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type NotificationStatus = 'UNSEEN' | 'SEEN' | 'READ' | 'DISMISSED' | 'ARCHIVED';

export type JobDeliveryState =
  | 'QUEUED'
  | 'PROCESSING'
  | 'SENT'
  | 'FAILED'
  | 'SCHEDULED'
  | 'DEFERRED_QUIET_HOURS';

export interface DispatchNotificationPayload {
  userId: string;
  templateCode: string;
  category: NotificationCategory;
  channels: NotificationChannel[];
  priority?: NotificationPriority;
  locale?: 'tr' | 'en' | 'de';
  variables: Record<string, string | number | boolean>;
  recipients: {
    email?: string;
    phoneNumber?: string;
    pushToken?: string;
    webPushSubscription?: unknown;
  };
  scheduledFor?: Date;
  batchGroupId?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationDeliveryResult {
  channel: NotificationChannel;
  success: boolean;
  externalMessageId?: string;
  deliveryState: JobDeliveryState;
  executionMs: number;
  error?: string;
}

export interface NotificationPreferenceSetting {
  category: NotificationCategory;
  channelSettings: Record<NotificationChannel, boolean>;
  quietHours?: { start: string; end: string; timezone: string };
}