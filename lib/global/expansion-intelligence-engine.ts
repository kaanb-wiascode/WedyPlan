export interface CandidateMarketRecord {
    id: string;
    countryCode: string; // e.g. "UK", "SA", "FR", "IT"
    countryName: string;
    targetRegion: string;
    marketPotentialScorePercent: number; // 0-100%
    competitorSaturationScorePercent: number; // Low is better
    destinationWeddingDemandIndex: number; // 0-100
    projected3YearGmvAmountUsd: number;
    priorityRank: number; // 1, 2, 3...
    aiRiskLevel: "LOW" | "MEDIUM" | "HIGH";
    aiExpansionTip: string;
    isReadyForLaunchPipeline: boolean;
  }
  
  export interface ExpansionIntelligenceSummary {
    candidateMarketsCount: number;
    topPriorityCountryCode: string; // "UK"
    averageFeasibilityScorePercent: number;
    aiExpansionInsightNote: string;
  }
  
  export class ExpansionIntelligenceEngine {
    private static STORAGE_KEY = "WEDYPLAN_EXPANSION_INTELLIGENCE_V1";
  
    /**
     * Aday Pazar Analizi Kayıtlarını Getirir
     */
    public static async getCandidateMarkets(): Promise<CandidateMarketRecord[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "exp_uk",
          countryCode: "UK",
          countryName: "United Kingdom (Birleşik Krallık)",
          targetRegion: "Avrupa Batı",
          marketPotentialScorePercent: 96,
          competitorSaturationScorePercent: 42,
          destinationWeddingDemandIndex: 92,
          projected3YearGmvAmountUsd: 14500000,
          priorityRank: 1,
          aiRiskLevel: "LOW",
          aiExpansionTip: "Kayıtlı İngiliz çiftlerin Akdeniz ve BAE destinasyon düğünlerine talebi %42 arttı. Birincil öncelikli pazar.",
          isReadyForLaunchPipeline: true,
        },
        {
          id: "exp_sa",
          countryCode: "SA",
          countryName: "Saudi Arabia (Suudi Arabistan)",
          targetRegion: "Orta Doğu (GCC)",
          marketPotentialScorePercent: 92,
          competitorSaturationScorePercent: 25,
          destinationWeddingDemandIndex: 88,
          projected3YearGmvAmountUsd: 18200000,
          priorityRank: 2,
          aiRiskLevel: "MEDIUM",
          aiExpansionTip: "Lüks düğün bütçe ortalaması en yüksek pazar ($18.2M GMV potansiyeli). SAMA lisansı beklenmelidir.",
          isReadyForLaunchPipeline: true,
        },
        {
          id: "exp_fr",
          countryCode: "FR",
          countryName: "France (Fransa)",
          targetRegion: "Güney Avrupa",
          marketPotentialScorePercent: 85,
          competitorSaturationScorePercent: 68,
          destinationWeddingDemandIndex: 80,
          projected3YearGmvAmountUsd: 8900000,
          priorityRank: 3,
          aiRiskLevel: "MEDIUM",
          aiExpansionTip: "Fransız Riviera ve Şato düğünlerinde yüksek rekabet var. B2B acente ortaklığı şart.",
          isReadyForLaunchPipeline: false,
        },
        {
          id: "exp_it",
          countryCode: "IT",
          countryName: "Italy (İtalya)",
          targetRegion: "Güney Avrupa",
          marketPotentialScorePercent: 88,
          competitorSaturationScorePercent: 60,
          destinationWeddingDemandIndex: 95,
          projected3YearGmvAmountUsd: 11200000,
          priorityRank: 4,
          aiRiskLevel: "LOW",
          aiExpansionTip: "Toscana ve Amalfi kıyısı destinasyon düğünleri için yüksek tedarikçi çekim gücü.",
          isReadyForLaunchPipeline: false,
        },
      ];
    }
  
    /**
     * Genişleme İstihbaratı Özetini Getirir
     */
    public static async getExpansionSummary(): Promise<ExpansionIntelligenceSummary> {
      return {
        candidateMarketsCount: 4,
        topPriorityCountryCode: "UK",
        averageFeasibilityScorePercent: 90.2,
        aiExpansionInsightNote: "Birleşik Krallık (UK) ve Suudi Arabistan (SA) pazarları önümüzdeki 3 yılda $32.7M GMV potansiyeli ile en yüksek ROI değerini sunmaktadır.",
      };
    }
  
    /**
     * Aday Pazarı Lansman Boru Hattına (Launch Pipeline) Aktarır
     */
    public static async promoteToLaunchPipeline(marketId: string): Promise<boolean> {
      const markets = await this.getCandidateMarkets();
      const idx = markets.findIndex((m) => m.id === marketId);
  
      if (idx !== -1) {
        markets[idx].isReadyForLaunchPipeline = true;
  
        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(markets));
        }
        return true;
      }
      return false;
    }
  }