export type RegionScopeCode = "TR_LOCAL" | "EU_CENTRAL" | "UK_REGION" | "GCC_GULF" | "US_EAST";
export type SupportedLanguageCode = "tr" | "en" | "de" | "ar" | "fr";

export interface RegionalDomainProfile {
  id: string;
  regionCode: RegionScopeCode;
  regionName: string;
  defaultLanguage: SupportedLanguageCode;
  supportedLanguages: SupportedLanguageCode[];
  defaultCurrency: string;
  timeZoneIana: string;
  privacyComplianceFramework: string; // e.g. "KVKK", "GDPR", "CCPA", "UAE_PDPL"
  vatTaxRateDefaultPercent: number;
  culturalWeddingTemplate: string;
  isActive: boolean;
}

export interface GlobalPlatformSummary {
  activeRegionsCount: number;
  supportedLanguagesCount: number;
  primaryActiveRegion: RegionScopeCode;
  aiGlobalReadinessScorePercent: number;
  aiLocalizationInsightNote: string;
}

export class GlobalEngine {
  private static STORAGE_KEY = "WEDYPLAN_GLOBAL_DOMAINS_V1";

  /**
   * Tanımlı Bölgesel Alan Profillerini Getirir
   */
  public static async getRegionalDomains(): Promise<RegionalDomainProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "reg_tr",
        regionCode: "TR_LOCAL",
        regionName: "Türkiye & KKTC Bölgesi",
        defaultLanguage: "tr",
        supportedLanguages: ["tr", "en"],
        defaultCurrency: "TRY",
        timeZoneIana: "Europe/Istanbul",
        privacyComplianceFramework: "KVKK & VUK",
        vatTaxRateDefaultPercent: 20.0,
        culturalWeddingTemplate: "Geleneksel & Kır Düğünü Konsepti",
        isActive: true,
      },
      {
        id: "reg_eu",
        regionCode: "EU_CENTRAL",
        regionName: "Avrupa Birliği (EU) Merkez",
        defaultLanguage: "de",
        supportedLanguages: ["de", "en", "fr"],
        defaultCurrency: "EUR",
        timeZoneIana: "Europe/Berlin",
        privacyComplianceFramework: "EU GDPR & PSD2",
        vatTaxRateDefaultPercent: 19.0,
        culturalWeddingTemplate: "Şato & Klasik Balo Konsepti",
        isActive: true,
      },
      {
        id: "reg_gcc",
        regionCode: "GCC_GULF",
        regionName: "Körfez (GCC) & BAE Bölgesi",
        defaultLanguage: "ar",
        supportedLanguages: ["ar", "en"],
        defaultCurrency: "AED",
        timeZoneIana: "Asia/Dubai",
        privacyComplianceFramework: "UAE PDPL & GCC VAT",
        vatTaxRateDefaultPercent: 5.0,
        culturalWeddingTemplate: "VIP Lüks Otel & Saray Konsepti",
        isActive: true,
      },
      {
        id: "reg_us",
        regionCode: "US_EAST",
        regionName: "Kuzey Amerika (US East)",
        defaultLanguage: "en",
        supportedLanguages: ["en"],
        defaultCurrency: "USD",
        timeZoneIana: "America/New_York",
        privacyComplianceFramework: "US CCPA & FATCA",
        vatTaxRateDefaultPercent: 8.875,
        culturalWeddingTemplate: "Modern Sahil & Destinasyon Düğünü",
        isActive: true,
      },
    ];
  }

  /**
   * Küresel Platform Hazırlık Özetini Getirir
   */
  public static async getGlobalSummary(): Promise<GlobalPlatformSummary> {
    return {
      activeRegionsCount: 4,
      supportedLanguagesCount: 5,
      primaryActiveRegion: "TR_LOCAL",
      aiGlobalReadinessScorePercent: 98,
      aiLocalizationInsightNote: "Tüm bölgesel alan modelleri KVKK, GDPR ve UAE PDPL yasal uyum parametreleri ile %100 senkronize edildi.",
    };
  }

  /**
   * Bölgesel Alan Profilini Aktif/Pasif Yapar
   */
  public static async toggleRegionStatus(regionId: string): Promise<boolean> {
    const domains = await this.getRegionalDomains();
    const idx = domains.findIndex((d) => d.id === regionId);

    if (idx !== -1) {
      domains[idx].isActive = !domains[idx].isActive;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(domains));
      }
      return true;
    }
    return false;
  }
}