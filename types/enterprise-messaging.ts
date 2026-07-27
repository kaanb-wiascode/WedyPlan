export type ConversationType =
  | 'COUPLE_VENDOR'
  | 'VENDOR_STAFF'
  | 'VENDOR_ADMIN'
  | 'CUSTOMER_SUPPORT'
  | 'AI_USER';

export type ParticipantRole = 'OWNER' | 'MEMBER' | 'SUPPORT_AGENT' | 'SYSTEM_BOT';

export type MessageType = 'TEXT' | 'IMAGE' | 'DOCUMENT' | 'VOICE_NOTE' | 'SYSTEM_ALERT';

export type MessageDeliveryStatus = 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export interface CreateConversationDTO {
  type: ConversationType;
  participantUserIds: string[];
  title?: string;
  relatedEntityId?: string;
  initialMessageText?: string;
}

export interface SendMessageDTO {
  conversationId: string;
  senderUserId: string;
  type?: MessageType;
  bodyText: string;
  attachments?: {
    mediaAssetId: string;
    fileUrl: string;
    fileName: string;
    fileSizeBytes: number;
    mimeType: string;
  }[];
}

export interface MessageReactionDTO {
  messageId: string;
  userId: string;
  emoji: string;
}

export interface TypingEventDTO {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

export interface MessageDTO {
  id: string;
  conversationId: string;
  senderUserId: string;
  type: MessageType;
  bodyText: string;
  deliveryStatus: MessageDeliveryStatus;
  isSpamFlagged: boolean;
  createdAt: string;
  attachments?: { fileUrl: string; fileName: string }[];
  reactions?: { emoji: string; count: number; userIds: string[] }[];
}

export interface ConversationDTO {
  id: string;
  type: ConversationType;
  title?: string;
  unreadCount: number;
  lastMessage?: MessageDTO;
  lastMessageAt: string;
  isPinned: boolean;
  isArchived: boolean;
  participantUserIds: string[];
}