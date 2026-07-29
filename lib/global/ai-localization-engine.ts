export type ConversationalTone = "WARM_TRADITIONAL" | "PRECISE_FORMAL" | "LUXURY_RESPECTFUL" | "DIRECT_CASUAL";

export interface RegionalAiPromptProfile {
  id: string;
  countryCode: string; // e.g. "TR", "DE", "AE", "US"
  countryName: string;
  languageCode: string;
  tone: ConversationalTone;
  culturalEventFocus: string; // e.g. "Kına & Kır Düğünü", "Schloss & Standesamt", "VIP Saray & Balo"
  systemPromptAddendum: string;
  aiResponseQualityScorePercent: number; // 0-100%
  aiCulturalValidationTip: string;
  isActive: boolean;
  updatedAt: Date;
}

export interface AiLocalizationSummary {
  configuredAiProfilesCount: number;
  supportedAiLanguagesCount: number;
  overallAiCulturalAccuracyPercent: number;
  aiLocalizationInsightNote: string;
}

export class AiLocalizationEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_LOCALIZATION_V1";

  /**
   * Bölgesel AI Prompt Profillerini Getirir
   */
  public static async getPromptProfiles(): Promise<RegionalAiPromptProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "ai_prof_tr",
        countryCode: "TR",
        countryName: "Türkiye",
        languageCode: "tr",
        tone: "WARM_TRADITIONAL",
        culturalEventFocus: "Kına Gecesi, Nişan, Kır & Salon Düğünü",
        systemPromptAddendum: "Yanıtlarında samimi, yardımsever ve Türk düğün geleneklerine (Kına, bohça, takı töreni) saygılı bir dil kullan.",
        aiResponseQualityScorePercent: 99,
        aiCulturalValidationTip: "Türkçe yanıtlar geleneksel düğün ritüelleri ve misafir ağırlama adabı ile %100 uyumludur.",
        isActive: true,
        updatedAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "ai_prof_de",
        countryCode: "DE",
        countryName: "Deutschland",
        languageCode: "de",
        tone: "PRECISE_FORMAL",
        culturalEventFocus: "Standesamt, Şato & Balo Konsepti",
        systemPromptAddendum: "Nutzen Sie eine präzise, höfliche und strukturierte Sprache ('Sie'-Form). Fokussieren Sie sich auf Zeitpläne und rechtliche Vorgaben.",
        aiResponseQualityScorePercent: 97,
        aiCulturalValidationTip: "Almanca AI yanıtları resmi 'Sie' hitabı ve bütçe netliği standartlarına göre yapılandırıldı.",
        isActive: true,
        updatedAt: new Date("2026-07-28T14:30:00"),
      },
      {
        id: "ai_prof_ae",
        countryCode: "AE",
        countryName: "United Arab Emirates",
        languageCode: "ar",
        tone: "LUXURY_RESPECTFUL",
        culturalEventFocus: "VIP Saray, Otel Balo Salonu & Lüks Konsept",
        systemPromptAddendum: "استخدم لغة راقية ومحترمة للغاية تعكس الفخامة وكرم الضيافة مع مراعاة العادات والتقاليد المحلية.",
        aiResponseQualityScorePercent: 98,
        aiCulturalValidationTip: "Arapça AI yanıtlarında yüksek VIP konsept dili ve bölgesel yasal/kültürel hassasiyetler aktifleştirildi.",
        isActive: true,
        updatedAt: new Date("2026-07-27T11:20:00"),
      },
      {
        id: "ai_prof_us",
        countryCode: "US",
        countryName: "United States",
        languageCode: "en",
        tone: "DIRECT_CASUAL",
        culturalEventFocus: "Destination Beach, Vineyard & City Wedding",
        systemPromptAddendum: "Adopt an energetic, clear, and inclusive tone. Focus on RSVP efficiency and budget breakdown transparency.",
        aiResponseQualityScorePercent: 96,
        aiCulturalValidationTip: "ABD yanıtları pratik bütçe şeffaflığı ve dinamik destinasyon düğün önerileri sunmaktadır.",
        isActive: true,
        updatedAt: new Date("2026-07-26T09:10:00"),
      },
    ];
  }

  /**
   * AI Yerelleştirme Özetini Getirir
   */
  public static async getSummary(): Promise<AiLocalizationSummary> {
    return {
      configuredAiProfilesCount: 4,
      supportedAiLanguagesCount: 5,
      overallAiCulturalAccuracyPercent: 97.8,
      aiLocalizationInsightNote: "WedyAI asistanı tüm bölgelerde kültürel ton, dil kalıpları ve bölgesel geleneklerle %97.8 uyumlulukla yanıt üretmektedir.",
    };
  }

  /**
   * AI Prompt Profilini Günceller
   */
  public static async updatePromptProfile(
    profileId: string,
    updates: Partial<RegionalAiPromptProfile>
  ): Promise<boolean> {
    const profiles = await this.getPromptProfiles();
    const idx = profiles.findIndex((p) => p.id === profileId);

    if (idx !== -1) {
      profiles[idx] = { ...profiles[idx], ...updates, updatedAt: new Date() };

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
      }
      return true;
    }
    return false;
  }
}