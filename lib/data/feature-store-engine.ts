export type FeatureDomainType =
  | "CUSTOMER"
  | "VENDOR"
  | "MARKETPLACE"
  | "FINANCE"
  | "GROWTH"
  | "OPERATIONS";

export type FeatureDataType = "FLOAT" | "VECTOR" | "INTEGER" | "STRING" | "BOOLEAN";
export type FeatureStoreType = "ONLINE_LOW_LATENCY" | "OFFLINE_HISTORICAL" | "DUAL_SYNC";

export interface MlFeatureDefinitionRecord {
  id: string;
  featureKey: string; // e.g. "couple_escrow_deposit_conversion_probability"
  domain: FeatureDomainType;
  versionTag: string; // e.g. "v2.1"
  dataType: FeatureDataType;
  storeType: FeatureStoreType;
  servingLatencyMs: number; // e.g. 2.4 ms
  featureFreshnessMinutes: number;
  qualityScorePercent: number; // 0-100%
  driftDetected: boolean;
  aiRecommendationTip: string;
  lastUpdated: Date;
}

export interface FeatureStorePlatformSummary {
  totalRegisteredFeaturesCount: number;
  onlineStoreAvgLatencyMs: number;
  overallFeatureQualityScorePercent: number;
  featuresWithDriftCount: number;
  aiFeatureStoreInsightNote: string;
}

export class FeatureStoreEngine {
  private static STORAGE_KEY = "WEDYPLAN_FEATURE_STORE_V1";

  /**
   * ML Feature Kayıtlarını Getirir
   */
  public static async getFeatures(): Promise<MlFeatureDefinitionRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ft_101",
        featureKey: "couple_escrow_deposit_conversion_probability",
        domain: "CUSTOMER",
        versionTag: "v2.1",
        dataType: "FLOAT",
        storeType: "DUAL_SYNC",
        servingLatencyMs: 2.4,
        featureFreshnessMinutes: 1,
        qualityScorePercent: 99.8,
        driftDetected: false,
        aiRecommendationTip: "Gözlemlenen latency 2.4ms ile Online Store standartlarındadır. Model tahmin başarısına etkisi %18.",
        lastUpdated: new Date("2026-07-29T22:50:00"),
      },
      {
        id: "ft_102",
        featureKey: "venue_capacity_sla_compliance_vector",
        domain: "VENDOR",
        versionTag: "v1.4",
        dataType: "VECTOR",
        storeType: "ONLINE_LOW_LATENCY",
        servingLatencyMs: 3.8,
        featureFreshnessMinutes: 5,
        qualityScorePercent: 99.4,
        driftDetected: false,
        aiRecommendationTip: "Vektör boyutları Phase 13 AI Ajanları tarafından otonom rezervasyon eşleştirmesinde kullanılıyor.",
        lastUpdated: new Date("2026-07-29T22:45:00"),
      },
      {
        id: "ft_103",
        featureKey: "marketplace_vendor_commission_yield_30d",
        domain: "FINANCE",
        versionTag: "v1.0",
        dataType: "FLOAT",
        storeType: "OFFLINE_HISTORICAL",
        servingLatencyMs: 14.2,
        featureFreshnessMinutes: 60,
        qualityScorePercent: 98.9,
        driftDetected: false,
        aiRecommendationTip: "Phase 11 Escrow Defteri verileriyle eğitilen geçmiş zaman serisi özelliği.",
        lastUpdated: new Date("2026-07-29T22:30:00"),
      },
    ];
  }

  /**
   * Platform Özetini Getirir
   */
  public static async getSummary(): Promise<FeatureStorePlatformSummary> {
    return {
      totalRegisteredFeaturesCount: 240,
      onlineStoreAvgLatencyMs: 2.8,
      overallFeatureQualityScorePercent: 99.5,
      featuresWithDriftCount: 0,
      aiFeatureStoreInsightNote: "WedyAI Özellik Kalite Motoru 240 ML özelliğini Online (2.8ms) ve Offline depolarda %99.5 kalite ve sıfır veri kayması (drift) ile sunmaktadır.",
    };
  }

  /**
   * Özellik Senkronizasyonu ve Kalite Yenileme Simülasyonu
   */
  public static async syncFeature(featureId: string): Promise<boolean> {
    const features = await this.getFeatures();
    const idx = features.findIndex((f) => f.id === featureId);

    if (idx !== -1) {
      features[idx].featureFreshnessMinutes = 0;
      features[idx].qualityScorePercent = 100.0;
      features[idx].driftDetected = false;
      features[idx].lastUpdated = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(features));
      }
      return true;
    }
    return false;
  }
}