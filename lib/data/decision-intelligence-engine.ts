export type DecisionDomainArea =
  | "GROWTH"
  | "MARKETING"
  | "FINANCE"
  | "MARKETPLACE"
  | "OPERATIONS"
  | "EXECUTIVE";

export type DecisionImpactLevel = "LOW_RISK_HIGH_YIELD" | "MODERATE_RISK" | "HIGH_RISK_CRITICAL";

export interface DecisionScenarioRecord {
  id: string;
  scenarioTitle: string; // e.g. "Körfez Lüks Mekan Komisyon Yükseltimi (%10 -> %12)"
  domain: DecisionDomainArea;
  whatIfVariablesSummary: string; // e.g. "Vendor Tier: VIP, Target Region: GCC, Rate Shift: +2.0%"
  projectedRevenueDeltaUsd: number; // e.g. +$420,000 USD
  projectedPartnerRetentionPercent: number; // e.g. 98.2%
  riskScorePercent: number; // 0-100%
  aiConfidenceScorePercent: number; // 0-100%
  impactLevel: DecisionImpactLevel;
  aiRecommendationNote: string;
  simulatedAt: Date;
}

export interface DecisionIntelligencePlatformSummary {
  totalSimulatedScenariosCount: number;
  averageConfidenceScorePercent: number;
  averageRiskScorePercent: number;
  highYieldDecisionsReadyCount: number;
  aiDecisionInsightNote: string;
}

export class DecisionIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_DECISION_INTELLIGENCE_V1";

  /**
   * Karar Senaryo Kayıtlarını Getirir
   */
  public static async getScenarios(): Promise<DecisionScenarioRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "dec_101",
        scenarioTitle: "Körfez Lüks Mekan Komisyon Yükseltimi (%10 -> %12)",
        domain: "FINANCE",
        whatIfVariablesSummary: "Hedef Bölge: KSA & BAE, Tedarikçi Segmenti: VIP, Komisyon: +%2.0",
        projectedRevenueDeltaUsd: 420000,
        projectedPartnerRetentionPercent: 98.2,
        riskScorePercent: 12.4,
        aiConfidenceScorePercent: 96.8,
        impactLevel: "LOW_RISK_HIGH_YIELD",
        aiRecommendationNote: "WedyAI Karar Tavsiyesi: Düşük risk skoru (%12.4) ile yıllık +$420K net Escrow getirisi öngörülmektedir. Uygulama önerilir.",
        simulatedAt: new Date("2026-07-29T22:55:00"),
      },
      {
        id: "dec_102",
        scenarioTitle: "Bodrum Sezonluk Tedarikçi Erken Kayıt Escrow İndirimi",
        domain: "MARKETPLACE",
        whatIfVariablesSummary: "Erken kilit indirimi: -%1.5, Erken rezervasyon hacim artış beklentisi: +%35",
        projectedRevenueDeltaUsd: 280000,
        projectedPartnerRetentionPercent: 99.4,
        riskScorePercent: 8.5,
        aiConfidenceScorePercent: 98.2,
        impactLevel: "LOW_RISK_HIGH_YIELD",
        aiRecommendationNote: "Pazaryeri hacmini %35 büyütecek ve tedarikçi bağlılığını artıracak yüksek verimli karar.",
        simulatedAt: new Date("2026-07-29T22:40:00"),
      },
      {
        id: "dec_103",
        scenarioTitle: "Yapay Zeka Destekli Otomatik Müşteri Kazanım Bütçe Artırımı",
        domain: "MARKETING",
        whatIfVariablesSummary: "Reklam Harcaması: +$100K/ay, BAE & Avrupa Çift Edinimi",
        projectedRevenueDeltaUsd: 180000,
        projectedPartnerRetentionPercent: 95.0,
        riskScorePercent: 34.0,
        aiConfidenceScorePercent: 88.5,
        impactLevel: "MODERATE_RISK",
        aiRecommendationNote: "Müşteri kazanım maliyeti (CAC) ilk 2 ay yukarılara çıkabilir. Kademeli bütçe artışı önerilir.",
        simulatedAt: new Date("2026-07-29T22:20:00"),
      },
    ];
  }

  /**
   * Karar Platformu Özetini Getirir
   */
  public static async getSummary(): Promise<DecisionIntelligencePlatformSummary> {
    return {
      totalSimulatedScenariosCount: 48,
      averageConfidenceScorePercent: 94.5,
      averageRiskScorePercent: 18.3,
      highYieldDecisionsReadyCount: 12,
      aiDecisionInsightNote: "WedyAI Karar Motoru 48 Ne-Olursa (What-if) senaryosunu %94.5 güven skoruyla simüle etmiş ve $880K potansiyel gelir artışı tespit etmiştir.",
    };
  }

  /**
   * Senaryoyu Yeniden Simüle Etme
   */
  public static async reSimulateScenario(scenarioId: string): Promise<boolean> {
    const scenarios = await this.getScenarios();
    const idx = scenarios.findIndex((s) => s.id === scenarioId);

    if (idx !== -1) {
      scenarios[idx].aiConfidenceScorePercent = 99.0;
      scenarios[idx].simulatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scenarios));
      }
      return true;
    }
    return false;
  }
}