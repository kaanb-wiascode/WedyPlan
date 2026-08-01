'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';

export interface MessageInput {
  threadId: string;
  content: string;
  type?: 'TEXT' | 'QUOTE_ACCEPT' | 'MEETING_CONFIRM';
}

const MESSAGE_COOKIE = 'wedyplan_messages_data';

// Zengin Mock Verisi: Metin, Teklif, Sözleşme ve Randevu tiplerini içerir
const INITIAL_THREADS = [
  {
    id: 't1',
    vendorId: 'v1',
    vendorName: 'Kır Bahçesi Davet & Tesisleri',
    category: 'Mekan & Yeme-İçme',
    unreadCount: 1,
    lastMessageTime: '10:30',
    messages: [
      { id: 'm1', sender: 'VENDOR', content: 'Merhaba, mekanımızı ziyaretiniz için teşekkür ederiz. İhtiyaçlarınıza uygun fiyat teklifimizi iletiyoruz.', timestamp: '10:28', type: 'TEXT' },
      { id: 'm2', sender: 'VENDOR', content: '200 Kişilik Kır Düğünü Paketi', timestamp: '10:30', type: 'QUOTE', metadata: { amount: 180000, validUntil: '2026-09-01', status: 'PENDING' } }
    ]
  },
  {
    id: 't2',
    vendorId: 'v2',
    vendorName: 'Studio Masal Fotoğrafçılık',
    category: 'Fotoğraf & Video',
    unreadCount: 2,
    lastMessageTime: 'Dün',
    messages: [
      { id: 'm3', sender: 'COUPLE', content: 'Dış çekim için tarihleri ne zaman netleştirebiliriz?', timestamp: 'Pzt 14:00', type: 'TEXT' },
      { id: 'm4', sender: 'VENDOR', content: 'Ön görüşme ve konsept belirleme için stüdyomuza bekleriz.', timestamp: 'Dün 16:00', type: 'TEXT' },
      { id: 'm5', sender: 'VENDOR', content: 'Konsept Görüşmesi & Kahve', timestamp: 'Dün 16:05', type: 'MEETING', metadata: { date: '25 Ağustos 2026', time: '14:30', location: 'Nişantaşı Stüdyo', status: 'PENDING' } }
    ]
  },
  {
    id: 't3',
    vendorId: 'v3',
    vendorName: 'Görkem Müzik & Orkestra',
    category: 'Müzik & Eğlence',
    unreadCount: 0,
    lastMessageTime: 'Pzt',
    messages: [
      { id: 'm6', sender: 'VENDOR', content: 'Repertuar listesini onayınıza sunduk. Aşağıdaki sözleşmeyi dijital olarak onaylayabilirsiniz.', timestamp: 'Pzt 09:00', type: 'TEXT' },
      { id: 'm7', sender: 'VENDOR', content: 'Hizmet Sözleşmesi - v1.pdf', timestamp: 'Pzt 09:05', type: 'CONTRACT', metadata: { documentUrl: '#', status: 'APPROVED' } },
      { id: 'm8', sender: 'COUPLE', content: 'Sözleşme tarafımızca onaylanmıştır, teşekkürler.', timestamp: 'Pzt 11:00', type: 'TEXT' }
    ]
  }
];

// 1. Tüm Mesajları ve Threadleri Getir
export async function getMessageThreads() {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };

    const cookieStore = await cookies();
    const messageCookie = cookieStore.get(MESSAGE_COOKIE)?.value;

    let threads = INITIAL_THREADS;
    if (messageCookie) {
      try { threads = JSON.parse(messageCookie); } catch (e) {}
    }

    return { success: true, data: threads };
  } catch (error) {
    return { success: false, error: 'Mesajlar yüklenemedi.' };
  }
}

