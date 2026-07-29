export type MasterDataDomain =
  | "USERS"
  | "COUPLES"
  | "VENDORS"
  | "ORGANIZATIONS"
  | "LOCATIONS"
  | "SERVICES"
  | "PRODUCTS";

export type MasterRecordStatus = "GOLDEN_VERIFIED" | "PENDING_MERGE" | "ENRICHED";

export interface GoldenRecordItem {
  id: string;
  goldenRecordId: string; // e.g. "GOLD-VND-9042"
  domain: MasterDataDomain;
  entityName: string; // e.g. "Çırağan Palace Kempinski Istanbul"
  contributingSources: string[]; // e.g. ["App DB", "Salesforce CRM", "Opera PMS"]
  versionTag: string; // e.g. "v2.1"
  dataQualityScorePercent: number; // 0-100%
  status: MasterRecordStatus;
  aiEnrichmentConfidencePercent: number;
  aiResolutionNote: string;
  lastMergedAt: Date;
}

export interface MasterDataPlatformSummary {
  totalGoldenRecordsCount: number;
  totalResolvedDuplicates24h: number;
  averageMasterDataQualityScorePercent: number;
  activeMasterDomainsCount: number;
  aiMasterDataInsightNote: string;
}

export class MasterDataEngine {
  private static STORAGE_KEY = "WEDYPLAN_MASTER_DATA_V1";

  /**
   * Golden Master Kayıtlarını Getirir
   */
  public static async getGoldenRecords(): Promise<GoldenRecordItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "mdm_101",
        goldenRecordId: "GOLD-VND-9042",
        domain: "VENDORS",
        entityName: "Çırağan Palace Kempinski Istanbul",
        contributingSources: ["WedyPlan DB", "Salesforce CRM", "Opera PMS"],
        versionTag: "v2.4",
        dataQualityScorePercent: 99.8,
        status: "GOLDEN_VERIFIED",
        aiEnrichmentConfidencePercent: 99.6,
        aiResolutionNote: "3 farklı sistemdeki mekan profilleri, VKN ve lokasyon doğruluk kurallarıyla tekil Golden Record olarak birleştirildi.",
        lastMergedAt: new Date("2026-07-29T22:45:00"),
      },
      {
        id: "mdm_102",
        goldenRecordId: "GOLD-CPL-4410",
        domain: "COUPLES",
        entityName: "Sena & Kaan (VIP BAE/Bodrum Düğünü)",
        contributingSources: ["App Auth", "HubSpot CRM"],
        versionTag: "v1.2",
        dataQualityScorePercent: 99.2,
        status: "ENRICHED",
        aiEnrichmentConfidencePercent: 98.9,
        aiResolutionNote: "Çift bütçesi ve binek tercihleri WedyAI Zenginleştirme Motoru tarafından zenginleştirildi.",
        lastMergedAt: new Date("2026-07-29T22:30:00"),
      },
      {
        id: "mdm_103",
        goldenRecordId: "GOLD-LOC-1020",
        domain: "LOCATIONS",
        entityName: "Bodrum Yalıkavak VIP Marina Bölgesi",
        contributingSources: ["GeoServices", "Google Places API"],
        versionTag: "v1.0",
        dataQualityScorePercent: 100.0,
        status: "GOLDEN_VERIFIED",
        aiEnrichmentConfidencePercent: 100.0,
        aiResolutionNote: "Coğrafi koordinatlar ve vergi bölgesi haritalaması %100 doğrulandı.",
        lastMergedAt: new Date("2026-07-29T22:15:00"),
      },
    ];
  }

  /**
   * Master Data Platform Özetini Getirir
   */
  public static async getSummary(): Promise<MasterDataPlatformSummary> {
    return {
      totalGoldenRecordsCount: 14200,
      totalResolvedDuplicates24h: 84,
      averageMasterDataQualityScorePercent: 99.6,
      activeMasterDomainsCount: 7,
      aiMasterDataInsightNote: "WedyAI Varlık Çözümleme Motoru 14.2K Golden Record kaydını %99.6 veri kalitesi ve sıfır mükerrerlik ile yönetmektedir.",
    };
  }

  /**
   * Mükerrer Kaydı Otonom Çözümleme & Birleştirme Simülasyonu
   */
  public static async resolveDuplicate(recordId: string): Promise<boolean> {
    const records = await this.getGoldenRecords();
    const idx = records.findIndex((r) => r.id === recordId);

    if (idx !== -1) {
      records[idx].status = "GOLDEN_VERIFIED";
      records[idx].dataQualityScorePercent = 100.0;
      records[idx].lastMergedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}