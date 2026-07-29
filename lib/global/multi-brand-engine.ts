export interface MultiBrandProfile {
    id: string;
    brandName: string;
    primaryDomain: string; // e.g. "wedyplan.com", "luxeweddings.de", "dubaiweddings.ae"
    subdomainAlias: string; // e.g. "de.wedyplan.com"
    primaryColorHex: string; // e.g. "#D4AF37", "#000000", "#1E3A8A"
    accentColorHex: string;
    logoAssetUrl: string;
    supportEmailSender: string;
    targetRegionCode: string; // e.g. "TR", "DE", "AE", "US"
    isWhiteLabelActive: boolean;
    totalBrandGmvAmount: number;
    currencyCode: string;
    aiBrandHealthScorePercent: number; // 0-100%
    aiPerformanceNote: string;
    updatedAt: Date;
  }
  
  export interface MultiBrandSummary {
    totalActiveBrandsCount: number;
    customDomainsConfiguredCount: number;
    primaryActiveBrandId: string;
    aiBrandPerformanceInsightNote: string;
  }
  
  export class MultiBrandEngine {
    private static STORAGE_KEY = "WEDYPLAN_MULTI_BRANDS_V1";
  
    /**
     * Tanımlı Marka ve Beyaz Etiket Profillerini Getirir
     */
    public static async getBrandProfiles(): Promise<MultiBrandProfile[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          id: "brand_core",
          brandName: "WedyPlan Global (Ana Marka)",
          primaryDomain: "wedyplan.com",
          subdomainAlias: "app.wedyplan.com",
          primaryColorHex: "#D4AF37",
          accentColorHex: "#111111",
          logoAssetUrl: "https://assets.wedyplan.com/logo-gold.svg",
          supportEmailSender: "support@wedyplan.com",
          targetRegionCode: "TR",
          isWhiteLabelActive: true,
          totalBrandGmvAmount: 18400000,
          currencyCode: "TRY",
          aiBrandHealthScorePercent: 99,
          aiPerformanceNote: "Ana platform markası Türkiye ve küresel pazarda %99 marka güvencesiyle çalışmaktadır.",
          updatedAt: new Date("2026-07-29T10:00:00"),
        },
        {
          id: "brand_luxe_de",
          brandName: "LuxeWeddings Germany",
          primaryDomain: "luxeweddings.de",
          subdomainAlias: "de.wedyplan.com",
          primaryColorHex: "#1E3A8A",
          accentColorHex: "#F5F4F0",
          logoAssetUrl: "https://assets.wedyplan.com/logo-luxe-de.svg",
          supportEmailSender: "kontakt@luxeweddings.de",
          targetRegionCode: "DE",
          isWhiteLabelActive: true,
          totalBrandGmvAmount: 3200000,
          currencyCode: "EUR",
          aiBrandHealthScorePercent: 96,
          aiPerformanceNote: "Almanya beyaz etiket markası Bavyera ve Berlin bölgelerinde aylık %28 büyüme kaydetti.",
          updatedAt: new Date("2026-07-28T14:30:00"),
        },
        {
          id: "brand_dubai_vip",
          brandName: "Dubai Royal Wedding Concierge",
          primaryDomain: "dubaiweddings.ae",
          subdomainAlias: "ae.wedyplan.com",
          primaryColorHex: "#10B981",
          accentColorHex: "#000000",
          logoAssetUrl: "https://assets.wedyplan.com/logo-dubai-royal.svg",
          supportEmailSender: "vip@dubaiweddings.ae",
          targetRegionCode: "AE",
          isWhiteLabelActive: true,
          totalBrandGmvAmount: 1950000,
          currencyCode: "AED",
          aiBrandHealthScorePercent: 97,
          aiPerformanceNote: "Körfez bölgesinde lüks otel paketleri için özelleştirilmiş yeşil/altın tema %97 dönüşüm sağlamaktadır.",
          updatedAt: new Date("2026-07-27T11:20:00"),
        },
      ];
    }
  
    /**
     * Çoklu Marka Platform Özetini Getirir
     */
    public static async getBrandSummary(): Promise<MultiBrandSummary> {
      return {
        totalActiveBrandsCount: 3,
        customDomainsConfiguredCount: 3,
        primaryActiveBrandId: "brand_core",
        aiBrandPerformanceInsightNote: "Çoklu marka ve özel alan adı (Custom Domain) yönlendirmeleri SSL ve DNS senkronizasyonu ile %100 uyumludur.",
      };
    }
  
    /**
     * Marka Özelleştirmesini Günceller
     */
    public static async updateBrandProfile(
      brandId: string,
      updates: Partial<MultiBrandProfile>
    ): Promise<boolean> {
      const brands = await this.getBrandProfiles();
      const idx = brands.findIndex((b) => b.id === brandId);
  
      if (idx !== -1) {
        brands[idx] = { ...brands[idx], ...updates, updatedAt: new Date() };
  
        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(brands));
        }
        return true;
      }
      return false;
    }
  }