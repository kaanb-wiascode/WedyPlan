export type MentionSource = "TWITTER" | "INSTAGRAM" | "NEWS_MEDIA" | "FORUM" | "TRUSTPILOT" | "LINKEDIN";
export type BrandRiskLevel = "LOW" | "MEDIUM" | "HIGH_CRITICAL";

export interface BrandMention {
  id: string;
  source: MentionSource;
  authorHandle: string;
  contentText: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  sentimentScorePercent: number; // e.g. 96%
  reachImpactCount: number;
  publishedAt: Date;
}

export interface ShareOfVoiceMetric {
  brandName: string;
  marketSharePercent: number;
  isMainBrand: boolean;
}

export interface BrandIntelligenceSummary {
  overallBrandReputationScore: number; // 0-100
  brandAwarenessIndexPercent: number;
  netPromoterScore: number; // -100 to +100
  shareOfVoiceBreakdown: ShareOfVoiceMetric[];
  aiActiveRiskAlertsCount: number;
  aiStrategicRecommendation: string;
}

export class BrandIntelligenceEngine {
  private static STORAGE_KEY = "WEDYPLAN_BRAND_INTELLIGENCE_VAULT_V1";

  /**
   * Kurumsal Marka İstihbaratı Özeti ve Metriklerini Getirir
   */
  public static async getBrandSummary(): Promise<BrandIntelligenceSummary> {
    return {
      overallBrandReputationScore: 94,
      brandAwarenessIndexPercent: 78.4,
      netPromoterScore: 72, // Mükemmel NPS skoru
      aiActiveRiskAlertsCount: 0, // Sıfır Kritik Risk
      aiStrategicRecommendation:
        "WedyPlan Escrow kapora güvencesinin medyada yer bulma sıklığı %42 arttı. 'Güvenli Düğün Planlama' PR iletişim bütçesini %15 artırarak Share of Voice liderliğini pekiştirin.",
      shareOfVoiceBreakdown: [
        { brandName: "WedyPlan (Biz)", marketSharePercent: 54.2, isMainBrand: true },
        { brandName: "Geleneksel Düğün Portalları", marketSharePercent: 28.6, isMainBrand: false },
        { brandName: "Yerel Acente / Rehberler", marketSharePercent: 17.2, isMainBrand: false },
      ],
    };
  }

  /**
   * Canlı Sosyal Dinleme (Social Listening) ve Marka Bahsetmelerini Getirir
   */
  public static async getBrandMentions(): Promise<BrandMention[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "m_101",
        source: "NEWS_MEDIA",
        authorHandle: "Ekonomi Finans Dergisi",
        contentText: "WedyPlan, Türkiye'de e-imzalı sözleşme ve Escrow kapora güvencesiyle düğün sektöründe dijital devrim yaratıyor.",
        sentiment: "POSITIVE",
        sentimentScorePercent: 98,
        reachImpactCount: 420000,
        publishedAt: new Date("2026-07-28"),
      },
      {
        id: "m_102",
        source: "INSTAGRAM",
        authorHandle: "@selingelin_blog",
        contentText: "Mekan kiralarken kaporam güvenli havuzda tutulduğu için içim çok rahat! WedyPlan sistemi olmasaydı endişelenirdim.",
        sentiment: "POSITIVE",
        sentimentScorePercent: 96,
        reachImpactCount: 245000,
        publishedAt: new Date("2026-07-27"),
      },
      {
        id: "m_103",
        source: "TWITTER",
        authorHandle: "@dugun_gurusu",
        contentText: "WedyAI bütçe asistanı 5 dakikada tüm düğün maliyetimi hesapladı, gerçekten etkileyici.",
        sentiment: "POSITIVE",
        sentimentScorePercent: 92,
        reachImpactCount: 84000,
        publishedAt: new Date("2026-07-26"),
      },
    ];
  }
}