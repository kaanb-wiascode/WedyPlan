export interface CountryCatalogVendor {
    id: string;
    vendorName: string;
    category: string;
    countryCode: string; // e.g. "TR", "DE", "AE", "US"
    city: string;
    localizedBasePriceAmount: number;
    currencyCode: string;
    aiDemandForecastScorePercent: number; // 0-100%
    aiVendorMatchRating: number; // 0.0 - 5.0
    isRegionalCampaignEligible: boolean;
    isVisibleInCountryCatalog: boolean;
  }
  
  export interface MultiCountryMarketplaceSummary {
    activeCountryCatalogsCount: number;
    totalRegionalVendorsCount: number;
    activeRegionalCampaignsCount: number;
    primaryCountryCode: string; // "TR"
    aiDemandForecastInsightNote: string;
  }
  
  export class MultiCountryMarketplaceEngine {
    private static STORAGE_KEY = "WEDYPLAN_GLOBAL_MARKETPLACE_V1";
  
    /**
     * Ülke Kataloğu Tedarikçilerini Getirir
     */
    public static async getCountryCatalogVendors(): Promise<CountryCatalogVendor[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "v_mkt_101",
          vendorName: "Çırağan Palace Kempinski",
          category: "Mekan & Yeme-İçme (Venue & Catering)",
          countryCode: "TR",
          city: "İstanbul",
          localizedBasePriceAmount: 180000,
          currencyCode: "TRY",
          aiDemandForecastScorePercent: 98,
          aiVendorMatchRating: 4.9,
          isRegionalCampaignEligible: true,
          isVisibleInCountryCatalog: true,
        },
        {
          id: "v_mkt_102",
          vendorName: "Schloss Neuschwanstein Events",
          category: "Tarihi Şato & Lüks Mekan",
          countryCode: "DE",
          city: "Münih / Bavyera",
          localizedBasePriceAmount: 5400,
          currencyCode: "EUR",
          aiDemandForecastScorePercent: 94,
          aiVendorMatchRating: 4.8,
          isRegionalCampaignEligible: true,
          isVisibleInCountryCatalog: true,
        },
        {
          id: "v_mkt_103",
          vendorName: "Burj Al Arab Wedding Suite",
          category: "VIP Saray & Balo Salonu",
          countryCode: "AE",
          city: "Dubai",
          localizedBasePriceAmount: 22000,
          currencyCode: "AED",
          aiDemandForecastScorePercent: 96,
          aiVendorMatchRating: 5.0,
          isRegionalCampaignEligible: false,
          isVisibleInCountryCatalog: true,
        },
        {
          id: "v_mkt_104",
          vendorName: "The Plaza Hotel NYC Weddings",
          category: "Lüks Otel & Balo Salonu",
          countryCode: "US",
          city: "New York",
          localizedBasePriceAmount: 7500,
          currencyCode: "USD",
          aiDemandForecastScorePercent: 91,
          aiVendorMatchRating: 4.7,
          isRegionalCampaignEligible: true,
          isVisibleInCountryCatalog: true,
        },
      ];
    }
  
    /**
     * Çok Ülkeli Pazaryeri Özetini Getirir
     */
    public static async getMarketplaceSummary(): Promise<MultiCountryMarketplaceSummary> {
      return {
        activeCountryCatalogsCount: 4,
        totalRegionalVendorsCount: 1240,
        activeRegionalCampaignsCount: 12,
        primaryCountryCode: "TR",
        aiDemandForecastInsightNote: "Almanya (DE) ve BAE (AE) destinasyon düğün kategorilerinde %28 talep artışı öngörülmektedir.",
      };
    }
  
    /**
     * Tedarikçi Ülke Görünürlüğünü Değiştirir
     */
    public static async toggleVendorVisibility(vendorId: string): Promise<boolean> {
      const vendors = await this.getCountryCatalogVendors();
      const idx = vendors.findIndex((v) => v.id === vendorId);
  
      if (idx !== -1) {
        vendors[idx].isVisibleInCountryCatalog = !vendors[idx].isVisibleInCountryCatalog;
  
        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vendors));
        }
        return true;
      }
      return false;
    }
  }