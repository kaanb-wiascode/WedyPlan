export type DataQualityDimension =
  | "COMPLETENESS"
  | "ACCURACY"
  | "CONSISTENCY"
  | "UNIQUENESS"
  | "VALIDITY"
  | "TIMELINESS"
  | "INTEGRITY";

export type QualityIssueSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type QualityIssueStatus = "OPEN" | "AUTO_CLEANSED" | "RESOLVED";

export interface DataQualityDimensionScore {
  dimension: DataQualityDimension;
  scorePercent: number; // 0-100%
  status: "OPTIMAL" | "ATTENTION" | "DEGRADED";
  benchmarkTargetPercent: number;
}

export interface DataQualityIssueTicket {
  id: string;
  targetDataset: string; // e.g. "Data Lake Silver / crm_couple_interactions"
  dimension: DataQualityDimension;
  issueTitle: string; // e.g. "Geçersiz Telefon Numarası Biçimi (E.164 Saptaması)"
  severity: QualityIssueSeverity;
  affectedRecordsCount: number;
  status: QualityIssueStatus;
  aiRootCauseAnalysis: string;
  aiSuggestedCleansingAction: string;
  detectedAt: Date;
}

export interface DataQualityPlatformSummary {
  overallDataQualityScorePercent: number;
  totalProfiledDatasetsCount: number;
  activeQualityTicketsCount: number;
  autoCleansedRecords24hCount: number;
  aiQualityInsightNote: string;
}

export class DataQualityEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_QUALITY_V1";

  /**
   * 7 Kalite Boyutunun Skorlarını Getirir
   */
  public static async getDimensionScores(): Promise<DataQualityDimensionScore[]> {
    return [
      { dimension: "COMPLETENESS", scorePercent: 99.8, status: "OPTIMAL", benchmarkTargetPercent: 99.5 },
      { dimension: "ACCURACY", scorePercent: 99.6, status: "OPTIMAL", benchmarkTargetPercent: 99.0 },
      { dimension: "CONSISTENCY", scorePercent: 99.4, status: "OPTIMAL", benchmarkTargetPercent: 99.0 },
      { dimension: "UNIQUENESS", scorePercent: 99.9, status: "OPTIMAL", benchmarkTargetPercent: 99.5 },
      { dimension: "VALIDITY", scorePercent: 99.2, status: "OPTIMAL", benchmarkTargetPercent: 98.5 },
      { dimension: "TIMELINESS", scorePercent: 99.7, status: "OPTIMAL", benchmarkTargetPercent: 99.0 },
      { dimension: "INTEGRITY", scorePercent: 100.0, status: "OPTIMAL", benchmarkTargetPercent: 99.9 },
    ];
  }

  /**
   * Kalite Sorunu ve Bilet Kayıtlarını Getirir
   */
  public static async getIssues(): Promise<DataQualityIssueTicket[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "qual_101",
        targetDataset: "Data Lake Silver / crm_couple_interactions",
        dimension: "VALIDITY",
        issueTitle: "E.164 Telefon Biçim Uyumsuzluğu",
        severity: "MEDIUM",
        affectedRecordsCount: 142,
        status: "OPEN",
        aiRootCauseAnalysis: "Kök Neden: Mobil istemci v2.1 formunda ülke kodu prefix alanı boş gönderilmiş.",
        aiSuggestedCleansingAction: "Otomatik E.164 alan kodu tamamlayıcı temizleme algoritmasını çalıştırın.",
        detectedAt: new Date("2026-07-29T23:05:00"),
      },
      {
        id: "qual_102",
        targetDataset: "Data Warehouse / FactMarketplaceBookings",
        dimension: "UNIQUENESS",
        issueTitle: "Mükerrer Rezervasyon Istek payload'u",
        severity: "HIGH",
        affectedRecordsCount: 18,
        status: "AUTO_CLEANSED",
        aiRootCauseAnalysis: "Kök Neden: Partner API yeniden deneme (retry) mekanizması idempotency key olmadan istek attı.",
        aiSuggestedCleansingAction: "Mükerrer kayıtlar MDM Golden Record survivorship kuralı ile otonom birleştirildi.",
        detectedAt: new Date("2026-07-29T22:40:00"),
      },
      {
        id: "qual_103",
        targetDataset: "Master Data Management / Vendor Proeller",
        dimension: "COMPLETENESS",
        issueTitle: "Eksik VKN / Vergi Dairesi Bilgisi",
        severity: "CRITICAL",
        affectedRecordsCount: 5,
        status: "OPEN",
        aiRootCauseAnalysis: "Kök Neden: Eski partner kaydı sırasında vergi dairesi alanı opsiyonel bırakılmış.",
        aiSuggestedCleansingAction: "Gelir İdaresi Başkanlığı (GİB) doğrulama servisi ile eksik VKN verilerini tamamlayın.",
        detectedAt: new Date("2026-07-29T22:15:00"),
      },
    ];
  }

  /**
   * Kalite Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<DataQualityPlatformSummary> {
    return {
      overallDataQualityScorePercent: 99.6,
      totalProfiledDatasetsCount: 18,
      activeQualityTicketsCount: 2,
      autoCleansedRecords24hCount: 160,
      aiQualityInsightNote: "WedyAI Kalite Tahmin Motoru 18 veri setini 7 boyutta profillemiş, %99.6 genel kalite skoru sağlamış ve 160 hatalı kaydı otonom temizlemiştir.",
    };
  }

  /**
   * Kalite Sorununu Otonom Temizleme (Auto-Cleansing) Simülasyonu
   */
  public static async executeCleansing(issueId: string): Promise<boolean> {
    const issues = await this.getIssues();
    const idx = issues.findIndex((i) => i.id === issueId);

    if (idx !== -1) {
      issues[idx].status = "AUTO_CLEANSED";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(issues));
      }
      return true;
    }
    return false;
  }
}