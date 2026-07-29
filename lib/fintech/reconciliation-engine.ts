export type ReconciliationDomain =
  | "WALLET"
  | "PAYMENTS"
  | "ESCROW"
  | "VENDOR_PAYOUTS"
  | "REFUNDS"
  | "SUBSCRIPTIONS"
  | "MARKETPLACE_COMMISSIONS";

export type ReconciliationMatchStatus = "MATCHED_AUTOMATIC" | "MATCHED_MANUAL" | "UNMATCHED_EXCEPTION" | "DISCREPANCY_DETECTED";

export interface ReconciliationBatchRecord {
  id: string;
  domain: ReconciliationDomain;
  externalGatewayTxRef: string;
  internalLedgerAuditHash: string;
  expectedAmount: number;
  actualAmount: number;
  currency: string;
  varianceAmount: number; // expectedAmount - actualAmount
  matchStatus: ReconciliationMatchStatus;
  aiMismatchRiskScore: number; // 0-100%
  aiReconciliationSuggestion: string;
  reconciledAt?: Date;
  createdAt: Date;
}

export interface FinancialClosingSummary {
  dailyClosingStatus: "CLOSED_BALANCED" | "PENDING_EXCEPTIONS";
  monthlyClosingStatus: "OPEN_AUDIT_READY" | "FINALIZED";
  totalReconciledVolume: number;
  unmatchedExceptionsCount: number;
  totalVarianceAmount: number;
  currency: string;
  aiClosingInsight: string;
}

export class ReconciliationEngine {
  private static STORAGE_KEY = "WEDYPLAN_RECONCILIATION_VAULT_V1";

  /**
   * Aktif Mutabakat ve Uyuşmazlık (Exception) Kayıtlarını Getirir
   */
  public static async getReconciliationBatches(): Promise<ReconciliationBatchRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "rec_101",
        domain: "ESCROW",
        externalGatewayTxRef: "bank_escrow_batch_8842",
        internalLedgerAuditHash: "0x8f4a2b9e1c3d7f6a",
        expectedAmount: 180000,
        actualAmount: 180000,
        currency: "TRY",
        varianceAmount: 0,
        matchStatus: "MATCHED_AUTOMATIC",
        aiMismatchRiskScore: 0,
        aiReconciliationSuggestion: "Çırağan Palace Escrow kapora tutarı banka saklama hesabı ile %100 birebir eşleşti.",
        reconciledAt: new Date("2026-07-29T10:00:00"),
        createdAt: new Date("2026-07-29T10:00:00"),
      },
      {
        id: "rec_102",
        domain: "VENDOR_PAYOUTS",
        externalGatewayTxRef: "eft_fast_payout_9921",
        internalLedgerAuditHash: "0x3e7b1a9c4f8d2e5a",
        expectedAmount: 39375,
        actualAmount: 39300,
        currency: "TRY",
        varianceAmount: 75, // ₺75 TL Banka EFT Kesintisi Farkı
        matchStatus: "DISCREPANCY_DETECTED",
        aiMismatchRiskScore: 68,
        aiReconciliationSuggestion: "₺75 TL tutarındaki fark banka aracı kurum EFT işlem masrafından kaynaklanmaktadır. 'Manuel Eşleştirme & Gider Yazma' önerilir.",
        createdAt: new Date("2026-07-28T18:30:00"),
      },
    ];
  }

  /**
   * Günlük ve Aylık Finansal Kapanış Özetini Getirir
   */
  public static async getClosingSummary(): Promise<FinancialClosingSummary> {
    const records = await this.getReconciliationBatches();
    const unmatched = records.filter((r) => r.matchStatus === "UNMATCHED_EXCEPTION" || r.matchStatus === "DISCREPANCY_DETECTED");

    return {
      dailyClosingStatus: unmatched.length === 0 ? "CLOSED_BALANCED" : "PENDING_EXCEPTIONS",
      monthlyClosingStatus: "OPEN_AUDIT_READY",
      totalReconciledVolume: 24800000,
      unmatchedExceptionsCount: unmatched.length,
      totalVarianceAmount: unmatched.reduce((acc, curr) => acc + curr.varianceAmount, 0),
      currency: "TRY",
      aiClosingInsight: "Günlük cüzdan ve ödeme ağ geçidi mutabakatı %99.97 oranında otomatik tamamlandı. 1 adet banka masraf istisnası inceleme bekliyor.",
    };
  }

  /**
   * Manuel Eşleştirme ve İstisna Düzeltme Gerçekleştirir
   */
  public static async resolveExceptionManually(batchId: string): Promise<boolean> {
    const records = await this.getReconciliationBatches();
    const idx = records.findIndex((r) => r.id === batchId);

    if (idx !== -1) {
      records[idx].matchStatus = "MATCHED_MANUAL";
      records[idx].varianceAmount = 0;
      records[idx].reconciledAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}