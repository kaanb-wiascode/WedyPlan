export type CampaignChannel = "EMAIL" | "SMS" | "PUSH" | "WHATSAPP" | "PROMO_CODE" | "SOCIAL_ADS";
export type CampaignStatus = "DRAFT" | "SCHEDULED" | "RUNNING" | "COMPLETED" | "PAUSED";

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  targetSegment: string;
  audienceCount: number;
  promoCode?: string;
  discountValue?: string;
  openRatePercent?: number;
  clickRatePercent?: number;
  conversionRatePercent?: number;
  attributedGmv: number;
  currency: string;
  aiBestSendTime?: string;
  aiAudiencePredictionScore?: number; // 0-100
  scheduledFor?: Date;
}

export interface CampaignMetricsOverview {
  activeCampaignsCount: number;
  totalReachAudience: number;
  averageConversionRatePercent: number;
  totalCampaignAttributedGmv: number;
  currency: string;
  aiOptimizationTip: string;
}

export class CampaignEngine {
  private static STORAGE_KEY = "WEDYPLAN_CAMPAIGNS_V1";

  /**
   * Aktif ve Geçmiş Pazarlama Kampanyalarını Getirir
   */
  public static async getCampaigns(): Promise<MarketingCampaign[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "camp_101",
        name: "Yaz Düğünleri Escrow Kapora İndirimi",
        channel: "WHATSAPP",
        status: "RUNNING",
        targetSegment: "Sözleşme Aşamasındaki Çiftler",
        audienceCount: 1240,
        promoCode: "SUMMER2026",
        discountValue: "₺1.000 TL Escrow İndirimi",
        openRatePercent: 88.4,
        clickRatePercent: 42.1,
        conversionRatePercent: 18.2,
        attributedGmv: 420000,
        currency: "TRY",
        aiBestSendTime: "Çarşamba 20:30 (En Yüksek Dönüşüm)",
        aiAudiencePredictionScore: 94,
      },
      {
        id: "camp_102",
        name: "Bodrum Kır Düğünü Fırsat Bülteni",
        channel: "EMAIL",
        status: "SCHEDULED",
        targetSegment: "Ege Bölgesi Aratması Yapanlar",
        audienceCount: 3800,
        promoCode: "BODRUMVIP",
        discountValue: "%10 Erken Rezervasyon",
        attributedGmv: 0,
        currency: "TRY",
        aiBestSendTime: "Perşembe 11:00",
        aiAudiencePredictionScore: 88,
        scheduledFor: new Date("2026-08-05"),
      },
      {
        id: "camp_103",
        name: "Yeniden Hedefleme - Tamamlanmamış Randevular",
        channel: "PUSH",
        status: "RUNNING",
        targetSegment: "Sepette Kalan Rezervasyonlar",
        audienceCount: 620,
        openRatePercent: 64.2,
        clickRatePercent: 28.6,
        conversionRatePercent: 12.4,
        attributedGmv: 185000,
        currency: "TRY",
        aiBestSendTime: "Anlık Push (Ayrıldıktan 2 Saat Sonra)",
        aiAudiencePredictionScore: 91,
      },
    ];
  }

  /**
   * Kampanya Performans Genel Bakış Metriklerini Getirir
   */
  public static async getMetricsOverview(): Promise<CampaignMetricsOverview> {
    return {
      activeCampaignsCount: 6,
      totalReachAudience: 18450,
      averageConversionRatePercent: 16.4,
      totalCampaignAttributedGmv: 1280000,
      currency: "TRY",
      aiOptimizationTip:
        "WhatsApp kanalındaki mesaj dönüşümleri Email'e kıyasla 2.8 kat daha yüksek. Bütçeyi WhatsApp hatlarına kaydırmak dönüşümü artıracaktır.",
    };
  }

  /**
   * Yeni Pazarlama Kampanyası / Promo Kod Oluşturur
   */
  public static createCampaign(
    name: string,
    channel: CampaignChannel,
    targetSegment: string,
    promoCode?: string,
    discountValue?: string
  ): MarketingCampaign {
    const newCamp: MarketingCampaign = {
      id: `camp_${Math.random().toString(36).substring(2, 9)}`,
      name,
      channel,
      status: "RUNNING",
      targetSegment,
      audienceCount: Math.floor(500 + Math.random() * 2000),
      promoCode,
      discountValue,
      openRatePercent: 0,
      clickRatePercent: 0,
      conversionRatePercent: 0,
      attributedGmv: 0,
      currency: "TRY",
      aiBestSendTime: "WedyAI Tahminleme Aktif",
      aiAudiencePredictionScore: 90,
    };

    if (typeof window !== "undefined") {
      this.getCampaigns().then((campaigns) => {
        campaigns.unshift(newCamp);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(campaigns));
      });
    }

    return newCamp;
  }
}