export interface RegionalPricingRule {
    id: string;
    ruleTitle: string;
    countryCode: string; // e.g. "TR", "DE", "AE", "US"
    currencyCode: string;
    baseSubscriptionPriceAmount: number;
    marketplaceTakeRatePercent: number;
    promotionalDiscountPercent: number;
    isPurchasingPowerParityApplied: boolean;
    isScheduledChangeActive: boolean;
    aiOptimizationScorePercent: number; // 0-100%
    aiPriceTip: string;
    updatedAt: Date;
  }
  
  export interface GlobalPricingSummary {
    configuredPricingRegionsCount: number;
    activePromotionsCount: number;
    aiPriceOptimizationHealthPercent: number;
    aiPricingInsightNote: string;
  }
  
  export class GlobalPricingEngine {
    private static STORAGE_KEY = "WEDYPLAN_GLOBAL_PRICING_V1";
  
    /**
     * Bölgesel Fiyatlandırma Kurallarını Getirir
     */
    public static async getPricingRules(): Promise<RegionalPricingRule[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "prc_tr",
          ruleTitle: "Türkiye Yerel Satın Alma Gücü (PPP) Fiyatlaması",
          countryCode: "TR",
          currencyCode: "TRY",
          baseSubscriptionPriceAmount: 2490,
          marketplaceTakeRatePercent: 10.0,
          promotionalDiscountPercent: 15,
          isPurchasingPowerParityApplied: true,
          isScheduledChangeActive: false,
          aiOptimizationScorePercent: 98,
          aiPriceTip: "Yerel satın alma gücü paritesi (PPP) düğün kiralama hacmini %34 artırmıştır.",
          updatedAt: new Date("2026-07-29T10:00:00"),
        },
        {
          id: "prc_de",
          ruleTitle: "Avrupa Birliği (DE) Standart Fiyatlama",
          countryCode: "DE",
          currencyCode: "EUR",
          baseSubscriptionPriceAmount: 149,
          marketplaceTakeRatePercent: 12.5,
          promotionalDiscountPercent: 10,
          isPurchasingPowerParityApplied: false,
          isScheduledChangeActive: true,
          aiOptimizationScorePercent: 95,
          aiPriceTip: "Almanya pazarı için %12.5 komisyon oranı rakip platformlarla tam uyumludur.",
          updatedAt: new Date("2026-07-28T14:30:00"),
        },
        {
          id: "prc_ae",
          ruleTitle: "BAE / Dubai VIP Premium Fiyatlama",
          countryCode: "AE",
          currencyCode: "AED",
          baseSubscriptionPriceAmount: 699,
          marketplaceTakeRatePercent: 15.0,
          promotionalDiscountPercent: 0,
          isPurchasingPowerParityApplied: false,
          isScheduledChangeActive: false,
          aiOptimizationScorePercent: 96,
          aiPriceTip: "Körfez bölgesinde yüksek marjlı VIP otel paketleri %15 komisyon oranı ile optimize edilmiştir.",
          updatedAt: new Date("2026-07-27T11:20:00"),
        },
        {
          id: "prc_us",
          ruleTitle: "ABD Kuzey Amerika Büyüme Fiyatlaması",
          countryCode: "US",
          currencyCode: "USD",
          baseSubscriptionPriceAmount: 199,
          marketplaceTakeRatePercent: 11.0,
          promotionalDiscountPercent: 20,
          isPurchasingPowerParityApplied: false,
          isScheduledChangeActive: true,
          aiOptimizationScorePercent: 94,
          aiPriceTip: "Lansmana özel %20 bölgesel indirim US tedarikçi katılımını %52 hızlandırmıştır.",
          updatedAt: new Date("2026-07-26T09:10:00"),
        },
      ];
    }
  
    /**
     * Küresel Fiyatlandırma Özetini Getirir
     */
    public static async getPricingSummary(): Promise<GlobalPricingSummary> {
      return {
        configuredPricingRegionsCount: 4,
        activePromotionsCount: 3,
        aiPriceOptimizationHealthPercent: 96.8,
        aiPricingInsightNote: "Çapraz kur ve Purchasing Power Parity (PPP) optimizasyonu sayesinde küresel dönüşüm oranı %22 yükselmiştir.",
      };
    }
  
    /**
     * Bölgesel Fiyat Kuralını Günceller
     */
    public static async updatePricingRule(
      ruleId: string,
      updates: Partial<RegionalPricingRule>
    ): Promise<boolean> {
      const rules = await this.getPricingRules();
      const idx = rules.findIndex((r) => r.id === ruleId);
  
      if (idx !== -1) {
        rules[idx] = { ...rules[idx], ...updates, updatedAt: new Date() };
  
        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rules));
        }
        return true;
      }
      return false;
    }
  }