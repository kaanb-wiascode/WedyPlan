export type InfluencerCategory =
  | "WEDDING_BLOGGER"
  | "PHOTOGRAPHER"
  | "VIDEOGRAPHER"
  | "LIFESTYLE_CREATOR";

export type CampaignFormat =
  | "SPONSORED_POST"
  | "AFFILIATE_LINK"
  | "PROMO_CODE"
  | "EVENT_HOSTING"
  | "PRODUCT_PLACEMENT";

export interface InfluencerProfile {
  id: string;
  creatorName: string;
  handle: string;
  category: InfluencerCategory;
  primaryPlatform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE";
  followerCount: number;
  engagementRatePercent: number; // e.g. 4.8%
  aiAudienceAuthenticityScore: number; // 0-100 (Fake follower / bot score)
  aiMatchScorePercent: number; // 0-100 (Compatibility with WedyPlan luxury branding)
  activePromoCode?: string;
  totalAttributedGmv: number;
  totalCommissionsEarned: number;
  campaignCount: number;
}

export interface InfluencerCampaignSummary {
  campaignName: string;
  format: CampaignFormat;
  assignedInfluencerCount: number;
  totalReachCount: number;
  totalEngagementCount: number;
  totalConversionsCount: number;
  totalRevenueGmv: number;
  campaignRoiMultiplier: number; // e.g. 8.4x
}

export class InfluencerEngine {
  private static STORAGE_KEY = "WEDYPLAN_INFLUENCERS_VAULT_V1";

  /**
   * Influencer Ekosistem Listesini Getirir
   */
  public static async getInfluencers(): Promise<InfluencerProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "inf_101",
        creatorName: "Selin Yılmaz",
        handle: "@selingelin_blog",
        category: "WEDDING_BLOGGER",
        primaryPlatform: "INSTAGRAM",
        followerCount: 245000,
        engagementRatePercent: 5.2,
        aiAudienceAuthenticityScore: 98, // Real audience
        aiMatchScorePercent: 96,
        activePromoCode: "SELINGELIN2026",
        totalAttributedGmv: 1250000,
        totalCommissionsEarned: 187500,
        campaignCount: 12,
      },
      {
        id: "inf_102",
        creatorName: "Mert & Burcu (Wedding Vlogs)",
        handle: "@mertburcuweddings",
        category: "VIDEOGRAPHER",
        primaryPlatform: "YOUTUBE",
        followerCount: 180000,
        engagementRatePercent: 6.8,
        aiAudienceAuthenticityScore: 95,
        aiMatchScorePercent: 92,
        activePromoCode: "MERTBURCU2026",
        totalAttributedGmv: 840000,
        totalCommissionsEarned: 126000,
        campaignCount: 8,
      },
      {
        id: "inf_103",
        creatorName: "FakeBot Creator",
        handle: "@suspicious_influencer",
        category: "LIFESTYLE_CREATOR",
        primaryPlatform: "TIKTOK",
        followerCount: 500000,
        engagementRatePercent: 0.4,
        aiAudienceAuthenticityScore: 18, // Fake audience detected
        aiMatchScorePercent: 24,
        totalAttributedGmv: 0,
        totalCommissionsEarned: 0,
        campaignCount: 0,
      },
    ];
  }

  /**
   * Kampanya ROI ve Performans Özetini Getirir
   */
  public static async getCampaignSummary(): Promise<InfluencerCampaignSummary> {
    return {
      campaignName: "2026 Yaz Düğünleri Lüks Influencer Lansmanı",
      format: "PROMO_CODE",
      assignedInfluencerCount: 14,
      totalReachCount: 1840000,
      totalEngagementCount: 98500,
      totalConversionsCount: 420,
      totalRevenueGmv: 2850000,
      campaignRoiMultiplier: 8.4,
    };
  }

  /**
   * WedyAI İçerik Üreticisi / Influencer Eşleştirici
   */
  public static matchCreatorForCampaign(
    targetBudgetGmv: number,
    preferredFormat: CampaignFormat
  ): { suggestedCreatorId: string; reason: string } {
    return {
      suggestedCreatorId: "inf_101",
      reason: "Selin Yılmaz (@selingelin_blog) hedef bütçeniz ve Escrow düğün sözleşmesi dönüşümlerinde %96 AI eşleşme skoru sağladı.",
    };
  }
}