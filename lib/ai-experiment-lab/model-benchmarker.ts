import { RunModelExperimentInput } from "@/lib/validations/ai-experiment-lab";

export interface ModelBenchmarkResult {
  experimentId: string;
  category: string;
  testPrompt: string;
  winningModel: string;
  winningReason: string;
  costSavingsPct: number;
  variants: Array<{
    modelName: string;
    provider: string;
    latencyMs: number;
    costUsdPer1kTokens: number;
    qualityScorePct: number;
    responseSample: string;
    isWinner: boolean;
  }>;
}

export function executeModelBenchmark(input: RunModelExperimentInput): ModelBenchmarkResult {
  const experimentId = "exp_lab_" + Math.random().toString(36).substring(2, 9);

  return {
    experimentId,
    category: input.category,
    testPrompt: input.testPrompt,
    winningModel: "claude-3-5-sonnet",
    winningReason: "%98.5 Yanıt kalitesi ve 140ms ultra-düşük gecikme ile en optimum performans",
    costSavingsPct: 42.5,
    variants: [
      {
        modelName: "claude-3-5-sonnet",
        provider: "Anthropic",
        latencyMs: 140,
        costUsdPer1kTokens: 0.003,
        qualityScorePct: 98.5,
        responseSample: "Bodrum kır düğünü için en uygun bütçe ve konsept önerileri hazırlandı.",
        isWinner: true,
      },
      {
        modelName: "gpt-4o",
        provider: "OpenAI",
        latencyMs: 220,
        costUsdPer1kTokens: 0.005,
        qualityScorePct: 97.8,
        responseSample: "Bodrum bölgesinde kır düğünü planlayan çiftler için detaylı maliyet analizi.",
        isWinner: false,
      },
      {
        modelName: "gemini-1.5-pro",
        provider: "Google Gemini",
        latencyMs: 180,
        costUsdPer1kTokens: 0.0025,
        qualityScorePct: 94.2,
        responseSample: "Kır bahçesi konseptinde mekan ve tedarikçi eşleştirmesi tamamlandı.",
        isWinner: false,
      },
    ],
  };
}
