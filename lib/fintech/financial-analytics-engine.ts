export type FinancialRoleViewport = "CEO" | "CFO" | "FINANCE" | "MARKETPLACE";

export interface FinancialTelemetryMetrics {
  grossMarketplaceVolumeGmv: number;
  netRevenueTotal: number;
  operationalExpensesTotal: number;
  netProfitMarginAmount: number;
  netProfitMarginPercent: number; // e.g. 68.5%
  totalCommissionCollected: number;
  totalSubscriptionsMrr: number;
  totalEscrowHeldValue: number;
  walletVelocityDailyAverage: number;
  currency: string;
}

export interface FinancialAnomalyAlert {
  id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  title: string;
  description: string;
  suggestedAction: string;
  detectedAt: Date;
}

export interface FinancialForecastReport {
  projectedRevenue30Days: number;
  projectedRevenue60Days: number;
  projectedRevenue90Days: number;
  currency: string;
  aiCostOptimizationTip: string;
  aiGrowthTrajectorySummary: string;
}

export class FinancialAnalyticsEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINANCIAL_ANALYTICS_V1";

  /**
   * Küresel Finansal Telemetri Metriklerini Getirir
   */
  public static async getMetrics(): Promise<FinancialTelemetryMetrics> {
    return {
      grossMarketplaceVolumeGmv: 24800000,
      netRevenueTotal: 3840000,
      operationalExpensesTotal: 1210000,
      netProfitMarginAmount: 2630000,
      netProfitMarginPercent: 68.5,
      totalCommissionCollected: 2604000,
      totalSubscriptionsMrr: 1236000,
      totalEscrowHeldValue: 4200000,
      walletVelocityDailyAverage: 820000,
      currency: "TRY",
    };
  }

  /**
   * WedyAI 30/60/90 Günlük Gelir Tahmin Raporunu Getirir
   */
  public static async getForecast(): Promise<FinancialForecastReport> {
    return {
      projectedRevenue30Days: 4380000,
      projectedRevenue60Days: 9120000,
      projectedRevenue90Days: 14200000,
      currency: "TRY",
      aiCostOptimizationTip: "Bulut sunucu ve ödeme ağ geçidi komisyon giderlerinde toplu pazarlık ile aylık ₺85.000 TL maliyet tasarrufu yapılabilir.",
      aiGrowthTrajectorySummary: "Escrow kilitli bakiye serbest bırakma hızı geçen aya göre %28 arttı. Net kar marjı %68.5 ile rekor seviyede.",
    };
  }

  /**
   * Aktif Finansal Anomali ve Risk Uyarılarını Getirir
   */
  public static async getAnomalies(): Promise<FinancialAnomalyAlert[]> {
    return [
      {
        id: "anom_101",
        severity: "INFO",
        title: "KDV Vergi Rezervi Otomatik Senkronizasyonu",
        description: "Aylık ₺3.690.000 TL KDV vergi rezervi ayrıldı ve vergi dairesi hesabına kilitlendi.",
        suggestedAction: "KDV iade beyannamesi e-fatura kütüğüne otomatik iletildi.",
        detectedAt: new Date("2026-07-28"),
      },
    ];
  }
}