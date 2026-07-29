export type AiAssetCategory =
  | "AGENTS"
  | "PROMPTS"
  | "WORKFLOWS"
  | "TEMPLATES"
  | "KNOWLEDGE_PACKS"
  | "AUTOMATION_PACKS";

export interface ReusableAiAssetRecord {
  id: string;
  assetCategory: AiAssetCategory;
  assetName: string;
  authorVendorRef: string;
  versionTag: string; // e.g. "v1.2.0"
  description: string;
  userRatingScore: number; // 1.0 - 5.0
  activeDeploymentsCount: number;
  qualityEvaluationScorePercent: number; // 0-100%
  requiredDependencies: string[]; // e.g. ["ConciergeAgent-v2.0", "EscrowEngine-v11"]
  isInstalled: boolean;
  aiRecommendationTip: string;
  publishedAt: Date;
}

export interface AiMarketplaceSummary {
  totalPublishedAssetsCount: number;
  totalActiveDeploymentsCount: number;
  averageAssetQualityScorePercent: number;
  supportedAssetCategoriesCount: number;
  aiMarketplaceInsightNote: string;
}

export class AiMarketplaceEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_MARKETPLACE_ASSETS_V1";

  /**
   * Pazaryerindeki AI Varlıklarını Getirir
   */
  public static async getMarketplaceAssets(): Promise<ReusableAiAssetRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ast_101",
        assetCategory: "KNOWLEDGE_PACKS",
        assetName: "Bodrum & Çeşme Lüks Plaj Düğünü Bilgi Paketi",
        authorVendorRef: "WedyPlan Official Partner",
        versionTag: "v2.1.0",
        description: "Ege bölgesi lüks düğün mekanlarının 2027 sezonsal fiyatları, menü paketleri ve VIP tekne transfer kuralları.",
        userRatingScore: 4.9,
        activeDeploymentsCount: 340,
        qualityEvaluationScorePercent: 99.2,
        requiredDependencies: ["ConciergeAgent-v2.0"],
        isInstalled: true,
        aiRecommendationTip: "Destinasyon düğünü planlayan çiftlerin teklif onay oranını %28 artırır.",
        publishedAt: new Date("2026-07-29T18:00:00"),
      },
      {
        id: "ast_102",
        assetCategory: "WORKFLOWS",
        assetName: "VIP Concierge & Escrow Otomatik Onay Akışı",
        authorVendorRef: "FinTech Engineering Team",
        versionTag: "v1.4.0",
        description: "100.000 USD üzeri lüks rezervasyonlarda HITL onay kapılı otonom Escrow kilitleme iş akışı.",
        userRatingScore: 4.8,
        activeDeploymentsCount: 180,
        qualityEvaluationScorePercent: 98.8,
        requiredDependencies: ["WorkflowEngine-v13", "EscrowLockTool-v11"],
        isInstalled: true,
        aiRecommendationTip: "Körfez (BAE) çiftleri için sıfır kur riski ile ödeme onay süresini kısaltır.",
        publishedAt: new Date("2026-07-29T19:15:00"),
      },
      {
        id: "ast_103",
        assetCategory: "PROMPTS",
        assetName: "Lüks Düğün Fotoğrafçılığı Teklif Oluşturma İstem Seti",
        authorVendorRef: "Studio Elite Istanbul",
        versionTag: "v1.0.0",
        description: "Düğün hikayesi ve drone çekim paketleri için özelleştirilmiş ikna edici doğal dil teklif istemleri.",
        userRatingScore: 4.7,
        activeDeploymentsCount: 95,
        qualityEvaluationScorePercent: 96.5,
        requiredDependencies: ["VendorAgent-v13"],
        isInstalled: false,
        aiRecommendationTip: "Fotoğraf ve video tedarikçileri için teklif hazırlama süresini 3 dakikaya düşürür.",
        publishedAt: new Date("2026-07-29T15:30:00"),
      },
    ];
  }

  /**
   * Pazaryeri Özet İstatistiklerini Getirir
   */
  public static async getSummary(): Promise<AiMarketplaceSummary> {
    return {
      totalPublishedAssetsCount: 48,
      totalActiveDeploymentsCount: 1420,
      averageAssetQualityScorePercent: 98.4,
      supportedAssetCategoriesCount: 6,
      aiMarketplaceInsightNote: "AI Pazaryeri platformunda yayınlanan 48 hazır varlık %98.4 kalite değerlendirmesi ile diğer tenant ve ajanlar tarafından kullanılmaktadır.",
    };
  }

  /**
   * AI Varlığını Platforma Yükleme/Kurma Simülasyonu
   */
  public static async installAsset(assetId: string): Promise<boolean> {
    const assets = await this.getMarketplaceAssets();
    const idx = assets.findIndex((a) => a.id === assetId);

    if (idx !== -1) {
      assets[idx].isInstalled = true;
      assets[idx].activeDeploymentsCount += 1;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assets));
      }
      return true;
    }
    return false;
  }
}