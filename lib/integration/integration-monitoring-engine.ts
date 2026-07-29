export type IntegrationHealthStatus = "HEALTHY" | "DEGRADED" | "INCIDENT" | "MAINTENANCE";

export interface IntegrationTraceRecord {
  id: string;
  correlationId: string; // e.g. "trace_9f823a"
  serviceOrigin: string; // e.g. "Phase14-ApiGateway"
  targetEndpoint: string; // e.g. "Opera PMS /reservations"
  httpStatus: number;
  latencyMs: number;
  hasError: boolean;
  errorMessage?: string;
  timestamp: Date;
}

export interface IntegrationIncidentRecord {
  id: string;
  affectedSystemName: string;
  incidentTitle: string;
  severity: "CRITICAL" | "MAJOR" | "MINOR";
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
  aiRootCauseAnalysis: string;
  detectedAt: Date;
  resolvedAt?: Date;
}

export interface MonitoringControlPlaneSummary {
  overallIntegrationHealthScorePercent: number; // 0-100%
  overallAvailabilityPercent: number;
  averageResponseLatencyMs: number;
  activeIncidentsCount: number;
  totalTracesCaptured24h: number;
  aiMonitoringInsightNote: string;
}

export class IntegrationMonitoringEngine {
  private static STORAGE_KEY = "WEDYPLAN_INTEGRATION_MONITORING_V1";

  /**
   * Dağıtık İzleme (Trace) Kayıtlarını Getirir
   */
  public static async getTraces(): Promise<IntegrationTraceRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "tr_101",
        correlationId: "trace_8f2a91b4",
        serviceOrigin: "Phase14-ApiGateway",
        targetEndpoint: "Opera PMS Cloud /reservations",
        httpStatus: 200,
        latencyMs: 18,
        hasError: false,
        timestamp: new Date("2026-07-29T21:55:00"),
      },
      {
        id: "tr_102",
        correlationId: "trace_4c9d18a0",
        serviceOrigin: "Phase14-EventBus",
        targetEndpoint: "SAP S/4HANA /efatura",
        httpStatus: 200,
        latencyMs: 34,
        hasError: false,
        timestamp: new Date("2026-07-29T21:52:00"),
      },
      {
        id: "tr_103",
        correlationId: "trace_1d7e44f2",
        serviceOrigin: "Phase14-WebhookEngine",
        targetEndpoint: "Partner Webhook /calendar/sync",
        httpStatus: 504,
        latencyMs: 850,
        hasError: true,
        errorMessage: "HTTP 504 Gateway Timeout (Partner Server Unresponsive)",
        timestamp: new Date("2026-07-29T21:40:00"),
      },
    ];
  }

  /**
   * Olay Zaman Çizelgesi (Incident Timeline) Kayıtlarını Getirir
   */
  public static async getIncidents(): Promise<IntegrationIncidentRecord[]> {
    return [
      {
        id: "inc_201",
        affectedSystemName: "Partner Calendar Webhook Endpoint",
        incidentTitle: "Partner Webhook Gateway Zaman Aşımı (HTTP 504)",
        severity: "MINOR",
        status: "RESOLVED",
        aiRootCauseAnalysis: "WedyAI Kök Neden Analizi: Partner sunucusunda oluşan geçici ağ gecikmesi nedeniyle istek 850ms sınırını aştı. Olay Dead Letter Queue (DLQ) karantinasına alındı ve re-try ile çözüldü.",
        detectedAt: new Date("2026-07-29T21:40:00"),
        resolvedAt: new Date("2026-07-29T21:42:00"),
      },
    ];
  }

  /**
   * İzleme Kontrol Düzlemi Özetini Getirir
   */
  public static async getSummary(): Promise<MonitoringControlPlaneSummary> {
    return {
      overallIntegrationHealthScorePercent: 99.8,
      overallAvailabilityPercent: 99.99,
      averageResponseLatencyMs: 18.4,
      activeIncidentsCount: 0,
      totalTracesCaptured24h: 184200,
      aiMonitoringInsightNote: "WedyAI Tahminsel İzleme Katmanı, 184.2K isteği izleyerek %99.99 erişilebilirlik ve 18.4ms ortalama yanıt süresi raporlamıştır.",
    };
  }
}