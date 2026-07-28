export type PartnerType = "INFLUENCER" | "BLOGGER" | "WEDDING_PLANNER" | "AGENCY" | "MEDIA_OUTLET";
export type CommissionTier = "STANDARD_10" | "PREMIUM_15" | "VIP_20" | "DYNAMIC_AI";

export interface AffiliatePartner {
  id: string;
  partnerName: string;
  partnerType: PartnerType;
  trackingCode: string;
  commissionTier: CommissionTier;
  commissionRatePercent: number;
  totalClicks: number;
  totalConversions: number;
  conversionRatePercent: number;
  generatedGmvAmount: number;
  unpaidEarningsAmount: number;
  currency: string;
  aiPartnerScore: number; // 0-100
  aiFraudRiskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export interface AffiliateMetricsOverview {
  activePartnersCount: number;
  totalAttributedGmv: number;
  totalCommissionsPaid: number;
  averageConversionRatePercent: number;
  aiCommissionOptimizationTip: string;
}

export class AffiliateEngine {
  private static STORAGE_KEY = "WEDYPLAN_AFFILIATE_PARTNERS_V1";

  /**
   * Aktif Ortaklık Partnerlerini ve Performans Metriklerini Getirir
   */
  public static async getPartners(): Promise<AffiliatePartner[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "aff_p_101",
        partnerName: "Selin Yılmaz (Wedding Blogger)",
        partnerType: "BLOGGER",
        trackingCode: "AFF-SELINGELIN",
        commissionTier: "PREMIUM_15",
        commissionRatePercent: 15,
        totalClicks: 8420,
        totalConversions: 312,
        conversionRatePercent: 3.7,
        generatedGmvAmount: 620000,
        unpaidEarningsAmount: 18500,
        currency: "TRY",
        aiPartnerScore: 96,
        aiFraudRiskLevel: "LOW",
      },
      {
        id: "aff_p_102",
        partnerName: "Lüks Düğün Ajansı (Istanbul)",
        partnerType: "AGENCY",
        trackingCode: "AFF-LUKSPLAN",
        commissionTier: "VIP_20",
        commissionRatePercent: 20,
        totalClicks: 1240,
        totalConversions: 84,
        conversionRatePercent: 6.7,
        generatedGmvAmount: 1250000,
        unpaidEarningsAmount: 42000,
        currency: "TRY",
        aiPartnerScore: 98,
        aiFraudRiskLevel: "LOW",
      },
    ];
  }

  /**
   * Genel Affiliate Ekosistemi Metriklerini Hesaplar
   */
  public static async getMetricsOverview(): Promise<AffiliateMetricsOverview> {
    return {
      activePartnersCount: 42,
      totalAttributedGmv: 1870000,
      totalCommissionsPaid: 148500,
      averageConversionRatePercent: 4.8,
      aiCommissionOptimizationTip:
        "Ege bölgesi lüks otel sözleşmelerinde komisyon oranını %15'ten %18'e yükseltmek dönüşüm hacmini %32 artıracaktır.",
    };
  }

  /**
   * Yeni Affiliate Partneri Kaydeder
   */
  public static createPartner(
    partnerName: string,
    partnerType: PartnerType,
    customCode?: string
  ): AffiliatePartner {
    const code = customCode || `AFF-${partnerName.slice(0, 4).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

    const newPartner: AffiliatePartner = {
      id: `aff_${Math.random().toString(36).substring(2, 9)}`,
      partnerName,
      partnerType,
      trackingCode: code,
      commissionTier: "STANDARD_10",
      commissionRatePercent: 10,
      totalClicks: 0,
      totalConversions: 0,
      conversionRatePercent: 0,
      generatedGmvAmount: 0,
      unpaidEarningsAmount: 0,
      currency: "TRY",
      aiPartnerScore: 85,
      aiFraudRiskLevel: "LOW",
    };

    if (typeof window !== "undefined") {
      this.getPartners().then((partners) => {
        partners.unshift(newPartner);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(partners));
      });
    }

    return newPartner;
  }
}