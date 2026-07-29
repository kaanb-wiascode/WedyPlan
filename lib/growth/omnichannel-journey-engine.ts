export type OmnichannelChannel =
  | "WEBSITE"
  | "MOBILE_APP"
  | "EMAIL"
  | "SMS"
  | "PUSH"
  | "WHATSAPP"
  | "CALL_CENTER";

export type JourneyLifecycleStage =
  | "DISCOVERY"
  | "REGISTRATION"
  | "PLANNING"
  | "BOOKING"
  | "PAYMENT"
  | "WEDDING_DAY"
  | "POST_WEDDING";

export interface JourneyTouchpointNode {
  id: string;
  stage: JourneyLifecycleStage;
  channel: OmnichannelChannel;
  touchpointTitle: string;
  actionSummary: string;
  conversionDropoffPercent: number;
  aiOptimizationTip: string;
}

export interface UserOmnichannelJourney {
  id: string;
  userIdRef: string;
  coupleNames: string;
  currentStage: JourneyLifecycleStage;
  activeChannel: OmnichannelChannel;
  touchpointsHistory: JourneyTouchpointNode[];
  aiNextChannelTrigger: OmnichannelChannel;
  aiPredictedConversionVelocityScore: number; // 0-100
  isEscrowActive: boolean;
  weddingDate: Date;
}

export class OmnichannelJourneyEngine {
  private static STORAGE_KEY = "WEDYPLAN_JOURNEYS_VAULT_V1";

  /**
   * Aktif B2C & B2B Çok Kanallı Müşteri Yolculuklarını Getirir
   */
  public static async getActiveJourneys(): Promise<UserOmnichannelJourney[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "jrn_101",
        userIdRef: "usr_kaan_sena",
        coupleNames: "Sena & Kaan B.",
        currentStage: "PAYMENT",
        activeChannel: "WHATSAPP",
        isEscrowActive: true,
        weddingDate: new Date("2026-09-12"),
        aiNextChannelTrigger: "PUSH",
        aiPredictedConversionVelocityScore: 98,
        touchpointsHistory: [
          {
            id: "tp_1",
            stage: "DISCOVERY",
            channel: "WEBSITE",
            touchpointTitle: "Çırağan Palace Mekan Sayfası İncelemesi",
            actionSummary: "Çift web sitesi üzerinden 3.5 dakika mekan galerisini inceledi.",
            conversionDropoffPercent: 12,
            aiOptimizationTip: "Mekan detayında WedyAI Bütçe Hesaplayıcı kartı öne çıkarıldı.",
          },
          {
            id: "tp_2",
            stage: "PLANNING",
            channel: "MOBILE_APP",
            touchpointTitle: "WedyAI Sesli Asistan İle Bütçe Şablonu Oluşturma",
            actionSummary: "iOS uygulaması üzerinden ₺250.000 TL bütçe hedefi tanımlandı.",
            conversionDropoffPercent: 6,
            aiOptimizationTip: "Anlık Push Bildirimi ile e-imzalı sözleşme taslağı iletildi.",
          },
          {
            id: "tp_3",
            stage: "PAYMENT",
            channel: "WHATSAPP",
            touchpointTitle: "Escrow Kapora Güvence Teklifi Ve Onayı",
            actionSummary: "WhatsApp Bot üzerinden ₺1.000 TL indirimli Escrow linki iletildi.",
            conversionDropoffPercent: 2,
            aiOptimizationTip: "Apple Pay ile anında ödeme adımı aktif edildi.",
          },
        ],
      },
      {
        id: "jrn_102",
        userIdRef: "usr_merve_alper",
        coupleNames: "Merve & Alper K.",
        currentStage: "PLANNING",
        activeChannel: "CALL_CENTER",
        isEscrowActive: false,
        weddingDate: new Date("2026-10-05"),
        aiNextChannelTrigger: "EMAIL",
        aiPredictedConversionVelocityScore: 84,
        touchpointsHistory: [
          {
            id: "tp_10",
            stage: "DISCOVERY",
            channel: "MOBILE_APP",
            touchpointTitle: "Bodrum Kır Düğünü Mekan Araması",
            actionSummary: "Uygulamadan 4 farklı kır düğün mekanı favorilendi.",
            conversionDropoffPercent: 18,
            aiOptimizationTip: "VIP Çağrı Merkezi temsilcisi otomatik arama görevi ile atandı.",
          },
        ],
      },
    ];
  }

  /**
   * WedyAI Yolculuk Tahmini ve Kanal Tetikleyici Motoru
   */
  public static predictOptimalChannel(journey: UserOmnichannelJourney): {
    recommendedChannel: OmnichannelChannel;
    triggerMessage: string;
    velocityBoostPercent: number;
  } {
    if (journey.currentStage === "PAYMENT") {
      return {
        recommendedChannel: "WHATSAPP",
        triggerMessage: "Escrow kapora ödemenizi Apple Pay veya Kredi Kartı ile tek tıkla tamamlayın.",
        velocityBoostPercent: 34,
      };
    }

    return {
      recommendedChannel: "PUSH",
      triggerMessage: "WedyAI düğün takviminiz için 3 yeni mekan teklifini hazırladı!",
      velocityBoostPercent: 22,
    };
  }
}