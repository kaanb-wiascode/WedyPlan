export type ReferralType =
  | "COUPLE_REFERRAL"
  | "VENDOR_REFERRAL"
  | "EMPLOYEE_REFERRAL"
  | "PARTNER_REFERRAL";

export type RewardType =
  | "ESCROW_CREDIT"
  | "PERCENTAGE_DISCOUNT"
  | "CASH_REWARD"
  | "PREMIUM_AI_ACCESS"
  | "FEATURED_BADGE";

export interface ReferralClaim {
  id: string;
  referrerUserId: string;
  referredEmail: string;
  referralType: ReferralType;
  referralCode: string;
  status: "PENDING" | "APPROVED" | "FLAGGED_FRAUD" | "PAID";
  rewardType: RewardType;
  rewardValueAmount: number;
  rewardCurrency: string;
  createdAt: Date;
  aiFraudRiskScore: number; // 0 (Safe) - 100 (High Risk Fraud)
}

export interface ReferralMetricsForecast {
  totalReferralGmv: number;
  totalRewardsDistributed: number;
  fraudBlockedCount: number;
  viralKFactor: number;
  projected30DayGrowthPercent: number;
}

export class ReferralEngine {
  private static STORAGE_KEY = "WEDYPLAN_REFERRAL_CLAIMS_V1";

  /**
   * Aktif Referans İstemlerini ve Hakediş Geçmişini Getirir
   */
  public static async getReferralClaims(): Promise<ReferralClaim[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ref_claim_101",
        referrerUserId: "usr_kaan_sena",
        referredEmail: "merve_alper@gmail.com",
        referralType: "COUPLE_REFERRAL",
        referralCode: "WEDY-KAAN2026",
        status: "APPROVED",
        rewardType: "ESCROW_CREDIT",
        rewardValueAmount: 750,
        rewardCurrency: "TRY",
        createdAt: new Date("2026-07-26"),
        aiFraudRiskScore: 4,
      },
      {
        id: "ref_claim_102",
        referrerUserId: "v_ciragan_admin",
        referredEmail: "info@ahenkcicek.com",
        referralType: "VENDOR_REFERRAL",
        referralCode: "PARTNER-CIRAGAN",
        status: "PAID",
        rewardType: "PERCENTAGE_DISCOUNT",
        rewardValueAmount: 2500,
        rewardCurrency: "TRY",
        createdAt: new Date("2026-07-28"),
        aiFraudRiskScore: 2,
      },
      {
        id: "ref_claim_103",
        referrerUserId: "usr_suspicious_bot",
        referredEmail: "usr_suspicious_bot_2@temp.com",
        referralType: "COUPLE_REFERRAL",
        referralCode: "WEDY-FAKE99",
        status: "FLAGGED_FRAUD",
        rewardType: "CASH_REWARD",
        rewardValueAmount: 500,
        rewardCurrency: "TRY",
        createdAt: new Date(),
        aiFraudRiskScore: 92, // High Fraud Detected
      },
    ];
  }

  /**
   * WedyAI Fraud Shield: İstem Üzerinde Sahtecilik Kontrolü Yapar
   */
  public static evaluateFraudRisk(email: string, ipAddress: string): {
    score: number;
    isBlocked: boolean;
    reason?: string;
  } {
    const isTempEmail = email.includes("temp") || email.includes("dispostable") || email.includes("test");
    if (isTempEmail) {
      return {
        score: 95,
        isBlocked: true,
        reason: "Geçici veya şüpheli e-posta adresi algılandı.",
      };
    }
    return { score: 5, isBlocked: false };
  }

  /**
   * Büyüme ve Referans Tahmin Raporu
   */
  public static async getForecastMetrics(): Promise<ReferralMetricsForecast> {
    return {
      totalReferralGmv: 485000,
      totalRewardsDistributed: 34500,
      fraudBlockedCount: 18,
      viralKFactor: 1.38,
      projected30DayGrowthPercent: 24.5,
    };
  }

  /**
   * Yeni Referans İle Davet Oluşturur
   */
  public static async submitClaim(
    referredEmail: string,
    referralType: ReferralType,
    referralCode: string
  ): Promise<{ success: boolean; claim?: ReferralClaim; error?: string }> {
    const fraudCheck = this.evaluateFraudRisk(referredEmail, "127.0.0.1");

    const newClaim: ReferralClaim = {
      id: `claim_${Math.random().toString(36).substring(2, 9)}`,
      referrerUserId: "usr_current",
      referredEmail,
      referralType,
      referralCode,
      status: fraudCheck.isBlocked ? "FLAGGED_FRAUD" : "APPROVED",
      rewardType: referralType === "VENDOR_REFERRAL" ? "PERCENTAGE_DISCOUNT" : "ESCROW_CREDIT",
      rewardValueAmount: referralType === "VENDOR_REFERRAL" ? 2500 : 750,
      rewardCurrency: "TRY",
      createdAt: new Date(),
      aiFraudRiskScore: fraudCheck.score,
    };

    const claims = await this.getReferralClaims();
    claims.unshift(newClaim);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(claims));
    }

    if (fraudCheck.isBlocked) {
      return { success: false, error: fraudCheck.reason };
    }

    return { success: true, claim: newClaim };
  }
}