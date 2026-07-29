export type PartnerCategoryType =
  | "REGIONAL_AGENCY"
  | "WEDDING_ASSOCIATION"
  | "TRAVEL_PARTNER"
  | "HOSPITALITY_PARTNER"
  | "TECH_PARTNER"
  | "MARKETING_PARTNER";

export interface InternationalPartnerRecord {
  id: string;
  partnerName: string;
  category: PartnerCategoryType;
  countryCode: string; // e.g. "TR", "DE", "AE", "US"
  tierName: "SILVER" | "GOLD" | "PLATINUM" | "GLOBAL_STRATEGIC";
  activeContractRef: string;
  commissionRevenueSharePercent: number;
  referredWeddingsCount: number;
  aiPartnerScorePercent: number; // 0-100%
  aiExpansionOpportunityTip: string;
  isActive: boolean;
  contractExpiresAt: Date;
}

export interface PartnerNetworkSummary {
  totalActivePartnersCount: number;
  coveredCountriesCount: number;
  totalPartnerReferredWeddingsCount: number;
  aiPartnerScoringHealthPercent: number;
  aiNetworkInsightNote: string;
}

export class InternationalPartnerEngine {
  private static STORAGE_KEY = "WEDYPLAN_INTERNATIONAL_PARTNERS_V1";

  /**
   * Uluslararası İş Ortaklığı Kayıtlarını Getirir
   */
  public static async getPartners(): Promise<InternationalPartnerRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "prtn_101",
        partnerName: "TÜRSAB Düğün & Destinasyon Turizmi Komitesi",
        category: "WEDDING_ASSOCIATION",
        countryCode: "TR",
        tierName: "GLOBAL_STRATEGIC",
        activeContractRef: "CNT_TURSAB_2026_V1",
        commissionRevenueSharePercent: 5.0,
        referredWeddingsCount: 180,
        aiPartnerScorePercent: 99,
        aiExpansionOpportunityTip: "Türkiye destinasyon düğünlerinde %38 yönlendirme hacmi sağlayan birincil stratejik birlik.",
        isActive: true,
        contractExpiresAt: new Date("2028-12-31"),
      },
      {
        id: "prtn_102",
        partnerName: "Lufthansa German Airlines & Destination Travel",
        category: "TRAVEL_PARTNER",
        countryCode: "DE",
        tierName: "PLATINUM",
        activeContractRef: "CNT_LH_TRAVEL_2026",
        commissionRevenueSharePercent: 8.0,
        referredWeddingsCount: 95,
        aiPartnerScorePercent: 96,
        aiExpansionOpportunityTip: "Almanya-Türkiye düğün uçuş gruplarında %24 indirimli paket entegrasyonu aktif.",
        isActive: true,
        contractExpiresAt: new Date("2027-06-30"),
      },
      {
        id: "prtn_103",
        partnerName: "Emirates Luxury Hospitality Group",
        category: "HOSPITALITY_PARTNER",
        countryCode: "AE",
        tierName: "PLATINUM",
        activeContractRef: "CNT_EMIRATES_HOSP_2026",
        commissionRevenueSharePercent: 10.0,
        referredWeddingsCount: 62,
        aiPartnerScorePercent: 97,
        aiExpansionOpportunityTip: "Dubai lüks balo salonu kiralama paketlerinde %10 yönlendirme komisyonu verimliliği.",
        isActive: true,
        contractExpiresAt: new Date("2027-12-31"),
      },
      {
        id: "prtn_104",
        partnerName: "US Destination Wedding Agency Network",
        category: "REGIONAL_AGENCY",
        countryCode: "US",
        tierName: "GOLD",
        activeContractRef: "CNT_US_AGENCIES_2026",
        commissionRevenueSharePercent: 12.0,
        referredWeddingsCount: 41,
        aiPartnerScorePercent: 92,
        aiExpansionOpportunityTip: "New York ve Miami kaynaklı Akdeniz düğün taleplerinde %45 büyüme potansiyeli.",
        isActive: true,
        contractExpiresAt: new Date("2026-12-31"),
      },
    ];
  }

  /**
   * İş Ortaklığı Ağı Özetini Getirir
   */
  public static async getPartnerSummary(): Promise<PartnerNetworkSummary> {
    return {
      totalActivePartnersCount: 42,
      coveredCountriesCount: 4,
      totalPartnerReferredWeddingsCount: 378,
      aiPartnerScoringHealthPercent: 96.8,
      aiNetworkInsightNote: "Almanya ve BAE seyahat/otel ortaklıkları sayesinde destinasyon düğün rezervasyon hacmi %32 artış gösterdi.",
    };
  }

  /**
   * İş Ortaklığı Durumunu Aktif/Pasif Yapar
   */
  public static async togglePartnerStatus(partnerId: string): Promise<boolean> {
    const partners = await this.getPartners();
    const idx = partners.findIndex((p) => p.id === partnerId);

    if (idx !== -1) {
      partners[idx].isActive = !partners[idx].isActive;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(partners));
      }
      return true;
    }
    return false;
  }
}