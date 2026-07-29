export type EventStreamType =
  | "BOOKINGS"
  | "PAYMENTS"
  | "MESSAGES"
  | "NOTIFICATIONS"
  | "MARKETPLACE"
  | "AI_EVENTS";

export type StreamProcessingStatus = "PROCESSING" | "ENRICHED" | "ANOMALY_FLAGGED" | "REPLAYING";

export interface StreamPipelineRecord {
  id: string;
  streamName: string; // e.g. "realtime_escrow_payout_events"
  streamType: EventStreamType;
  eventsPerSecondCount: number;
  averageLatencyMs: number;
  totalEventsProcessed24h: number;
  status: StreamProcessingStatus;
  hasAnomaly: boolean;
  aiAnomalyAnalysisTip: string;
  lastEventTimestamp: Date;
}

export interface StreamingPlatformSummary {
  totalActiveStreamsCount: number;
  totalEventsProcessed24h: number;
  averageStreamLatencyMs: number;
  anomaliesPrevented24h: number;
  aiStreamingInsightNote: string;
}

export class StreamingEngine {
  private static STORAGE_KEY = "WEDYPLAN_STREAMING_PLATFORM_V1";

  /**
   * Canlı Akış Boru Hattı Kayıtlarını Getirir
   */
  public static async getStreams(): Promise<StreamPipelineRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "strm_101",
        streamName: "realtime_escrow_payment_stream",
        streamType: "PAYMENTS",
        eventsPerSecondCount: 420,
        averageLatencyMs: 4.2,
        totalEventsProcessed24h: 1842000,
        status: "ENRICHED",
        hasAnomaly: false,
        aiAnomalyAnalysisTip: "Faz 11 Escrow ödeme akışı %100 zenginleştirme (enrichment) ve 4.2ms latency ile işleniyor.",
        lastEventTimestamp: new Date("2026-07-29T22:40:00"),
      },
      {
        id: "strm_102",
        streamName: "realtime_ai_workforce_events",
        streamType: "AI_EVENTS",
        eventsPerSecondCount: 850,
        averageLatencyMs: 3.8,
        totalEventsProcessed24h: 3120000,
        status: "PROCESSING",
        hasAnomaly: false,
        aiAnomalyAnalysisTip: "Ajanlar arası görev devir akışı milisaniyelik pencerelerde otonom agregasyona tabi tutulmaktadır.",
        lastEventTimestamp: new Date("2026-07-29T22:39:50"),
      },
      {
        id: "strm_103",
        streamName: "realtime_marketplace_booking_requests",
        streamType: "BOOKINGS",
        eventsPerSecondCount: 180,
        averageLatencyMs: 6.5,
        totalEventsProcessed24h: 420000,
        status: "PROCESSING",
        hasAnomaly: true,
        aiAnomalyAnalysisTip: "WedyAI Uyarısı: Anlık rezervasyon isteklerinde %12 oranında tekrarlayan frekans anomalisi tespit edildi.",
        lastEventTimestamp: new Date("2026-07-29T22:38:00"),
      },
    ];
  }

  /**
   * Akış Platform Özetini Getirir
   */
  public static async getSummary(): Promise<StreamingPlatformSummary> {
    return {
      totalActiveStreamsCount: 6,
      totalEventsProcessed24h: 5382000,
      averageStreamLatencyMs: 4.8,
      anomaliesPrevented24h: 14,
      aiStreamingInsightNote: "WedyAI Gerçek Zamanlı Anomali Tespiti 5.38M olayı 4.8ms ortalama gecikmeyle işlemiş ve 14 frekans anomalisini anında izole etmiştir.",
    };
  }

  /**
   * Olay Akışını Yeniden Oynatma (Event Replay) Simülasyonu
   */
  public static async triggerStreamReplay(streamId: string): Promise<boolean> {
    const streams = await this.getStreams();
    const idx = streams.findIndex((s) => s.id === streamId);

    if (idx !== -1) {
      streams[idx].status = "REPLAYING";
      streams[idx].hasAnomaly = false;
      streams[idx].lastEventTimestamp = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(streams));
      }
      return true;
    }
    return false;
  }
}