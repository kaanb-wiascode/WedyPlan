// lib/actions/messages.ts
'use server';

import { db } from '@/lib/db';
import { getActiveCoupleId } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

// 1. Kullanıcının aktif sohbet/konuşma listesini getir
export async function getConversations(userIdOrCoupleId?: string) {
  try {
    const activeCoupleId = await getActiveCoupleId(userIdOrCoupleId);
    const conversationModel =
      (db as any).conversation || (db as any).chat || (db as any).messageThread;

    if (!conversationModel) {
      return { success: false, error: 'Sohbet veritabanı modeli bulunamadı.' };
    }

    const conversations = await conversationModel.findMany({
      where: {
        OR: [
          { coupleId: activeCoupleId },
          { userId: activeCoupleId },
          { participantId: activeCoupleId },
        ],
      },
      orderBy: { updatedAt: 'desc' },
    });

    return {
      success: true,
      data: conversations,
    };
  } catch (error) {
    console.error('Sohbetler çekilirken hata:', error);
    return { success: false, error: 'Sohbet listesi yüklenemedi.' };
  }
}

// 2. Belirli bir sohbetin mesaj geçmişini getir
export async function getConversationMessages(conversationId: string) {
  try {
    const messageModel = (db as any).message || (db as any).chatMessage;

    if (!messageModel) {
      return { success: false, error: 'Mesaj veritabanı modeli bulunamadı.' };
    }

    const messages = await messageModel.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });

    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.error('Mesajlar çekilirken hata:', error);
    return { success: false, error: 'Mesaj geçmişi yüklenemedi.' };
  }
}

// 3. Yeni mesaj gönder
export async function sendMessage(data: {
  conversationId: string;
  senderId?: string;
  senderName?: string;
  content: string;
}) {
  try {
    const activeSenderId = await getActiveCoupleId(data.senderId);
    const messageModel = (db as any).message || (db as any).chatMessage;
    const conversationModel =
      (db as any).conversation || (db as any).chat || (db as any).messageThread;

    if (!messageModel) {
      return { success: false, error: 'Mesaj veritabanı modeli bulunamadı.' };
    }

    const newMessage = await messageModel.create({
      data: {
        conversationId: data.conversationId,
        senderId: activeSenderId,
        senderName: data.senderName || 'Kullanıcı',
        content: data.content,
        isRead: false,
      },
    });

    if (conversationModel) {
      await conversationModel.update({
        where: { id: data.conversationId },
        data: {
          lastMessage: data.content,
          updatedAt: new Date(),
        },
      });
    }

    revalidatePath('/cift/messages');
    revalidatePath('/satici/messages');

    return {
      success: true,
      data: newMessage,
    };
  } catch (error) {
    console.error('Mesaj gönderilirken hata:', error);
    return { success: false, error: 'Mesaj iletilemedi.' };
  }
}

// 4. ChatThread Bileşeni İçin Alias (Tekli veya Çift Parametreli Çağrıları Destekler)
export async function sendMessageAction(
  userIdOrData: any,
  options?: { conversationId?: string; content?: string; senderName?: string; [key: string]: any }
) {
  const conversationId = options?.conversationId || userIdOrData?.conversationId || 'demo-chat';
  const content = options?.content || userIdOrData?.content || userIdOrData?.message || '';
  const senderId = typeof userIdOrData === 'string' ? userIdOrData : userIdOrData?.senderId;
  const senderName = options?.senderName || userIdOrData?.senderName || 'Çift';

  return sendMessage({
    conversationId,
    senderId,
    senderName,
    content,
  });
}