export type WalletOperationType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "INTERNAL_TRANSFER"
  | "ESCROW_LOCK"
  | "REFUND_CREDIT"
  | "BONUS_CREDIT"
  | "BALANCE_ADJUSTMENT";

export interface WalletBalanceBuckets {
  available: number;
  pending: number;
  escrowLocked: number;
  refund: number;
  bonus: number;
  currency: string;
}

export interface WalletTransactionItem {
  id: string;
  walletId: string;
  operation: WalletOperationType;
  amount: number;
  currency: string;
  sourceBucket: keyof WalletBalanceBuckets;
  targetBucket?: keyof WalletBalanceBuckets;
  description: string;
  transactionRef: string;
  auditHash: string;
  createdAt: Date;
}

export interface SpendingAnalysisSummary {
  monthlyCashFlowTrend: "HEALTHY" | "CAPITAL_RESERVED" | "PAYMENT_DUE";
  totalSpentThisMonth: number;
  upcomingEscrowMilestonesTotal: number;
  currency: string;
  aiBudgetSuggestion: string;
  aiCashFlowTip: string;
}

export class WalletEngine {
  private static STORAGE_KEY = "WEDYPLAN_WALLETS_VAULT_V2";
  private static TX_KEY = "WEDYPLAN_WALLET_TRANSACTIONS_V1";

  /**
   * Aktif Cüzdan Bakiyelerini Getirir
   */
  public static async getWalletBalance(walletId: string = "w_couple_main"): Promise<WalletBalanceBuckets> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return {
      available: 48500,
      pending: 12000,
      escrowLocked: 180000,
      refund: 2500,
      bonus: 1500,
      currency: "TRY",
    };
  }

  /**
   * Cüzdan İşlem Geçmişini Getirir
   */
  public static async getTransactions(): Promise<WalletTransactionItem[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.TX_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "wtx_101",
        walletId: "w_couple_main",
        operation: "ESCROW_LOCK",
        amount: 180000,
        currency: "TRY",
        sourceBucket: "available",
        targetBucket: "escrowLocked",
        description: "Çırağan Palace Kempinski düğün mekan kiralama sözleşmesi Escrow kilidi.",
        transactionRef: "tx_escrow_deposit_101",
        auditHash: "0x8f4a2b9e1c3d7f6a",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "wtx_102",
        walletId: "w_couple_main",
        operation: "BONUS_CREDIT",
        amount: 1500,
        currency: "TRY",
        sourceBucket: "bonus",
        description: "Yaz 2026 Erken Rezervasyon WedyPlan Sadakat Primi.",
        transactionRef: "tx_bonus_award_102",
        auditHash: "0x3e7b1a9c4f8d2e5a",
        createdAt: new Date("2026-07-25"),
      },
      {
        id: "wtx_103",
        walletId: "w_couple_main",
        operation: "DEPOSIT",
        amount: 50000,
        currency: "TRY",
        sourceBucket: "available",
        description: "Garanti BBVA Kredi Kartı ile Cüzdan Bakiye Yükleme.",
        transactionRef: "tx_deposit_card_103",
        auditHash: "0x9a2c1f4e8b3d6a7f",
        createdAt: new Date("2026-07-20"),
      },
    ];
  }

  /**
   * WedyAI Akıllı Nakit Akışı ve Harcama Analizini Getirir
   */
  public static async getSpendingAnalysis(): Promise<SpendingAnalysisSummary> {
    return {
      monthlyCashFlowTrend: "HEALTHY",
      totalSpentThisMonth: 180000,
      upcomingEscrowMilestonesTotal: 45000,
      currency: "TRY",
      aiBudgetSuggestion: "Ağustos ayında bekleyen fotoğrafçı ve müzik grubu kaporası için cüzdanda ₺45.000 TL kullanılabilir bakiye yedekleyin.",
      aiCashFlowTip: "₺1.500 TL Sadakat Primi bakiyenizi sonraki organizasyon ödemesinde dilediğiniz gibi kullanabilirsiniz.",
    };
  }

  /**
   * Atomik Cüzdan Operasyonu Gerçekleştirir (Para Yatırma / Kilitleme)
   */
  public static async executeOperation(
    walletId: string,
    operation: WalletOperationType,
    amount: number,
    description: string
  ): Promise<{ success: boolean; updatedBalances?: WalletBalanceBuckets; error?: string }> {
    const balances = await this.getWalletBalance(walletId);

    if (operation === "ESCROW_LOCK") {
      if (balances.available < amount) {
        return { success: false, error: "INSUFFICIENT_AVAILABLE_FUNDS: Kullanılabilir bakiye yetersiz." };
      }
      balances.available -= amount;
      balances.escrowLocked += amount;
    } else if (operation === "DEPOSIT") {
      balances.available += amount;
    } else if (operation === "WITHDRAWAL") {
      if (balances.available < amount) {
        return { success: false, error: "INSUFFICIENT_FUNDS: Çekilebilir bakiye yetersiz." };
      }
      balances.available -= amount;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(balances));
    }

    const newTx: WalletTransactionItem = {
      id: `wtx_${Math.random().toString(36).substring(2, 9)}`,
      walletId,
      operation,
      amount,
      currency: balances.currency,
      sourceBucket: operation === "ESCROW_LOCK" ? "available" : "available",
      targetBucket: operation === "ESCROW_LOCK" ? "escrowLocked" : undefined,
      description,
      transactionRef: `tx_manual_${Date.now()}`,
      auditHash: `0x${Math.random().toString(36).substring(2, 12)}`,
      createdAt: new Date(),
    };

    const currentTxs = await this.getTransactions();
    currentTxs.unshift(newTx);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.TX_KEY, JSON.stringify(currentTxs));
    }

    return { success: true, updatedBalances: balances };
  }
}