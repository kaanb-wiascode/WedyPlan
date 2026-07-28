export type TargetStore = "APPLE_APP_STORE" | "GOOGLE_PLAY_STORE";
export type ReleaseStatus = "DRAFT" | "VALIDATING" | "WAITING_FOR_REVIEW" | "IN_REVIEW" | "READY_FOR_SALE" | "REJECTED";

export interface StoreLocalization {
  locale: "tr-TR" | "en-US" | "de-DE";
  title: string;
  subtitle: string;
  keywords: string;
  description: string;
  releaseNotes: string;
}

export interface StoreReleaseBuild {
  id: string;
  versionName: string;
  buildNumber: number;
  targetStore: TargetStore;
  status: ReleaseStatus;
  stagedRolloutPercent: number; // 1% - 100%
  preflightChecks: { checkName: string; passed: boolean; message: string }[];
  localizations: StoreLocalization[];
  submittedAt?: Date;
  approvedAt?: Date;
}

export class MobileReleaseEngine {
  private static STORAGE_KEY = "WEDYPLAN_APP_STORE_RELEASES_V1";

  /**
   * Mağaza Yayınlama Sürümlerini Getirir
   */
  public static async getReleases(): Promise<StoreReleaseBuild[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "release_ios_210",
        versionName: "v2.1.0",
        buildNumber: 112,
        targetStore: "APPLE_APP_STORE",
        status: "READY_FOR_SALE",
        stagedRolloutPercent: 100,
        preflightChecks: [
          { checkName: "iOS 27 SDK Target", passed: true, message: "Tam Uyumlu" },
          { checkName: "Privacy Manifests (KVKK/GDPR)", passed: true, message: "Onaylandı" },
          { checkName: "Liquid Glass Asset Density", passed: true, message: "3x Retina Hazır" },
        ],
        localizations: [
          {
            locale: "tr-TR",
            title: "WedyPlan — Lüks Düğün Planlayıcı",
            subtitle: "WedyAI, Mekanlar & E-İmzalı Sözleşmeler",
            keywords: "dugun, mekan, wedyai, sozlesme, kapora, organizasyon",
            description: "WedyPlan, Türkiye'nin ve dünyanın en seçkin düğün mekanlarını, yapay zeka destekli WedyAI planlayıcısını ve güvenli Escrow ödeme sistemini cebinize getiriyor.",
            releaseNotes: "Faz 09 Mobil Ekosistem yayında! Yenilenen Liquid Glass arayüzü, canlı sohbet merkezi ve biyo-imza desteği eklendi.",
          },
        ],
        submittedAt: new Date("2026-07-25"),
        approvedAt: new Date("2026-07-27"),
      },
      {
        id: "release_android_210",
        versionName: "v2.1.0",
        buildNumber: 212,
        targetStore: "GOOGLE_PLAY_STORE",
        status: "IN_REVIEW",
        stagedRolloutPercent: 20,
        preflightChecks: [
          { checkName: "Android 16 App Bundle (AAB)", passed: true, message: "Tam Uyumlu" },
          { checkName: "Google Play Escrow Policy", passed: true, message: "Denetleniyor" },
        ],
        localizations: [
          {
            locale: "tr-TR",
            title: "WedyPlan — Lüks Düğün Planlayıcı",
            subtitle: "Yapay Zeka Destekli Düğün Ekosistemi",
            keywords: "dugun, mekan, wedyai, sozlesme, kapora",
            description: "WedyPlan Android uygulaması ile düğün bütçenizi yönetin, sözleşmelerinizi e-imzalayın.",
            releaseNotes: "%20 Kademeli dağıtım başlatıldı. Performans iyileştirmeleri içerir.",
          },
        ],
        submittedAt: new Date("2026-07-28"),
      },
    ];
  }

  /**
   * WedyAI ASO & Mağaza Metinleri Üreticisi
   */
  public static generateAiStoreAssets(locale: "tr-TR" | "en-US"): StoreLocalization {
    if (locale === "tr-TR") {
      return {
        locale: "tr-TR",
        title: "WedyPlan: Yapay Zeka Düğün Asistanı",
        subtitle: "Lüks Mekanlar & Güvenli Sözleşmeler",
        keywords: "düğün, wedyai, kır düğünü, otel, gelinlik, organizasyon",
        description: "WedyAI düğün asistanı ile tanışın. Hayalinizdeki düğünü dakikalar içinde planlayın, bütçenizi optimize edin ve e-imza ile mekanınızı güvenle ayırtın.",
        releaseNotes: "Yapay zeka sesli komut sistemi ve Apple Pay / Google Pay entegrasyonu tamamlandı.",
      };
    }

    return {
      locale: "en-US",
      title: "WedyPlan: AI Wedding Planner",
      subtitle: "Luxury Venues & Secure Contracts",
      keywords: "wedding, planner, wedyai, venues, escrow, contracts",
      description: "Plan your luxury wedding effortlessly with WedyAI. Discover top-tier venues, manage budgets, and sign contracts securely.",
      releaseNotes: "Phase 09 Mobile Ecosystem goes live with AI Voice Commands and native mobile payments.",
    };
  }

  /**
   * Kademeli Yayınlama Oranını Günceller
   */
  public static updateRolloutPercent(releaseId: string, newPercent: number): void {
    if (typeof window !== "undefined") {
      this.getReleases().then((releases) => {
        const idx = releases.findIndex((r) => r.id === releaseId);
        if (idx !== -1) {
          releases[idx].stagedRolloutPercent = newPercent;
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(releases));
        }
      });
    }
  }
}