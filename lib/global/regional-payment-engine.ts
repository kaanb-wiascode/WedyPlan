export type PaymentGatewayCode = "IYZICO_TR" | "STRIPE_EU" | "CHECKOUT_GCC" | "ADYEN_US";
export type GatewayHealthStatus = "HEALTHY" | "DEGRADED" | "OUTAGE_FAILOVER";

export interface PaymentProviderRecord {
  id: string;
  providerCode: PaymentGatewayCode;
  providerName: string;
  supportedCountries: string[]; // e.g. ["TR"], ["DE", "FR"], ["AE", "SA"]
  supportedCurrencies: string[];
  supportedApms: string[]; // e.g. "Troy", "iDEAL", "Klarna", "Mada", "ApplePay"
  healthStatus: GatewayHealthStatus;
  authorizationSuccessRatePercent: number; // 0-100%
  averageLatencyMs: number;
  isPrimaryForRegion: boolean;
  fallbackProviderCode?: PaymentGatewayCode;
  aiPredictedFailureRiskPercent: number;
  aiRoutingTip: string;
}

export interface PaymentRoutingSummary {
  registeredProvidersCount: number;
  activeHealthyGatewaysCount: number;
  overallAuthSuccessRatePercent: number;
  aiRoutingEfficiencyScorePercent: number;
  aiPaymentInsightNote: string;
}

export class RegionalPaymentEngine {
  private static STORAGE_KEY = "WEDYPLAN_REGIONAL_PAYMENTS_V1";

  /**
   * Kayıtlı Bölgesel Ödeme Sağlayıcılarını Getirir
   */
  public static async getProviders(): Promise<PaymentProviderRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "gw_tr",
        providerCode: "IYZICO_TR",
        providerName: "Iyzico / PayU Türkiye (Yerel Gateway)",
        supportedCountries: ["TR"],
        supportedCurrencies: ["TRY"],
        supportedApms: ["Troy", "Taksitli Kredi Kartı", "BKM Express"],
        healthStatus: "HEALTHY",
        authorizationSuccessRatePercent: 98.4,
        averageLatencyMs: 140,
        isPrimaryForRegion: true,
        fallbackProviderCode: "STRIPE_EU",
        aiPredictedFailureRiskPercent: 1,
        aiRoutingTip: "Türkiye yerel kart BIN routing aktif. Troy ve peşin fiyatına taksit entegrasyonu %98.4 başarı sağlıyor.",
      },
      {
        id: "gw_eu",
        providerCode: "STRIPE_EU",
        providerName: "Stripe Europe (EU Core Gateway)",
        supportedCountries: ["DE", "FR", "UK", "IT"],
        supportedCurrencies: ["EUR", "GBP"],
        supportedApms: ["iDEAL", "Sofort", "Klarna", "SEPA Direct"],
        healthStatus: "HEALTHY",
        authorizationSuccessRatePercent: 97.2,
        averageLatencyMs: 180,
        isPrimaryForRegion: true,
        fallbackProviderCode: "ADYEN_US",
        aiPredictedFailureRiskPercent: 2,
        aiRoutingTip: "Almanya ve AB bölgesinde SEPA ve Klarna APM geçişleri %97.2 otorizasyon başarısı yakaladı.",
      },
      {
        id: "gw_gcc",
        providerCode: "CHECKOUT_GCC",
        providerName: "Checkout.com Middle East (GCC Hub)",
        supportedCountries: ["AE", "SA"],
        supportedCurrencies: ["AED", "SAR"],
        supportedApms: ["Mada", "Benefit", "Tabby BNPL", "Apple Pay"],
        healthStatus: "HEALTHY",
        authorizationSuccessRatePercent: 96.8,
        averageLatencyMs: 210,
        isPrimaryForRegion: true,
        aiPredictedFailureRiskPercent: 3,
        aiRoutingTip: "BAE ve Suudi Arabistan kartlarında Mada ve Apple Pay dinamik yönlendirmesi yetkisiz red oranını %3 düşürdü.",
      },
      {
        id: "gw_us",
        providerCode: "ADYEN_US",
        providerName: "Adyen Global North America",
        supportedCountries: ["US", "CA"],
        supportedCurrencies: ["USD", "CAD"],
        supportedApms: ["Google Pay", "Apple Pay", "Afterpay"],
        healthStatus: "HEALTHY",
        authorizationSuccessRatePercent: 95.9,
        averageLatencyMs: 165,
        isPrimaryForRegion: true,
        fallbackProviderCode: "STRIPE_EU",
        aiPredictedFailureRiskPercent: 2,
        aiRoutingTip: "US East yerel kart edinimi (local acquiring) sayesinde çapraz sınır komisyonu sıfırlandı.",
      },
    ];
  }

  /**
   * Ödeme Yönlendirme Özetini Getirir
   */
  public static async getSummary(): Promise<PaymentRoutingSummary> {
    return {
      registeredProvidersCount: 4,
      activeHealthyGatewaysCount: 4,
      overallAuthSuccessRatePercent: 97.1,
      aiRoutingEfficiencyScorePercent: 99.2,
      aiPaymentInsightNote: "Tüm bölgesel ödeme ağ geçitleri (Gateway adapters) %97.1 ortalama başarım ve otonom failover korumasıyla aktiftir.",
    };
  }

  /**
   * Sağlayıcı Sağlık Durumunu / Failover Toggles
   */
  public static async toggleProviderStatus(providerId: string): Promise<boolean> {
    const providers = await this.getProviders();
    const idx = providers.findIndex((p) => p.id === providerId);

    if (idx !== -1) {
      providers[idx].healthStatus = providers[idx].healthStatus === "HEALTHY" ? "OUTAGE_FAILOVER" : "HEALTHY";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(providers));
      }
      return true;
    }
    return false;
  }
}