export type TaxRegionScope = "TR_LOCAL" | "EU_VAT" | "GCC_VAT" | "US_SALES_TAX";
export type TaxCategoryType = "VALUE_ADDED_TAX" | "WITHHOLDING_TAX" | "CORPORATE_INCOME_TAX";

export interface TaxProfileRule {
  id: string;
  profileName: string;
  regionScope: TaxRegionScope;
  categoryType: TaxCategoryType;
  taxRatePercent: number; // e.g. 20% KDV or 5% GCC VAT
  isExemptionAllowed: boolean;
  withholdingTaxRatePercent?: number; // e.g. 15% Stopaj
  description: string;
  isActive: boolean;
}

export interface TaxExemptionRecord {
  id: string;
  entityName: string;
  taxIdentificationNumber: string;
  exemptionCertificateRef: string;
  regionScope: TaxRegionScope;
  approvedAt: Date;
}

export interface TaxReportSummary {
  totalTaxLiabilityCollected: number;
  totalWithholdingTaxReserved: number;
  activeTaxProfilesCount: number;
  currency: string;
  aiTaxRuleSuggestionNote: string;
  aiTaxComplianceAlert: string;
}

export class TaxEngine {
  private static STORAGE_KEY = "WEDYPLAN_TAX_PROFILES_V1";

  /**
   * Tanımlı Vergi Profillerini Getirir
   */
  public static async getTaxProfiles(): Promise<TaxProfileRule[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "tax_101",
        profileName: "Türkiye Standart KDV %20 Profil",
        regionScope: "TR_LOCAL",
        categoryType: "VALUE_ADDED_TAX",
        taxRatePercent: 20.0,
        withholdingTaxRatePercent: 15.0,
        isExemptionAllowed: true,
        description: "Türkiye pazaryeri işlemleri için %20 Katma Değer Vergisi ve %15 hizmet stopaj kesintisi.",
        isActive: true,
      },
      {
        id: "tax_102",
        profileName: "AB Bölgesi Dijital Hizmetler VAT (EU)",
        regionScope: "EU_VAT",
        categoryType: "VALUE_ADDED_TAX",
        taxRatePercent: 19.0,
        isExemptionAllowed: true,
        description: "Avrupa Birliği ülkeleri B2C dijital hizmet satışı için standart Katma Değer Vergisi.",
        isActive: true,
      },
      {
        id: "tax_103",
        profileName: "GCC Körfez Ülkeleri Standart VAT %5",
        regionScope: "GCC_VAT",
        categoryType: "VALUE_ADDED_TAX",
        taxRatePercent: 5.0,
        isExemptionAllowed: false,
        description: "Birleşik Arap Emirlikleri ve Körfez ülkeleri için %5 standart KDV yapısı.",
        isActive: true,
      },
    ];
  }

  /**
   * Vergi Raporlama Özetini Getirir
   */
  public static async getTaxSummary(): Promise<TaxReportSummary> {
    return {
      totalTaxLiabilityCollected: 3690000,
      totalWithholdingTaxReserved: 450000,
      activeTaxProfilesCount: 3,
      currency: "TRY",
      aiTaxRuleSuggestionNote: "Çapraz sınır B2B işlemleri için 'Reverse Charge (Ters Mükellefiyet)' KDV kuralının aktifleştirilmesi önerilir.",
      aiTaxComplianceAlert: "30 Temmuz KDV beyannamesi dönemi yaklaşıyor. ₺3.690.000 TL KDV rezervi otomatik hazırlandı.",
    };
  }

  /**
   * Vergi Profil Oranını Günceller
   */
  public static async updateTaxProfileRate(
    profileId: string,
    newRate: number
  ): Promise<boolean> {
    const profiles = await this.getTaxProfiles();
    const idx = profiles.findIndex((p) => p.id === profileId);

    if (idx !== -1) {
      profiles[idx].taxRatePercent = newRate;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
      }
      return true;
    }
    return false;
  }
}