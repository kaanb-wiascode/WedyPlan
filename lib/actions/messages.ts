'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface SendMessageInput {
  senderId?: string;
  receiverId?: string;
  conversationId?: string;
  content: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

/**
 * Kullanıcıya ait sohbet listelerini (Conversations) getirir.
 */
export async function getUserConversationsAction(userId: string) {
  try {
    const conversationModel = (db as any).conversation || (db as any).chatConversation;

    let conversations = [];

    if (conversationModel) {
      conversations = await conversationModel.findMany({
        where: {
          OR: [{ coupleId: userId }, { vendorId: userId }, { participantIds: { has: userId } }],
        },
        orderBy: { updatedAt: 'desc' },
      });
    }

    return { success: true, data: conversations };
  } catch (error: unknown) {
    console.error('❌ getUserConversationsAction hatası:', error);
    return { success: false, error: 'Sohbetler yüklenemedi.', data: [] };
  }
}

/**
 * Belirli bir konuşmaya ait tüm mesaj geçmişini getirir.
 */
export async function getConversationMessagesAction(conversationId: string) {
  try {
    const messageModel = (db as any).message || (db as any).chatMessage;

    let messages: MessageRecord[] = [];

    if (messageModel) {
      messages = await messageModel.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
      });
    }

    return { success: true, data: messages };
  } catch (error: unknown) {
    console.error('❌ getConversationMessagesAction hatası:', error);
    return { success: false, error: 'Mesaj geçmişi alınamadı.', data: [] };
  }
}

/**
 * Yeni mesaj gönderir. Hem tek parametre (input) hem de çift parametre (userId, payload) çağrılarını destekler.
 */
export async function sendMessageAction(
  param1: string | SendMessageInput,
  param2?: SendMessageInput
) {
  try {
    const conversationModel = (db as any).conversation || (db as any).chatConversation;
    const messageModel = (db as any).message || (db as any).chatMessage;

    if (!messageModel) {
      throw new Error('Mesaj modeli Prisma şemasında bulunamadı.');
    }

    let senderId = '';
    let receiverId = '';
    let conversationId = '';
    let content = '';

    if (typeof param1 === 'string' && param2) {
      // 2 parametreli çağrı: sendMessageAction(userId, { conversationId, content })
      senderId = param1;
      conversationId = param2.conversationId || '';
      receiverId = param2.receiverId || '';
      content = param2.content;
    } else if (typeof param1 === 'object') {
      // Tek parametreli çağrı: sendMessageAction({ senderId, receiverId, content })
      senderId = param1.senderId || '';
      receiverId = param1.receiverId || '';
      conversationId = param1.conversationId || '';
      content = param1.content;
    }

    let activeConversationId = conversationId;

    // Eğer conversationId yoksa mevcut konuşmayı ara veya yeni oluştur
    if (!activeConversationId && conversationModel && senderId && receiverId) {
      let existingConversation = await conversationModel.findFirst({
        where: {
          AND: [
            { OR: [{ coupleId: senderId }, { vendorId: senderId }] },
            { OR: [{ coupleId: receiverId }, { vendorId: receiverId }] },
          ],
        },
      });

      if (!existingConversation) {
        existingConversation = await conversationModel.create({
          data: {
            coupleId: senderId,
            vendorId: receiverId,
            lastMessage: content,
          },
        });
      }

      activeConversationId = existingConversation.id;
    }

    // Mesajı kaydet
    const newMessage = await messageModel.create({
      data: {
        conversationId: activeConversationId || 'default-chat',
        senderId: senderId || 'user',
        receiverId: receiverId || 'vendor',
        content,
        isRead: false,
      },
    });

    // Konuşmanın son mesajını ve zamanını güncelle
    if (activeConversationId && conversationModel) {
      await conversationModel.update({
        where: { id: activeConversationId },
        data: {
          lastMessage: content,
          updatedAt: new Date(),
        },
      });
    }

    revalidatePath('/cift/messages');
    revalidatePath('/messages');
    revalidatePath('/vendor/messages');

    return { success: true, data: newMessage };
  } catch (error: unknown) {
    console.error('❌ sendMessageAction hatası:', error);
    return { success: false, error: 'Mesaj gönderilemedi.' };
  }
}