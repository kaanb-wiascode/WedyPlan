export type MessageType =
  | "TEXT"
  | "IMAGE"
  | "VOICE_NOTE"
  | "CONTRACT_OFFER"
  | "LOCATION"
  | "CALENDAR_INVITE";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "COUPLE" | "VENDOR" | "WEDY_AI" | "SUPPORT";
  type: MessageType;
  content: string;
  mediaUrl?: string;
  attachmentData?: any;
  sentAt: Date;
  status: "PENDING" | "DELIVERED" | "READ";
  replyToMessageId?: string;
  reactions?: { emoji: string; count: number }[];
}

export interface ConversationThread {
  id: string;
  title: string;
  subtitle: string;
  participantRoles: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  avatarUrl?: string;
  category: "VENDOR" | "SUPPORT" | "WEDY_AI" | "GROUP";
}

export class MobileMessagingEngine {
  private static STORAGE_KEY = "WEDYPLAN_CHAT_THREADS_V1";

  /**
   * Aktif mesajlaşma konuşmalarını getirir.
   */
  public static async getConversations(): Promise<ConversationThread[]> {
    return [
      {
        id: "thread_1",
        title: "Çırağan Palace Kempinski",
        subtitle: "Tedarikçi Ekibi & Organizasyon",
        participantRoles: ["COUPLE", "VENDOR"],
        unreadCount: 2,
        isPinned: true,
        category: "VENDOR",
        lastMessage: {
          id: "m_1",
          conversationId: "thread_1",
          senderId: "v_1",
          senderName: "Aylin Beyaz (Çırağan)",
          senderRole: "VENDOR",
          type: "CONTRACT_OFFER",
          content: "Düğün Organizasyon Sözleşmesi Revize Edildi (₺150.000 TL)",
          sentAt: new Date(),
          status: "DELIVERED",
          attachmentData: { contractId: "contract_demo_101", amount: "₺150.000 TL" },
        },
      },
      {
        id: "thread_2",
        title: "WedyAI Düğün Asistanı",
        subtitle: "Yapay Zeka Otomatik Yanıtlayıcı",
        participantRoles: ["COUPLE", "WEDY_AI"],
        unreadCount: 0,
        isPinned: true,
        category: "WEDY_AI",
        lastMessage: {
          id: "m_2",
          conversationId: "thread_2",
          senderId: "ai_bot",
          senderName: "WedyAI",
          senderRole: "WEDY_AI",
          type: "TEXT",
          content: "Bütçenizde %8 tasarruf sağlayacak 2 alternatif orkestra bulundu.",
          sentAt: new Date(Date.now() - 3600000),
          status: "READ",
        },
      },
    ];
  }

  /**
   * AI Smart Replies & Otomatik Çeviri Üretici
   */
  public static generateAiSmartReplies(lastMessageContent: string): string[] {
    if (lastMessageContent.includes("Sözleşme") || lastMessageContent.includes("₺")) {
      return ["Sözleşmeyi İncele & E-İmza At", "Kaporayı Escrow'a Aktar", "Tarih Değişikliği Talep Et"];
    }
    return ["Detaylı bilgi alabilir miyim?", "Teklifi onaylıyorum.", "WedyAI ile bütçemi kontrol et."];
  }

  /**
   * Mesaj Gönder ve Çevrimdışı Kuyruğa Al
   */
  public static async sendMessage(conversationId: string, message: Partial<ChatMessage>): Promise<ChatMessage> {
    const newMsg: ChatMessage = {
      id: `msg_${Math.random().toString(36).substring(2, 9)}`,
      conversationId,
      senderId: "user_current",
      senderName: "Sena & Kaan",
      senderRole: "COUPLE",
      type: message.type || "TEXT",
      content: message.content || "",
      attachmentData: message.attachmentData,
      sentAt: new Date(),
      status: navigator.onLine ? "DELIVERED" : "PENDING",
    };

    return newMsg;
  }
}