// 2. Mesaj Gönder
export async function sendMessage(data: MessageInput) {
  try {
    const cookieStore = await cookies();
    const messageCookie = cookieStore.get(MESSAGE_COOKIE)?.value;

    let threads = INITIAL_THREADS;
    if (messageCookie) {
      try { threads = JSON.parse(messageCookie); } catch (e) {}
    }

    const updatedThreads = threads.map(thread => {
      if (thread.id === data.threadId) {
        const newMessage = {
          id: crypto.randomUUID(),
          sender: 'COUPLE',
          content: data.content,
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          type: data.type || 'TEXT',
        };
        return {
          ...thread,
          messages: [...thread.messages, newMessage],
          lastMessageTime: newMessage.timestamp,
        };
      }
      return thread;
    });

    cookieStore.set(MESSAGE_COOKIE, JSON.stringify(updatedThreads), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/mesajlar');

    return { success: true, data: updatedThreads };
  } catch (error) {
    return { success: false };
  }
}

// 3. Akıllı Kart Aksiyonu (Teklif Onaylama, Randevu Onaylama)
export async function handleSmartAction(threadId: string, messageId: string, action: 'ACCEPT_QUOTE' | 'CONFIRM_MEETING') {
  try {
    const cookieStore = await cookies();
    const messageCookie = cookieStore.get(MESSAGE_COOKIE)?.value;

    let threads = INITIAL_THREADS;
    if (messageCookie) {
      try { threads = JSON.parse(messageCookie); } catch (e) {}
    }

    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        const updatedMessages = thread.messages.map(msg => {
          if (msg.id === messageId && msg.metadata) {
            return { ...msg, metadata: { ...msg.metadata, status: 'APPROVED' } };
          }
          return msg;
        });

        const autoReply = {
          id: crypto.randomUUID(),
          sender: 'COUPLE',
          content: action === 'ACCEPT_QUOTE' ? 'Teklifinizi onayladık. Bütçe planlayıcımıza işlenmiştir.' : 'Randevu saatini takvimimize ekledik, onaylıyoruz.',
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          type: 'TEXT'
        };

        return { ...thread, messages: [...updatedMessages, autoReply], unreadCount: 0 };
      }
      return thread;
    });

    cookieStore.set(MESSAGE_COOKIE, JSON.stringify(updatedThreads), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/mesajlar');

    return { success: true, data: updatedThreads, message: action === 'ACCEPT_QUOTE' ? 'Teklif onaylandı ve ilgili modüllere aktarıldı.' : 'Randevu onaylandı.' };
  } catch (error) {
    return { success: false };
  }
}

// 4. AI Yanıt Üretici
export async function generateAiReplyAction(intent: 'DISCOUNT' | 'DETAILS' | 'REJECT') {
  let reply = '';
  if (intent === 'DISCOUNT') reply = 'İlettiğiniz teklif için teşekkür ederiz. Bütçemizi optimize etmeye çalışıyoruz, bu paket üzerinde bir revizyon veya indirim yapma şansınız olabilir mi?';
  if (intent === 'DETAILS') reply = 'Paylaştığınız bilgiler için teşekkürler. Süreçle ilgili daha detaylı bir döküman veya hizmet kapsam listesi iletebilir misiniz?';
  if (intent === 'REJECT') reply = 'İlginiz ve teklifiniz için çok teşekkür ederiz. Ancak mevcut planlamamız doğrultusunda farklı bir alternatif ile ilerleme kararı aldık. Çalışmalarınızda başarılar dileriz.';

  return { success: true, data: reply };
}

// -------------------------------------------------------------
// ESKİ VE ALTERNATİF DOSYALAR İÇİN GERİYE DÖNÜK UYUMLULUK EXPORTLARI
// -------------------------------------------------------------

export async function getConversations() {
  const res = await getMessageThreads();
  return { success: res.success, data: res.data || [] };
}

export async function getConversationMessages(conversationId: string) {
  const res = await getMessageThreads();
  if (res.success && res.data) {
    const thread = res.data.find((t: any) => t.id === conversationId);
    return { success: true, data: thread?.messages || [] };
  }
  return { success: false, data: [] };
}

export async function sendMessageAction(conversationId: any, content?: any, senderId?: any) {
  const threadId = typeof conversationId === 'object' ? (conversationId.threadId || conversationId.conversationId) : conversationId;
  const text = typeof conversationId === 'object' ? conversationId.content : content;
  return sendMessage({ threadId: threadId || 't1', content: text || '' });
}

export async function getMessages(conversationId?: string) {
  return getConversationMessages(conversationId || 't1');
}

export async function markAsRead(conversationId?: string) {
  return { success: true };
}

export async function markConversationAsRead(conversationId?: string) {
  return { success: true };
}

export async function deleteConversation(conversationId?: string) {
  return { success: true };
}