export type PartnerIndustry =
  | "HOTEL_CHAIN"
  | "COMMERCIAL_BANK"
  | "INSURANCE_PROVIDER"
  | "TRAVEL_AGENCY"
  | "LUXURY_BRAND"
  | "MEDIA_NETWORK";

export type PartnershipStatus = "ACTIVE" | "PENDING_CONTRACT" | "IN_NEGOTIATION" | "EXPIRED";

export interface StrategicPartner {
  id: string;
  partnerName: string;
  industry: PartnerIndustry;
  status: PartnershipStatus;
  contractTitle: string;
  revenueSharePercent: number; // e.g. 12%
  attributedGmvTotal: number;
  partnerEarningsTotal: number;
  currency: string;
  aiPartnerScore: number; // 0-100
  aiOpportunityAlert: string;
  activePromotionsCount: number;
  contractEndDate: Date;
}

export interface PartnershipForecast {
  activeStrategicPartnersCount: number;
  totalAttributedGmv: number;
  projectedAnnualRevenueShare: number;
  currency: string;
  aiGrowthRecommendation: string;
}

export class PartnershipEngine {
  private static STORAGE_KEY = "WEDYPLAN_PARTNERSHIPS_VAULT_V1";

  /**
   * Aktif Stratejik Kurumsal Partnerleri Getirir
   */
  public static async getPartners(): Promise<StrategicPartner[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "part_101",
        partnerName: "Kempinski Hotels & Resorts",
        industry: "HOTEL_CHAIN",
        status: "ACTIVE",
        contractTitle: "Global Lüks Düğün & Balayı Konaklama Anlaşması",
        revenueSharePercent: 12,
        attributedGmvTotal: 4850000,
        partnerEarningsTotal: 582000,
        currency: "TRY",
        aiPartnerScore: 98,
        aiOpportunityAlert: "Balayı paketlerine 'WedyPlan Escrow Güvencesi' eklemek rezervasyon dönüşümünü %28 artırabilir.",
        activePromotionsCount: 4,
        contractEndDate: new Date("2027-12-31"),
      },
      {
        id: "part_102",
        partnerName: "Garanti BBVA Düğün Kredisi",
        industry: "COMMERCIAL_BANK",
        status: "ACTIVE",
        contractTitle: "Anında Düğün Finansmanı & Taksit Entegrasyonu",
        revenueSharePercent: 8,
        attributedGmvTotal: 8200000,
        partnerEarningsTotal: 656000,
        currency: "TRY",
        aiPartnerScore: 96,
        aiOpportunityAlert: "Düğün kredisi onaylanan çiftlere ₺1.000 TL Escrow kapora indirimi tanımlayın.",
        activePromotionsCount: 2,
        contractEndDate: new Date("2026-11-30"),
      },
      {
        id: "part_103",
        partnerName: "Anadolu Sigorta",
        industry: "INSURANCE_PROVIDER",
        status: "ACTIVE",
        contractTitle: "Etkinlik İptal & Düğün Güvence Sigortası",
        revenueSharePercent: 15,
        attributedGmvTotal: 1420000,
        partnerEarningsTotal: 213000,
        currency: "TRY",
        aiPartnerScore: 91,
        aiOpportunityAlert: "Açık hava düğünü tutan çiftlere otomatik 'Hava Şartları Sigortası' paketi sunun.",
        activePromotionsCount: 1,
        contractEndDate: new Date("2026-10-15"),
      },
    ];
  }

  /**
   * Stratejik Ortaklık Gelir Tahminini Getirir
   */
  public static async getForecast(): Promise<PartnershipForecast> {
    return {
      activeStrategicPartnersCount: 12,
      totalAttributedGmv: 14470000,
      projectedAnnualRevenueShare: 1850000,
      currency: "TRY",
      aiGrowthRecommendation: "Bankacılık ve Sigorta entegrasyonlarındaki yüksek margin artışı sayesinde partnerlik GMV katkısı geçen yıla göre 2.4 kat arttı.",
    };
  }

  /**
   * Yeni Stratejik Kurumsal Partner Ekler
   */
  public static async createPartner(
    partnerName: string,
    industry: PartnerIndustry,
    contractTitle: string,
    revenueSharePercent: number
  ): Promise<StrategicPartner> {
    const newPartner: StrategicPartner = {
      id: `part_${Math.random().toString(36).substring(2, 9)}`,
      partnerName,
      industry,
      status: "ACTIVE",
      contractTitle,
      revenueSharePercent,
      attributedGmvTotal: 0,
      partnerEarningsTotal: 0,
      currency: "TRY",
      aiPartnerScore: 88,
      aiOpportunityAlert: "Yeni partnerlik için ilk 30 gün özel lansman promosyonu aktif edilebilir.",
      activePromotionsCount: 1,
      contractEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };

    const current = await this.getPartners();
    current.unshift(newPartner);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
    }

    return newPartner;
  }
}