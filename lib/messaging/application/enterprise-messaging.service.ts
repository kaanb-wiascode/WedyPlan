import {
    CreateConversationDTO,
    SendMessageDTO,
    MessageDTO,
    ConversationDTO,
    MessageDeliveryStatus
  } from '@/types/enterprise-messaging';
  import { SpamModerationEngine } from '../infrastructure/spam-moderation.engine';
  import { RealtimeMessagingGateway } from '../infrastructure/websocket-gateway';
  import { ConversationEngine } from './conversation.engine';
  
  // In-Memory Messaging Store Mock
  const conversationsStore = new Map<string, any>();
  const messagesStore = new Map<string, MessageDTO[]>();
  
  export class EnterpriseMessagingService {
    /**
     * Creates or returns an existing conversation
     */
    static async createConversation(dto: CreateConversationDTO): Promise<ConversationDTO> {
      ConversationEngine.validateParticipants(dto);
  
      const convId = `conv_${Date.now()}`;
      const conversation: ConversationDTO = {
        id: convId,
        type: dto.type,
        title: dto.title,
        unreadCount: 0,
        lastMessageAt: new Date().toISOString(),
        isPinned: false,
        isArchived: false,
        participantUserIds: dto.participantUserIds
      };
  
      conversationsStore.set(convId, conversation);
      messagesStore.set(convId, []);
  
      if (dto.initialMessageText && dto.participantUserIds[0]) {
        await this.sendMessage({
          conversationId: convId,
          senderUserId: dto.participantUserIds[0],
          bodyText: dto.initialMessageText
        });
      }
  
      return conversation;
    }
  
    /**
     * Sends a message, evaluates spam, updates delivery and triggers real-time broadcast
     */
    static async sendMessage(dto: SendMessageDTO): Promise<MessageDTO> {
      const conversation = conversationsStore.get(dto.conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
  
      const spamEvaluation = SpamModerationEngine.evaluateSpam(dto.bodyText);
  
      const messageId = `msg_${Date.now()}`;
      const messageRecord: MessageDTO = {
        id: messageId,
        conversationId: dto.conversationId,
        senderUserId: dto.senderUserId,
        type: dto.type || 'TEXT',
        bodyText: dto.bodyText,
        deliveryStatus: 'SENT',
        isSpamFlagged: spamEvaluation.isFlagged,
        createdAt: new Date().toISOString(),
        attachments: dto.attachments?.map((a) => ({ fileUrl: a.fileUrl, fileName: a.fileName }))
      };
  
      const convMessages = messagesStore.get(dto.conversationId) || [];
      convMessages.push(messageRecord);
      messagesStore.set(dto.conversationId, convMessages);
  
      conversation.lastMessage = messageRecord;
      conversation.lastMessageAt = messageRecord.createdAt;
  
      // Real-Time WebSocket Broadcast
      RealtimeMessagingGateway.broadcastNewMessage(conversation.participantUserIds, messageRecord);
  
      return messageRecord;
    }
  
    /**
     * Fetches messages for a conversation
     */
    static async getMessages(conversationId: string): Promise<MessageDTO[]> {
      return messagesStore.get(conversationId) || [];
    }
  
    /**
     * Updates message delivery or read status
     */
    static async updateMessageStatus(messageId: string, status: MessageDeliveryStatus): Promise<boolean> {
      for (const messages of messagesStore.values()) {
        const msg = messages.find((m) => m.id === messageId);
        if (msg) {
          msg.deliveryStatus = status;
          return true;
        }
      }
      return false;
    }
  }