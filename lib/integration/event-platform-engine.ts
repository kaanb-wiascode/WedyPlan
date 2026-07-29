export type EventDomainTopic =
  | "BOOKINGS"
  | "PAYMENTS"
  | "MESSAGES"
  | "INVOICES"
  | "VENDOR_UPDATES"
  | "USER_ACTIVITIES";

export type EventProcessingStatus = "PUBLISHED" | "PROCESSING" | "DELIVERED" | "RETRYING" | "DEAD_LETTER_QUEUE";

export interface EventStreamRecord {
  id: string;
  topic: EventDomainTopic;
  eventName: string; // e.g. "booking.escrow_locked"
  sourceServiceRef: string;
  payloadHash: string;
  retryCount: number;
  status: EventProcessingStatus;
  latencyMs: number;
  anomalyScorePercent: number; // 0-100% (High means suspicious)
  aiRetryOptimizationTip: string;
  timestamp: Date;
}

export interface DeadLetterQueueRecord {
  id: string;
  originalEventId: string;
  topic: EventDomainTopic;
  failureReason: string;
  targetEndpointUrl: string;
  failedAttemptsCount: number;
  canReplay: boolean;
  capturedAt: Date;
}

export interface EventPlatformSummary {
  totalEventsProcessed24h: number;
  activeTopicsCount: number;
  averageEventLatencyMs: number;
  deadLetterEventsCount: number;
  automatedRetrySuccessRatePercent: number;
  aiEventInsightNote: string;
}

export class EventPlatformEngine {
  private static STORAGE_KEY = "WEDYPLAN_EVENT_PLATFORM_V1";

  /**
   * Gerçek Zamanlı Olay Yayın Akışını Getirir
   */
  public static async getEventStream(): Promise<EventStreamRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "evt_101",
        topic: "PAYMENTS",
        eventName: "payment.escrow_locked",
        sourceServiceRef: "Phase11-EscrowEngine",
        payloadHash: "0x8f2a...91b4",
        retryCount: 0,
        status: "DELIVERED",
        latencyMs: 14,
        anomalyScorePercent: 1.2,
        aiRetryOptimizationTip: "Escrow depozito olayı 14ms içinde webhook abonelerine %100 ulaştırıldı.",
        timestamp: new Date("2026-07-29T21:35:00"),
      },
      {
        id: "evt_102",
        topic: "BOOKINGS",
        eventName: "booking.venue_confirmed",
        sourceServiceRef: "Phase13-AiWorkforceEngine",
        payloadHash: "0x4c9d...18a0",
        retryCount: 0,
        status: "DELIVERED",
        latencyMs: 18,
        anomalyScorePercent: 0.8,
        aiRetryOptimizationTip: "Opera PMS senkronizasyon olayı başarıyla yayımlandı.",
        timestamp: new Date("2026-07-29T21:30:00"),
      },
      {
        id: "evt_103",
        topic: "INVOICES",
        eventName: "invoice.efatura_generated",
        sourceServiceRef: "Phase14-IntegrationGateway",
        payloadHash: "0x1d7e...44f2",
        retryCount: 2,
        status: "RETRYING",
        latencyMs: 142,
        anomalyScorePercent: 14.5,
        aiRetryOptimizationTip: "SAP ERP hedef servisi zaman aşımına uğradı. Üstel geri çekilme (Exponential Backoff) ile 2. deneme yürütülüyor.",
        timestamp: new Date("2026-07-29T21:25:00"),
      },
      {
        id: "evt_104",
        topic: "VENDOR_UPDATES",
        eventName: "vendor.calendar_blocked",
        sourceServiceRef: "Phase05-EventBus",
        payloadHash: "0x9b3f...22c8",
        retryCount: 5,
        status: "DEAD_LETTER_QUEUE",
        latencyMs: 850,
        anomalyScorePercent: 88.4,
        aiRetryOptimizationTip: "Anomali tespiti: Hedef webhook uç noktası 500 dahili hata verdi. Güvenle Dead Letter Queue (DLQ) havuzuna taşındı.",
        timestamp: new Date("2026-07-29T21:10:00"),
      },
    ];
  }

  /**
   * Dead Letter Queue (DLQ) Kayıtlarını Getirir
   */
  public static async getDlqRecords(): Promise<DeadLetterQueueRecord[]> {
    return [
      {
        id: "dlq_201",
        originalEventId: "evt_104",
        topic: "VENDOR_UPDATES",
        failureReason: "HTTP 500 Internal Server Error (Target Webhook Timeout)",
        targetEndpointUrl: "https://vendor.partner-api.com/hooks/calendar",
        failedAttemptsCount: 5,
        canReplay: true,
        capturedAt: new Date("2026-07-29T21:10:00"),
      },
    ];
  }

  /**
   * Olay Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<EventPlatformSummary> {
    return {
      totalEventsProcessed24h: 184500,
      activeTopicsCount: 6,
      averageEventLatencyMs: 16.2,
      deadLetterEventsCount: 3,
      automatedRetrySuccessRatePercent: 99.7,
      aiEventInsightNote: "Yapay zeka olay anomali dedektörü 184.5K günlük olayı izleyerek %99.7 yeniden deneme başarısı sağlamış ve 3 hatalı olayı DLQ havuzunda karantinaya almıştır.",
    };
  }

  /**
   * DLQ Olayını Yeniden Oynatma (Event Replay) Simülasyonu
   */
  public static async replayDlqEvent(dlqId: string): Promise<boolean> {
    const stream = await this.getEventStream();
    const dlq = await this.getDlqRecords();
    const idx = dlq.findIndex((d) => d.id === dlqId);

    if (idx !== -1) {
      const original = stream.find((s) => s.id === dlq[idx].originalEventId);
      if (original) {
        original.status = "DELIVERED";
        original.retryCount += 1;
        original.anomalyScorePercent = 0.5;
        original.aiRetryOptimizationTip = "Event Replay başarıyla tamamlandı. Yeniden gönderim onaylandı.";
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stream));
      }
      return true;
    }
    return false;
  }
}