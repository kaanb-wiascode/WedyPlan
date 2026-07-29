export type CommunityType = "WEDDING_CLUB" | "LOCAL_GROUP" | "FORUM_QA" | "EXPERT_ADVICE";

export interface CommunityClub {
  id: string;
  name: string;
  type: CommunityType;
  memberCount: number;
  description: string;
  isJoined: boolean;
  cityLocation?: string;
}

export interface ForumPost {
  id: string;
  clubId: string;
  clubName: string;
  authorName: string;
  authorRole: "BRIDE" | "GROOM" | "VENDOR_EXPERT" | "COMMUNITY_AMBASSADOR";
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  aiTrendScore: number; // 0-100
  aiModerationStatus: "APPROVED" | "FLAGGED_SPAM";
  createdAt: Date;
}

export class CommunityEngine {
  private static STORAGE_KEY = "WEDYPLAN_COMMUNITY_POSTS_V1";

  /**
   * Aktif Düğün Kulüpleri ve Yerel Toplulukları Getirir
   */
  public static async getClubs(): Promise<CommunityClub[]> {
    return [
      {
        id: "club_101",
        name: "Yaz 2026 Gelinleri Kulübü",
        type: "WEDDING_CLUB",
        memberCount: 4820,
        description: "2026 Yaz sezonunda evlenecek çiftlerin bütçe, mekan ve gelinlik deneyim paylaşım kulübü.",
        isJoined: true,
      },
      {
        id: "club_102",
        name: "İstanbul Lüks Düğün Topluluğu",
        type: "LOCAL_GROUP",
        memberCount: 3240,
        description: "Boğaz mekanları, tarihi yalılar ve organizasyon tavsiyeleri.",
        cityLocation: "İstanbul",
        isJoined: true,
      },
      {
        id: "club_103",
        name: "Escrow Kapora & Bütçe S.S.S Forumu",
        type: "FORUM_QA",
        memberCount: 6100,
        description: "Sözleşme e-imza, kapora koruması ve bütçe yönetimi soru-cevap alanı.",
        isJoined: false,
      },
    ];
  }

  /**
   * Topluluk Akışı Tartışma ve Soruları Getirir
   */
  public static async getForumPosts(): Promise<ForumPost[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "post_101",
        clubId: "club_101",
        clubName: "Yaz 2026 Gelinleri Kulübü",
        authorName: "Sena B.",
        authorRole: "BRIDE",
        title: "Çırağan Palace düğünümüz için Escrow kapora ödemesini tamamladık!",
        content: "Kızlar harika bir duygu! WedyPlan Escrow sistemi sayesinde kapora güvenle donduruldu. Mekan seçimi yapacak arkadaşlara tavsiyelerim var...",
        likesCount: 142,
        commentsCount: 38,
        bookmarksCount: 29,
        isLiked: true,
        isBookmarked: true,
        aiTrendScore: 98,
        aiModerationStatus: "APPROVED",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "post_102",
        clubId: "club_102",
        clubName: "İstanbul Lüks Düğün Topluluğu",
        authorName: "Elif Karahan (Düğün Koçu)",
        authorRole: "VENDOR_EXPERT",
        title: "2026 Boğaz mekanlarında masa düzeni ve canlı çiçek trendleri",
        content: "Bu sezon Bohem-Lüks detaylar ön planda. WedyAI görsel analiz kiti ile masa renk paletinizi nasıl oluşturacağınızı anlattım.",
        likesCount: 94,
        commentsCount: 19,
        bookmarksCount: 45,
        isLiked: false,
        isBookmarked: false,
        aiTrendScore: 91,
        aiModerationStatus: "APPROVED",
        createdAt: new Date("2026-07-27"),
      },
    ];
  }

  /**
   * Gönderi Etkileşimini Günceller (Like / Bookmark)
   */
  public static async toggleInteraction(postId: string, action: "LIKE" | "BOOKMARK"): Promise<void> {
    const posts = await this.getForumPosts();
    const idx = posts.findIndex((p) => p.id === postId);

    if (idx !== -1) {
      if (action === "LIKE") {
        posts[idx].isLiked = !posts[idx].isLiked;
        posts[idx].likesCount += posts[idx].isLiked ? 1 : -1;
      } else {
        posts[idx].isBookmarked = !posts[idx].isBookmarked;
        posts[idx].bookmarksCount += posts[idx].isBookmarked ? 1 : -1;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
      }
    }
  }

  /**
   * Yeni Topluluk Tartışması / Soru Paylaşır
   */
  public static async createPost(
    clubId: string,
    clubName: string,
    authorName: string,
    title: string,
    content: string
  ): Promise<ForumPost> {
    const isSpam = content.length < 10 || content.includes("http");

    const newPost: ForumPost = {
      id: `post_${Math.random().toString(36).substring(2, 9)}`,
      clubId,
      clubName,
      authorName,
      authorRole: "BRIDE",
      title,
      content,
      likesCount: 1,
      commentsCount: 0,
      bookmarksCount: 0,
      isLiked: true,
      isBookmarked: false,
      aiTrendScore: 85,
      aiModerationStatus: isSpam ? "FLAGGED_SPAM" : "APPROVED",
      createdAt: new Date(),
    };

    const posts = await this.getForumPosts();
    posts.unshift(newPost);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts));
    }

    return newPost;
  }
}