export type AgentType = "CONCIERGE" | "VENDOR_OPS" | "FINANCE_ESCROW" | "COMPLIANCE";
export type AgentStatus = "IDLE" | "THINKING" | "EXECUTING_ACTION" | "AWAITING_USER_APPROVAL";

export interface AgentRecord {
  id: string;
  type: AgentType;
  name: string;
  domainFocus: string;
  status: AgentStatus;
  currentTaskDescription?: string;
  memoryItemsCount: number;
  lastActiveAt: Date;
}

export interface InterAgentMessage {
  id: string;
  senderAgentType: AgentType;
  receiverAgentType: AgentType;
  intent: string;
  payloadSummary: string;
  timestamp: Date;
}

export interface AiPlatformSummary {
  registeredAgentsCount: number;
  activeMemoryEmbeddingsCount: number;
  automatedTasksExecuted24h: number;
  aiPlatformHealthPercent: number;
  aiSystemInsightNote: string;
}

export class AiAgentEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_NATIVE_AGENTS_V1";

  /**
   * Otonom AI Ajan Listesini Getirir
   */
  public static async getAgents(): Promise<AgentRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ag_concierge",
        type: "CONCIERGE",
        name: "WedyAI Concierge Agent",
        domainFocus: "Çift Danışmanlığı, Bütçe & Konsept Planlama",
        status: "IDLE",
        currentTaskDescription: "Hazır: Çift sorularını ve destinasyon tercihlerini bekliyor.",
        memoryItemsCount: 1420,
        lastActiveAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "ag_vendor_ops",
        type: "VENDOR_OPS",
        name: "Vendor Operations Agent",
        domainFocus: "Tedarikçi Takvim Senkronizasyonu & Teklif Oluşturma",
        status: "THINKING",
        currentTaskDescription: "Boğaz mekanları için 2027 Q2 müsaitlik analizi yapılıyor...",
        memoryItemsCount: 3840,
        lastActiveAt: new Date("2026-07-29T20:45:00"),
      },
      {
        id: "ag_finance",
        type: "FINANCE_ESCROW",
        name: "Finance & Escrow Guard Agent",
        domainFocus: "Escrow Serbest Bırakma, Hakediş & Multi-Currency",
        status: "IDLE",
        currentTaskDescription: "Tüm Escrow kilitleme kuralları doğrulandı. İşlem bekleniyor.",
        memoryItemsCount: 940,
        lastActiveAt: new Date("2026-07-29T19:15:00"),
      },
      {
        id: "ag_compliance",
        type: "COMPLIANCE",
        name: "Global Compliance Agent",
        domainFocus: "KVKK, GDPR, UAE PDPL & Quiet Hours Denetimi",
        status: "IDLE",
        currentTaskDescription: "AB ve TR bölgesel yasal uyum denetleyicisi aktif.",
        memoryItemsCount: 510,
        lastActiveAt: new Date("2026-07-29T18:00:00"),
      },
    ];
  }

  /**
   * Ajanlar Arası İletişim Mesajlarını Getirir
   */
  public static async getInterAgentMessages(): Promise<InterAgentMessage[]> {
    return [
      {
        id: "iam_101",
        senderAgentType: "CONCIERGE",
        receiverAgentType: "VENDOR_OPS",
        intent: "REQUEST_VENUE_AVAILABILITY",
        payloadSummary: "Çırağan Palace için 15 Ağustos 2027 150 kişilik düğün müsaitliği istendi.",
        timestamp: new Date("2026-07-29T20:44:10"),
      },
      {
        id: "iam_102",
        senderAgentType: "VENDOR_OPS",
        receiverAgentType: "FINANCE_ESCROW",
        intent: "VERIFY_ESCROW_DEPOSIT_RULE",
        payloadSummary: "%20 Kapora Escrow kilitlenme kuralı TRY ve EUR kurları için teyit edildi.",
        timestamp: new Date("2026-07-29T20:42:00"),
      },
    ];
  }

  /**
   * AI Platform Özetini Getirir
   */
  public static async getPlatformSummary(): Promise<AiPlatformSummary> {
    return {
      registeredAgentsCount: 4,
      activeMemoryEmbeddingsCount: 6710,
      automatedTasksExecuted24h: 342,
      aiPlatformHealthPercent: 99.4,
      aiSystemInsightNote: "Çoklu-Ajan İletişim Otobüsü (Inter-Agent Bus) %99.4 doğruluk oranı ve ortalama 120ms tepki süresiyle çalışmaktadır.",
    };
  }

  /**
   * Ajan Görev Tetikleme Simülasyonu
   */
  public static async triggerAgentAction(agentId: string, actionDesc: string): Promise<boolean> {
    const agents = await this.getAgents();
    const idx = agents.findIndex((a) => a.id === agentId);

    if (idx !== -1) {
      agents[idx].status = "EXECUTING_ACTION";
      agents[idx].currentTaskDescription = actionDesc;
      agents[idx].lastActiveAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agents));
      }
      return true;
    }
    return false;
  }
}