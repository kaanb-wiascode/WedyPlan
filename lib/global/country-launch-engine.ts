export type CountryLaunchStatus = "PLANNED" | "IN_PREPARATION" | "LAUNCH_READY" | "LIVE";

export interface LaunchChecklistItem {
  id: string;
  milestoneKey:
    | "LEGAL_READINESS"
    | "LOCALIZATION"
    | "PAYMENT_READINESS"
    | "VENDOR_ONBOARDING"
    | "MARKETPLACE_CONFIG"
    | "SEO_PREPARATION"
    | "SUPPORT_READINESS"
    | "ANALYTICS_VALIDATION";
  title: string;
  completionPercent: number;
  isPassed: boolean;
  notes: string;
}

export interface CountryLaunchProject {
  id: string;
  countryCode: string; // e.g. "UK", "FR", "SA", "AE"
  countryName: string;
  targetLaunchDate: Date;
  status: CountryLaunchStatus;
  overallReadinessScorePercent: number; // 0-100%
  aiLaunchRiskPredictorScorePercent: number; // 0-100% (Low is better)
  aiRecommendedActionNote: string;
  checklist: LaunchChecklistItem[];
  approvedByCsuiteAt?: Date;
}

export interface LaunchSummaryStats {
  activeLaunchProjectsCount: number;
  liveCountriesCount: number;
  averageReadinessScorePercent: number;
  aiLaunchPlatformHealthNote: string;
}

export class CountryLaunchEngine {
  private static STORAGE_KEY = "WEDYPLAN_COUNTRY_LAUNCHES_V1";

  /**
   * Ülke Lansman Projelerini Getirir
   */
  public static async getLaunchProjects(): Promise<CountryLaunchProject[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "lnch_uk",
        countryCode: "UK",
        countryName: "United Kingdom (Birleşik Krallık)",
        targetLaunchDate: new Date("2026-09-15"),
        status: "IN_PREPARATION",
        overallReadinessScorePercent: 88,
        aiLaunchRiskPredictorScorePercent: 4, // Düşük Risk
        aiRecommendedActionNote: "GBP Para Birimi ve UK GDPR yasal metinleri onaylandı. Tedarikçi kataloğuna 25 adet lüks venue eklendiğinde 'LAUNCH_READY' statüsüne geçilebilir.",
        checklist: [
          { id: "chk_1", milestoneKey: "LEGAL_READINESS", title: "UK GDPR & Consumer Protection", completionPercent: 100, isPassed: true, notes: "Aydınlatma metinleri hazır" },
          { id: "chk_2", milestoneKey: "LOCALIZATION", title: "en-GB İdil ve Para Birimi (GBP)", completionPercent: 100, isPassed: true, notes: "i18n tamamlandı" },
          { id: "chk_3", milestoneKey: "PAYMENT_READINESS", title: "Stripe UK & GBP Escrow Rail", completionPercent: 95, isPassed: true, notes: "Ödeme ağ geçidi aktif" },
          { id: "chk_4", milestoneKey: "VENDOR_ONBOARDING", title: "İngiltere Tedarikçi Kataloğu", completionPercent: 65, isPassed: false, notes: "Target: 50 venue (Mevcut: 32)" },
        ],
      },
      {
        id: "lnch_sa",
        countryCode: "SA",
        countryName: "Saudi Arabia (Suudi Arabistan)",
        targetLaunchDate: new Date("2026-11-01"),
        status: "PLANNED",
        overallReadinessScorePercent: 62,
        aiLaunchRiskPredictorScorePercent: 12,
        aiRecommendedActionNote: "Arapça (ar) RTL çeviri tamamlandı. SAR (Riyal) ödeme entegrasyonu için Suudi Merkez Bankası (SAMA) izni beklenmektedir.",
        checklist: [
          { id: "chk_5", milestoneKey: "LOCALIZATION", title: "Arapça RTL & Hicri Takvim", completionPercent: 90, isPassed: true, notes: "RTL UI doğrulandı" },
          { id: "chk_6", milestoneKey: "LEGAL_READINESS", title: "Suudi Vergi & SAR KDV Entegrasyonu", completionPercent: 40, isPassed: false, notes: "Vergi danışmanı incelemede" },
        ],
      },
    ];
  }

  /**
   * Lansman Özet İstatistiklerini Getirir
   */
  public static async getSummaryStats(): Promise<LaunchSummaryStats> {
    return {
      activeLaunchProjectsCount: 2,
      liveCountriesCount: 4, // TR, DE, AE, US
      averageReadinessScorePercent: 75.0,
      aiLaunchPlatformHealthNote: "Birleşik Krallık (UK) lansmanı %88 hazırlık skoru ile 15 Eylül 2026 tarihinde canlıya geçmeye hazırdır.",
    };
  }

  /**
   * Lansman Projesini Onaylar (Approve Country Launch)
   */
  public static async approveLaunch(projectId: string): Promise<boolean> {
    const projects = await this.getLaunchProjects();
    const idx = projects.findIndex((p) => p.id === projectId);

    if (idx !== -1) {
      projects[idx].status = "LAUNCH_READY";
      projects[idx].approvedByCsuiteAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      }
      return true;
    }
    return false;
  }
}