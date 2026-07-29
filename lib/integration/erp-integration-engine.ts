export type ErpDomainArea =
  | "ORDERS"
  | "INVOICES"
  | "CUSTOMERS"
  | "VENDORS"
  | "PRODUCTS"
  | "FINANCIAL_DATA"
  | "INVENTORY_REFERENCES"
  | "PROJECTS";

export type ErpSyncMode = "REAL_TIME" | "BATCH_SCHEDULED";
export type ErpSyncStatus = "SYNCHRONIZED" | "PENDING_BATCH" | "CONFLICT_RESOLVED" | "VALIDATION_ERROR";

export interface ErpMappingRule {
  wedyplanField: string;
  targetErpField: string;
  transformationLogic: string; // e.g. "StringToUpper", "FormatCurrencyTRY"
  aiMappingConfidencePercent: number; // 0-100%
}

export interface ErpSyncRecord {
  id: string;
  domainArea: ErpDomainArea;
  targetErpSystemRef: string; // e.g. "SAP S/4HANA", "Logo Tiger"
  entityReferenceId: string; // e.g. "INV-2026-9041"
  syncMode: ErpSyncMode;
  status: ErpSyncStatus;
  mappingRulesAppliedCount: number;
  syncLatencyMs: number;
  aiValidationNote: string;
  syncedAt: Date;
}

export interface ErpIntegrationSummary {
  totalSyncedEntities24h: number;
  activeErpSystemsCount: number;
  averageMappingAccuracyPercent: number;
  conflictResolutionSuccessRatePercent: number;
  aiErpInsightNote: string;
}

export class ErpIntegrationEngine {
  private static STORAGE_KEY = "WEDYPLAN_ERP_INTEGRATION_V1";

  /**
   * ERP Senkronizasyon Kayıtlarını Getirir
   */
  public static async getSyncRecords(): Promise<ErpSyncRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "erp_101",
        domainArea: "INVOICES",
        targetErpSystemRef: "SAP S/4HANA Finance",
        entityReferenceId: "INV-2026-8901 (Çırağan Escrow)",
        syncMode: "REAL_TIME",
        status: "SYNCHRONIZED",
        mappingRulesAppliedCount: 14,
        syncLatencyMs: 24,
        aiValidationNote: "KDV matrahı ve Phase 11 Escrow kilitleme tutarı %100 uyuştu. SAP ARInvoice fişi oluşturuldu.",
        syncedAt: new Date("2026-07-29T21:55:00"),
      },
      {
        id: "erp_102",
        domainArea: "VENDORS",
        targetErpSystemRef: "Logo Tiger ERP",
        entityReferenceId: "VND-702 (Bodrum VIP Catering)",
        syncMode: "BATCH_SCHEDULED",
        status: "SYNCHRONIZED",
        mappingRulesAppliedCount: 8,
        syncLatencyMs: 42,
        aiValidationNote: "Vergi Dairesi ve VKN numarası doğrulandı. Cari hesap kartı Logo Tiger'a aktarıldı.",
        syncedAt: new Date("2026-07-29T21:30:00"),
      },
      {
        id: "erp_103",
        domainArea: "FINANCIAL_DATA",
        targetErpSystemRef: "Oracle NetSuite",
        entityReferenceId: "FIN-Q3-BATCH-04",
        syncMode: "BATCH_SCHEDULED",
        status: "CONFLICT_RESOLVED",
        mappingRulesAppliedCount: 22,
        syncLatencyMs: 120,
        aiValidationNote: "Zaman uyumsuzluğu çakışması tespit edildi. Escrow Defteri kaynak kabul edilerek çakışma otonom çözüldü.",
        syncedAt: new Date("2026-07-29T21:15:00"),
      },
    ];
  }

  /**
   * ERP Entegrasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<ErpIntegrationSummary> {
    return {
      totalSyncedEntities24h: 14200,
      activeErpSystemsCount: 4,
      averageMappingAccuracyPercent: 99.4,
      conflictResolutionSuccessRatePercent: 99.8,
      aiErpInsightNote: "WedyAI Veri Doğrulama Katmanı 14.2K ERP kaydını %99.4 haritalama doğruluğuyla senkronize etmiş ve finansal verilerde sıfır çakışma sağlamıştır.",
    };
  }

  /**
   * Manuel Batch Senkronizasyonu Tetikleme Simülasyonu
   */
  public static async triggerSyncProcess(recordId: string): Promise<boolean> {
    const records = await this.getSyncRecords();
    const idx = records.findIndex((r) => r.id === recordId);

    if (idx !== -1) {
      records[idx].status = "SYNCHRONIZED";
      records[idx].syncedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}