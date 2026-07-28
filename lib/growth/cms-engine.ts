export type ContentType =
  | "BLOG_POST"
  | "WEDDING_STORY"
  | "VENDOR_SUCCESS"
  | "LANDING_PAGE"
  | "FAQ_ARTICLE"
  | "MAGAZINE_FEATURE";

export type ContentStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "SCHEDULED";

export interface CmsArticle {
  id: string;
  slug: string;
  title: string;
  contentType: ContentType;
  status: ContentStatus;
  excerpt: string;
  bodyMarkdown: string;
  authorName: string;
  coverImageUrl?: string;
  locale: "tr-TR" | "en-US" | "de-DE";
  seoScore: number; // 0-100
  version: number;
  publishedAt?: Date;
  scheduledFor?: Date;
  linkedVendorIds?: string[];
}

export interface AiEditorialResult {
  title: string;
  excerpt: string;
  bodyMarkdown: string;
  readabilityScore: number;
  suggestedTags: string[];
}

export class CmsEngine {
  private static STORAGE_KEY = "WEDYPLAN_CMS_ARTICLES_V1";

  /**
   * Tüm İçerik Makalelerini ve Yayın Akışlarını Getirir
   */
  public static async getArticles(): Promise<CmsArticle[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "art_101",
        slug: "ciragan-palace-real-wedding-sena-kaan",
        title: "Sena & Kaan: Çırağan Palace'ta Rüya Gibi Bir Yalı Düğünü",
        contentType: "WEDDING_STORY",
        status: "PUBLISHED",
        excerpt: "Boğazın tarihi atmosferinde gerçekleşen masalsı düğün organizasyonunun tüm detayları ve bütçe planlaması.",
        bodyMarkdown: "## Bosphorus Elegance\nSena & Kaan çifti, WedyPlan Escrow kapora güvencesiyle mekan rezervasyonlarını 8 ay önceden tamamladı...",
        authorName: "Elif Karahan (Yayın Yönetmeni)",
        coverImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        locale: "tr-TR",
        seoScore: 96,
        version: 3,
        publishedAt: new Date("2026-07-20"),
        linkedVendorIds: ["v_101", "v_202"],
      },
      {
        id: "art_102",
        slug: "2026-dugun-trendleri-ve-wedyai-rehberi",
        title: "2026 Düğün Trendleri: Minimalist Lüks ve Akıllı Bütçe Yönetimi",
        contentType: "MAGAZINE_FEATURE",
        status: "APPROVED",
        excerpt: "Yeni sezonda öne çıkan kır düğünü konseptleri, canlı müzik trendleri ve yapay zeka destekli bütçe optimizasyonu.",
        bodyMarkdown: "## 2026 Trend Özetleri\nYapay zeka destekli WedyAI, bu yıl çiftlerin bütçelerinde %22 oranında tasarruf sağladı...",
        authorName: "WedyAI Editorial Copilot",
        locale: "tr-TR",
        seoScore: 91,
        version: 1,
        scheduledFor: new Date("2026-08-01"),
      },
    ];
  }

  /**
   * WedyAI Makale ve İçerik Üretici
   */
  public static generateAiArticle(promptTopic: string, contentType: ContentType): AiEditorialResult {
    return {
      title: `${promptTopic}: 2026 Rehberi ve İlham Veren Fikirler`,
      excerpt: `${promptTopic} konusunda uzman düğün planlayıcılarımızın görüşleri ve WedyPlan ile bütçenizi en verimli kullanma rehberi.`,
      bodyMarkdown: `## ${promptTopic} Hakkında Bilmeniz Gerekenler\n\nMasalsı bir düğün organizasyonu için doğru tedarikçileri seçmek ilk adımdır. WedyAI, beklentilerinize ve bütçenize en uygun seçenekleri anında listeler.\n\n### 1. Bütçe ve Lokasyon Seçimi\nPlanlama sürecinde e-imzalı sözleşmeler ile tüm şartlarınızı güvenceye alın.\n\n### 2. Escrow Kapora Koruması\nHizmet tamamlanana kadar kaporanız güvenli havuzda tutulur.`,
      readabilityScore: 94,
      suggestedTags: ["Düğün Planlama", "WedyAI", "Lüks Mekanlar", "2026 Trendleri"],
    };
  }

  /**
   * Makale Durumunu Günceller (Workflow State Transition)
   */
  public static async updateArticleStatus(articleId: string, newStatus: ContentStatus): Promise<boolean> {
    const articles = await this.getArticles();
    const idx = articles.findIndex((a) => a.id === articleId);

    if (idx !== -1) {
      articles[idx].status = newStatus;
      if (newStatus === "PUBLISHED") {
        articles[idx].publishedAt = new Date();
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(articles));
      }
      return true;
    }
    return false;
  }
}