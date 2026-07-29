export type SocialPlatform = "INSTAGRAM" | "TIKTOK" | "PINTEREST" | "FACEBOOK" | "YOUTUBE" | "LINKEDIN";
export type PostPublishStatus = "SCHEDULED" | "PUBLISHED" | "FAILED";

export interface SocialMediaPost {
  id: string;
  title: string;
  platforms: SocialPlatform[];
  captionText: string;
  hashtagCluster: string[];
  mediaUrl: string;
  status: PostPublishStatus;
  scheduledTimeText: string;
  aiTrendScore: number; // 0-100
  aiOptimalPostTime: string;
  totalViewsCount: number;
  totalSharesCount: number;
}

export interface UgcProofItem {
  id: string;
  creatorHandle: string;
  platform: SocialPlatform;
  mediaUrl: string;
  caption: string;
  isVerifiedCouple: boolean;
  attributedGmvAmount: number;
}

export class SocialGrowthEngine {
  private static STORAGE_KEY = "WEDYPLAN_SOCIAL_POSTS_V1";

  /**
   * Yayınlanan ve Planlanan Sosyal Medya Gönderilerini Getirir
   */
  public static async getSocialPosts(): Promise<SocialMediaPost[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "soc_101",
        title: "2026 Çırağan Palace Yalı Düğünü Reels & TikTok",
        platforms: ["INSTAGRAM", "TIKTOK", "PINTEREST"],
        captionText: "Boğazın büyüleyici atmosferinde WedyPlan Escrow güvencesiyle unutulmaz bir balo düğünü! ✨ #WedyPlan #ÇırağanPalace #LüksDüğün",
        hashtagCluster: ["#WedyPlan", "#DüğünMekanları", "#LüksDüğün2026", "#GelinlikModelleri", "#EscrowDüğün"],
        mediaUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        status: "PUBLISHED",
        scheduledTimeText: "Bugün 20:30",
        aiTrendScore: 98,
        aiOptimalPostTime: "20:30 (En Yüksek Etkileşim Saati)",
        totalViewsCount: 142000,
        totalSharesCount: 3840,
      },
      {
        id: "soc_102",
        title: "Bodrum Kır Düğünü Fikirleri & İlham Panosu",
        platforms: ["PINTEREST", "INSTAGRAM"],
        captionText: "Ege esintili Bohem-Lüks kır düğünü konseptleri. WedyAI görsel analiz aracıyla kendi temanızı oluşturun! 🌸",
        hashtagCluster: ["#BodrumDüğünü", "#KırDüğünü", "#WedyAI", "#GelinAdayları"],
        mediaUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc",
        status: "SCHEDULED",
        scheduledTimeText: "Yarın 11:00",
        aiTrendScore: 92,
        aiOptimalPostTime: "Hafta içi 11:00 (Pinterest Kaydetme Pik Seviye)",
        totalViewsCount: 0,
        totalSharesCount: 0,
      },
    ];
  }

  /**
   * Toplanan Kullanıcı Tarafından Üretilen İçerikleri (UGC) Getirir
   */
  public static async getUgcItems(): Promise<UgcProofItem[]> {
    return [
      {
        id: "ugc_1",
        creatorHandle: "@sena_kaan_2026",
        platform: "INSTAGRAM",
        mediaUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
        caption: "WedyPlan üzerinden mekanımızı kiraladık ve e-imzamızı attık! 💍 #WedyPlanStory",
        isVerifiedCouple: true,
        attributedGmvAmount: 180000,
      },
      {
        id: "ugc_2",
        creatorHandle: "@mertburcuweddings",
        platform: "TIKTOK",
        mediaUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        caption: "Çırağan Palace düğünümüzün harika detayları WedyPlan'da!",
        isVerifiedCouple: true,
        attributedGmvAmount: 420000,
      },
    ];
  }

  /**
   * WedyAI Akıllı Başlık, Hashtag ve Trend Zamanı Üretir
   */
  public static generateAiSocialCaption(promptTopic: string): {
    captionText: string;
    suggestedHashtags: string[];
    bestPostingTime: string;
  } {
    return {
      captionText: `${promptTopic} için rüya gibi çözümler WedyPlan'da! Yapay zeka WedyAI asistanı ile bütçenizi planlayın ve e-imzalı sözleşmeyle mekanınızı rezerve edin. ✨💍`,
      suggestedHashtags: ["#WedyPlan", "#DüğünPlanlama", "#WedyAI", "#LüksDüğün", "#DüğünMekanları"],
      bestPostingTime: "Çarşamba 20:30 (Maksimum Viral Erişim)",
    };
  }
}