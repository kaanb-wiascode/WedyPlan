export type ExperimentType =
  | "PROMPT_TESTS"
  | "MODEL_COMPARISON"
  | "WORKFLOW_EVALUATION"
  | "AGENT_EVALUATION"
  | "GUARDRAIL_TESTING";

export type ExperimentTrafficMode = "SHADOW_MODE" | "CANARY_RELEASE" | "AB_SPLIT";
export type ExperimentStatus = "RUNNING" | "PROMOTED_TO_PRODUCTION" | "ROLLED_BACK" | "PAUSED";

export interface AiExperimentRecord {
  id: string;
  experimentType: ExperimentType;
  title: string;
  trafficMode: ExperimentTrafficMode;
  baselineCandidateName: string; // e.g. "GPT-4o Prompt v2.4"
  experimentalCandidateName: string; // e.g. "GPT-4o Prompt v2.5-Optimized"
  trafficSharePercent: number; // e.g. 10%
  status: ExperimentStatus;
  totalEvaluatedQueriesCount: number;
  baselineAccuracyScorePercent: number;
  experimentalAccuracyScorePercent: number;
  isRegressionDetected: boolean;
  aiOptimizationTip: string;
  startedAt: Date;
}

export interface AiExperimentationSummary {
  activeExperimentsCount: number;
  totalEvaluatedQueries24h: number;
  automatedRegressionsPreventedCount: number;
  averageEvaluationConfidencePercent: number;
  aiExperimentationInsightNote: string;
}

export class AiExperimentationEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_EXPERIMENTS_V1";

  /**
   * AI Deney Kayıtlarını Getirir
   */
  public static async getExperiments(): Promise<AiExperimentRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "exp_101",
        experimentType: "PROMPT_TESTS",
        title: "Concierge Agent Boğaz Mekan Öneri İstem Optimize Testi",
        trafficMode: "CANARY_RELEASE",
        baselineCandidateName: "Prompt v2026.4",
        experimentalCandidateName: "Prompt v2026.5-ChainOfThought",
        trafficSharePercent: 15,
        status: "RUNNING",
        totalEvaluatedQueriesCount: 1420,
        baselineAccuracyScorePercent: 98.2,
        experimentalAccuracyScorePercent: 99.6,
        isRegressionDetected: false,
        aiOptimizationTip: "Aday istem (v2026.5) doğruluk oranını %1.4 artırdı ve token maliyetini düşürdü. Canlıya alınması önerilir.",
        startedAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "exp_102",
        experimentType: "MODEL_COMPARISON",
        title: "Sözleşme Analizinde Claude-3.5 vs. GPT-4o Gölge Mod Testi",
        trafficMode: "SHADOW_MODE",
        baselineCandidateName: "GPT-4o Primary",
        experimentalCandidateName: "Claude-3.5-Sonnet Shadow",
        trafficSharePercent: 100, // Mirroring 100% production queries in background
        status: "RUNNING",
        totalEvaluatedQueriesCount: 380,
        baselineAccuracyScorePercent: 99.1,
        experimentalAccuracyScorePercent: 99.4,
        isRegressionDetected: false,
        aiOptimizationTip: "Gölge modunda Claude-3.5 hukuki maddelerde %0.3 daha yüksek doğruluk yakaladı.",
        startedAt: new Date("2026-07-29T14:30:00"),
      },
      {
        id: "exp_103",
        experimentType: "GUARDRAIL_TESTING",
        title: "Finansal PII Redaction Kalkanı Stres Testi",
        trafficMode: "AB_SPLIT",
        baselineCandidateName: "Standard RegEx Shield",
        experimentalCandidateName: "WedyAI Hybrid NER Shield",
        trafficSharePercent: 50,
        status: "RUNNING",
        totalEvaluatedQueriesCount: 890,
        baselineAccuracyScorePercent: 98.0,
        experimentalAccuracyScorePercent: 99.8,
        isRegressionDetected: false,
        aiOptimizationTip: "Hibrit kalkan sıfır hatalı pozitif (False Positive) ile PII yakalama başarısı gösterdi.",
        startedAt: new Date("2026-07-29T16:00:00"),
      },
    ];
  }

  /**
   * Deney Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<AiExperimentationSummary> {
    return {
      activeExperimentsCount: 3,
      totalEvaluatedQueries24h: 2690,
      automatedRegressionsPreventedCount: 5,
      averageEvaluationConfidencePercent: 99.2,
      aiExperimentationInsightNote: "A/B, Gölge Modu ve Canary testleri sayesinde 5 olası model regresyonu canlıya çıkmadan otonom engellenmiştir.",
    };
  }

  /**
   * Deneyi Canlıya Alma (Promote to Production) Simülasyonu
   */
  public static async promoteExperiment(experimentId: string): Promise<boolean> {
    const experiments = await this.getExperiments();
    const idx = experiments.findIndex((e) => e.id === experimentId);

    if (idx !== -1) {
      experiments[idx].status = "PROMOTED_TO_PRODUCTION";
      experiments[idx].trafficSharePercent = 100;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(experiments));
      }
      return true;
    }
    return false;
  }
}