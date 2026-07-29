export type SdkTargetLanguage =
  | "TYPESCRIPT"
  | "JAVASCRIPT"
  | "NODEJS"
  | "PYTHON"
  | "JAVA"
  | "DOTNET"
  | "PHP"
  | "GO";

export interface SdkPackageRecord {
  id: string;
  targetLanguage: SdkTargetLanguage;
  packageName: string; // e.g. "@wedyplan/sdk-typescript", "wedyplan-python"
  versionTag: string; // e.g. "v1.4.2"
  downloadCount24h: number;
  openApiSpecCoveragePercent: number; // 0-100%
  packageStatus: "STABLE_GA" | "BETA" | "BUILDING";
  sampleSnippetText: string;
  aiDocAssistantTip: string;
  publishedAt: Date;
}

export interface SdkPlatformSummary {
  totalSupportedLanguagesCount: number;
  totalSdkDownloads24h: number;
  averageOpenApiCoveragePercent: number;
  activeSdkPackagesCount: number;
  aiSdkInsightNote: string;
}

export class SdkPlatformEngine {
  private static STORAGE_KEY = "WEDYPLAN_SDK_PLATFORM_V1";

  /**
   * Kayıtlı SDK Paketlerini Getirir
   */
  public static async getSdkPackages(): Promise<SdkPackageRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "sdk_101",
        targetLanguage: "TYPESCRIPT",
        packageName: "@wedyplan/sdk-typescript",
        versionTag: "v1.4.2",
        downloadCount24h: 18400,
        openApiSpecCoveragePercent: 100.0,
        packageStatus: "STABLE_GA",
        sampleSnippetText: `import { WedyPlanClient } from '@wedyplan/sdk-typescript';\nconst client = new WedyPlanClient({ apiKey: 'wp_live_...' });\nconst venues = await client.venues.search({ region: 'Bosphorus' });`,
        aiDocAssistantTip: "TypeScript SDK %100 OpenAPI kapsayıcılığı ile tam tip güvenliği (Type Safety) sunar.",
        publishedAt: new Date("2026-07-29T21:00:00"),
      },
      {
        id: "sdk_102",
        targetLanguage: "PYTHON",
        packageName: "wedyplan-python-sdk",
        versionTag: "v1.4.0",
        downloadCount24h: 12200,
        openApiSpecCoveragePercent: 99.8,
        packageStatus: "STABLE_GA",
        sampleSnippetText: `from wedyplan import WedyPlanClient\nclient = WedyPlanClient(api_key="wp_live_...")\nescrow = client.escrow.lock_deposit(amount=25000, currency="USD")`,
        aiDocAssistantTip: "Python SDK Pydantic v2 veri doğrulama modelleriyle güçlendirilmiştir.",
        publishedAt: new Date("2026-07-29T20:30:00"),
      },
      {
        id: "sdk_103",
        targetLanguage: "GO",
        packageName: "github.com/wedyplan/wedyplan-go",
        versionTag: "v1.2.1",
        downloadCount24h: 8400,
        openApiSpecCoveragePercent: 98.9,
        packageStatus: "STABLE_GA",
        sampleSnippetText: `package main\nimport "github.com/wedyplan/wedyplan-go"\nclient := wedyplan.NewClient("wp_live_...")\nresp, err := client.Bookings.Create(ctx, req)`,
        aiDocAssistantTip: "Go SDK yüksek performanslı eşzamanlı (concurrency) Webhook alıcıları içerir.",
        publishedAt: new Date("2026-07-29T19:45:00"),
      },
      {
        id: "sdk_104",
        targetLanguage: "DOTNET",
        packageName: "WedyPlan.Enterprise.SDK",
        versionTag: "v1.1.0",
        downloadCount24h: 4200,
        openApiSpecCoveragePercent: 97.5,
        packageStatus: "BETA",
        sampleSnippetText: `using WedyPlan.SDK;\nvar client = new WedyPlanClient("wp_live_...");\nvar result = await client.Workforce.DelegateAsync(taskReq);`,
        aiDocAssistantTip: ".NET SDK C# async/await ve Dependency Injection kalıplarını destekler.",
        publishedAt: new Date("2026-07-29T18:15:00"),
      },
    ];
  }

  /**
   * SDK Platform Özetini Getirir
   */
  public static async getSummary(): Promise<SdkPlatformSummary> {
    return {
      totalSupportedLanguagesCount: 8,
      totalSdkDownloads24h: 43200,
      averageOpenApiCoveragePercent: 99.1,
      activeSdkPackagesCount: 8,
      aiSdkInsightNote: "Yapay zeka SDK Kod Üretim Motoru, 8 dildeki SDK kütüphanelerini OpenAPI v3 sözleşmeleriyle %99.1 kapsayıcılık oranıyla eşzamanlı tutmaktadır.",
    };
  }
}