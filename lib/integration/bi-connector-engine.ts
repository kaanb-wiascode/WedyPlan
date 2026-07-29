export type BiConnectorTarget = "POWER_BI" | "TABLEAU" | "LOOKER" | "SNOWFLAKE" | "DATABRICKS" | "BIGQUERY";
export type BiDatasetDomain = "GMV_FINANCIALS" | "ESCROW_LEDGERS" | "MARKETPLACE_OPS" | "AI_WORKFORCE_TELEMETRY";
export type BiRefreshStatus = "SYNCED" | "REFRESHING" | "SCHEDULED" | "SCHEMA_DRIFT_ALERT";

export interface BiDatasetExportRecord {
  id: string;
  datasetName: string; // e.g. "WedyPlan Global GMV & Escrow Yield"
  targetPlatform: BiConnectorTarget;
  domain: BiDatasetDomain;
  refreshFrequencyHours: number; // e.g. 1 hour, 6 hours
  dataQualityScorePercent: number; // 0-100%
  totalRowsExported: number;
  status: BiRefreshStatus;
  connectionEndpointUrl: string;
  aiInsightRecommendation: string;
  lastRefreshedAt: Date;
}

export interface BiPlatformSummary {
  totalExportedRows24h: number;
  activeBiConnectionsCount: number;
  averageDataQualityIndexPercent: number;
  activeDatasetsCount: number;
  aiBiInsightNote: string;
}

export class BiConnectorEngine {
  private static STORAGE_KEY = "WEDYPLAN_BI_CONNECTOR_V1";

  /**
   * BI Veri Seti Bağlantı Kayıtlarını Getirir
   */
  public static async getDatasets(): Promise<BiDatasetExportRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "bi_101",
        datasetName: "Global GMV & Escrow Yield Model",
        targetPlatform: "POWER_BI",
        domain: "GMV_FINANCIALS",
        refreshFrequencyHours: 1,
        dataQualityScorePercent: 99.8,
        totalRowsExported: 142000,
        status: "SYNCED",
        connectionEndpointUrl: "https://bi.wedyplan.com/v1/powerbi/gmv-model",
        aiInsightRecommendation: "Körfez (BAE/KSA) bölgesindeki Escrow depozito kilitleme oranı Power BI panolarında %34 büyüme ile doğru simüle edilmektedir.",
        lastRefreshedAt: new Date("2026-07-29T22:00:00"),
      },
      {
        id: "bi_102",
        datasetName: "Vendor SLA & Marketplace Operations",
        targetPlatform: "TABLEAU",
        domain: "MARKETPLACE_OPS",
        refreshFrequencyHours: 4,
        dataQualityScorePercent: 99.4,
        totalRowsExported: 88500,
        status: "SYNCED",
        connectionEndpointUrl: "https://bi.wedyplan.com/v1/tableau/vendor-ops",
        aiInsightRecommendation: "Çırağan Palace ve Sait Halim Paşa Yalısı rezervasyon yanıt süreleri Tableau dashboard'unda 14ms gecikmeyle canlı güncellenmektedir.",
        lastRefreshedAt: new Date("2026-07-29T21:30:00"),
      },
      {
        id: "bi_103",
        datasetName: "AI Workforce Telemetry & Agent Efficiency",
        targetPlatform: "LOOKER",
        domain: "AI_WORKFORCE_TELEMETRY",
        refreshFrequencyHours: 12,
        dataQualityScorePercent: 98.9,
        totalRowsExported: 312000,
        status: "SYNCED",
        connectionEndpointUrl: "https://bi.wedyplan.com/v1/looker/agent-telemetry",
        aiInsightRecommendation: "Looker semantic modeli üzerinden 9 otonom AI ajanının insan-AI görev devir süreleri başarıyla görselleştirilmiştir.",
        lastRefreshedAt: new Date("2026-07-29T20:45:00"),
      },
      {
        id: "bi_104",
        datasetName: "Enterprise Finance Data Lake Warehouse",
        targetPlatform: "SNOWFLAKE",
        domain: "ESCROW_LEDGERS",
        refreshFrequencyHours: 24,
        dataQualityScorePercent: 100.0,
        totalRowsExported: 1850000,
        status: "SYNCED",
        connectionEndpointUrl: "s3://wedyplan-snowflake-exports/parquet/ledgers/",
        aiInsightRecommendation: "Parquet biçiminde Snowflake Data Lake aktarımı Phase 11 Escrow Defteri ile %100 mutabık.",
        lastRefreshedAt: new Date("2026-07-29T18:00:00"),
      },
    ];
  }

  /**
   * BI Platform Özetini Getirir
   */
  public static async getSummary(): Promise<BiPlatformSummary> {
    return {
      totalExportedRows24h: 2392500,
      activeBiConnectionsCount: 4,
      averageDataQualityIndexPercent: 99.5,
      activeDatasetsCount: 4,
      aiBiInsightNote: "WedyAI Veri Kalitesi Motoru Power BI, Tableau, Looker ve Snowflake sistemlerine aktarılan 2.39M satırı %99.5 veri kalitesi indeksi ile doğrulamıştır.",
    };
  }

  /**
   * Veri Seti Yenileme (Refresh) Tetikleme Simülasyonu
   */
  public static async triggerDatasetRefresh(datasetId: string): Promise<boolean> {
    const datasets = await this.getDatasets();
    const idx = datasets.findIndex((d) => d.id === datasetId);

    if (idx !== -1) {
      datasets[idx].status = "SYNCED";
      datasets[idx].lastRefreshedAt = new Date();
      datasets[idx].totalRowsExported += 1200;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(datasets));
      }
      return true;
    }
    return false;
  }
}