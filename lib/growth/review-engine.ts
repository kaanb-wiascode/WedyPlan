export type ReviewTargetType = "VENDOR" | "VENUE" | "SERVICE";
export type ReviewMediaType = "PHOTO" | "VIDEO" | "TEXT_ONLY";
export type ModerationStatus = "APPROVED" | "PENDING_MODERATION" | "REJECTED_SPAM" | "FLAGGED_FAKE";

export interface ReviewItem {
  id: string;
  targetId: string;
  targetName: string;
  targetType: ReviewTargetType;
  authorName: string;
  authorAvatarUrl?: string;
  ratingScore: number; // 1.0 - 5.0
  reviewTitle: string;
  reviewComment: string;
  mediaType: ReviewMediaType;
  mediaUrls?: string[];
  moderationStatus: ModerationStatus;
  sentimentScore: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  aiAuthenticityScore: number; // 0-100 (100 = 100% Verified Real Couple)
  isVerifiedCouple: boolean;
  contractVerifiedId?: string;
  createdAt: Date;
}

export interface ReputationSummary {
  overallReputationScore: number; // 0.0 - 5.0
  totalReviewsCount: number;
  verifiedCoupleReviewsCount: number;
  sentimentBreakdownPercent: { positive: number; neutral: number; negative: number };
  aiFakeReviewsBlockedCount: number;
  aiModerationTip: string;
}

export class ReviewEngine {
  private static STORAGE_KEY = "WEDYPLAN_REVIEWS_VAULT_V1";

  /**
   * Pazar Yeri Değerlendirme ve İncelemelerini Getirir
   */
  public static async getReviews(targetId?: string): Promise<ReviewItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed: ReviewItem[] = JSON.parse(data);
        return targetId ? parsed.filter((r) => r.targetId === targetId) : parsed;
      }
    }

    return [
      {
        id: "rev_101",
        targetId: "v_101",
        targetName: "Çırağan Palace Kempinski",
        targetType: "VENUE",
        authorName: "Sena & Kaan B.",
        ratingScore: 5.0,
        reviewTitle: "Hayallerimizin Ötesinde Bir Balo Düğünü!",
        reviewComment: "WedyPlan Escrow sistemi sayesinde tüm ödemelerimiz güvence altındaydı. Çırağan organizasyon ekibinin profesyonelliği harikaydı.",
        mediaType: "PHOTO",
        mediaUrls: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3"],
        moderationStatus: "APPROVED",
        sentimentScore: "POSITIVE",
        aiAuthenticityScore: 99,
        isVerifiedCouple: true,
        contractVerifiedId: "contract_demo_101",
        createdAt: new Date("2026-07-20"),
      },
      {
        id: "rev_102",
        targetId: "v_202",
        targetName: "Ahenk Çiçekçilik & Tasarım",
        targetType: "VENDOR",
        authorName: "Merve K.",
        ratingScore: 4.9,
        reviewTitle: "Bohem Çiçek Konsepti Mükemmeldi",
        reviewComment: "Çiçek seçimleri tam istediğimiz Bohem-Lüks çizgideydi. WedyAI görsel analiz önerileriyle tam uyum sağlandı.",
        mediaType: "PHOTO",
        moderationStatus: "APPROVED",
        sentimentScore: "POSITIVE",
        aiAuthenticityScore: 97,
        isVerifiedCouple: true,
        contractVerifiedId: "contract_demo_102",
        createdAt: new Date("2026-07-24"),
      },
      {
        id: "rev_103",
        targetId: "v_999",
        targetName: "Bilinmeyen Fotoğrafçı",
        targetType: "SERVICE",
        authorName: "BotAccount99",
        ratingScore: 1.0,
        reviewTitle: "Sahte Rekabet İçeriği",
        reviewComment: "Berbat bir yer sakın gitmeyin bedava verseler tutmayın...",
        mediaType: "TEXT_ONLY",
        moderationStatus: "FLAGGED_FAKE",
        sentimentScore: "NEGATIVE",
        aiAuthenticityScore: 12, // Fake Review Blocked
        isVerifiedCouple: false,
        createdAt: new Date(),
      },
    ];
  }

  /**
   * Pazar Yeri Genel İtibar Özeti
   */
  public static async getReputationSummary(): Promise<ReputationSummary> {
    return {
      overallReputationScore: 4.92,
      totalReviewsCount: 3840,
      verifiedCoupleReviewsCount: 3710, // %96.6 Doğrulanmış Çift
      sentimentBreakdownPercent: { positive: 94, neutral: 4, negative: 2 },
      aiFakeReviewsBlockedCount: 124,
      aiModerationTip: "NLP Duygu Analizörü %99.2 doğrulukla sahte ve rakip karalama içeriklerini yayın öncesi süzgece alıyor.",
    };
  }

  /**
   * WedyAI Moderasyon & Sahte İnceleme Denetimi
   */
  public static evaluateReviewSafety(comment: string, isVerifiedContract: boolean): {
    status: ModerationStatus;
    authenticityScore: number;
    sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  } {
    const isSpam = comment.length < 10 || comment.includes("http") || comment.includes("bot");
    
    if (isSpam || !isVerifiedContract) {
      return {
        status: isSpam ? "REJECTED_SPAM" : "FLAGGED_FAKE",
        authenticityScore: isVerifiedContract ? 45 : 15,
        sentiment: "NEGATIVE",
      };
    }

    return {
      status: "APPROVED",
      authenticityScore: 98,
      sentiment: "POSITIVE",
    };
  }

  /**
   * Yeni İnceleme ve Değerlendirme Ekleme
   */
  public static async submitReview(payload: {
    targetId: string;
    targetName: string;
    targetType: ReviewTargetType;
    authorName: string;
    ratingScore: number;
    reviewTitle: string;
    reviewComment: string;
    mediaType: ReviewMediaType;
    isVerifiedCouple: boolean;
  }): Promise<{ success: boolean; review?: ReviewItem; error?: string }> {
    const evalRes = this.evaluateReviewSafety(payload.reviewComment, payload.isVerifiedCouple);

    const newReview: ReviewItem = {
      id: `rev_${Math.random().toString(36).substring(2, 9)}`,
      targetId: payload.targetId,
      targetName: payload.targetName,
      targetType: payload.targetType,
      authorName: payload.authorName,
      ratingScore: payload.ratingScore,
      reviewTitle: payload.reviewTitle,
      reviewComment: payload.reviewComment,
      mediaType: payload.mediaType,
      moderationStatus: evalRes.status,
      sentimentScore: evalRes.sentiment,
      aiAuthenticityScore: evalRes.authenticityScore,
      isVerifiedCouple: payload.isVerifiedCouple,
      createdAt: new Date(),
    };

    const current = await this.getReviews();
    current.unshift(newReview);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
    }

    if (evalRes.status !== "APPROVED") {
      return { success: false, error: "REVIEW_MODERATION_FLAGGED: İçerik sahte/spam algoritması tarafından askıya alındı." };
    }

    return { success: true, review: newReview };
  }
}