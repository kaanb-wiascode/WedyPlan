export type DataMartDomain =
  | "SALES"
  | "MARKETING"
  | "FINANCE"
  | "MARKETPLACE"
  | "OPERATIONS"
  | "SUPPORT"
  | "AI";

export interface DataWarehouseMartRecord {
  id: string;
  martName: string; // e.g. "Financial Escrow & Tax Data Mart"
  domain: DataMartDomain;
  factTableName: string; // e.g. "FactEscrowTransactions"
  dimensionTablesCount: number;
  totalRowsCount: number;
  scdType2TrackedEntitiesCount: number;
  averageQueryTimeMs: number;
  aiOptimizationSuggestion: string;
  lastSnapshotAt: Date;
}

export interface DataWarehouseSummary {
  totalDataMartsCount: number;
  totalWarehouseRowsCount: number;
  averageQueryExecutionMs: number;
  scdHistoryCoveragePercent: number;
  aiWarehouseInsightNote: string;
}

export class DataWarehouseEngine {
  private static STORAGE_KEY = "WEDYPLAN_DATA_WAREHOUSE_V1";

  /**
   * Data Mart Kayıtlarını Getirir
   */
  public static async getMarts(): Promise<DataWarehouseMartRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "mart_101",
        martName: "Financial Escrow & Settlement Mart",
        domain: "FINANCE",
        factTableName: "FactEscrowTransactions",
        dimensionTablesCount: 6,
        totalRowsCount: 1845000,
        scdType2TrackedEntitiesCount: 1420,
        averageQueryTimeMs: 12.4,
        aiOptimizationSuggestion: "FactEscrowTransactions tablosunda 'escrow_lock_date' bazlı partisyon indeksi oluşturuldu.",
        lastSnapshotAt: new Date("2026-07-29T22:35:00"),
      },
      {
        id: "mart_102",
        martName: "Marketplace Bookings & Vendor Performance Mart",
        domain: "MARKETPLACE",
        factTableName: "FactMarketplaceBookings",
        dimensionTablesCount: 8,
        totalRowsCount: 520000,
        scdType2TrackedEntitiesCount: 850,
        averageQueryTimeMs: 14.8,
        aiOptimizationSuggestion: "DimVendor için SCD Type 2 komisyon geçmişi %100 doğrulukla izleniyor.",
        lastSnapshotAt: new Date("2026-07-29T22:20:00"),
      },
      {
        id: "mart_103",
        martName: "AI Workforce Telemetry & Task Mart",
        domain: "AI",
        factTableName: "FactTaskDelegations",
        dimensionTablesCount: 4,
        totalRowsCount: 3120000,
        scdType2TrackedEntitiesCount: 9,
        averageQueryTimeMs: 8.2,
        aiOptimizationSuggestion: "Ajan verimlilik sorguları materialized view üzerinden 8.2ms hızına indirgendi.",
        lastSnapshotAt: new Date("2026-07-29T22:10:00"),
      },
    ];
  }

  /**
   * Data Warehouse Özetini Getirir
   */
  public static async getSummary(): Promise<DataWarehouseSummary> {
    return {
      totalDataMartsCount: 7,
      totalWarehouseRowsCount: 5485000,
      averageQueryExecutionMs: 11.8,
      scdHistoryCoveragePercent: 100.0,
      aiWarehouseInsightNote: "WedyAI Sorgu İyileştirici Motoru 5.48M Data Warehouse satırını 7 Data Mart üzerinde 11.8ms ortalama sorgu süresiyle çalıştırmaktadır.",
    };
  }

  /**
   * Data Mart Anlık Görüntü (Snapshot) Alım Simülasyonu
   */
  public static async triggerSnapshot(martId: string): Promise<boolean> {
    const marts = await this.getMarts();
    const idx = marts.findIndex((m) => m.id === martId);

    if (idx !== -1) {
      marts[idx].lastSnapshotAt = new Date();
      marts[idx].totalRowsCount += 4500;

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(marts));
      }
      return true;
    }
    return false;
  }
}