export type SubscriptionPlanType =
  | "COUPLE_PREMIUM"
  | "VENDOR_PREMIUM"
  | "ENTERPRISE"
  | "AGENCY"
  | "FRANCHISE";

export type SubscriptionStatus = "TRIALING" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "EXPIRED";

export interface SubscriptionRecord {
  id: string;
  tenantIdRef: string; // Zero duplication - references user/vendor ID
  tenantName: string;
  planType: SubscriptionPlanType;
  status: SubscriptionStatus;
  monthlyFeeAmount: number;
  currency: string;
  trialEndDate?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  usageQuotaMax: number;
  usageQuotaCurrent: number;
  aiChurnRiskPercent: number; // 0-100%
  aiUpgradeRecommendation: string;
  autoRenew: boolean;
}

export interface BillingSummary {
  monthlyRecurringRevenueMrr: number;
  activeSubscriptionsCount: number;
  churnRatePercent: number;
  currency: string;
  aiMrrForecast30Days: number;
}

export class SubscriptionEngine {
  private static STORAGE_KEY = "WEDYPLAN_SUBSCRIPTIONS_VAULT_V1";

  /**
   * Aktif Abonelik Kayıtlarını Getirir
   */
  public static async getSubscriptions(): Promise<SubscriptionRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "sub_101",
        tenantIdRef: "v_ciragan_admin",
        tenantName: "Çırağan Palace Kempinski",
        planType: "ENTERPRISE",
        status: "ACTIVE",
        monthlyFeeAmount: 12500,
        currency: "TRY",
        currentPeriodStart: new Date("2026-07-01"),
        currentPeriodEnd: new Date("2026-08-01"),
        usageQuotaMax: 100, // 100 Etkinlik/Mekan Listeleme
        usageQuotaCurrent: 82,
        aiChurnRiskPercent: 2, // Çok Düşük Terk Riski
        aiUpgradeRecommendation: "Tedarikçi kullanım kotasının %82'sine ulaştı. 'Franchise Global Sync' paketine geçiş önerin.",
        autoRenew: true,
      },
      {
        id: "sub_102",
        tenantIdRef: "usr_kaan_sena",
        tenantName: "Sena & Kaan B.",
        planType: "COUPLE_PREMIUM",
        status: "TRIALING",
        monthlyFeeAmount: 499,
        currency: "TRY",
        trialEndDate: new Date("2026-08-05"),
        currentPeriodStart: new Date("2026-07-22"),
        currentPeriodEnd: new Date("2026-08-22"),
        usageQuotaMax: 10, // WedyAI Sınırsız Bütçe Asistanı
        usageQuotaCurrent: 4,
        aiChurnRiskPercent: 12,
        aiUpgradeRecommendation: "Çift VIP Davetiye Modülünü aktifleştirdi. Yıllık abonelikte %20 indirim sunun.",
        autoRenew: true,
      },
      {
        id: "sub_103",
        tenantIdRef: "ag_wedding_istanbul",
        tenantName: "Ahenk Düğün Acentesi",
        planType: "AGENCY",
        status: "ACTIVE",
        monthlyFeeAmount: 4500,
        currency: "TRY",
        currentPeriodStart: new Date("2026-07-15"),
        currentPeriodEnd: new Date("2026-08-15"),
        usageQuotaMax: 50,
        usageQuotaCurrent: 48,
        aiChurnRiskPercent: 5,
        aiUpgradeRecommendation: "Kota dolmak üzere (%96). Otomatik plan yükseltme tetiklendi.",
        autoRenew: true,
      },
    ];
  }

  /**
   * Faturalandırma ve MRR Özetini Getirir
   */
  public static async getBillingSummary(): Promise<BillingSummary> {
    const subs = await this.getSubscriptions();
    const mrr = subs.reduce((acc, curr) => acc + curr.monthlyFeeAmount, 0);

    return {
      monthlyRecurringRevenueMrr: mrr,
      activeSubscriptionsCount: subs.length,
      churnRatePercent: 1.8,
      currency: "TRY",
      aiMrrForecast30Days: mrr * 1.14, // %14 büyüme öngörüsü
    };
  }

  /**
   * Abonelik Planı Yükseltir veya Değiştirir
   */
  public static async changePlan(
    subId: string,
    newPlan: SubscriptionPlanType,
    newFee: number
  ): Promise<boolean> {
    const subs = await this.getSubscriptions();
    const idx = subs.findIndex((s) => s.id === subId);

    if (idx !== -1) {
      subs[idx].planType = newPlan;
      subs[idx].monthlyFeeAmount = newFee;
      subs[idx].status = "ACTIVE";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subs));
      }
      return true;
    }
    return false;
  }

  /**
   * Aboneliği İptal Eder veya Otomatik Yenilemeyi Kapatır
   */
  public static async cancelSubscription(subId: string): Promise<boolean> {
    const subs = await this.getSubscriptions();
    const idx = subs.findIndex((s) => s.id === subId);

    if (idx !== -1) {
      subs[idx].autoRenew = false;
      subs[idx].status = "CANCELED";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subs));
      }
      return true;
    }
    return false;
  }
}