export type NotificationChannel = 'IN_APP' | 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH' | 'BROWSER';

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type NotificationCategory = 
  | 'TRANSACTIONAL' 
  | 'MARKETING' 
  | 'SYSTEM' 
  | 'WEDDING_REMINDER' 
  | 'CRM_LEAD' 
  | 'SECURITY';

export type DeliveryStatus = 'PENDING' | 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export interface NotificationPayload {
  userId: string;
  templateCode: string;
  channels: NotificationChannel[];
  priority?: NotificationPriority;
  variables: Record<string, string | number | boolean>;
  recipients: {
    email?: string;
    phone?: string;
    pushToken?: string;
  };
  actionUrl?: string;
  scheduledAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ChannelDeliveryResult {
  channel: NotificationChannel;
  success: boolean;
  externalMessageId?: string;
  error?: string;
}

export interface UserNotificationPreference {
  category: NotificationCategory;
  channels: Record<NotificationChannel, boolean>;
}

export interface NotificationAnalyticsSummary {
  totalDispatched: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  channelBreakdown: Record<NotificationChannel, number>;
}