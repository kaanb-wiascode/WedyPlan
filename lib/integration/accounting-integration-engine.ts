export type AccountingExportType =
  | "INVOICE_EXPORT"
  | "JOURNAL_ENTRIES"
  | "TAX_REPORTS"
  | "PAYMENT_RECORDS"
  | "RECONCILIATION_EXPORT";

export type AccountingExportFormat = "REST_API" | "UBL_XML" | "CSV" | "EXCEL_XLSX";
export type AccountingSyncStatus = "EXPORTED" | "PENDING_SCHEDULED" | "VALIDATION_FAILED";

export interface JournalEntryLine {
  glAccountCode: string; // e.g. "102.01 Banka", "600.01 Escrow Geliri"
  accountName: string;
  debitAmountUsd: number;
  creditAmountUsd: number;
}

export interface AccountingRecordItem {
  id: string;
  exportType: AccountingExportType;
  targetSystemRef: string; // e.g. "Logo Tiger", "Luca", "QuickBooks"
  referenceNumber: string; // e.g. "JRN-2026-0042"
  exportFormat: AccountingExportFormat;
  journalLines: JournalEntryLine[];
  status: AccountingSyncStatus;
  isBalanced: boolean;
  aiValidationNote: string;
  exportedAt: Date;
}

export interface AccountingIntegrationSummary {
  totalExportedRecords24h: number;
  totalBalancedJournalVolumeUsd: number;
  activeAccountingIntegrationsCount: number;
  ledgerValidationAccuracyPercent: number;
  aiAccountingInsightNote: string;
}

export class AccountingIntegrationEngine {
  private static STORAGE_KEY = "WEDYPLAN_ACCOUNTING_INTEGRATION_V1";

  /**
   * Muhasebe Aktarım Kayıtlarını Getirir
   */
  public static async getAccountingRecords(): Promise<AccountingRecordItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "acc_101",
        exportType: "INVOICE_EXPORT",
        targetSystemRef: "Logo Tiger e-Fatura Gateway",
        referenceNumber: "EFT-2026-9041 (Çırağan VIP)",
        exportFormat: "UBL_XML",
        journalLines: [
          { glAccountCode: "120.01", accountName: "Alıcılar (Çift Sena & Kaan)", debitAmountUsd: 45000, creditAmountUsd: 0 },
          { glAccountCode: "600.01", accountName: "Yurt İçi Düğün Satışları", debitAmountUsd: 0, creditAmountUsd: 37500 },
          { glAccountCode: "391.01", accountName: "Hesaplanan KDV (%20)", debitAmountUsd: 0, creditAmountUsd: 7500 },
        ],
        status: "EXPORTED",
        isBalanced: true,
        aiValidationNote: "UBL 2.1 e-Fatura şemasına %100 uyumlu. Borç/Alacak dengesi doğrulandı.",
        exportedAt: new Date("2026-07-29T21:55:00"),
      },
      {
        id: "acc_102",
        exportType: "JOURNAL_ENTRIES",
        targetSystemRef: "Luca Mali Müşavir Entegrasyonu",
        referenceNumber: "JRN-2026-1020 (Escrow Hakediş)",
        exportFormat: "REST_API",
        journalLines: [
          { glAccountCode: "102.01", accountName: "Ziraat Escrow Kasa Hesabı", debitAmountUsd: 25000, creditAmountUsd: 0 },
          { glAccountCode: "340.01", accountName: "Alınan Sipariş Avansları", debitAmountUsd: 0, creditAmountUsd: 25000 },
        ],
        status: "EXPORTED",
        isBalanced: true,
        aiValidationNote: "Phase 11 Escrow Çift Taraflı Defter Kaydı ile %100 mutabık.",
        exportedAt: new Date("2026-07-29T21:30:00"),
      },
      {
        id: "acc_103",
        exportType: "RECONCILIATION_EXPORT",
        targetSystemRef: "QuickBooks Online",
        referenceNumber: "REC-2026-Q3-BATCH",
        exportFormat: "CSV",
        journalLines: [
          { glAccountCode: "102.02", accountName: "Stripe Escrow Transit", debitAmountUsd: 14200, creditAmountUsd: 0 },
          { glAccountCode: "102.01", accountName: "Banka Transit Hesabı", debitAmountUsd: 0, creditAmountUsd: 14200 },
        ],
        status: "EXPORTED",
        isBalanced: true,
        aiValidationNote: "Banka mutabakat ekstresi otonom eşleştirildi.",
        exportedAt: new Date("2026-07-29T20:45:00"),
      },
    ];
  }

  /**
   * Muhasebe Platform Özetini Getirir
   */
  public static async getSummary(): Promise<AccountingIntegrationSummary> {
    return {
      totalExportedRecords24h: 3420,
      totalBalancedJournalVolumeUsd: 1840000,
      activeAccountingIntegrationsCount: 5,
      ledgerValidationAccuracyPercent: 100.0,
      aiAccountingInsightNote: "WedyAI Defter Doğrulama Motoru $1.84M USD tutarındaki muhasebe fişlerini %100 Borç/Alacak dengesi ve GİB/e-Fatura uyumluluğu ile aktarmıştır.",
    };
  }

  /**
   * Yeniden Dışa Aktarma (Export) Simülasyonu
   */
  public static async triggerExport(recordId: string): Promise<boolean> {
    const records = await this.getAccountingRecords();
    const idx = records.findIndex((r) => r.id === recordId);

    if (idx !== -1) {
      records[idx].status = "EXPORTED";
      records[idx].exportedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}