export type ExecutiveRole = "CEO" | "CMO" | "GROWTH" | "SALES";

export interface GlobalGrowthMetrics {
  totalGmvAmount: number;
  monthlyRecurringRevenue: number;
  activeEscrowValue: number;
  viralKFactor: number;
  cacToLtvRatio: number;
  overallBrandReputationScore: number;
  activeCampaignsCount: number;
  totalVerifiedReviewsCount: number;
  currency: string;
}

export interface ExecutiveInsight {
  id: string;
  category: "OPPORTUNITY" | "RISK_ALERT" | "FORECAST";
  headline: string;
  description: string;
  actionableStep: string;
  projectedGmvImpact: string;
  detectedAt: Date;
}

export class GrowthCommandEngine {
  private static STORAGE_KEY = "WEDYPLAN_GROWTH_COMMAND_VAULT_V1";

  /**
   * Küresel Büyüme ve Performans Metriklerini Getirir
   */
  public static async getGlobalMetrics(): Promise<GlobalGrowthMetrics> {
    return {
      totalGmvAmount: 18450000,
      monthlyRecurringRevenue: 1240000,
      activeEscrowValue: 4200000,
      viralKFactor: 1.42,
      cacToLtvRatio: 7.2,
      overallBrandReputationScore: 96,
      activeCampaignsCount: 14,
      totalVerifiedReviewsCount: 3840,
      currency: "TRY",
    };
  }

  /**
   * Otonom WedyAI Büyüme ve Yönetici Tavsiyelerini Getirir
   */
  public static async getExecutiveInsights(): Promise<ExecutiveInsight[]> {
    return [
      {
        id: "ins_101",
        category: "OPPORTUNITY",
        headline: "Ege & Bodrum Bölgesi Lüks Kır Düğünü Sıçraması",
        description: "Bodrum bölgesinde e-imzalı sözleşme imzalayan çiftlerin kiralama hacmi son 14 günde %38 arttı.",
        actionableStep: "Bodrum bölgesindeki affiliate komisyonlarını %15'ten %18'e yükseltin ve WhatsApp kampanyasını aktif edin.",
        projectedGmvImpact: "+₺650.000 TL İlave GMV",
        detectedAt: new Date("2026-07-28"),
      },
      {
        id: "ins_102",
        category: "FORECAST",
        headline: "30 Günlük GMV Tahmin Raporu",
        description: "Yaz dönemi rezervasyon piki ve Escrow kapora tamamlanma hızı sayesinde önümüzdeki 30 günde GMV hedefi aşılacaktır.",
        actionableStep: "Yüksek hacimli otel zincirleri için B2B Escrow limitini artırın.",
        projectedGmvImpact: "₺22.5M TL Hedeflenen GMV",
        detectedAt: new Date("2026-07-27"),
      },
    ];
  }
}