export type VipTier = "SILVER" | "GOLD" | "PLATINUM" | "BLACK_VIP";
export type RewardCategory = "ESCROW_CREDIT" | "DISCOUNT_COUPON" | "PREMIUM_AI_ACCESS" | "FEATURED_LISTING";

export interface UserLoyaltyProfile {
  userId: string;
  userName: string;
  pointsBalance: number;
  vipTier: VipTier;
  nextTierProgressPercent: number;
  earnedBadges: { id: string; name: string; unlockedAt: Date }[];
  aiRetentionScorePercent: number; // 0-100%
  aiPredictedChurnRisk: "LOW" | "MEDIUM" | "HIGH";
  suggestedReward: string;
}

export interface LoyaltyRewardItem {
  id: string;
  title: string;
  category: RewardCategory;
  pointsCost: number;
  rewardValueText: string;
  isAvailable: boolean;
}

export class LoyaltyEngine {
  private static STORAGE_KEY = "WEDYPLAN_LOYALTY_PROFILE_V1";

  /**
   * Kullanıcının Sadakat Profilini ve VIP Durumunu Getirir
   */
  public static async getUserLoyaltyProfile(): Promise<UserLoyaltyProfile> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return {
      userId: "usr_kaan_sena",
      userName: "Sena & Kaan",
      pointsBalance: 4250,
      vipTier: "PLATINUM",
      nextTierProgressPercent: 85,
      earnedBadges: [
        { id: "badge_1", name: "Erken Planlamacı", unlockedAt: new Date("2026-06-15") },
        { id: "badge_2", name: "Escrow Güvence Mimarı", unlockedAt: new Date("2026-07-20") },
        { id: "badge_3", name: "Viral Elçi", unlockedAt: new Date("2026-07-28") },
      ],
      aiRetentionScorePercent: 94,
      aiPredictedChurnRisk: "LOW",
      suggestedReward: "₺1.000 TL Escrow Bakiye İndirimi (3.500 WedyPoint)",
    };
  }

  /**
   * Kullanılabilen Ödül Kataloğunu Getirir
   */
  public static getRewardCatalog(): LoyaltyRewardItem[] {
    return [
      {
        id: "rew_101",
        title: "₺1.000 TL Escrow Bakiye İndirim Kuponu",
        category: "ESCROW_CREDIT",
        pointsCost: 3500,
        rewardValueText: "₺1.000 TL İndirim",
        isAvailable: true,
      },
      {
        id: "rew_102",
        title: "1 Ay Ücretsiz WedyAI Premium Sınırsız Asistan",
        category: "PREMIUM_AI_ACCESS",
        pointsCost: 1500,
        rewardValueText: "VIP AI Erişimi",
        isAvailable: true,
      },
      {
        id: "rew_103",
        title: "%15 Tedarikçi Hizmet İndirim Kodu",
        category: "DISCOUNT_COUPON",
        pointsCost: 2000,
        rewardValueText: "%15 İndirim",
        isAvailable: true,
      },
    ];
  }

  /**
   * Puan Kullanarak Ödül Alır
   */
  public static async redeemReward(rewardId: string): Promise<{ success: boolean; remainingPoints?: number; error?: string }> {
    const profile = await this.getUserLoyaltyProfile();
    const reward = this.getRewardCatalog().find((r) => r.id === rewardId);

    if (!reward) return { success: false, error: "REWARD_NOT_FOUND" };
    if (profile.pointsBalance < reward.pointsCost) {
      return { success: false, error: "INSUFFICIENT_POINTS: Yetersiz WedyPoint bakiyesi." };
    }

    profile.pointsBalance -= reward.pointsCost;
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    }

    return { success: true, remainingPoints: profile.pointsBalance };
  }
}