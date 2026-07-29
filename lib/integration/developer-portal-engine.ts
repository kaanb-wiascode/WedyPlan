export type DeveloperModuleType =
  | "API_DOCS"
  | "SDK_DOWNLOADS"
  | "QUICK_STARTS"
  | "TUTORIALS"
  | "SAMPLE_PROJECTS"
  | "CHANGELOG"
  | "RELEASE_NOTES";

export interface DeveloperResourceItem {
  id: string;
  moduleType: DeveloperModuleType;
  title: string;
  summaryText: string;
  targetPathOrUrl: string;
  categoryTag: string; // e.g. "REST API", "Escrow Integration", "Python"
  estimatedTimeToCompleteMinutes?: number;
  updatedAt: Date;
}

export interface DeveloperChangelogRecord {
  id: string;
  versionTag: string; // e.g. "v1.4.2"
  releaseTitle: string;
  releaseType: "FEATURE" | "SECURITY_PATCH" | "DEPRECATION" | "PERFORMANCE";
  changesSummary: string[];
  publishedAt: Date;
}

export interface DeveloperPortalSummary {
  activeDeveloperTeamsCount: number;
  monthlySandboxRequestsCount: number;
  totalAvailableDocsCount: number;
  developerCopilotCsatPercent: number;
  aiDeveloperPortalInsightNote: string;
}

export class DeveloperPortalEngine {
  private static STORAGE_KEY = "WEDYPLAN_DEVELOPER_PORTAL_V1";

  /**
   * Portal Geliştirici Kaynaklarını Getirir
   */
  public static async getPortalResources(): Promise<DeveloperResourceItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "res_101",
        moduleType: "QUICK_STARTS",
        title: "10 Dakikada WedyPlan Escrow API Entegrasyonu",
        summaryText: "Next.js ve TypeScript SDK kullanarak $25.000 USD depozito kilitleme ve webhook dinleyici hızlı başlangıç rehberi.",
        targetPathOrUrl: "/docs/quickstarts/escrow-nextjs",
        categoryTag: "TypeScript / Next.js",
        estimatedTimeToCompleteMinutes: 10,
        updatedAt: new Date("2026-07-29T21:00:00"),
      },
      {
        id: "res_102",
        moduleType: "SAMPLE_PROJECTS",
        title: "Hotel PMS Opera Cloud Sync Starter Kit",
        summaryText: "Python FastAPI ile yazılmış, Opera PMS ve WedyPlan Webhook Bus arasında çift yönlü takvim senkronizasyon projesi.",
        targetPathOrUrl: "https://github.com/wedyplan/sample-opera-pms-sync",
        categoryTag: "Python / FastAPI",
        estimatedTimeToCompleteMinutes: 20,
        updatedAt: new Date("2026-07-29T20:15:00"),
      },
      {
        id: "res_103",
        moduleType: "API_DOCS",
        title: "Phase 13 AI Workforce Delegation API Reference",
        summaryText: "Otonom AI çalışanlarına görev devretme (Task Delegation) ve HITL onay kapıları REST & GraphQL endpoint dokümantasyonu.",
        targetPathOrUrl: "/docs/api/v1/workforce",
        categoryTag: "REST & GraphQL",
        estimatedTimeToCompleteMinutes: 15,
        updatedAt: new Date("2026-07-29T19:30:00"),
      },
    ];
  }

  /**
   * Sürüm Değişiklik Kütüğünü (Changelog) Getirir
   */
  public static async getChangelogRecords(): Promise<DeveloperChangelogRecord[]> {
    return [
      {
        id: "chg_201",
        versionTag: "v1.4.2",
        releaseTitle: "Phase 14 Enterprise Gateway & SDK Release",
        releaseType: "FEATURE",
        changesSummary: [
          "8 dilde resmi SDK paketleri (TypeScript, Python, Go, .NET, Java, PHP, JS, Node) yayımlandı.",
          "OAuth2 mTLS ve IP Whitelisting güvenlik kalkanı API Gateway'e entegre edildi.",
          "Event Replay ve Dead Letter Queue (DLQ) karantina desteği getirildi.",
        ],
        publishedAt: new Date("2026-07-29T21:30:00"),
      },
      {
        id: "chg_202",
        versionTag: "v1.4.0",
        releaseTitle: "Phase 13 AI Workforce & Multimodal Engine Interconnect",
        releaseType: "FEATURE",
        changesSummary: [
          "AI Workforce Ajanlarına REST API üzerinden otonom görev atama uç noktaları eklendi.",
          "Çoklu-modal (Multimodal) PDF sözleşme ve OCR analizi API v1.2'ye bağlandı.",
        ],
        publishedAt: new Date("2026-07-20T14:00:00"),
      },
    ];
  }

  /**
   * Developer Portal Özetini Getirir
   */
  public static async getSummary(): Promise<DeveloperPortalSummary> {
    return {
      activeDeveloperTeamsCount: 142,
      monthlySandboxRequestsCount: 845000,
      totalAvailableDocsCount: 48,
      developerCopilotCsatPercent: 99.4,
      aiDeveloperPortalInsightNote: "Developer Copilot asistanı 142 entegrasyon ekibine ortalama 12 saniyede kod örneği üreterek geliştirici memnuniyetini (CSAT) %99.4 seviyesine çıkarmıştır.",
    };
  }
}