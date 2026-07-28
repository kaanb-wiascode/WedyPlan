export interface GrowthKpiMetrics {
    cac: { coupleCac: number; vendorCac: number; currency: string };
    ltv: { coupleLtv: number; vendorLtv: number; ltvCacRatio: number };
    activationRatePercent: number; // %
    retentionRatePercent: number; // %
    churnRatePercent: number; // %
    referralKFactor: number; // Virallik katsayısı (Örn: 1.25)
    conversionRatePercent: number; // %
    marketplaceLiquidity: {
      matchRatePercent: number;
      activeDemandsCount: number;
      activeSupplyCount: number;
      regionalBalanceScore: "EXCELLENT" | "BALANCED" | "SUPPLY_SHORTAGE" | "DEMAND_SHORTAGE";
    };
  }
  
  export interface ReferralCampaign {
    id: string;
    code: string;
    type: "COUPLE_REFER_COUPLE" | "VENDOR_AFFILIATE" | "COMMUNITY_AMBASSADOR";
    rewardAmount: number;
    rewardCurrency: string;
    totalInvitesSent: number;
    successfulConversions: number;
    earnedRewardsTotal: number;
  }
  
  export interface AiGrowthInsight {
    id: string;
    category: "ACQUISITION" | "LIQUIDITY" | "RETENTION" | "PAID_GROWTH";
    title: string;
    insightSummary: string;
    recommendedAction: string;
    predictedImpact: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
  }
  
  export class GrowthEngine {
    private static STORAGE_KEY = "WEDYPLAN_GROWTH_STATE_V1";
    private static REFERRAL_KEY = "WEDYPLAN_REFERRAL_DATA_V1";
  
    /**
     * Büyüme KPI Metriklerini Hesaplar ve Getirir
     */
    public static async getGrowthKpiMetrics(): Promise<GrowthKpiMetrics> {
      return {
        cac: { coupleCac: 420, vendorCac: 1850, currency: "TRY" },
        ltv: { coupleLtv: 2850, vendorLtv: 16400, ltvCacRatio: 6.8 }, // Mükemmel LTV/CAC Oranı
        activationRatePercent: 74.5,
        retentionRatePercent: 88.2,
        churnRatePercent: 2.8,
        referralKFactor: 1.34, // Viral büyüme eşiğinin üzerinde
        conversionRatePercent: 18.6,
        marketplaceLiquidity: {
          matchRatePercent: 91.4,
          activeDemandsCount: 3420,
          activeSupplyCount: 890,
          regionalBalanceScore: "BALANCED",
        },
      };
    }
  
    /**
     * Referans & Affiliate Kampanya Verilerini Getirir
     */
    public static getReferralCampaigns(): ReferralCampaign[] {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.REFERRAL_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "ref_couple_101",
          code: "WEDY-KAAN2026",
          type: "COUPLE_REFER_COUPLE",
          rewardAmount: 500,
          rewardCurrency: "TRY",
          totalInvitesSent: 18,
          successfulConversions: 6,
          earnedRewardsTotal: 3000,
        },
        {
          id: "ref_vendor_202",
          code: "PARTNER-CIRAGAN",
          type: "VENDOR_AFFILIATE",
          rewardAmount: 2500,
          rewardCurrency: "TRY",
          totalInvitesSent: 45,
          successfulConversions: 14,
          earnedRewardsTotal: 35000,
        },
      ];
    }
  
    /**
     * WedyAI Yapay Zeka Büyüme Tahminleri ve Tavsiyelerini Üretir
     */
    public static async getAiGrowthInsights(): Promise<AiGrowthInsight[]> {
      return [
        {
          id: "insight_101",
          category: "LIQUIDITY",
          title: "Bodrum Kır Düğünü Arz Yetersizliği",
          insightSummary: "Bodrum bölgesinde Temmuz-Ağustos talepleri %42 arttı, onaylı mekan kapasitesi sınırda.",
          recommendedAction: "Bodrum bölgesindeki 5 lüks mekan tedarikçisini B2B komisyon indirimi ile platforma dahil edin.",
          predictedImpact: "+₺280.000 TL GMV artışı ve %12 dönüşüm yükselişi.",
          priority: "HIGH",
        },
        {
          id: "insight_102",
          category: "ACQUISITION",
          title: "Referral K-Factor İvmelenmesi",
          insightSummary: "Çiftlerin arkadaşlarını davet etme oranı 1.34'e yükseldi (Viral Büyüme Modu).",
          recommendedAction: "E-İmzasını tamamlayan çiftlere ₺500 TL Escrow hediye kuponu davet kartı sunun.",
          predictedImpact: "Organic CAC maliyetinde %18 düşüş.",
          priority: "HIGH",
        },
        {
          id: "insight_103",
          category: "PAID_GROWTH",
          title: "Meta Ads & TikTok Retargeting Optimizasyonu",
          insightSummary: "Sözleşme adımı yarıda kalan çiftlerin yeniden hedeflenmesinde ROAS 8.4x seviyesinde.",
          recommendedAction: "A/B testi ile 'Escrow Güvenceli Düğün' temalı video içerik bütçesini %25 artırın.",
          predictedImpact: "+120 ek aylık e-imzalı sözleşme.",
          priority: "MEDIUM",
        },
      ];
    }
  
    /**
     * Yeni Referans / Affiliate Kodu Oluşturur
     */
    public static createReferralCode(
      type: ReferralCampaign["type"],
      customCode?: string
    ): ReferralCampaign {
      const code = customCode || `WEDY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newCamp: ReferralCampaign = {
        id: `camp_${Math.random().toString(36).substring(2, 9)}`,
        code,
        type,
        rewardAmount: type === "VENDOR_AFFILIATE" ? 2500 : 500,
        rewardCurrency: "TRY",
        totalInvitesSent: 0,
        successfulConversions: 0,
        earnedRewardsTotal: 0,
      };
  
      const current = this.getReferralCampaigns();
      current.unshift(newCamp);
  
      if (typeof window !== "undefined") {
        localStorage.setItem(this.REFERRAL_KEY, JSON.stringify(current));
      }
  
      return newCamp;
    }
  }