import { prisma } from '@/lib/db';
import {
  CreateConversationDTO,
  SendMessageDTO,
  MessageDTO,
  ConversationDTO,
  MessageDeliveryStatus,
} from '@/types/enterprise-messaging';
import { SpamModerationEngine } from '../infrastructure/spam-moderation.engine';
import { RealtimeMessagingGateway } from '../infrastructure/websocket-gateway';
import { ConversationEngine } from './conversation.engine';

function toMessageDTO(message: {
  id: string;
  conversationId: string;
  senderUserId: string;
  type: string;
  bodyText: string;
  deliveryStatus: string;
  isSpamFlagged: boolean;
  createdAt: Date;
  attachments?: { fileUrl: string; fileName: string }[];
}): MessageDTO {
  return {
    id: message.id,
    conversationId: message.conversationId,
    senderUserId: message.senderUserId,
    type: message.type as MessageDTO['type'],
    bodyText: message.bodyText,
    deliveryStatus: message.deliveryStatus as MessageDeliveryStatus,
    isSpamFlagged: message.isSpamFlagged,
    createdAt: message.createdAt.toISOString(),
    attachments: message.attachments?.map((attachment) => ({
      fileUrl: attachment.fileUrl,
      fileName: attachment.fileName,
    })),
  };
}

export class EnterpriseMessagingService {
  static async createConversation(
    dto: CreateConversationDTO,
  ): Promise<ConversationDTO> {
    ConversationEngine.validateParticipants(dto);

    const participantUserIds = Array.from(new Set(dto.participantUserIds));

    const conversation = await prisma.conversation.create({
      data: {
        type: dto.type,
        title: dto.title,
        relatedEntityId: dto.relatedEntityId,
        participants: {
          create: participantUserIds.map((userId, index) => ({
            userId,
            role: index === 0 ? 'OWNER' : 'MEMBER',
          })),
        },
      },
      include: {
        participants: {
          select: { userId: true, unreadCount: true },
        },
      },
    });

    if (dto.initialMessageText && participantUserIds[0]) {
      await this.sendMessage({
        conversationId: conversation.id,
        senderUserId: participantUserIds[0],
        bodyText: dto.initialMessageText,
      });
    }

    return {
      id: conversation.id,
      type: conversation.type,
      title: conversation.title || undefined,
      unreadCount: conversation.participants.reduce(
        (sum, participant) => sum + participant.unreadCount,
        0,
      ),
      lastMessageAt: conversation.lastMessageAt.toISOString(),
      isPinned: conversation.isPinned,
      isArchived: conversation.isArchived,
      participantUserIds: conversation.participants.map(
        (participant) => participant.userId,
      ),
    };
  }

  static async sendMessage(dto: SendMessageDTO): Promise<MessageDTO> {
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: {
          conversationId: dto.conversationId,
          userId: dto.senderUserId,
        },
      },
      select: { id: true },
    });

    if (!participant) {
      throw new Error('Bu konuşmaya mesaj gönderme yetkiniz yok.');
    }

    const spamEvaluation = SpamModerationEngine.evaluateSpam(dto.bodyText);

    const message = await prisma.$transaction(async (tx) => {
      const created = await tx.message.create({
        data: {
          conversationId: dto.conversationId,
          senderUserId: dto.senderUserId,
          type: dto.type || 'TEXT',
          bodyText: dto.bodyText,
          deliveryStatus: 'SENT',
          isSpamFlagged: spamEvaluation.isFlagged,
          attachments: dto.attachments?.length
            ? {
                create: dto.attachments.map((attachment) => ({
                  mediaAssetId: attachment.mediaAssetId,
                  fileUrl: attachment.fileUrl,
                  fileName: attachment.fileName,
                  fileSizeBytes: attachment.fileSizeBytes,
                  mimeType: attachment.mimeType,
                })),
              }
            : undefined,
        },
        include: {
          attachments: {
            select: { fileUrl: true, fileName: true },
          },
        },
      });

      await tx.conversation.update({
        where: { id: dto.conversationId },
        data: { lastMessageAt: created.createdAt },
      });

      await tx.conversationParticipant.updateMany({
        where: {
          conversationId: dto.conversationId,
          userId: { not: dto.senderUserId },
        },
        data: { unreadCount: { increment: 1 } },
      });

      if (spamEvaluation.isFlagged) {
        await tx.spamFlagLog.create({
          data: {
            messageId: created.id,
            senderUserId: dto.senderUserId,
            reason: spamEvaluation.reason || 'Spam policy violation',
            flaggedText: dto.bodyText,
          },
        });
      }

      return created;
    });

    const participants = await prisma.conversationParticipant.findMany({
      where: { conversationId: dto.conversationId },
      select: { userId: true },
    });

    const messageRecord = toMessageDTO(message);
    RealtimeMessagingGateway.broadcastNewMessage(
      participants.map((participant) => participant.userId),
      messageRecord,
    );

    return messageRecord;
  }

  static async getMessages(
    conversationId: string,
    userId?: string,
  ): Promise<MessageDTO[]> {
    if (userId) {
      const participant = await prisma.conversationParticipant.findUnique({
        where: {
          conversationId_userId: { conversationId, userId },
        },
        select: { id: true },
      });

      if (!participant) {
        throw new Error('Bu konuşmayı görüntüleme yetkiniz yok.');
      }
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        attachments: {
          select: { fileUrl: true, fileName: true },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 500,
    });

    return messages.map(toMessageDTO);
  }

  static async isParticipant(
    conversationId: string,
    userId: string,
  ): Promise<boolean> {
    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: { conversationId, userId },
      },
      select: { id: true },
    });
    return Boolean(participant);
  }

  static async updateMessageStatus(
    messageId: string,
    status: MessageDeliveryStatus,
    userId?: string,
  ): Promise<boolean> {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        conversationId: true,
      },
    });

    if (!message) return false;

    if (userId) {
      const participant = await prisma.conversationParticipant.findUnique({
        where: {
          conversationId_userId: {
            conversationId: message.conversationId,
            userId,
          },
        },
        select: { id: true },
      });
      if (!participant) return false;
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { deliveryStatus: status },
    });

    if (status === 'READ' && userId) {
      await prisma.conversationParticipant.update({
        where: {
          conversationId_userId: {
            conversationId: message.conversationId,
            userId,
          },
        },
        data: {
          unreadCount: 0,
          lastReadAt: new Date(),
        },
      });
    }

    return true;
  }
}
