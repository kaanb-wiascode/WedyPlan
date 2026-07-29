export type InfrastructureRegion = "EU_CENTRAL" | "ME_CENTRAL" | "US_EAST" | "ASIA_PACIFIC";
export type SelfHealingActionType = "TRAFFIC_REROUTE" | "CACHE_PURGE" | "RESTART_PODS" | "POOL_RECYCLED" | "DLQ_AUTO_REPLAY";
export type RemediationStatus = "AUTONOMOUSLY_RESOLVED" | "EXECUTING" | "MONITORING" | "ESCALATED_HUMAN";

export interface InfrastructureNodeHealth {
  nodeId: string;
  region: InfrastructureRegion;
  providerName: string; // e.g. "AWS eu-central-1", "GCP me-central-1"
  cpuUtilizationPercent: number;
  memoryUtilizationPercent: number;
  latencyMs: number;
  healthScorePercent: number;
  status: "OPTIMAL" | "DEGRADED" | "HEALING";
  activeRemediationAction?: SelfHealingActionType;
}

export interface SelfHealingIncidentRecord {
  id: string;
  targetRegion: InfrastructureRegion;
  incidentType: string; // e.g. "Latency Spike in Frankfurt Region"
  detectedMetricAnomaly: string; // e.g. "HTTP 504 Timeout rate > 2.5%"
  executedRemediation: SelfHealingActionType;
  remediationStatus: RemediationStatus;
  recoveryTimeSeconds: number;
  aiPredictiveHealingTip: string;
  timestamp: Date;
}

export interface SelfHealingPlatformSummary {
  overallSelfHealingScorePercent: number;
  totalAutonomousRemediations24h: number;
  meanTimeToRecoverySeconds: number;
  humanInterventionsPreventedCount: number;
  aiHealingInsightNote: string;
}

export class SelfHealingEngine {
  private static STORAGE_KEY = "WEDYPLAN_SELF_HEALING_V1";

  /**
   * Bölgesel Altyapı Düğümlerinin Sağlığını Getirir
   */
  public static async getNodeHealth(): Promise<InfrastructureNodeHealth[]> {
    return [
      {
        nodeId: "node_eu_1",
        region: "EU_CENTRAL",
        providerName: "AWS eu-central-1 (Frankfurt)",
        cpuUtilizationPercent: 42.5,
        memoryUtilizationPercent: 58.2,
        latencyMs: 14.2,
        healthScorePercent: 99.8,
        status: "OPTIMAL",
      },
      {
        nodeId: "node_me_1",
        region: "ME_CENTRAL",
        providerName: "GCP me-central-1 (Dammam / Dubai)",
        cpuUtilizationPercent: 68.0,
        memoryUtilizationPercent: 74.1,
        latencyMs: 18.5,
        healthScorePercent: 99.4,
        status: "OPTIMAL",
      },
      {
        nodeId: "node_us_1",
        region: "US_EAST",
        providerName: "AWS us-east-1 (N. Virginia)",
        cpuUtilizationPercent: 35.0,
        memoryUtilizationPercent: 48.0,
        latencyMs: 38.0,
        healthScorePercent: 99.9,
        status: "OPTIMAL",
      },
    ];
  }

  /**
   * Otonom İyileştirme Olay Kayıtlarını Getirir
   */
  public static async getIncidents(): Promise<SelfHealingIncidentRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "heal_101",
        targetRegion: "EU_CENTRAL",
        incidentType: "Partner Webhook Latency Spike",
        detectedMetricAnomaly: "Partner Webhook yanıt süresi 850ms sınırını aştı.",
        executedRemediation: "DLQ_AUTO_REPLAY",
        remediationStatus: "AUTONOMOUSLY_RESOLVED",
        recoveryTimeSeconds: 4.2,
        aiPredictiveHealingTip: "WedyAI Otonom İyileştirme: Hatalı istekler DLQ karantinasından üstel geri çekilme ile 4.2 saniyede çözüldü.",
        timestamp: new Date("2026-07-29T22:20:00"),
      },
      {
        id: "heal_102",
        targetRegion: "ME_CENTRAL",
        incidentType: "High Database Connection Pool Saturation",
        detectedMetricAnomaly: "DB havuz kullanımı %92 seviyesine ulaştı.",
        executedRemediation: "POOL_RECYCLED",
        remediationStatus: "AUTONOMOUSLY_RESOLVED",
        recoveryTimeSeconds: 2.8,
        aiPredictiveHealingTip: "Atıl veritabanı bağlantıları otonom geri dönüştürülerek havuz doygunluğu %45 seviyesine çekildi.",
        timestamp: new Date("2026-07-29T21:45:00"),
      },
    ];
  }

  /**
   * Otonom İyileştirme Özetini Getirir
   */
  public static async getSummary(): Promise<SelfHealingPlatformSummary> {
    return {
      overallSelfHealingScorePercent: 99.8,
      totalAutonomousRemediations24h: 24,
      meanTimeToRecoverySeconds: 3.5,
      humanInterventionsPreventedCount: 24,
      aiHealingInsightNote: "WedyAI Otonom İyileştirme Motoru 24 altyapı aksaklığını ortalama 3.5 saniyede insan müdahalesi olmadan sıfır kesinti ile çözmüştür.",
    };
  }

  /**
   * Manuel Otonom İyileştirme Simülasyonu Tetikleyici
   */
  public static async triggerAutonomousHealing(incidentId: string): Promise<boolean> {
    const incidents = await this.getIncidents();
    const idx = incidents.findIndex((i) => i.id === incidentId);

    if (idx !== -1) {
      incidents[idx].remediationStatus = "AUTONOMOUSLY_RESOLVED";
      incidents[idx].timestamp = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(incidents));
      }
      return true;
    }
    return false;
  }
}