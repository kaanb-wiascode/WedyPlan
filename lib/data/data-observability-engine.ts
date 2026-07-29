export type PipelineJobType = "ETL_BATCH" | "STREAMING_CDC" | "WAREHOUSE_LOAD" | "SCHEMA_SYNC";
export type ObservabilityStatus = "HEALTHY" | "DEGRADED" | "SLA_BREACH_WARNING" | "FAILED";

export interface DataPipelineObservabilityRecord {
  id: string;
  pipelineName: string; // e.g. "etl_escrow_to_warehouse_gold"
  jobType: PipelineJobType;
  throughputRecordsPerSec: number;
  freshnessMinutes: number;
  slaTargetMinutes: number;
  status: ObservabilityStatus;
  schemaDriftDetected: boolean;
  aiFailurePredictionPercent: number; // 0-100% (Probability of failure)
  aiRootCauseAnalysis: string;
  aiOptimizationTip: string;
  lastExecutionAt: Date;
}

export interface ObservabilityIncidentLog {
  id: string;
  pipelineId: string;
  pipelineName: string;
  incidentType: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  resolved: boolean;
  aiDiagnosticNote: string;
  timestamp: Date;
}

export interface DataObservabilityPlatformSummary {
  overallObservabilityHealthScorePercent: number;
  totalMonitoredPipelinesCount: number;
  slaCompliancePercent: number;
  schemaDriftAlerts24hCount: number;
  aiPredictedFailuresPrevented24hCount: number;
  aiObservabilityInsightNote: string;
}

export class DataObservabilityEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_OBSERVABILITY_V1";

  /**
   * Boru Hattı Gözlemlenebilirlik Kayıtlarını Getirir
   */
  public static async getPipelines(): Promise<DataPipelineObservabilityRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "pipe_101",
        pipelineName: "etl_escrow_to_warehouse_gold",
        jobType: "WAREHOUSE_LOAD",
        throughputRecordsPerSec: 1420,
        freshnessMinutes: 4,
        slaTargetMinutes: 15,
        status: "HEALTHY",
        schemaDriftDetected: false,
        aiFailurePredictionPercent: 1.2,
        aiRootCauseAnalysis: "Sistem %100 sağlıklı. Bellek ve CPU kullanımı optimum aralıkta.",
        aiOptimizationTip: "Sorgu partisyonlarını 15 dakikalık pencerelere bölerek bellek ayak izini %12 azaltabilirsiniz.",
        lastExecutionAt: new Date("2026-07-29T23:10:00"),
      },
      {
        id: "pipe_102",
        pipelineName: "cdc_streaming_partner_webhooks",
        jobType: "STREAMING_CDC",
        throughputRecordsPerSec: 3800,
        freshnessMinutes: 1,
        slaTargetMinutes: 5,
        status: "HEALTHY",
        schemaDriftDetected: false,
        aiFailurePredictionPercent: 4.8,
        aiRootCauseAnalysis: "Gözlemlenen gecikme 1.2 sn ile SLA sınırlarının çok altındadır.",
        aiOptimizationTip: "Kafka tüketici grubu paralel çalışan iş parçacığı sayısı (thread pool) optimize edildi.",
        lastExecutionAt: new Date("2026-07-29T23:09:50"),
      },
      {
        id: "pipe_103",
        pipelineName: "batch_crm_couple_enrichment",
        jobType: "ETL_BATCH",
        throughputRecordsPerSec: 450,
        freshnessMinutes: 28,
        slaTargetMinutes: 30,
        status: "SLA_BREACH_WARNING",
        schemaDriftDetected: true,
        aiFailurePredictionPercent: 78.4,
        aiRootCauseAnalysis: "Kök Neden: 'couple_budget_preferences' tablosuna eklenen yeni 'currency_iso' sütunu schema drift uyarısı verdi.",
        aiOptimizationTip: "Schema Drift otomatik uyumluluk modunu çalıştırarak şema haritasını güncelleyin.",
        lastExecutionAt: new Date("2026-07-29T22:45:00"),
      },
    ];
  }

  /**
   * Olay Günlüğü (Incident Logs) Kayıtlarını Getirir
   */
  public static async getIncidents(): Promise<ObservabilityIncidentLog[]> {
    return [
      {
        id: "inc_201",
        pipelineId: "pipe_103",
        pipelineName: "batch_crm_couple_enrichment",
        incidentType: "Schema Drift Detected",
        severity: "WARNING",
        resolved: false,
        aiDiagnosticNote: "Üst akış CRM veritabanına eklenen yeni sütun şema uyarısını tetikledi.",
        timestamp: new Date("2026-07-29T22:45:00"),
      },
    ];
  }

  /**
   * Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DataObservabilityPlatformSummary> {
    return {
      overallObservabilityHealthScorePercent: 99.7,
      totalMonitoredPipelinesCount: 142,
      slaCompliancePercent: 99.8,
      schemaDriftAlerts24hCount: 1,
      aiPredictedFailuresPrevented24hCount: 18,
      aiObservabilityInsightNote: "WedyAI Gözlemlenebilirlik Motoru 142 veri boru hattını %99.8 SLA uyumuyla izlemiş, 18 potansiyel arızayı önceden tahmin ederek engellemiştir.",
    };
  }

  /**
   * Boru Hattı Optimizasyonu ve Schema Drift Düzeltme Simülasyonu
   */
  public static async optimizePipeline(pipelineId: string): Promise<boolean> {
    const pipelines = await this.getPipelines();
    const idx = pipelines.findIndex((p) => p.id === pipelineId);

    if (idx !== -1) {
      pipelines[idx].status = "HEALTHY";
      pipelines[idx].schemaDriftDetected = false;
      pipelines[idx].aiFailurePredictionPercent = 2.0;
      pipelines[idx].freshnessMinutes = 2;
      pipelines[idx].lastExecutionAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pipelines));
      }
      return true;
    }
    return false;
  }
}