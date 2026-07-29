export type PersonalizationPersonaType =
  | "COUPLES"
  | "VENDORS"
  | "EMPLOYEES"
  | "EXECUTIVES"
  | "PARTNERS";

export interface UserPersonalizationProfile {
  id: string;
  personaType: PersonalizationPersonaType;
  userRefName: string;
  toneStylePreference: string; // e.g. "LUXURY_WARM", "EFFICIENT_PROFESSIONAL", "ANALYTICAL_EXECUTIVE"
  topInteractionConcepts: string[];
  predictedNextIntent: string;
  intentConfidenceScorePercent: number; // 0-100%
  adaptivePromptRulesAppliedCount: number;
  aiPersonalizationTip: string;
  lastAdaptedAt: Date;
}

export interface PersonalizationPlatformSummary {
  totalPersonalizedUsersCount: number;
  activePersonaTypesCount: number;
  averageIntentPredictionAccuracyPercent: number;
  aiPersonalizationInsightNote: string;
}

export class AiPersonalizationEngine {
  private static STORAGE_KEY = "WEDYPLAN_AI_PERSONALIZATION_V1";

  /**
   * Kişiselleştirme Profil Kayıtlarını Getirir
   */
  public static async getPersonalizationProfiles(): Promise<UserPersonalizationProfile[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "prs_101",
        personaType: "COUPLES",
        userRefName: "Sena & Kaan (Çift)",
        toneStylePreference: "LUXURY_WARM",
        topInteractionConcepts: ["Boğaz Mekanları", "Vejetaryen Menü", " Modern Elegant"],
        predictedNextIntent: "SCHEDULE_VENUE_WALKTHROUGH",
        intentConfidenceScorePercent: 98.4,
        adaptivePromptRulesAppliedCount: 14,
        aiPersonalizationTip: "Çift Boğaz mekanlarına yüksek ilgi gösteriyor. Çırağan Palace sanal tur randevusu önerildi.",
        lastAdaptedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "prs_102",
        personaType: "VENDORS",
        userRefName: "Sait Halim Paşa Yalısı (Mekan Tedarikçisi)",
        toneStylePreference: "EFFICIENT_PROFESSIONAL",
        toneStylePreferenceDetails: "Hızlı teklif taslağı, yüksek bütçeli 2027 Q2 talepleri öncelikli.",
        topInteractionConcepts: ["2027 Q2 Müsaitlik", "%20 Escrow Depozito", "VIP Transfer"],
        predictedNextIntent: "GENERATE_PROPOSAL_DRAFT",
        intentConfidenceScorePercent: 97.8,
        adaptivePromptRulesAppliedCount: 22,
        aiPersonalizationTip: "Tedarikçi için VIP teklif şablonu otomatik olarak ön sayfaya eklendi.",
        lastAdaptedAt: new Date("2026-07-29T20:15:00"),
      },
      {
        id: "prs_103",
        personaType: "EXECUTIVES",
        userRefName: "CEO / Büyüme Direktörü",
        toneStylePreference: "ANALYTICAL_EXECUTIVE",
        topInteractionConcepts: ["UK & SA Genişleme", "Consolidated GMV", "LTV/CAC Ratio"],
        predictedNextIntent: "REVIEW_EXPANSION_PIPELINE",
        intentConfidenceScorePercent: 99.2,
        adaptivePromptRulesAppliedCount: 38,
        aiPersonalizationTip: "C-Suite paneli için Birleşik Krallık (UK) lansman fizibilite raporu öne çıkarıldı.",
        lastAdaptedAt: new Date("2026-07-29T19:40:00"),
      },
    ];
  }

  /**
   * Kişiselleştirme Özetini Getirir
   */
  public static async getSummary(): Promise<PersonalizationPlatformSummary> {
    return {
      totalPersonalizedUsersCount: 18420,
      activePersonaTypesCount: 5,
      averageIntentPredictionAccuracyPercent: 98.2,
      aiPersonalizationInsightNote: "Dinamik Kişiselleştirme Motoru %98.2 niyet tahmin başarısıyla kullanıcı etkileşim süresini %42 kısalatmıştır.",
    };
  }

  /**
   * Niyet Modellemesi Güncelleme Simülasyonu
   */
  public static async triggerAdaptiveOptimization(profileId: string): Promise<boolean> {
    const profiles = await this.getPersonalizationProfiles();
    const idx = profiles.findIndex((p) => p.id === profileId);

    if (idx !== -1) {
      profiles[idx].adaptivePromptRulesAppliedCount += 1;
      profiles[idx].lastAdaptedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
      }
      return true;
    }
    return false;
  }
}