export type JurisdictionFramework = "KVKK_TR" | "EU_GDPR" | "UAE_PDPL" | "US_CCPA";
export type ComplianceCategory = "PRIVACY" | "CONSUMER_RIGHTS" | "ELECTRONIC_COMMUNICATIONS" | "DATA_RETENTION";

export interface RegionalPolicyRecord {
  id: string;
  policyTitle: string;
  framework: JurisdictionFramework;
  category: ComplianceCategory;
  countryCode: string;
  retentionPeriodMonths: number;
  isConsentMandatory: boolean;
  version: string;
  aiPolicyGapRiskPercent: number; // 0-100%
  aiPolicyRecommendationTip: string;
  isActive: boolean;
  updatedAt: Date;
}

export interface ComplianceAuditLogItem {
  id: string;
  userRef: string;
  actionTaken: string;
  framework: JurisdictionFramework;
  ipAddress: string;
  timestamp: Date;
}

export interface ComplianceSummaryStats {
  configuredPoliciesCount: number;
  activeFrameworksCount: number;
  aiComplianceHealthScorePercent: number;
  aiComplianceInsightNote: string;
}

export class ComplianceEngine {
  private static STORAGE_KEY = "WEDYPLAN_GLOBAL_COMPLIANCE_POLICIES_V1";

  /**
   * Tanımlı Bölgesel Yasal Politikaları Getirir
   */
  public static async getPolicies(): Promise<RegionalPolicyRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "pol_101",
        policyTitle: "KVKK Aydınlatma Metni & Veri İşleme Politikası",
        framework: "KVKK_TR",
        category: "PRIVACY",
        countryCode: "TR",
        retentionPeriodMonths: 120, // 10 Yıl VUK Saklama
        isConsentMandatory: true,
        version: "v2026.1",
        aiPolicyGapRiskPercent: 1,
        aiPolicyRecommendationTip: "6698 Sayılı KVKK uyarınca açık rıza ve veri envanteri kaydı %100 günceldir.",
        isActive: true,
        updatedAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "pol_102",
        policyTitle: "EU GDPR Data Subject Rights & Cookie Consent",
        framework: "EU_GDPR",
        category: "PRIVACY",
        countryCode: "DE",
        retentionPeriodMonths: 36,
        isConsentMandatory: true,
        version: "v2026.2",
        aiPolicyGapRiskPercent: 2,
        aiPolicyRecommendationTip: "AB GDPR Madde 17 'Unutulma Hakkı (Right to Erasure)' otonom 30 günlük süreç olarak entegre edildi.",
        isActive: true,
        updatedAt: new Date("2026-07-28T14:00:00"),
      },
      {
        id: "pol_103",
        policyTitle: "UAE Personal Data Protection Law (PDPL) Guidelines",
        framework: "UAE_PDPL",
        category: "PRIVACY",
        countryCode: "AE",
        retentionPeriodMonths: 60,
        isConsentMandatory: true,
        version: "v2026.1",
        aiPolicyGapRiskPercent: 3,
        aiPolicyRecommendationTip: "BAE PDPL mevzuatına uygun olarak veri sınır ötesi aktarım onay mekanizması aktifleştirildi.",
        isActive: true,
        updatedAt: new Date("2026-07-27T11:30:00"),
      },
    ];
  }

  /**
   * Yasal Denetim Günlüklerini Getirir
   */
  public static async getAuditLogs(): Promise<ComplianceAuditLogItem[]> {
    return [
      {
        id: "log_101",
        userRef: "Sena & Kaan B.",
        actionTaken: "KVKK Açık Rıza ve İletişim İzni Verildi",
        framework: "KVKK_TR",
        ipAddress: "176.234.12.89",
        timestamp: new Date("2026-07-29T10:15:00"),
      },
      {
        id: "log_102",
        userRef: "Hans Schmidt",
        actionTaken: "GDPR Marketing Opt-Out Onaylandı",
        framework: "EU_GDPR",
        ipAddress: "84.112.45.12",
        timestamp: new Date("2026-07-28T16:20:00"),
      },
    ];
  }

  /**
   * Yasal Uyum Özetini Getirir
   */
  public static async getComplianceSummary(): Promise<ComplianceSummaryStats> {
    return {
      configuredPoliciesCount: 12,
      activeFrameworksCount: 4, // KVKK, GDPR, UAE PDPL, US CCPA
      aiComplianceHealthScorePercent: 99.2,
      aiComplianceInsightNote: "Tüm bölgesel politikalarda açık rıza metinleri ve veritabanı silme/anonimleştirme görevleri %99.2 uyumla çalışmaktadır.",
    };
  }

  /**
   * Politika Durumunu Aktif/Pasif Yapar
   */
  public static async togglePolicy(policyId: string): Promise<boolean> {
    const policies = await this.getPolicies();
    const idx = policies.findIndex((p) => p.id === policyId);

    if (idx !== -1) {
      policies[idx].isActive = !policies[idx].isActive;
      policies[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(policies));
      }
      return true;
    }
    return false;
  }
}