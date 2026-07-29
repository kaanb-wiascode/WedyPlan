export type FinancialAccountType = "COUPLE_WALLET" | "VENDOR_WALLET" | "ESCROW_CUSTODY" | "PLATFORM_COMMISSION" | "TAX_RESERVE";
export type LedgerEntryType = "DEBIT" | "CREDIT";
export type TransactionStatus = "SETTLED" | "PENDING_ESCROW" | "REFUNDED" | "DISPUTED";

export interface WalletAccount {
  id: string;
  tenantId: string;
  tenantName: string;
  accountType: FinancialAccountType;
  availableBalance: number;
  escrowLockedBalance: number;
  currency: string;
  taxNumberOrId?: string;
  updatedAt: Date;
}

export interface DoubleEntryRecord {
  id: string;
  transactionRef: string;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  currency: string;
  platformFeeAmount: number;
  taxWithholdingAmount: number;
  status: TransactionStatus;
  auditHash: string;
  createdAt: Date;
}

export interface FinancialDomainMap {
  domainName: string;
  description: string;
  activeAccountsCount: number;
  totalVolumeSettled: number;
  status: "ACTIVE_OPERATIONAL" | "AUDIT_READY";
}

export class FinancialEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINTECH_LEDGER_V1";

  /**
   * Finansal Hizmet Haritası ve Domain Sınırlarını Getirir
   */
  public static async getServiceMap(): Promise<FinancialDomainMap[]> {
    return [
      {
        domainName: "Payments & Cross-Border Gateway",
        description: "Apple Pay, Kredi Kartı, EFT ve Çoklu Para Birimli Ödeme Yönlendirici",
        activeAccountsCount: 14200,
        totalVolumeSettled: 24800000,
        status: "ACTIVE_OPERATIONAL",
      },
      {
        domainName: "Escrow & Milestone Custody",
        description: "Sözleşme Aşamalarına Bağlı Güvenli Kapora Ve Bakiye Saklama Havuzu",
        activeAccountsCount: 3840,
        totalVolumeSettled: 8400000,
        status: "ACTIVE_OPERATIONAL",
      },
      {
        domainName: "Multi-Tenant Wallets & Payouts",
        description: "Çift, Tedarikçi ve Platform Dijital Cüzdanları ve Anında Hakediş Aktarımı",
        activeAccountsCount: 18040,
        totalVolumeSettled: 16400000,
        status: "ACTIVE_OPERATIONAL",
      },
      {
        domainName: "Tax, E-Invoice & Audit Engine",
        description: "KDV Kesintisi, e-Fatura Üretimi ve Değişmez Çift Girişli Muhasebe Defteri",
        activeAccountsCount: 3840,
        totalVolumeSettled: 3200000,
        status: "AUDIT_READY",
      },
    ];
  }

  /**
   * Sistem Cüzdan Hesaplarını Getirir
   */
  public static async getWallets(): Promise<WalletAccount[]> {
    return [
      {
        id: "w_escrow_1",
        tenantId: "custody_system",
        tenantName: "WedyPlan Escrow Saklama Havuzu",
        accountType: "ESCROW_CUSTODY",
        availableBalance: 0,
        escrowLockedBalance: 4200000,
        currency: "TRY",
        updatedAt: new Date(),
      },
      {
        id: "w_vendor_ciragan",
        tenantId: "v_101",
        tenantName: "Çırağan Palace Kempinski",
        accountType: "VENDOR_WALLET",
        availableBalance: 1250000,
        escrowLockedBalance: 450000,
        currency: "TRY",
        taxNumberOrId: "TR1234567890",
        updatedAt: new Date(),
      },
      {
        id: "w_platform_revenue",
        tenantId: "wedyplan_ops",
        tenantName: "WedyPlan Platform Komisyon Cüzdanı",
        accountType: "PLATFORM_COMMISSION",
        availableBalance: 1840000,
        escrowLockedBalance: 0,
        currency: "TRY",
        updatedAt: new Date(),
      },
    ];
  }

  /**
   * Çift Girişli Muhasebe Kayıtlarını Getirir
   */
  public static async getLedgerRecords(): Promise<DoubleEntryRecord[]> {
    return [
      {
        id: "led_101",
        transactionRef: "tx_escrow_deposit_101",
        debitAccountId: "w_couple_kaan",
        creditAccountId: "w_escrow_1",
        amount: 180000,
        currency: "TRY",
        platformFeeAmount: 18000, // %10 Take Rate
        taxWithholdingAmount: 3600, // %20 KDV
        status: "SETTLED",
        auditHash: "0x8f4a2b9e1c3d7f6a",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "led_102",
        transactionRef: "tx_vendor_payout_102",
        debitAccountId: "w_escrow_1",
        creditAccountId: "w_vendor_ciragan",
        amount: 158400, // Net Payout
        currency: "TRY",
        platformFeeAmount: 0,
        taxWithholdingAmount: 0,
        status: "SETTLED",
        auditHash: "0x3e7b1a9c4f8d2e5a",
        createdAt: new Date("2026-07-27"),
      },
    ];
  }
}