export type DashboardRole = "EXECUTIVE" | "MARKETING" | "SALES" | "VENDOR_GROWTH" | "CUSTOMER_GROWTH";

export interface FunnelAcquisitionMetric {
  stageName: string;
  count: number;
  conversionPercent: number;
  growthDeltaPercent: number; // e.g. +14.2%
}

export interface RevenueGrowthBreakdown {
  gmvTotal: number;
  mrrTotal: number;
  netPlatformTakeRateGmv: number;
  cacToLtvRatio: number;
  churnRatePercent: number;
  currency: string;
}

export interface AiGrowthAnomaly {
  id: string;
  metricName: string;
  anomalyType: "SPIKE_POSITIVE" | "DROP_NEGATIVE" | "OPPORTUNITY_DETECTED";
  description: string;
  recommendedAction: string;
  detectedAt: Date;
}

export class GrowthAnalyticsEngine {
  private static STORAGE_KEY = "WEDYPLAN_GROWTH_ANALYTICS_V1";

  /**
   * Yönetici ve Departman Bazlı Metrik Özetini Getirir
   */
  public static async getRevenueBreakdown(): Promise<RevenueGrowthBreakdown> {
    return {
      gmvTotal: 14200000,
      mrrTotal: 840000,
      netPlatformTakeRateGmv: 1840000,
      cacToLtvRatio: 6.8,
      churnRatePercent: 2.1,
      currency: "TRY",
    };
  }

  /**
   * Akıllı AARRR (Acquisition, Activation, Retention, Revenue, Referral) Huni Metriklerini Getirir
   */
  public static async getAcquisitionFunnel(): Promise<FunnelAcquisitionMetric[]> {
    return [
      { stageName: "1. Organik & Ücretli Trafik (Acquisition)", count: 284000, conversionPercent: 100, growthDeltaPercent: 18.4 },
      { stageName: "2. Kayıt & Bütçe Oluşturma (Activation)", count: 82400, conversionPercent: 29.0, growthDeltaPercent: 12.1 },
      { stageName: "3. Sözleşme İnceleme & E-İmza (Retention)", count: 24100, conversionPercent: 8.4, growthDeltaPercent: 22.5 },
      { stageName: "4. Escrow Kapora Ödemesi (Revenue)", count: 18200, conversionPercent: 6.4, growthDeltaPercent: 28.0 },
      { stageName: "5. Arkadaş Daveti & Paylaşım (Referral)", count: 8900, conversionPercent: 3.1, growthDeltaPercent: 34.2 },
    ];
  }

  /**
   * WedyAI Anomali Tespiti ve Tahminsel Fırsat Analizörünü Getirir
   */
  public static async getAiAnomalies(): Promise<AiGrowthAnomaly[]> {
    return [
      {
        id: "anom_101",
        metricName: "Bodrum Bölgesi Teklif Dönüşümü",
        anomalyType: "SPIKE_POSITIVE",
        description: "Bodrum lüks kır düğünü tekliflerinin e-imzalı sözleşmeye dönüşme hızı son 7 günde %42 sıçradı.",
        recommendedAction: "Bodrum bölgesindeki Facebook/Meta retargeting reklam bütçesini 1.5x artırın.",
        detectedAt: new Date("2026-07-28"),
      },
      {
        id: "anom_102",
        metricName: "Catering Kategorisi Terk Etme",
        anomalyType: "DROP_NEGATIVE",
        description: "Catering teklif adımlarında çiftlerin %18'i menü fiyat detayında adımı terk ediyor.",
        recommendedAction: "Catering tedarikçileri için 'Paket Fiyat Şeffaflığı' rozetini zorunlu kılın.",
        detectedAt: new Date("2026-07-27"),
      },
    ];
  }
}