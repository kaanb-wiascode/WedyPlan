export type DecisionDomain =
  | "SALES"
  | "MARKETING"
  | "FINANCE"
  | "OPERATIONS"
  | "MARKETPLACE"
  | "CUSTOMER_SUCCESS"
  | "GROWTH";

export interface DecisionScenarioOption {
  optionKey: string;
  title: string;
  projectedRevenueImpactAmountUsd: number;
  projectedRiskScorePercent: number; // Low is better
  confidenceScorePercent: number; // 0-100%
  strategicExplanationText: string;
}

export interface EnterpriseDecisionItem {
  id: string;
  domain: DecisionDomain;
  decisionTitle: string;
  problemStatement: string;
  recommendedOptionKey: string;
  scenarioOptions: DecisionScenarioOption[];
  aiRiskLevel: "LOW" | "MEDIUM" | "HIGH";
  aiConfidenceScorePercent: number;
  aiExplanationChain: string;
  isExecuted: boolean;
  updatedAt: Date;
}

export interface DecisionSupportSummary {
  totalAnalyzedDecisionsCount: number;
  averageDecisionConfidencePercent: number;
  simulatedGmvImpactTotalUsd: number;
  aiDecisionInsightNote: string;
}

export class AiDecisionSupportEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_DECISION_SUPPORT_V1";

  /**
   * Stratejik Karar Destek Kayıtlarını Getirir
   */
  public static async getDecisionItems(): Promise<EnterpriseDecisionItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "dec_101",
        domain: "MARKETPLACE",
        decisionTitle: "AB (DE) Bölgesi Pazaryeri Komisyon (Take-Rate) Optimizasyonu",
        problemStatement: "Almanya pazarı tedarikçi büyümesi +%28.5 seviyesindedir, ancak rakip platformlar komisyonu %10.0 seviyesinde tutmaktadır.",
        recommendedOptionKey: "OPT_DYNAMIC_TIER",
        scenarioOptions: [
          {
            optionKey: "OPT_MAINTAIN_12.5",
            title: "Mevcut %12.5 Sabit Komisyonu Koru",
            projectedRevenueImpactAmountUsd: 420000,
            projectedRiskScorePercent: 35,
            confidenceScorePercent: 88,
            strategicExplanationText: "Kısa vadeli marjı korur fakat yeni tedarikçi katılımını %14 yavaşlatabilir.",
          },
          {
            optionKey: "OPT_DYNAMIC_TIER",
            title: "Hacim Bazlı Kademeli Komisyon (%10-%12.5)",
            projectedRevenueImpactAmountUsd: 680000,
            projectedRiskScorePercent: 12,
            confidenceScorePercent: 96,
            strategicExplanationText: "Yüksek hacimli lüks mekanları elde tutarken pazaryeri likiditesini %22 artırır.",
          },
        ],
        aiRiskLevel: "LOW",
        aiConfidenceScorePercent: 96,
        aiExplanationChain: "WedyAI Analizi: Hacim bazlı kademeli model (Dynamic Tiering) hem tedarikçi tutundurma hem de toplam GMV büyümesinde en optimal senaryodur.",
        isExecuted: false,
        updatedAt: new Date("2026-07-29T20:00:00"),
      },
      {
        id: "dec_102",
        domain: "FINANCE",
        decisionTitle: "Körfez (BAE) Çoklu Para Birimli Escrow Kur Risk Sigortası",
        problemStatement: "AED/USD ve AED/TRY çapraz kurlarındaki dalgalanmalar yüksek tutarlı VIP depozitolarında risk yaratmaktadır.",
        recommendedOptionKey: "OPT_FX_HEDGE",
        scenarioOptions: [
          {
            optionKey: "OPT_FX_HEDGE",
            title: "Otomatik FX Hedging & Sabit Kur Kilitlenmesi",
            projectedRevenueImpactAmountUsd: 290000,
            projectedRiskScorePercent: 5,
            confidenceScorePercent: 98,
            strategicExplanationText: "Phase 11 Escrow kasasındaki kurları sabitleyerek sıfır kayıp garantisi sunar.",
          },
        ],
        aiRiskLevel: "LOW",
        aiConfidenceScorePercent: 98,
        aiExplanationChain: "WedyAI Analizi: Kur riski otomatik sigortalandığında işlem tamamlama oranı %99.4'e yükselmektedir.",
        isExecuted: true,
        updatedAt: new Date("2026-07-29T19:30:00"),
      },
    ];
  }

  /**
   * Karar Destek Özetini Getirir
   */
  public static async getSummary(): Promise<DecisionSupportSummary> {
    return {
      totalAnalyzedDecisionsCount: 14,
      averageDecisionConfidencePercent: 96.5,
      simulatedGmvImpactTotalUsd: 1420000,
      aiDecisionInsightNote: "WedyAI karar destek motoru %96.5 ortalama güven skoru ve çoklu-senaryo projeksiyonlarıyla karar riskini %38 azaltmaktadır.",
    };
  }

  /**
   * Stratejik Kararı Onaylama ve Uygulama Simülasyonu
   */
  public static async executeDecision(decisionId: string): Promise<boolean> {
    const items = await this.getDecisionItems();
    const idx = items.findIndex((d) => d.id === decisionId);

    if (idx !== -1) {
      items[idx].isExecuted = true;
      items[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      }
      return true;
    }
    return false;
  }
}