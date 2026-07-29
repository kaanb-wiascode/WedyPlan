export type ExecutiveInsightDomain =
  | "REVENUE"
  | "GROWTH"
  | "OPERATIONS"
  | "FINANCE"
  | "MARKETPLACE"
  | "CUSTOMER_SUCCESS"
  | "GLOBAL_EXPANSION";

export interface ExecutiveBriefingItem {
  id: string;
  domain: ExecutiveInsightDomain;
  domainDetails?: string; // Opsiyonel alan eklendi (TS2353 hatasını çözüyor)
  title: string;
  keyMetricValueText: string;
  quarterlyChangePercent: number; // e.g. +24.8%
  aiStrategicRecommendation: string;
  projectedImpactUsd: number;
  confidenceScorePercent: number; // 0-100%
  isActionable: boolean;
  generatedAt: Date;
}

export interface ExecutivePlatformSummary {
  consolidatedGmvTargetUsd: number;
  activeGlobalMarketsCount: number;
  averageLtvCacRatio: number;
  executiveConfidenceIndexPercent: number;
  aiExecutiveInsightNote: string;
}

export class AiExecutiveIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_EXECUTIVE_INTELLIGENCE_V1";

  /**
   * C-Suite Stratejik Raporları Getirir
   */
  public static async getBriefingItems(): Promise<ExecutiveBriefingItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ex_101",
        domain: "GLOBAL_EXPANSION",
        title: "Körfez (BAE/KSA) Destinasyon Düğün Büyüme Analizi",
        keyMetricValueText: "$14.2M USD Projected GMV",
        quarterlyChangePercent: 34.2,
        aiStrategicRecommendation: "Riyad ve Dubai VIP mekan ağını %25 genişletmek 2027 Q3 GMV'sini $4.8M artırabilir.",
        projectedImpactUsd: 4800000,
        confidenceScorePercent: 98.4,
        isActionable: true,
        generatedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "ex_102",
        domain: "REVENUE",
        domainDetails: "Phase 11 Escrow & Komisyon Gelirleri",
        title: "Pazaryeri Komisyonu (Take-Rate) & Escrow Verimliliği",
        keyMetricValueText: "%12.4 Net Yield",
        quarterlyChangePercent: 4.8,
        aiStrategicRecommendation: "AB bölgesinde kademeli komisyon modeline geçiş tedarikçi churn oranını %1.2 düşürecektir.",
        projectedImpactUsd: 1200000,
        confidenceScorePercent: 97.6,
        isActionable: true,
        generatedAt: new Date("2026-07-29T20:00:00"),
      },
      {
        id: "ex_103",
        domain: "GROWTH",
        title: "Küresel Çift Edinme Maliyeti (LTV / CAC Dengesi)",
        keyMetricValueText: "6.4x LTV / CAC",
        quarterlyChangePercent: 12.1,
        aiStrategicRecommendation: "İngiltere (UK) sosyal medya reklam bütçesini %15 artırmak VIP Lüks çift hacmini yükseltecektir.",
        projectedImpactUsd: 850000,
        confidenceScorePercent: 99.1,
        isActionable: true,
        generatedAt: new Date("2026-07-29T19:15:00"),
      },
    ];
  }

  /**
   * Yönetici Platform Özetini Getirir
   */
  public static async getSummary(): Promise<ExecutivePlatformSummary> {
    return {
      consolidatedGmvTargetUsd: 48500000,
      activeGlobalMarketsCount: 14,
      averageLtvCacRatio: 6.4,
      executiveConfidenceIndexPercent: 98.6,
      aiExecutiveInsightNote: "Executive Copilot, 14 küresel pazardaki GMV tahminleri ve %98.6 güven skoru ile C-Suite için stratejik kararları otomatize etmektedir.",
    };
  }

  /**
   * Stratejik Kararı Onaylama Simülasyonu
   */
  public static async approveStrategicAction(briefingId: string): Promise<boolean> {
    const items = await this.getBriefingItems();
    const idx = items.findIndex((b) => b.id === briefingId);

    if (idx !== -1) {
      items[idx].isActionable = false;
      items[idx].generatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      }
      return true;
    }
    return false;
  }
}