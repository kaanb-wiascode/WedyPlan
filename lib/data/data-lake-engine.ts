export type DataLakeZone = "RAW_BRONZE" | "PROCESSED_SILVER" | "CURATED_GOLD";
export type DataLakeSourceType =
  | "MARKETPLACE"
  | "CRM"
  | "FINANCE"
  | "MOBILE"
  | "WEB"
  | "AI"
  | "LOGS"
  | "DOCUMENTS"
  | "MEDIA";

export interface DataLakeDatasetRecord {
  id: string;
  datasetName: string; // e.g. "raw_escrow_audit_events"
  sourceType: DataLakeSourceType;
  zone: DataLakeZone;
  storageFormat: "PARQUET" | "DELTA_LAKE" | "JSON_GZ" | "RAW_BINARY";
  recordCount: number;
  sizeMegabytes: number;
  classificationTag: "PUBLIC" | "CONFIDENTIAL" | "PII_RESTRICTED";
  dataQualityScorePercent: number; // 0-100%
  aiSchemaDiscoveryNote: string;
  lastIngestedAt: Date;
}

export interface DataLakeSummary {
  totalStoredVolumeTerabytes: number;
  totalActiveDatasetsCount: number;
  bronzeZoneVolumeGb: number;
  silverZoneVolumeGb: number;
  goldZoneVolumeGb: number;
  aiClassificationAccuracyPercent: number;
  aiDataLakeInsightNote: string;
}

export class DataLakeEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_LAKE_V1";

  /**
   * Data Lake Veri Seti Kayıtlarını Getirir
   */
  public static async getDatasets(): Promise<DataLakeDatasetRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "dl_101",
        datasetName: "curated_financial_escrow_ledgers",
        sourceType: "FINANCE",
        zone: "CURATED_GOLD",
        storageFormat: "DELTA_LAKE",
        recordCount: 1845000,
        sizeMegabytes: 420.5,
        classificationTag: "CONFIDENTIAL",
        dataQualityScorePercent: 100.0,
        aiSchemaDiscoveryNote: "Phase 11 Escrow Defteri ile %100 schema alignment sağlandı.",
        lastIngestedAt: new Date("2026-07-29T22:35:00"),
      },
      {
        id: "dl_102",
        datasetName: "processed_crm_couple_interactions",
        sourceType: "CRM",
        zone: "PROCESSED_SILVER",
        storageFormat: "PARQUET",
        recordCount: 420000,
        sizeMegabytes: 115.0,
        classificationTag: "PII_RESTRICTED",
        dataQualityScorePercent: 99.4,
        aiSchemaDiscoveryNote: "E-posta ve Telefon numaraları SHA-256 ile maskelenerek Silver katmanına aktarıldı.",
        lastIngestedAt: new Date("2026-07-29T22:20:00"),
      },
      {
        id: "dl_103",
        datasetName: "raw_ai_workforce_telemetry_logs",
        sourceType: "AI",
        zone: "RAW_BRONZE",
        storageFormat: "JSON_GZ",
        recordCount: 3840000,
        sizeMegabytes: 890.0,
        classificationTag: "PUBLIC",
        dataQualityScorePercent: 98.8,
        aiSchemaDiscoveryNote: "Ajan logları ham (raw) JSON formatında S3 Bronze alanına sıkıştırılarak aktarıldı.",
        lastIngestedAt: new Date("2026-07-29T22:10:00"),
      },
    ];
  }

  /**
   * Data Lake Özetini Getirir
   */
  public static async getSummary(): Promise<DataLakeSummary> {
    return {
      totalStoredVolumeTerabytes: 1.42,
      totalActiveDatasetsCount: 3,
      bronzeZoneVolumeGb: 890.0,
      silverZoneVolumeGb: 115.0,
      goldZoneVolumeGb: 420.5,
      aiClassificationAccuracyPercent: 99.6,
      aiDataLakeInsightNote: "WedyAI Şema Keşif ve Sınıflandırma Katmanı 1.42 TB veriyi 3 bölgede (Bronze, Silver, Gold) %99.6 doğrulukla dizinlemiştir.",
    };
  }

  /**
   * Veri Seti Temizleme & Silver/Gold Katmanına Yükseltme Simülasyonu
   */
  public static async promoteDataset(datasetId: string): Promise<boolean> {
    const datasets = await this.getDatasets();
    const idx = datasets.findIndex((d) => d.id === datasetId);

    if (idx !== -1) {
      if (datasets[idx].zone === "RAW_BRONZE") {
        datasets[idx].zone = "PROCESSED_SILVER";
        datasets[idx].storageFormat = "PARQUET";
      } else if (datasets[idx].zone === "PROCESSED_SILVER") {
        datasets[idx].zone = "CURATED_GOLD";
        datasets[idx].storageFormat = "DELTA_LAKE";
      }
      datasets[idx].lastIngestedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(datasets));
      }
      return true;
    }
    return false;
  }
}