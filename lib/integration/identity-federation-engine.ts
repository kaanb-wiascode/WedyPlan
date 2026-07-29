export type IdentityProtocolType = "SAML_20" | "OIDC" | "OAUTH2" | "SCIM_20";
export type FederationProviderStatus = "ACTIVE" | "SYNCING" | "DEGRADED" | "OFFLINE";

export interface FederationProviderRecord {
  id: string;
  providerName: string; // e.g. "Okta Enterprise SSO", "Microsoft Entra ID"
  protocol: IdentityProtocolType;
  entityIdOrIssuer: string;
  ssoEndpointUrl: string;
  scimSyncEnabled: boolean;
  syncedUsersCount: number;
  syncedGroupsCount: number;
  status: FederationProviderStatus;
  mappedRoleSummary: string; // e.g. "EntraID_Admins -> WedyPlan_Exec"
  aiAccessAnalyzerTip: string;
  lastSyncedAt: Date;
}

export interface ScimProvisioningLog {
  id: string;
  actionType: "USER_PROVISIONED" | "USER_DEPROVISIONED" | "GROUP_SYNCED";
  targetUserEmail: string;
  externalGroupRef: string;
  assignedRole: string;
  status: "SUCCESS" | "FAILED";
  timestamp: Date;
}

export interface IdentityFederationSummary {
  totalActiveProvidersCount: number;
  totalFederatedUsersCount: number;
  totalSyncedGroupsCount: number;
  averageSsoLatencyMs: number;
  aiAccessInsightNote: string;
}

export class IdentityFederationEngine {
  private static STORAGE_KEY = "WEDYPLAN_IDENTITY_FEDERATION_V1";

  /**
   * Kimlik Sağlayıcı (IdP) Kayıtlarını Getirir
   */
  public static async getProviders(): Promise<FederationProviderRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "idp_101",
        providerName: "Okta Enterprise Identity",
        protocol: "SAML_20",
        entityIdOrIssuer: "http://www.okta.com/exk18a9012f934",
        ssoEndpointUrl: "https://wedyplan.okta.com/app/wedyplan_sso/exk18a9012f934/sso/saml",
        scimSyncEnabled: true,
        syncedUsersCount: 1420,
        syncedGroupsCount: 12,
        status: "ACTIVE",
        mappedRoleSummary: "Okta_Admins -> WEDYPLAN_EXECUTIVE",
        aiAccessAnalyzerTip: "SAML 2.0 X.509 sertifika doğrulaması geçerli. SCIM v2 otomasyonu faal.",
        lastSyncedAt: new Date("2026-07-29T21:50:00"),
      },
      {
        id: "idp_102",
        providerName: "Microsoft Entra ID (Azure AD)",
        protocol: "OIDC",
        entityIdOrIssuer: "https://login.microsoftonline.com/9f823a-412b/v2.0",
        ssoEndpointUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        scimSyncEnabled: true,
        syncedUsersCount: 2890,
        syncedGroupsCount: 18,
        status: "ACTIVE",
        mappedRoleSummary: "Entra_Finance -> WEDYPLAN_ESCROW_SUPERVISOR",
        aiAccessAnalyzerTip: "En Az Ayrıcalık (Least Privilege) ilkesine %99.4 uyum tespit edildi.",
        lastSyncedAt: new Date("2026-07-29T21:45:00"),
      },
      {
        id: "idp_103",
        providerName: "Google Workspace Enterprise",
        protocol: "OIDC",
        entityIdOrIssuer: "https://accounts.google.com",
        ssoEndpointUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        scimSyncEnabled: false,
        syncedUsersCount: 850,
        syncedGroupsCount: 5,
        status: "ACTIVE",
        mappedRoleSummary: "Google_Planners -> WEDYPLAN_WEDDING_PLANNER",
        aiAccessAnalyzerTip: "SCIM 2.0 senkronizasyonunun aktifleştirilmesi otomatik deprovisioning hızı sağlayabilir.",
        lastSyncedAt: new Date("2026-07-29T21:30:00"),
      },
    ];
  }

  /**
   * SCIM Dizin Senkronizasyon Loglarını Getirir
   */
  public static async getScimLogs(): Promise<ScimProvisioningLog[]> {
    return [
      {
        id: "scim_201",
        actionType: "USER_PROVISIONED",
        targetUserEmail: "ahmet.yilmaz@ciraganpalace.com",
        externalGroupRef: "Entra_Hotel_Ops",
        assignedRole: "ROLE_HOTEL_OPERATOR",
        status: "SUCCESS",
        timestamp: new Date("2026-07-29T21:50:00"),
      },
      {
        id: "scim_202",
        actionType: "GROUP_SYNCED",
        targetUserEmail: "finance-team@wedyplan.com",
        externalGroupRef: "Okta_Finance_Group",
        assignedRole: "ROLE_FINANCE_SUPERVISOR",
        status: "SUCCESS",
        timestamp: new Date("2026-07-29T21:42:00"),
      },
    ];
  }

  /**
   * Federasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<IdentityFederationSummary> {
    return {
      totalActiveProvidersCount: 3,
      totalFederatedUsersCount: 5160,
      totalSyncedGroupsCount: 35,
      averageSsoLatencyMs: 18.2,
      aiAccessInsightNote: "WedyAI Erişim Analizcisi, Okta ve Entra ID üzerinden federasyon sağlayan 5.1K kurumsal kullanıcının rol eşleşmelerini analiz ederek %99.4 En Az Ayrıcalık (Least Privilege) skoru yakalamıştır.",
    };
  }

  /**
   * SCIM Dizin Senkronizasyonu Tetikleme Simülasyonu
   */
  public static async triggerScimSync(providerId: string): Promise<boolean> {
    const providers = await this.getProviders();
    const idx = providers.findIndex((p) => p.id === providerId);

    if (idx !== -1) {
      providers[idx].lastSyncedAt = new Date();
      providers[idx].status = "ACTIVE";

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(providers));
      }
      return true;
    }
    return false;
  }
}