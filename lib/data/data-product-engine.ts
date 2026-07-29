export type DataProductDomain =
  | "MARKETPLACE"
  | "CRM"
  | "FINANCE"
  | "OPERATIONS"
  | "GROWTH"
  | "AI";

export type DataProductLifecycleStage = "ACTIVE_PRODUCTION" | "BETA_PREVIEW" | "DEPRECATED";

export interface DataProductRecord {
  id: string;
  productKey: string; // e.g. "dp_escrow_yield_gold_api"
  productName: string; // e.g. "Escrow Net Yield & Settlement Data Product"
  domain: DataProductDomain;
  ownerDomainSteward: string; // e.g. "Finans Veri Ürün Yöneticisi"
  versionTag: string; // e.g. "v2.1"
  lifecycleStage: DataProductLifecycleStage;
  qualitySlaPercent: number; // e.g. 99.9%
  activeSubscribersCount: number; // e.g. 42 downstream consumers
  dailyQueryVolumeCount: number; // e.g. 18,400 queries/day
  aiImpactAnalysisNote: string;
  aiRecommendationTip: string;
  lastPublishedAt: Date;
}

export interface DataProductPlatformSummary {
  totalActiveDataProductsCount: number;
  totalDownstreamSubscribersCount: number;
  averageProductSlaPercent: number;
  aiDataProductInsightNote: string;
}

export class DataProductEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_PRODUCT_V1";

  /**
   * Veri Ürün Kayıtlarını Getirir
   */
  public static async getProducts(): Promise<DataProductRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "dp_101",
        productKey: "dp_escrow_yield_gold_api",
        productName: "Escrow Net Yield & Settlement Data Product",
        domain: "FINANCE",
        ownerDomainSteward: "Finans Veri Ürün Sorumlusu (Finance Lead)",
        versionTag: "v2.1",
        lifecycleStage: "ACTIVE_PRODUCTION",
        qualitySlaPercent: 99.9,
        activeSubscribersCount: 28,
        dailyQueryVolumeCount: 18400,
        aiImpactAnalysisNote: "Etki Analizi: Sürüm değişikliği 4 CFO BI panosu ve Phase 13 AI Ajanını kapsamaktadır.",
        aiRecommendationTip: "En yüksek kullanım hacmine sahip finansal veri ürünü. Veri tazeliği 1 dakikadır.",
        lastPublishedAt: new Date("2026-07-29T23:18:00"),
      },
      {
        id: "dp_102",
        productKey: "dp_vendor_sla_performance_feed",
        productName: "Tedarikçi SLA Performans Veri Ürünü",
        domain: "MARKETPLACE",
        ownerDomainSteward: "Pazaryeri Veri Ürün Sorumlusu (Marketplace Lead)",
        versionTag: "v1.4",
        lifecycleStage: "ACTIVE_PRODUCTION",
        qualitySlaPercent: 99.8,
        activeSubscribersCount: 19,
        dailyQueryVolumeCount: 12500,
        aiImpactAnalysisNote: "Etki Analizi: Tedarikçi derecelendirme algoritması bu veri ürününden beslenmektedir.",
        aiRecommendationTip: "Lüks mekan SLA metrikleri otonom olarak bu üründe paketlenmektedir.",
        lastPublishedAt: new Date("2026-07-29T23:00:00"),
      },
      {
        id: "dp_103",
        productKey: "dp_ai_workforce_task_telemetry",
        productName: "AI Workforce Telemetri & Ajan Veri Ürünü",
        domain: "AI",
        ownerDomainSteward: "Yapay Zeka Ürün Mimarı (AI Lead)",
        versionTag: "v1.0",
        lifecycleStage: "BETA_PREVIEW",
        qualitySlaPercent: 99.5,
        activeSubscribersCount: 12,
        dailyQueryVolumeCount: 8900,
        aiImpactAnalysisNote: "Etki Analizi: Ajan verimlilik raporları beta modunda tüketmektedir.",
        aiRecommendationTip: "Phase 13 AI Ajanlarının görev devir performansını paketleyen yeni veri ürünü.",
        lastPublishedAt: new Date("2026-07-29T22:30:00"),
      },
    ];
  }

  /**
   * Veri Ürün Platform Özetini Getirir
   */
  public static async getSummary(): Promise<DataProductPlatformSummary> {
    return {
      totalActiveDataProductsCount: 18,
      totalDownstreamSubscribersCount: 142,
      averageProductSlaPercent: 99.8,
      aiDataProductInsightNote: "WedyAI Veri Ürünü Motoru 18 kurumsal veri ürününü %99.8 SLA ve 142 aktif tüketici ile otonom olarak yönetmektedir.",
    };
  }

  /**
   * Veri Ürün Sürüm Yükseltme Simülasyonu
   */
  public static async publishProductVersion(productId: string): Promise<boolean> {
    const products = await this.getProducts();
    const idx = products.findIndex((p) => p.id === productId);

    if (idx !== -1) {
      products[idx].versionTag = "v2.2";
      products[idx].lifecycleStage = "ACTIVE_PRODUCTION";
      products[idx].qualitySlaPercent = 100.0;
      products[idx].lastPublishedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      }
      return true;
    }
    return false;
  }
}