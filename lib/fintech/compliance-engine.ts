export type PolicyCategory = "DATA_RETENTION" | "APPROVAL_WORKFLOW" | "TAX_CONFIG" | "REGIONAL_COMPLIANCE";
export type PolicyStatus = "ACTIVE_ENFORCED" | "DRAFT_PROPOSED" | "DEPRECATED";

export interface FinancialPolicyRule {
  id: string;
  policyName: string;
  category: PolicyCategory;
  regionScope: string; // e.g. "TR_LOCAL", "EU_GDPR_PSD2", "US_FATCA"
  status: PolicyStatus;
  minimumApprovalHierarchyLevel: number;
  retentionPeriodYears: number; // e.g. 7 years for tax audit trail
  isConfigurable: boolean;
  description: string;
}

export interface GovernanceAuditLog {
  id: string;
  actorId: string;
  actorRole: string;
  actionTaken: string;
  targetDomain: string;
  regionalRuleApplied: string;
  auditHash: string;
  timestamp: Date;
}

export interface ComplianceReadinessSummary {
  overallComplianceScore: number; // 0-100
  activeAuditedRulesCount: number;
  dataRetentionRetentionYears: number;
  aiPolicyRecommendation: string;
  aiAuditInsightNote: string;
}

export class ComplianceEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINANCIAL_COMPLIANCE_V1";

  /**
   * Konfigüre Edilebilir Finansal Uyum Kurallarını Getirir
   */
  public static async getPolicies(): Promise<FinancialPolicyRule[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "pol_101",
        policyName: "7 Yıllık Resmi Defter ve e-Fatura Saklama Politikası",
        category: "DATA_RETENTION",
        regionScope: "TR_LOCAL",
        status: "ACTIVE_ENFORCED",
        minimumApprovalHierarchyLevel: 2,
        retentionPeriodYears: 7,
        isConfigurable: true,
        description: "Vergi usul kanunu uyumu gereği tüm e-fatura ve çift girişli kütükler 7 yıl boyunca değiştirilemez hiyerarşide saklanır.",
      },
      {
        id: "pol_102",
        policyName: "Çift Onaylı Yüksek Tutarlı Hakediş Onay Akışı",
        category: "APPROVAL_WORKFLOW",
        regionScope: "EU_GDPR_PSD2",
        status: "ACTIVE_ENFORCED",
        minimumApprovalHierarchyLevel: 3,
        retentionPeriodYears: 10,
        isConfigurable: true,
        description: "₺100.000 TL üzerindeki hakediş transferleri için CFO ve Finans Yöneticisi e-imza onayı zorunlu kılınmıştır.",
      },
      {
        id: "pol_103",
        policyName: "Bölgesel KDV / Stopaj Vergi Yapılandırması",
        category: "TAX_CONFIG",
        regionScope: "TR_LOCAL",
        status: "ACTIVE_ENFORCED",
        minimumApprovalHierarchyLevel: 1,
        retentionPeriodYears: 7,
        isConfigurable: true,
        description: "Türkiye pazaryeri işlemleri için %20 KDV kesinti ve beyanname yapılandırması.",
      },
    ];
  }

  /**
   * Finansal Yönetişim ve Denetim Kayıtlarını (Audit Logs) Getirir
   */
  public static async getAuditLogs(): Promise<GovernanceAuditLog[]> {
    return [
      {
        id: "aud_101",
        actorId: "usr_cfo_admin",
        actorRole: "CHIEF_FINANCIAL_OFFICER",
        actionTaken: "APPROVE_HIGH_VALUE_PAYOUT",
        targetDomain: "Vendor Payout Vault",
        regionalRuleApplied: "TR_LOCAL_VUK_7Y",
        auditHash: "0x8f4a2b9e1c3d7f6a",
        timestamp: new Date("2026-07-29T09:15:00"),
      },
      {
        id: "aud_102",
        actorId: "usr_compliance_officer",
        actorRole: "COMPLIANCE_DIRECTOR",
        actionTaken: "UPDATE_TAX_CONFIG_RULE",
        targetDomain: "Tax Reserve Engine",
        regionalRuleApplied: "EU_PSD2_CONFIG",
        auditHash: "0x3e7b1a9c4f8d2e5a",
        timestamp: new Date("2026-07-28T16:30:00"),
      },
    ];
  }

  /**
   * Finansal Uyum Özeti ve WedyAI Yönetişim Notlarını Getirir
   */
  public static async getSummary(): Promise<ComplianceReadinessSummary> {
    return {
      overallComplianceScore: 98,
      activeAuditedRulesCount: 14,
      dataRetentionRetentionYears: 7,
      aiPolicyRecommendation: "AB / PSD2 bölgesel genişleme hazırlığı için multi-jurisdiction vergi konfigürasyonu kural modülüne eklenebilir.",
      aiAuditInsightNote: "Tüm hakediş ve mutabakat kayıtları sıfır sapma ile 7 yıllık VUK saklama kütüğüne işlendi. Bağımsız denetim raporu hazır.",
    };
  }
}