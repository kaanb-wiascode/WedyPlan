export interface ModelPerformanceMetric {
    modelName: string; // e.g. "GPT-4o", "Claude-3.5-Sonnet", "Llama-3-70B-Local"
    averageLatencyMs: number;
    tokensConsumed24h: number;
    totalCostUsd24h: number;
    accuracyScorePercent: number; // 0-100%
    userCsatScorePercent: number; // 0-100%
    activePromptVersion: string;
    aiCostEfficiencyTip: string;
  }
  
  export interface AgentTraceSpan {
    id: string;
    agentName: string;
    promptVersion: string;
    traceName: string; // e.g. "RAG Vector Query -> GPT-4o Generation"
    latencyMs: number;
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
    status: "SUCCESS" | "DEGRADED" | "ALERT";
    timestamp: Date;
  }
  
  export interface AiObservabilitySummary {
    totalTokensConsumed24h: number;
    totalInferenceCostUsd24h: number;
    averageGlobalLatencyMs: number;
    overallAiCsatPercent: number;
    aiObservabilityInsightNote: string;
  }
  
  export class AiObservabilityEngine {
    private static STORAGE_KEY = "WEDYPLAN_AI_OBSERVABILITY_V1";
  
    /**
     * Model Performans ve Maliyet Metriklerini Getirir
     */
    public static async getModelMetrics(): Promise<ModelPerformanceMetric[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          modelName: "GPT-4o (Primary Gateway)",
          averageLatencyMs: 142,
          tokensConsumed24h: 4850000,
          totalCostUsd24h: 24.25,
          accuracyScorePercent: 99.4,
          userCsatScorePercent: 98.6,
          activePromptVersion: "v2026.4.1",
          aiCostEfficiencyTip: "En yüksek doğruluk (%99.4). Kompleks düğün bütçelendirmeleri için varsayılan model.",
        },
        {
          modelName: "Claude-3.5-Sonnet (Reasoning Engine)",
          averageLatencyMs: 168,
          tokensConsumed24h: 2120000,
          totalCostUsd24h: 15.90,
          accuracyScorePercent: 99.1,
          userCsatScorePercent: 97.8,
          activePromptVersion: "v2026.3.8",
          aiCostEfficiencyTip: "Sözleşme ve KVKK uyum analizlerinde yüksek performans.",
        },
        {
          modelName: "Llama-3-70B-Local (Air-Gapped Privacy)",
          averageLatencyMs: 85,
          tokensConsumed24h: 8400000,
          totalCostUsd24h: 0.00, // On-prem zero cloud cost
          accuracyScorePercent: 97.5,
          userCsatScorePercent: 96.4,
          activePromptVersion: "v2026.2.0",
          aiCostEfficiencyTip: "Yerel sunucu kullanımı sayesinde bulut API maliyeti sıfırlanmıştır ($0.00 USD).",
        },
      ];
    }
  
    /**
     * Dağıtık İzleme (Distributed Traces) Listesini Getirir
     */
    public static async getTraceSpans(): Promise<AgentTraceSpan[]> {
      return [
        {
          id: "trc_101",
          agentName: "WedyAI Concierge Agent",
          promptVersion: "v2026.4.1",
          traceName: "Vector RAG -> Venue Selection -> Response",
          latencyMs: 124,
          inputTokens: 1420,
          outputTokens: 380,
          costUsd: 0.009,
          status: "SUCCESS",
          timestamp: new Date("2026-07-29T20:45:00"),
        },
        {
          id: "trc_102",
          agentName: "Finance Escrow Agent",
          promptVersion: "v2026.3.8",
          traceName: "Escrow Verify -> PII Shield -> FAST API",
          latencyMs: 82,
          inputTokens: 890,
          outputTokens: 210,
          costUsd: 0.004,
          status: "SUCCESS",
          timestamp: new Date("2026-07-29T20:30:00"),
        },
      ];
    }
  
    /**
     * Gözlemlenebilirlik Platformu Özetini Getirir
     */
    public static async getSummary(): Promise<AiObservabilitySummary> {
      return {
        totalTokensConsumed24h: 15370000,
        totalInferenceCostUsd24h: 40.15,
        averageGlobalLatencyMs: 118,
        overallAiCsatPercent: 97.6,
        aiObservabilityInsightNote: "Çoklu-model yönlendirmesi (Llama-3 yerel yük aktarımı) günlük bulut API maliyetlerini %64 azaltarak $40.15 USD seviyesine düşürmüştür.",
      };
    }
  }