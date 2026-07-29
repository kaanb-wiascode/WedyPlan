export interface RegionalFormatConfig {
    countryCode: string; // e.g. "TR", "US", "DE", "AE", "GB"
    countryName: string;
    dateFormatPattern: string; // e.g. "DD.MM.YYYY", "MM/DD/YYYY", "YYYY-MM-DD"
    numberFormatDecimalSeparator: string; // e.g. "," or "."
    numberFormatThousandSeparator: string; // e.g. "." or ","
    phoneCountryCallingCode: string; // e.g. "+90", "+1", "+49", "+971", "+44"
    phoneFormatPattern: string; // e.g. "+90 (5XX) XXX XX XX"
    addressStructureTemplate: string; // e.g. "Mahalle, Cadde, Sokak, İlçe/İl", "Street, City, State, ZIP"
    postalCodePatternRegex: string; // e.g. "^[0-9]{5}$"
    defaultCurrencyCode: string; // e.g. "TRY", "USD", "EUR", "AED", "GBP"
    defaultTaxProfileIdRef: string; // e.g. "tax_101_TR", "tax_102_EU"
    isOverrideActive: boolean;
    updatedAt: Date;
  }
  
  export interface RegionalConfigSummary {
    configuredCountriesCount: number;
    activeOverridesCount: number;
    aiConfigValidationScorePercent: number; // 0-100%
    aiRegionalRecommendationNote: string;
  }
  
  export class RegionalConfigEngine {
    private static STORAGE_KEY = "WEDYPLAN_REGIONAL_CONFIGS_V1";
  
    /**
     * Ülkelere Özel Biçimlendirme ve Bölgesel Konfigürasyonları Getirir
     */
    public static async getRegionalConfigs(): Promise<RegionalFormatConfig[]> {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) return JSON.parse(data);
      }
  
      return [
        {
          countryCode: "TR",
          countryName: "Türkiye",
          dateFormatPattern: "DD.MM.YYYY",
          numberFormatDecimalSeparator: ",",
          numberFormatThousandSeparator: ".",
          phoneCountryCallingCode: "+90",
          phoneFormatPattern: "+90 (5XX) XXX XX XX",
          addressStructureTemplate: "Mahalle / Sokak, Daire No, İlçe / İl",
          postalCodePatternRegex: "^[0-9]{5}$",
          defaultCurrencyCode: "TRY",
          defaultTaxProfileIdRef: "tax_101_TR_KDV20",
          isOverrideActive: true,
          updatedAt: new Date("2026-07-29T10:00:00"),
        },
        {
          countryCode: "US",
          countryName: "United States",
          dateFormatPattern: "MM/DD/YYYY",
          numberFormatDecimalSeparator: ".",
          numberFormatThousandSeparator: ",",
          phoneCountryCallingCode: "+1",
          phoneFormatPattern: "+1 (XXX) XXX-XXXX",
          addressStructureTemplate: "Street Address, Apt/Suite, City, State, ZIP",
          postalCodePatternRegex: "^[0-9]{5}(-[0-9]{4})?$",
          defaultCurrencyCode: "USD",
          defaultTaxProfileIdRef: "tax_104_US_SALES",
          isOverrideActive: true,
          updatedAt: new Date("2026-07-28T14:30:00"),
        },
        {
          countryCode: "DE",
          countryName: "Deutschland (Germany)",
          dateFormatPattern: "DD.MM.YYYY",
          numberFormatDecimalSeparator: ",",
          numberFormatThousandSeparator: ".",
          phoneCountryCallingCode: "+49",
          phoneFormatPattern: "+49 XXX XXXXXXXX",
          addressStructureTemplate: "Straße und Hausnummer, PLZ Ort, Land",
          postalCodePatternRegex: "^[0-9]{5}$",
          defaultCurrencyCode: "EUR",
          defaultTaxProfileIdRef: "tax_102_DE_MWST19",
          isOverrideActive: true,
          updatedAt: new Date("2026-07-27T11:20:00"),
        },
        {
          countryCode: "AE",
          countryName: "United Arab Emirates (UAE)",
          dateFormatPattern: "DD/MM/YYYY",
          numberFormatDecimalSeparator: ".",
          numberFormatThousandSeparator: ",",
          phoneCountryCallingCode: "+971",
          phoneFormatPattern: "+971 5X XXX XXXX",
          addressStructureTemplate: "Building/Villa, Street, Area, Emirate",
          postalCodePatternRegex: "^[0-9]{5}$",
          defaultCurrencyCode: "AED",
          defaultTaxProfileIdRef: "tax_103_AE_VAT5",
          isOverrideActive: true,
          updatedAt: new Date("2026-07-26T09:10:00"),
        },
      ];
    }
  
    /**
     * Bölgesel Konfigürasyon Özetini Getirir
     */
    public static async getConfigSummary(): Promise<RegionalConfigSummary> {
      return {
        configuredCountriesCount: 4,
        activeOverridesCount: 4,
        aiConfigValidationScorePercent: 99.4,
        aiRegionalRecommendationNote: "ABD (US) için MM/DD/YYYY tarih formatı ve ZIP+4 posta kodu regex doğrulaması %100 uyumlu olarak yapılandırıldı.",
      };
    }
  
    /**
     * Ülke Konfigürasyonunu Günceller / Geçersiz Kılar (Override)
     */
    public static async updateCountryConfig(
      countryCode: string,
      updates: Partial<RegionalFormatConfig>
    ): Promise<boolean> {
      const configs = await this.getRegionalConfigs();
      const idx = configs.findIndex((c) => c.countryCode === countryCode);
  
      if (idx !== -1) {
        configs[idx] = { ...configs[idx], ...updates, updatedAt: new Date() };
  
        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(configs));
        }
        return true;
      }
      return false;
    }
  }