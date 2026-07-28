export type BetaTrack = "TESTFLIGHT" | "PLAY_INTERNAL" | "CLOSED_BETA" | "OPEN_BETA";
export type FeedbackCategory = "BUG" | "PERFORMANCE" | "UX_DESIGN" | "FEATURE_REQUEST";

export interface BetaBuild {
  id: string;
  versionName: string;
  buildNumber: number;
  track: BetaTrack;
  releasedAt: Date;
  releaseNotes: string[];
  activeTestersCount: number;
  downloadUrl?: string;
}

export interface BetaFeedback {
  id: string;
  buildId: string;
  testerEmail: string;
  category: FeedbackCategory;
  userComment: string;
  screenshotUrl?: string;
  deviceInfo: string;
  aiClassification: {
    category: FeedbackCategory;
    priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    isDuplicate: boolean;
    duplicateOfId?: string;
  };
  submittedAt: Date;
}

export class MobileBetaEngine {
  private static STORAGE_KEY = "WEDYPLAN_BETA_FEEDBACK_V1";

  /**
   * Yayındaki Mobil Beta Derlemelerini Getirir
   */
  public static async getBetaBuilds(): Promise<BetaBuild[]> {
    return [
      {
        id: "build_ios_108",
        versionName: "v2.1.0-beta.3",
        buildNumber: 108,
        track: "TESTFLIGHT",
        releasedAt: new Date("2026-07-28"),
        releaseNotes: [
          "Phase 09 Mobile Messaging & Chat Center entegre edildi.",
          "Apple Pay & Biometric E-Signature performansı %30 artırıldı.",
          "Çevrimdışı senkronizasyon hatası giderildi.",
        ],
        activeTestersCount: 142,
        downloadUrl: "https://testflight.apple.com/join/wedyplan_demo",
      },
      {
        id: "build_android_204",
        versionName: "v2.1.0-beta.3",
        buildNumber: 204,
        track: "PLAY_INTERNAL",
        releasedAt: new Date("2026-07-28"),
        releaseNotes: [
          "Google Play Internal Testing kanalı aktif edildi.",
          "Android Material You Liquid Glass token uyumu sağlandı.",
        ],
        activeTestersCount: 98,
        downloadUrl: "https://play.google.com/apps/internaltest/wedyplan_demo",
      },
    ];
  }

  /**
   * Tester Tarafından Gönderilen Geri Bildirimi Kaydeder ve AI İle İşler
   */
  public static submitFeedback(
    buildId: string,
    comment: string,
    category: FeedbackCategory,
    screenshotUrl?: string
  ): BetaFeedback {
    const isDuplicate = comment.toLowerCase().includes("çök") || comment.toLowerCase().includes("kapan");

    const feedback: BetaFeedback = {
      id: `fb_${Math.random().toString(36).substring(2, 9)}`,
      buildId,
      testerEmail: "tester_demo@wedyplan.com",
      category,
      userComment: comment,
      screenshotUrl,
      deviceInfo: typeof navigator !== "undefined" ? `${navigator.userAgent.slice(0, 40)}...` : "Mobile Device",
      aiClassification: {
        category,
        priority: isDuplicate ? "HIGH" : "MEDIUM",
        isDuplicate,
        duplicateOfId: isDuplicate ? "fb_existing_99" : undefined,
      },
      submittedAt: new Date(),
    };

    const history = this.getFeedbackHistory();
    history.unshift(feedback);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
    }

    return feedback;
  }

  /**
   * Gönderilen Beta Geri Bildirim Geçmişini Getirir
   */
  public static getFeedbackHistory(): BetaFeedback[] {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "fb_101",
        buildId: "build_ios_108",
        testerEmail: "sena_tester@wedyplan.com",
        category: "UX_DESIGN",
        userComment: "Sözleşme e-imza ekranındaki dokunmatik alan tablet ekranlarında harika görünüyor.",
        deviceInfo: "iPad Pro 11-inch (iOS 27)",
        aiClassification: {
          category: "UX_DESIGN",
          priority: "LOW",
          isDuplicate: false,
        },
        submittedAt: new Date(Date.now() - 7200000),
      },
    ];
  }
}