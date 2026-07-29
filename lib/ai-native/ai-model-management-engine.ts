export type ModelProviderType = "OPENAI" | "GOOGLE" | "ANTHROPIC" | "OPEN_SOURCE_LOCAL" | "CUSTOM_FUTURE";
export type ModelStatus = "HEALTHY" | "DEGRADED" | "FAILOVER_ACTIVE" | "OFFLINE";

export interface RegisteredModelRecord {
  id: string;
  modelIdentifier: string; // e.g. "gpt-4o", "gemini-1.5-pro", "claude-3-5-sonnet", "llama-3-70b"
  provider: ModelProviderType;
  versionTag: string; // e.g. "v2026.07"
  status: ModelStatus;
  inputCostPer1mTokensUsd: number;
  outputCostPer1mTokensUsd: number;
  averageLatencyMs: number;
  qualityBenchmarkScorePercent: number; // 0-100%
  fallbackModelId: string;
  isAbTestActive: boolean;
  abTestTrafficSharePercent: number;
  aiRoutingPriorityRank: number; // 1, 2, 3...
  aiEfficiencyTip: string;
  updatedAt: Date;
}

export interface ModelManagementSummary {
  totalRegisteredModelsCount: number;
  activeProvidersCount: number;
  totalRequestsRouted24h: number;
  averageFailoverTimeMs: number;
  totalCostSavedPercent: number;
  aiModelManagementInsightNote: string;
}

export class AiModelManagementEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_MODEL_MANAGEMENT_V1";

  /**
   * Kayıtlı AI Modellerini Getirir
   */
  public static async getRegisteredModels(): Promise<RegisteredModelRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "mdl_gpt4o",
        modelIdentifier: "gpt-4o",
        provider: "OPENAI",
        versionTag: "v2026.07-GA",
        status: "HEALTHY",
        inputCostPer1mTokensUsd: 5.00,
        outputCostPer1mTokensUsd: 15.00,
        averageLatencyMs: 142,
        qualityBenchmarkScorePercent: 99.4,
        fallbackModelId: "mdl_gemini_pro",
        isAbTestActive: true,
        abTestTrafficSharePercent: 60,
        aiRoutingPriorityRank: 1,
        aiEfficiencyTip: "Karmaşık düğün bütçelendirmesi ve çoklu-modal analizlerde 1. tercih.",
        updatedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "mdl_claude_sonnet",
        modelIdentifier: "claude-3-5-sonnet",
        provider: "ANTHROPIC",
        versionTag: "v2026.06",
        status: "HEALTHY",
        inputCostPer1mTokensUsd: 3.00,
        outputCostPer1mTokensUsd: 15.00,
        averageLatencyMs: 168,
        qualityBenchmarkScorePercent: 99.1,
        fallbackModelId: "mdl_gpt4o",
        isAbTestActive: true,
        abTestTrafficSharePercent: 40,
        aiRoutingPriorityRank: 2,
        aiEfficiencyTip: "Hukuki sözleşme ve KVKK uyum denetimlerinde yüksek akıl yürütme başarısı.",
        updatedAt: new Date("2026-07-29T20:00:00"),
      },
      {
        id: "mdl_gemini_pro",
        modelIdentifier: "gemini-1.5-pro",
        provider: "GOOGLE",
        versionTag: "v2026.05",
        status: "HEALTHY",
        inputCostPer1mTokensUsd: 2.50,
        outputCostPer1mTokensUsd: 10.00,
        averageLatencyMs: 110,
        qualityBenchmarkScorePercent: 98.2,
        fallbackModelId: "mdl_llama_local",
        isAbTestActive: false,
        abTestTrafficSharePercent: 0,
        aiRoutingPriorityRank: 3,
        aiEfficiencyTip: "Görsel mekan tespiti ve uzun bağlam (Long-Context) işlemlerinde optimal.",
        updatedAt: new Date("2026-07-29T19:15:00"),
      },
      {
        id: "mdl_llama_local",
        modelIdentifier: "llama-3-70b-instruct",
        provider: "OPEN_SOURCE_LOCAL",
        versionTag: "v2026.02-Local",
        status: "HEALTHY",
        inputCostPer1mTokensUsd: 0.00, // On-Prem Zero API Cost
        outputCostPer1mTokensUsd: 0.00,
        averageLatencyMs: 85,
        qualityBenchmarkScorePercent: 97.5,
        fallbackModelId: "mdl_gpt4o",
        isAbTestActive: false,
        abTestTrafficSharePercent: 0,
        aiRoutingPriorityRank: 4,
        aiEfficiencyTip: "Air-gapped yerel finansal işlemler için $0 API maliyetiyle çalışır.",
        updatedAt: new Date("2026-07-29T18:00:00"),
      },
    ];
  }

  /**
   * Model Yönetim Özetini Getirir
   */
  public static async getSummary(): Promise<ModelManagementSummary> {
    return {
      totalRegisteredModelsCount: 4,
      activeProvidersCount: 4,
      totalRequestsRouted24h: 18420,
      averageFailoverTimeMs: 14,
      totalCostSavedPercent: 42.8,
      aiModelManagementInsightNote: "Akıllı Model Yönlendiricisi (Smart Router) basit sorguları yerel Llama-3 modeline yönlendirerek günlük API maliyetini %42.8 düşürmüştür.",
    };
  }

  /**
   * Model Yönlendirme Onaylama & Fallback Tetikleme Simülasyonu
   */
  public static async updateModelPriority(modelId: string, newRank: number): Promise<boolean> {
    const models = await this.getRegisteredModels();
    const idx = models.findIndex((m) => m.id === modelId);

    if (idx !== -1) {
      models[idx].aiRoutingPriorityRank = newRank;
      models[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(models));
      }
      return true;
    }
    return false;
  }
}