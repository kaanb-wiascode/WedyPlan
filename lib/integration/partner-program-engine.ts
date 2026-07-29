export type PartnerType =
  | "TECHNOLOGY"
  | "IMPLEMENTATION"
  | "CONSULTING"
  | "MARKETPLACE"
  | "STRATEGIC";

export type PartnerCertificationTier = "GOLD_CERTIFIED" | "SILVER_CERTIFIED" | "SANDBOX_VERIFIED" | "PENDING_AUDIT";

export interface EnterprisePartnerRecord {
  id: string;
  partnerName: string; // e.g. "Oracle Hospitality Systems", "Salesforce EMEA"
  type: PartnerType;
  certificationTier: PartnerCertificationTier;
  sandboxAccessActive: boolean;
  activeCredentialsCount: number;
  partnerHealthScorePercent: number; // 0-100% (Calculated by AI)
  integrationQualityRating: number; // 1.0 - 5.0
  activeSlaSuccessRatePercent: number;
  aiQualityAnalysisTip: string;
  certifiedAt: Date;
}

export interface PartnerProgramSummary {
  totalRegisteredPartnersCount: number;
  certifiedPartnersCount: number;
  averagePartnerHealthScorePercent: number;
  activeSandboxEnvironmentsCount: number;
  aiPartnerInsightNote: string;
}

export class PartnerProgramEngine {
  private static STORAGE_KEY = "WEDYPLAN_PARTNER_PROGRAM_V1";

  /**
   * Kurumsal Partner Kayıtlarını Getirir
   */
  public static async getPartners(): Promise<EnterprisePartnerRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "part_101",
        partnerName: "Oracle Hospitality Systems (Opera PMS)",
        type: "STRATEGIC",
        certificationTier: "GOLD_CERTIFIED",
        sandboxAccessActive: true,
        activeCredentialsCount: 4,
        partnerHealthScorePercent: 99.8,
        integrationQualityRating: 5.0,
        activeSlaSuccessRatePercent: 99.9,
        aiQualityAnalysisTip: "Opera PMS entegrasyonu 24ms gecikme ve %99.9 SLA uyum oranı ile Gold Tier standartlarındadır.",
        certifiedAt: new Date("2026-07-29T22:15:00"),
      },
      {
        id: "part_102",
        partnerName: "Salesforce EMEA Integration Services",
        type: "TECHNOLOGY",
        certificationTier: "GOLD_CERTIFIED",
        sandboxAccessActive: true,
        activeCredentialsCount: 6,
        partnerHealthScorePercent: 99.4,
        integrationQualityRating: 4.9,
        activeSlaSuccessRatePercent: 99.6,
        aiQualityAnalysisTip: "Çift yönlü CRM senkronizasyonu %99.4 kalite skoruyla mükerrersiz çalışıyor.",
        certifiedAt: new Date("2026-07-29T21:40:00"),
      },
      {
        id: "part_103",
        partnerName: "Körfez Luxury Wedding Consulting",
        type: "CONSULTING",
        certificationTier: "SILVER_CERTIFIED",
        sandboxAccessActive: true,
        activeCredentialsCount: 2,
        partnerHealthScorePercent: 97.5,
        integrationQualityRating: 4.7,
        activeSlaSuccessRatePercent: 98.8,
        aiQualityAnalysisTip: "Sertifikasyon süreci tamamlandı. Sandbox izolasyon testi %100 başarılı.",
        certifiedAt: new Date("2026-07-29T20:10:00"),
      },
    ];
  }

  /**
   * Partner Program Özetini Getirir
   */
  public static async getSummary(): Promise<PartnerProgramSummary> {
    return {
      totalRegisteredPartnersCount: 18,
      certifiedPartnersCount: 16,
      averagePartnerHealthScorePercent: 98.9,
      activeSandboxEnvironmentsCount: 18,
      aiPartnerInsightNote: "WedyAI Kalite Analizcisi 18 kurumsal partnerin API uyumunu izleyerek %98.9 ortalama sağlık skoru ve %99.8 SLA garantisi doğrulamıştır.",
    };
  }

  /**
   * Partner Sertifikasyonu Yenileme Simülasyonu
   */
  public static async reVerifyPartner(partnerId: string): Promise<boolean> {
    const partners = await this.getPartners();
    const idx = partners.findIndex((p) => p.id === partnerId);

    if (idx !== -1) {
      partners[idx].certificationTier = "GOLD_CERTIFIED";
      partners[idx].partnerHealthScorePercent = 99.9;
      partners[idx].certifiedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(partners));
      }
      return true;
    }
    return false;
  }
}