export type DataGovernancePillar =
  | "DATA_CATALOG"
  | "LINEAGE"
  | "OWNERSHIP"
  | "POLICIES"
  | "STEWARDSHIP"
  | "CLASSIFICATION";

export type DataSensitivityLevel = "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "RESTRICTED_PII";
export type GovernanceApprovalStatus = "APPROVED" | "PENDING_STEWARD" | "REJECTED";

export interface DataAssetGovernanceRecord {
  id: string;
  assetName: string; // e.g. "wedyplan_db.escrow_ledgers"
  pillar: DataGovernancePillar;
  ownerDataSteward: string; // e.g. "Finans & Uyum Ekibi (Steward ID: 402)"
  sensitivityLevel: DataSensitivityLevel;
  lineageOrigin: string; // e.g. "Phase 11 Escrow Ledger -> Data Lake Gold -> FactEscrowTransactions"
  approvalStatus: GovernanceApprovalStatus;
  retentionPolicyDays: number;
  piiMaskingActive: boolean;
  governanceComplianceScorePercent: number; // 0-100%
  aiDetectionNote: string;
  lastAuditedAt: Date;
}

export interface DataGovernancePlatformSummary {
  overallGovernanceScorePercent: number;
  totalCatalogedAssetsCount: number;
  piiProtectedFieldsCount: number;
  activeDataStewardsCount: number;
  aiGovernanceInsightNote: string;
}

export class DataGovernanceEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_GOVERNANCE_V1";

  /**
   * Yönetişim Veri Varlığı Kayıtlarını Getirir
   */
  public static async getAssets(): Promise<DataAssetGovernanceRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "gov_101",
        assetName: "wedyplan_db.escrow_ledgers",
        pillar: "POLICIES",
        ownerDataSteward: "Baş Uyum Görevlisi (Chief Compliance)",
        sensitivityLevel: "CONFIDENTIAL",
        lineageOrigin: "Phase 11 Ledger -> Data Lake Gold -> FactEscrowTransactions -> Finance BI",
        approvalStatus: "APPROVED",
        retentionPolicyDays: 2555, // 7-year WORM
        piiMaskingActive: true,
        governanceComplianceScorePercent: 100.0,
        aiDetectionNote: "Çift taraflı muhasebe fişleri SOC2 Type II ve KVKK/GDPR normlarına %100 uygundur.",
        lastAuditedAt: new Date("2026-07-29T22:42:00"),
      },
      {
        id: "gov_102",
        assetName: "wedyplan_db.couple_profiles",
        pillar: "CLASSIFICATION",
        ownerDataSteward: "Müşteri Veri Yöneticisi (CRM Steward)",
        sensitivityLevel: "RESTRICTED_PII",
        lineageOrigin: "Phase 01 Identity -> Data Lake Silver -> DimCouple",
        approvalStatus: "APPROVED",
        retentionPolicyDays: 1095,
        piiMaskingActive: true,
        governanceComplianceScorePercent: 99.4,
        aiDetectionNote: "TCKN, Pasaport ve E-posta alanlarında otomatik SHA-256 maskeleme aktif.",
        lastAuditedAt: new Date("2026-07-29T22:30:00"),
      },
      {
        id: "gov_103",
        assetName: "wedyplan_db.ai_agent_telemetry",
        pillar: "DATA_CATALOG",
        ownerDataSteward: "Yapay Zeka Mimarı (AI Steward)",
        sensitivityLevel: "INTERNAL",
        lineageOrigin: "Phase 13 AI Platform -> Data Lake Bronze -> FactTaskDelegations",
        approvalStatus: "APPROVED",
        retentionPolicyDays: 365,
        piiMaskingActive: false,
        governanceComplianceScorePercent: 99.8,
        aiDetectionNote: "Ajan karar geçmişi AB Yapay Zeka Yasası (EU AI Act) şeffaflık standartlarına uygundur.",
        lastAuditedAt: new Date("2026-07-29T22:15:00"),
      },
    ];
  }

  /**
   * Yönetişim Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DataGovernancePlatformSummary> {
    return {
      overallGovernanceScorePercent: 99.7,
      totalCatalogedAssetsCount: 142,
      piiProtectedFieldsCount: 850,
      activeDataStewardsCount: 12,
      aiGovernanceInsightNote: "WedyAI Hassas Veri Algılama Motoru 142 veri varlığını %99.7 uyum skoruyla denetlemiş ve 850 PII alanında sıfır veri sızıntısı doğrulamıştır.",
    };
  }

  /**
   * Veri Varlığı Onay (Approval) Simülasyonu
   */
  public static async approveAsset(assetId: string): Promise<boolean> {
    const assets = await this.getAssets();
    const idx = assets.findIndex((a) => a.id === assetId);

    if (idx !== -1) {
      assets[idx].approvalStatus = "APPROVED";
      assets[idx].governanceComplianceScorePercent = 100.0;
      assets[idx].lastAuditedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assets));
      }
      return true;
    }
    return false;
  }
}