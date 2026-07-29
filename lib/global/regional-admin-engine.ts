export type AdminGovernanceLevel =
  | "GLOBAL"
  | "REGION"
  | "COUNTRY"
  | "STATE_PROVINCE"
  | "CITY"
  | "MARKETPLACE";

export interface RegionalAdminRoleRecord {
  id: string;
  adminName: string;
  email: string;
  governanceLevel: AdminGovernanceLevel;
  assignedScopeCode: string; // e.g. "GLOBAL", "EU_CENTRAL", "TR", "US_EAST", "ISTANBUL"
  delegatedPermissions: string[];
  isActive: boolean;
}

export interface RegionalFeatureToggle {
  id: string;
  featureKey: string; // e.g. "feature.instant_fast_payout", "feature.escrow_milestone_v2"
  scopeCode: string;
  isEnabled: boolean;
  aiRiskAssessmentNote: string;
}

export interface RegionalAnnouncement {
  id: string;
  title: string;
  scopeCode: string;
  targetAudience: "ALL_VENDORS" | "ALL_COUPLES" | "REGIONAL_ADMINS";
  bodyText: string;
  isPublished: boolean;
  publishedAt: Date;
}

export interface RegionalGovernanceSummary {
  activeRegionalAdminsCount: number;
  totalManagedScopesCount: number;
  regionalHealthScorePercent: number; // 0-100%
  aiCapacityForecastTip: string;
  aiOperationalRecommendationNote: string;
}

export class RegionalAdminEngine {
  private static STORAGE_KEY = "WEDYPLAN_REGIONAL_ADMIN_V1";

  /**
   * Bölgesel Yönetici Roller Kütüğünü Getirir
   */
  public static async getAdminRoles(): Promise<RegionalAdminRoleRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "adm_101",
        adminName: "Ahmet Yılmaz",
        email: "ahmet.tr@wedyplan.com",
        governanceLevel: "COUNTRY",
        assignedScopeCode: "TR",
        delegatedPermissions: ["MANAGE_CATALOG", "PUBLISH_ANNOUNCEMENTS", "VERIFY_VENDORS"],
        isActive: true,
      },
      {
        id: "adm_102",
        adminName: "Elena Rostova",
        email: "elena.eu@wedyplan.com",
        governanceLevel: "REGION",
        assignedScopeCode: "EU_CENTRAL",
        delegatedPermissions: ["MANAGE_FEATURE_FLAGS", "REGIONAL_COMPLIANCE_OVERRIDE"],
        isActive: true,
      },
      {
        id: "adm_103",
        adminName: "Tariq Al-Mansoor",
        email: "tariq.gcc@wedyplan.com",
        governanceLevel: "REGION",
        assignedScopeCode: "GCC_GULF",
        delegatedPermissions: ["MANAGE_CATALOG", "VIP_CONCIERGE_APPROVE"],
        isActive: true,
      },
    ];
  }

  /**
   * Bölgesel Özellik Şalterlerini (Feature Flags) Getirir
   */
  public static async getFeatureToggles(): Promise<RegionalFeatureToggle[]> {
    return [
      {
        id: "ft_101",
        featureKey: "feature.instant_fast_payout",
        scopeCode: "TR",
        isEnabled: true,
        aiRiskAssessmentNote: "TR banka FAST altyapısı %100 senkronizedir. Risk seviyesi %0.",
      },
      {
        id: "ft_102",
        featureKey: "feature.escrow_multi_currency_v2",
        scopeCode: "EU_CENTRAL",
        isEnabled: true,
        aiRiskAssessmentNote: "EUR/TRY sabitleme opsiyonu aktif.",
      },
      {
        id: "ft_103",
        featureKey: "feature.vip_concierge_booking",
        scopeCode: "GCC_GULF",
        isEnabled: true,
        aiRiskAssessmentNote: "Dubai özel düğün paketleri yüksek marjla çalışmaktadır.",
      },
    ];
  }

  /**
   * Bölgesel Yönetim Özetini Getirir
   */
  public static async getSummary(): Promise<RegionalGovernanceSummary> {
    return {
      activeRegionalAdminsCount: 18,
      totalManagedScopesCount: 6,
      regionalHealthScorePercent: 99.1,
      aiCapacityForecastTip: "Ağustos ayında İstanbul ve Bodrum mekanlarında %94 doluluk öngörülmektedir. Tedarikçi kapasite artırım uyarısı yayınlanmalıdır.",
      aiOperationalRecommendationNote: "Bölgesel yetki devirleri (Delegated RBAC) merkezi güvenlik politikalarını ihlal etmeden %100 otonom çalışmaktadır.",
    };
  }

  /**
   * Özellik Şalterini Aç/Kapat yapar
   */
  public static async toggleFeatureFlag(featureId: string): Promise<boolean> {
    const toggles = await this.getFeatureToggles();
    const idx = toggles.findIndex((t) => t.id === featureId);

    if (idx !== -1) {
      toggles[idx].isEnabled = !toggles[idx].isEnabled;
      return true;
    }
    return false;
  }
}