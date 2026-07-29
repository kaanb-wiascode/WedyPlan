export type MarketplaceIntegrationCategory =
  | "CRM"
  | "ERP"
  | "ACCOUNTING"
  | "MARKETING"
  | "COMMUNICATION"
  | "AI"
  | "PAYMENTS"
  | "ANALYTICS";

export interface IntegrationAppRecord {
  id: string;
  category: MarketplaceIntegrationCategory;
  appName: string;
  developerVendorRef: string;
  versionTag: string; // e.g. "v1.2.0"
  description: string;
  userRatingScore: number; // 1.0 - 5.0
  activeTenantInstallsCount: number;
  requiredScopes: string[];
  isInstalled: boolean;
  compatibilityScorePercent: number; // 0-100%
  aiRecommendationTip: string;
  publishedAt: Date;
}

export interface IntegrationMarketplaceSummary {
  totalPublishedAppsCount: number;
  totalTenantInstallsCount: number;
  averageAppRatingScore: number;
  activeAppCategoriesCount: number;
  aiMarketplaceInsightNote: string;
}

export class IntegrationMarketplaceEngine {
  private static STORAGE_KEY = "WEDYPLAN_INTEGRATION_MARKETPLACE_V1";

  /**
   * Pazaryerindeki Entegrasyon Uygulamalarını Getirir
   */
  public static async getMarketplaceApps(): Promise<IntegrationAppRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "app_101",
        category: "CRM",
        appName: "Salesforce Executive Sync Connector",
        developerVendorRef: "WedyPlan Official Partner",
        versionTag: "v2.1.0",
        description: "Lüks düğün taleplerini, çift tercihlerini ve VIP mekan rezervasyonlarını Salesforce CRM pipelines ile çift yönlü senkronize eder.",
        userRatingScore: 4.9,
        activeTenantInstallsCount: 380,
        requiredScopes: ["read:bookings", "write:leads", "read:couples"],
        isInstalled: true,
        compatibilityScorePercent: 99.8,
        aiRecommendationTip: "Satış AI ajanıyla entegre çalışarak CRM dönüşüm oranını %34 artırır.",
        publishedAt: new Date("2026-07-29T20:00:00"),
      },
      {
        id: "app_102",
        category: "ACCOUNTING",
        appName: "SAP S/4HANA Finance & Escrow Adapter",
        developerVendorRef: "SAP Enterprise Partner",
        versionTag: "v1.4.0",
        description: "Phase 11 Escrow depozitolarını, KDV matrahlarını ve e-Faturaları SAP ERP muhasebe kayıtlarına otonom aktarır.",
        userRatingScore: 4.8,
        activeTenantInstallsCount: 210,
        requiredScopes: ["read:escrow_ledgers", "write:invoices"],
        isInstalled: true,
        compatibilityScorePercent: 99.4,
        aiRecommendationTip: "Ay sonu finansal mutabakat süresini 14 saatten 2 dakikaya düşürür.",
        publishedAt: new Date("2026-07-29T19:15:00"),
      },
      {
        id: "app_103",
        category: "COMMUNICATION",
        appName: "WhatsApp Business VIP Concierge Bot",
        developerVendorRef: "Twilio Verified Integration",
        versionTag: "v1.1.0",
        description: "Gelin ve damatlara WhatsApp üzerinden otonom düğün takvimi, VIP davetiye LTV hatırlatmaları ve mekan turları sunar.",
        userRatingScore: 4.7,
        activeTenantInstallsCount: 520,
        requiredScopes: ["read:itinerary", "write:messages"],
        isInstalled: false,
        compatibilityScorePercent: 98.2,
        aiRecommendationTip: "Çiftlerin mesaj yanıt süresini 3 dakikaya indirerek rezervasyon hızını yükseltir.",
        publishedAt: new Date("2026-07-29T18:00:00"),
      },
      {
        id: "app_104",
        category: "ANALYTICS",
        appName: "Google Analytics 4 & Mixpanel Wedding Funnel",
        developerVendorRef: "DataMetrics Labs",
        versionTag: "v1.0.2",
        description: "Mekan gezinme, bütçe hesaplayıcı ve Escrow ödeme adımlarındaki kullanıcı dönüşüm hunilerini GA4 ve Mixpanel'e aktarır.",
        userRatingScore: 4.6,
        activeTenantInstallsCount: 180,
        requiredScopes: ["read:analytics_events"],
        isInstalled: false,
        compatibilityScorePercent: 97.5,
        aiRecommendationTip: "Pazarlama AI ajanı için gerçek zamanlı CAC/LTV analitiği sağlar.",
        publishedAt: new Date("2026-07-29T16:30:00"),
      },
    ];
  }

  /**
   * Pazaryeri Özet İstatistiklerini Getirir
   */
  public static async getSummary(): Promise<IntegrationMarketplaceSummary> {
    return {
      totalPublishedAppsCount: 32,
      totalTenantInstallsCount: 1290,
      averageAppRatingScore: 4.8,
      activeAppCategoriesCount: 8,
      aiMarketplaceInsightNote: "Entegrasyon Pazaryeri platformunda sunulan 32 onaylı uygulama %99.1 uyumluluk skoru ve %99.4 güvenlik doğrulamasıyla kiracılar (Tenants) tarafından kullanılmaktadır.",
    };
  }

  /**
   * Entegrasyon Uygulamasını Kurma / Kaldırma Simülasyonu
   */
  public static async installApp(appId: string): Promise<boolean> {
    const apps = await this.getMarketplaceApps();
    const idx = apps.findIndex((a) => a.id === appId);

    if (idx !== -1) {
      apps[idx].isInstalled = true;
      apps[idx].activeTenantInstallsCount += 1;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(apps));
      }
      return true;
    }
    return false;
  }
}