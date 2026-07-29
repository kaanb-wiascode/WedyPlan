export type TextDirection = "LTR" | "RTL";

export interface SupportedLanguageMeta {
  code: string; // e.g. "tr", "en", "ar", "de", "fr"
  name: string;
  nativeName: string;
  direction: TextDirection;
  isRtl: boolean;
  completionPercent: number;
  missingKeysCount: number;
}

export interface TranslationKeyRecord {
  id: string;
  keyNamespace: string; // e.g. "checkout.escrow_label", "common.welcome"
  trText: string;
  enText: string;
  arText: string;
  deText: string;
  aiQualityScorePercent: number; // 0-100%
  hasMissingTranslation: boolean;
  version: number;
  updatedAt: Date;
}

export interface LocalizationSummary {
  totalKeysCount: number;
  supportedLanguagesCount: number;
  fallbackLanguageCode: string; // "en"
  aiTranslationMemoryAccuracyPercent: number;
  aiLocalizationQualityTip: string;
}

export class LocalizationEngine {
  private static STORAGE_KEY = "WEDYPLAN_LOCALIZATION_KEYS_V1";

  /**
   * Desteklenen Dillerin Metadatasını Getirir (RTL Desteği Dahil)
   */
  public static async getLanguages(): Promise<SupportedLanguageMeta[]> {
    return [
      { code: "tr", name: "Turkish", nativeName: "Türkçe", direction: "LTR", isRtl: false, completionPercent: 100, missingKeysCount: 0 },
      { code: "en", name: "English", nativeName: "English (US)", direction: "LTR", isRtl: false, completionPercent: 100, missingKeysCount: 0 },
      { code: "de", name: "German", nativeName: "Deutsch", direction: "LTR", isRtl: false, completionPercent: 96, missingKeysCount: 4 },
      { code: "ar", name: "Arabic", nativeName: "العربية", direction: "RTL", isRtl: true, completionPercent: 92, missingKeysCount: 8 },
      { code: "fr", name: "French", nativeName: "Français", direction: "LTR", isRtl: false, completionPercent: 94, missingKeysCount: 6 },
    ];
  }

  /**
   * Çeviri Anahtar Kayıtlarını Getirir
   */
  public static async getTranslationKeys(): Promise<TranslationKeyRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "key_101",
        keyNamespace: "fintech.escrow_security_badge",
        trText: "Escrow Güvenceli Ödeme",
        enText: "Escrow Protected Settlement",
        arText: "دفع آمن برهن الضمان",
        deText: "Treuhandgesicherte Zahlung",
        aiQualityScorePercent: 99,
        hasMissingTranslation: false,
        version: 1,
        updatedAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "key_102",
        keyNamespace: "checkout.vat_tax_included",
        trText: "KDV Dahil Net Tutar",
        enText: "Net Amount Inc. VAT",
        arText: "المبلغ الإجمالي شامل ضريبة القيمة المضافة",
        deText: "Nettobetrag inkl. MwSt.",
        aiQualityScorePercent: 97,
        hasMissingTranslation: false,
        version: 2,
        updatedAt: new Date("2026-07-28T16:00:00"),
      },
    ];
  }

  /**
   * Yerelleştirme Özetini Getirir
   */
  public static async getLocalizationSummary(): Promise<LocalizationSummary> {
    return {
      totalKeysCount: 1240,
      supportedLanguagesCount: 5,
      fallbackLanguageCode: "en",
      aiTranslationMemoryAccuracyPercent: 98.6,
      aiLocalizationQualityTip: "Arapça (ar) dili için RTL metin hizalaması ve Arap rakamları piktogramı otomatik aktifleştirildi.",
    };
  }

  /**
   * Yeni Çeviri / Otomatik Çeviri Önerisi Günceller
   */
  public static async updateTranslationKey(
    keyId: string,
    langCode: "tr" | "en" | "ar" | "de",
    newText: string
  ): Promise<boolean> {
    const keys = await this.getTranslationKeys();
    const idx = keys.findIndex((k) => k.id === keyId);

    if (idx !== -1) {
      if (langCode === "tr") keys[idx].trText = newText;
      if (langCode === "en") keys[idx].enText = newText;
      if (langCode === "ar") keys[idx].arText = newText;
      if (langCode === "de") keys[idx].deText = newText;

      keys[idx].version += 1;
      keys[idx].updatedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(keys));
      }
      return true;
    }
    return false;
  }
}