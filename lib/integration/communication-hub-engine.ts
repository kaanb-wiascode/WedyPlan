export type CommunicationChannel = "EMAIL" | "SMS" | "PUSH" | "WHATSAPP" | "VOICE";
export type ProviderHealthStatus = "OPTIMAL" | "FAILOVER_ACTIVE" | "DEGRADED" | "OFFLINE";

export interface CommunicationProviderRecord {
  id: string;
  channel: CommunicationChannel;
  providerName: string; // e.g. "SendGrid Enterprise", "Twilio WhatsApp API"
  secondaryFallbackProviderName?: string;
  regionalRegion: string; // e.g. "Global", "Middle East (KSA/UAE)", "Europe (EU)"
  deliverySuccessRatePercent: number; // 0-100%
  averageLatencyMs: number;
  costPerMessageUsd: number;
  messagesSent24h: number;
  status: ProviderHealthStatus;
  aiOptimizationTip: string;
  lastPingAt: Date;
}

export interface CommunicationHubSummary {
  totalMessagesDelivered24h: number;
  overallDeliverySuccessRatePercent: number;
  activeCommunicationProvidersCount: number;
  monthlyCostSavedUsd: number;
  aiCommunicationInsightNote: string;
}

export class CommunicationHubEngine {
  private static STORAGE_KEY = "WEDYPLAN_COMMUNICATION_HUB_V1";

  /**
   * İletişim Kanal Sağlayıcı Kayıtlarını Getirir
   */
  public static async getProviders(): Promise<CommunicationProviderRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "comm_101",
        channel: "WHATSAPP",
        providerName: "Twilio WhatsApp Business API",
        secondaryFallbackProviderName: "Meta Cloud API direct",
        regionalRegion: "Middle East (KSA/UAE)",
        deliverySuccessRatePercent: 99.8,
        averageLatencyMs: 850,
        costPerMessageUsd: 0.012,
        messagesSent24h: 42000,
        status: "OPTIMAL",
        aiOptimizationTip: "Körfez bölgesindeki VIP çiftlere %99.8 başarı ile WhatsApp onayları ulaştırılıyor.",
        lastPingAt: new Date("2026-07-29T22:15:00"),
      },
      {
        id: "comm_102",
        channel: "EMAIL",
        providerName: "SendGrid Enterprise Pro",
        secondaryFallbackProviderName: "Amazon SES",
        regionalRegion: "Global",
        deliverySuccessRatePercent: 99.4,
        averageLatencyMs: 420,
        costPerMessageUsd: 0.0008,
        messagesSent24h: 184000,
        status: "OPTIMAL",
        aiOptimizationTip: "e-Fatura ve Escrow bildirim e-postalarında spama düşme oranı %0.02 seviyesindedir.",
        lastPingAt: new Date("2026-07-29T22:10:00"),
      },
      {
        id: "comm_103",
        channel: "SMS",
        providerName: "Netgsm / STC Telecom Gateway",
        secondaryFallbackProviderName: "Infobip SMS Gateway",
        regionalRegion: "Europe & Turkey",
        deliverySuccessRatePercent: 98.9,
        averageLatencyMs: 1200,
        costPerMessageUsd: 0.008,
        messagesSent24h: 68000,
        status: "OPTIMAL",
        aiOptimizationTip: "OTP ve Güvenlik SMS'lerinde yerel operatör yönlendirmesi Maliyeti %18 düşürdü.",
        lastPingAt: new Date("2026-07-29T21:55:00"),
      },
      {
        id: "comm_104",
        channel: "PUSH",
        providerName: "Firebase Cloud Messaging (FCM)",
        secondaryFallbackProviderName: "Apple APNs Direct",
        regionalRegion: "Global Mobile",
        deliverySuccessRatePercent: 99.9,
        averageLatencyMs: 140,
        costPerMessageUsd: 0.0,
        messagesSent24h: 310000,
        status: "OPTIMAL",
        aiOptimizationTip: "iOS ve Android anlık bildirimlerde %99.9 teslimat skoru yakalandı.",
        lastPingAt: new Date("2026-07-29T22:00:00"),
      },
    ];
  }

  /**
   * İletişim Hub Özetini Getirir
   */
  public static async getSummary(): Promise<CommunicationHubSummary> {
    return {
      totalMessagesDelivered24h: 604000,
      overallDeliverySuccessRatePercent: 99.5,
      activeCommunicationProvidersCount: 4,
      monthlyCostSavedUsd: 1840,
      aiCommunicationInsightNote: "WedyAI Akıllı Rotalama Motoru 604K günlük iletiyi %99.5 başarı oranıyla ulaştırmış ve dinamik sağlayıcı değişimiyle aylık $1,840 tasarruf elde etmiştir.",
    };
  }

  /**
   * Sağlayıcı Failover Rotalama Testini Tetikleme Simülasyonu
   */
  public static async triggerProviderTest(providerId: string): Promise<boolean> {
    const providers = await this.getProviders();
    const idx = providers.findIndex((p) => p.id === providerId);

    if (idx !== -1) {
      providers[idx].lastPingAt = new Date();
      providers[idx].deliverySuccessRatePercent = 99.9;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(providers));
      }
      return true;
    }
    return false;
  }
}