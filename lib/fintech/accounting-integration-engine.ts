export type IntegrationFormatType = "SAP_ERP_JSON" | "ORACLE_EBS_XML" | "LOGO_TIGER_CSV" | "MIKRO_V16_TXT" | "STANDARD_SAF_T";
export type JournalEntryType = "GENERAL_JOURNAL" | "ACCOUNTS_RECEIVABLE" | "ACCOUNTS_PAYABLE" | "TAX_SETTLEMENT";

export interface JournalLineItem {
  id: string;
  accountCode: string; // e.g. "102.01.001" (Garanti Bank), "600.01.010" (Sales Revenue)
  accountName: string;
  debitAmount: number;
  creditAmount: number;
  currency: string;
}

export interface JournalEntryBatch {
  id: string;
  entryNumber: string;
  entryType: JournalEntryType;
  exportFormat: IntegrationFormatType;
  totalDebitAmount: number;
  totalCreditAmount: number;
  currency: string;
  isBalanced: boolean;
  lines: JournalLineItem[];
  aiSuggestedAccountCode: string;
  aiValidationStatus: "PASSED_BALANCED" | "FLAGGED_UNBALANCED";
  exportedAt?: Date;
  createdAt: Date;
}

export interface AccountingHubSummary {
  erpIntegrationStatus: "ERP_READY_ONLINE";
  totalExportedBatchesCount: number;
  totalExportedJournalVolume: number;
  supportedFormatsCount: number;
  currency: string;
  aiLedgerMappingAccuracyPercent: number;
  aiValidationTip: string;
}

export class AccountingIntegrationEngine {
  private static STORAGE_KEY = "WEDYPLAN_ACCOUNTING_HUBS_V1";

  /**
   * Yevmiye Defteri (Journal Entry) Dışa Aktarım Paketlerini Getirir
   */
  public static async getJournalBatches(): Promise<JournalEntryBatch[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "jrn_101",
        entryNumber: "JRN-2026-07-0042",
        entryType: "GENERAL_JOURNAL",
        exportFormat: "SAP_ERP_JSON",
        totalDebitAmount: 180000,
        totalCreditAmount: 180000,
        currency: "TRY",
        isBalanced: true,
        aiSuggestedAccountCode: "340.01.001 (Alınan Sipariş Avansları - Escrow)",
        aiValidationStatus: "PASSED_BALANCED",
        exportedAt: new Date("2026-07-29T09:00:00"),
        createdAt: new Date("2026-07-29T09:00:00"),
        lines: [
          {
            id: "l1",
            accountCode: "102.01.001",
            accountName: "Garanti BBVA Escrow Saklama Hesabı",
            debitAmount: 180000,
            creditAmount: 0,
            currency: "TRY",
          },
          {
            id: "l2",
            accountCode: "340.01.001",
            accountName: "Alınan Depozito ve Kaporalar (Çırağan)",
            debitAmount: 0,
            creditAmount: 180000,
            currency: "TRY",
          },
        ],
      },
      {
        id: "jrn_102",
        entryNumber: "JRN-2026-07-0043",
        entryType: "TAX_SETTLEMENT",
        exportFormat: "LOGO_TIGER_CSV",
        totalDebitAmount: 36000,
        totalCreditAmount: 36000,
        currency: "TRY",
        isBalanced: true,
        aiSuggestedAccountCode: "391.01.020 (Hesaplanan KDV %20)",
        aiValidationStatus: "PASSED_BALANCED",
        createdAt: new Date("2026-07-28T16:20:00"),
        lines: [
          {
            id: "l3",
            accountCode: "120.01.101",
            accountName: "Alıcılar Müşteri Cari Hesabı",
            debitAmount: 36000,
            creditAmount: 0,
            currency: "TRY",
          },
          {
            id: "l4",
            accountCode: "391.01.020",
            accountName: "Hesaplanan KDV %20 Rezervi",
            debitAmount: 0,
            creditAmount: 36000,
            currency: "TRY",
          },
        ],
      },
    ];
  }

  /**
   * Muhasebe Entegrasyon Özetini Getirir
   */
  public static async getHubSummary(): Promise<AccountingHubSummary> {
    return {
      erpIntegrationStatus: "ERP_READY_ONLINE",
      totalExportedBatchesCount: 1420,
      totalExportedJournalVolume: 24800000,
      supportedFormatsCount: 5, // SAP, Oracle, Logo Tiger, Mikro, SAF-T
      currency: "TRY",
      aiLedgerMappingAccuracyPercent: 99.8,
      aiValidationTip: "SAP ERP ve Logo Tiger entegrasyon kütükleri borç/alacak denkliği %100 doğrulanarak dışa aktarıldı.",
    };
  }

  /**
   * Yevmiye Fişini SAP/Logo/Oracle İçin Dışa Aktarır (Batch Export)
   */
  public static async exportBatch(batchId: string, format: IntegrationFormatType): Promise<boolean> {
    const batches = await this.getJournalBatches();
    const idx = batches.findIndex((b) => b.id === batchId);

    if (idx !== -1) {
      batches[idx].exportFormat = format;
      batches[idx].exportedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(batches));
      }
      return true;
    }
    return false;
  }
}