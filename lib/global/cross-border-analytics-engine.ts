export interface CountryPerformanceMetrics {
    countryCode: string; // e.g. "TR", "DE", "AE", "US"
    countryName: string;
    quarterlyRevenueGmvAmount: number;
    currencyCode: string;
    quarterlyGrowthPercent: number; // 👈 Arayüze eklendi
    vendorGrowthPercent: number;
    customerAcquisitionCostUsd: number; // CAC
    customerLifetimeValueUsd: number; // LTV
    marketplaceLiquidityScorePercent: number; // Search to Booking Match Rate
    localizationPerformanceScorePercent: number;
    aiMarketOpportunityRating: number; // 0.0 - 5.0
    aiOpportunityTip: string;
  }
  
  export interface CrossBorderAnalyticsSummary {
    totalAnalyzedTerritoriesCount: number;
    averageCrossBorderLiquidityPercent: number;
    globalLtvToCacRatio: number;
    aiMarketInsightNote: string;
  }
  
  export class CrossBorderAnalyticsEngine {
    private static STORAGE_KEY = "WEDYPLAN_CROSS_BORDER_ANALYTICS_V1";
  
    /**
     * Ülke Bazlı Karşılaştırmalı Performans Metriklerini Getirir
     */
    public static async getCountryMetrics(): Promise<CountryPerformanceMetrics[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          countryCode: "TR",
          countryName: "Türkiye (Ana Merkez)",
          quarterlyRevenueGmvAmount: 18400000,
          currencyCode: "TRY",
          quarterlyGrowthPercent: 34.2, // 👈 Eklendi
          vendorGrowthPercent: 34.2,
          customerAcquisitionCostUsd: 14.5,
          customerLifetimeValueUsd: 210.0, // LTV/CAC ~ 14.4x
          marketplaceLiquidityScorePercent: 98.2,
          localizationPerformanceScorePercent: 100,
          aiMarketOpportunityRating: 4.9,
          aiOpportunityTip: "En yüksek pazar likiditesi ve LTV/CAC verimliliği. Yerel tedarikçi doygunluğu yüksek.",
        },
        {
          countryCode: "DE",
          countryName: "Deutschland (Almanya)",
          quarterlyRevenueGmvAmount: 3200000,
          currencyCode: "EUR",
          quarterlyGrowthPercent: 28.5, // 👈 Eklendi
          vendorGrowthPercent: 28.5,
          customerAcquisitionCostUsd: 42.0,
          customerLifetimeValueUsd: 580.0,
          marketplaceLiquidityScorePercent: 94.5,
          localizationPerformanceScorePercent: 96,
          aiMarketOpportunityRating: 4.7,
          aiOpportunityTip: "Yüksek sepet ortalaması. Türk-Alman çifte vatandaş düğün paketleri %32 net marj üretiyor.",
        },
        {
          countryCode: "AE",
          countryName: "United Arab Emirates (BAE)",
          quarterlyRevenueGmvAmount: 1950000,
          currencyCode: "AED",
          quarterlyGrowthPercent: 41.8,
          vendorGrowthPercent: 24.1, // 👈 Eklendi
          customerAcquisitionCostUsd: 65.0,
          customerLifetimeValueUsd: 1250.0,
          marketplaceLiquidityScorePercent: 92.0,
          localizationPerformanceScorePercent: 92,
          aiMarketOpportunityRating: 4.8,
          aiOpportunityTip: "Lüks segmentte en yüksek LTV ($1,250 USD). VIP Concierge entegrasyonu büyümeyi tetikliyor.",
        },
        {
          countryCode: "US",
          countryName: "United States (Kuzey Amerika)",
          quarterlyRevenueGmvAmount: 1250000,
          currencyCode: "USD",
          quarterlyGrowthPercent: 52.0, // 👈 Eklendi
          vendorGrowthPercent: 52.0,
          customerAcquisitionCostUsd: 58.0,
          customerLifetimeValueUsd: 820.0,
          marketplaceLiquidityScorePercent: 89.4,
          localizationPerformanceScorePercent: 98,
          aiMarketOpportunityRating: 4.6,
          aiOpportunityTip: "En hızlı tedarikçi büyüme ivmesi (+%52). B2B pazarlama harcamaları optimize edilmelidir.",
        },
      ];
    }
  
    /**
     * Çapraz Sınır Analitik Özetini Getirir
     */
    public static async getAnalyticsSummary(): Promise<CrossBorderAnalyticsSummary> {
      return {
        totalAnalyzedTerritoriesCount: 4,
        averageCrossBorderLiquidityPercent: 93.5,
        globalLtvToCacRatio: 12.8,
        aiMarketInsightNote: "Körfez (AE) ve Almanya (DE) pazarlarındaki yüksek LTV oranları, küresel pazarlama bütçesinin bu iki bölgeye kaydırılmasını desteklemektedir.",
      };
    }
  }