export type CrmDomainModule =
  | "LEADS"
  | "CONTACTS"
  | "COMPANIES"
  | "DEALS"
  | "ACTIVITIES"
  | "TASKS"
  | "MARKETING_LISTS";

export type CrmSyncDirection = "BIDIRECTIONAL" | "OUTBOUND_ONLY" | "INBOUND_ONLY";
export type CrmRecordSyncStatus = "IN_SYNC" | "DUPLICATE_MERGED" | "PENDING_MATCH" | "CONFLICT";

export interface CrmSyncRecord {
  id: string;
  module: CrmDomainModule;
  targetCrmRef: string; // e.g. "Salesforce Enterprise", "HubSpot CRM"
  entityLabel: string; // e.g. "Sena & Kaan (VIP Lead)"
  externalCrmId: string; // e.g. "SF-00394201"
  direction: CrmSyncDirection;
  status: CrmRecordSyncStatus;
  duplicateConfidencePercent: number; // 0-100% (Predicted by AI)
  aiMatchingNote: string;
  syncedAt: Date;
}

export interface CrmIntegrationSummary {
  totalSyncedCrmRecords24h: number;
  activeCrmConnectorsCount: number;
  duplicatesPrevented24h: number;
  averageMatchingAccuracyPercent: number;
  aiCrmInsightNote: string;
}

export class CrmIntegrationEngine {
  private static STORAGE_KEY = "WEDYPLAN_CRM_INTEGRATION_V1";

  /**
   * CRM Senkronizasyon Kayıtlarını Getirir
   */
  public static async getSyncRecords(): Promise<CrmSyncRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "crm_101",
        module: "LEADS",
        targetCrmRef: "Salesforce Enterprise",
        entityLabel: "Sena & Kaan (Çırağan Palace Talebi)",
        externalCrmId: "SF-LEAD-89201",
        direction: "BIDIRECTIONAL",
        status: "IN_SYNC",
        duplicateConfidencePercent: 0.2,
        aiMatchingNote: "Çift yönlü senkronizasyon aktif. Salesforce Lead skoru (98/100) WedyPlan CRM ile eşleşti.",
        syncedAt: new Date("2026-07-29T21:58:00"),
      },
      {
        id: "crm_102",
        module: "CONTACTS",
        targetCrmRef: "HubSpot CRM",
        entityLabel: "Ahmet Yılmaz (Sait Halim Paşa Yalısı Yetkilisi)",
        externalCrmId: "HS-CONT-44102",
        direction: "BIDIRECTIONAL",
        status: "DUPLICATE_MERGED",
        duplicateConfidencePercent: 98.4,
        aiMatchingNote: "Mükerrer e-posta (ahmet@saithalimpasa.com) tespit edildi. Kayıtlar otonom birleştirildi (Merged).",
        syncedAt: new Date("2026-07-29T21:40:00"),
      },
      {
        id: "crm_103",
        module: "DEALS",
        targetCrmRef: "Salesforce Enterprise",
        entityLabel: "Bodrum VIP Düğün $45,000 USD Escrow Anlaşması",
        externalCrmId: "SF-OPP-90214",
        direction: "OUTBOUND_ONLY",
        status: "IN_SYNC",
        duplicateConfidencePercent: 0.5,
        aiMatchingNote: "Phase 11 Escrow kilitlenmesi Salesforce Opportunity aşamasını 'Closed Won' statüsüne güncelledi.",
        syncedAt: new Date("2026-07-29T21:20:00"),
      },
    ];
  }

  /**
   * CRM Entegrasyon Platform Özetini Getirir
   */
  public static async getSummary(): Promise<CrmIntegrationSummary> {
    return {
      totalSyncedCrmRecords24h: 28400,
      activeCrmConnectorsCount: 3,
      duplicatesPrevented24h: 142,
      averageMatchingAccuracyPercent: 99.6,
      aiCrmInsightNote: "Yapay zeka Müşteri Eşleştirme Motoru 28.4K CRM kaydını %99.6 doğrulukla senkronize etmiş ve 142 mükerrer müşteri kaydını otonom birleştirmiştir.",
    };
  }

  /**
   * Mükerrer Kayıt Birleştirme (Merge) Simülasyonu
   */
  public static async mergeDuplicateRecord(recordId: string): Promise<boolean> {
    const records = await this.getSyncRecords();
    const idx = records.findIndex((r) => r.id === recordId);

    if (idx !== -1) {
      records[idx].status = "IN_SYNC";
      records[idx].duplicateConfidencePercent = 0.0;
      records[idx].syncedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}