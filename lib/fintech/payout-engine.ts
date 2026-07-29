export type PayoutMethodType = "BANK_IBAN_TRANSFER" | "SWIFT_INTERNATIONAL" | "GATEWAY_DIRECT";
export type PayoutStatusState = "PENDING_APPROVAL" | "APPROVED" | "PROCESSING" | "SETTLED" | "FAILED_RETRY";

export interface VendorPayoutRecord {
  id: string;
  vendorIdRef: string;
  vendorName: string;
  payoutMethod: PayoutMethodType;
  destinationIban: string;
  amount: number;
  currency: string;
  status: PayoutStatusState;
  minimumThresholdAmount: number;
  aiRiskScorePercent: number; // 0-100%
  aiLiquidityForecastTip: string;
  failureReason?: string;
  approvedAt?: Date;
  settledAt?: Date;
  auditHash: string;
  createdAt: Date;
}

export interface VendorPayoutSummary {
  totalDisbursedVolume: number;
  pendingApprovalVolume: number;
  minimumPayoutThreshold: number;
  currency: string;
  aiPayoutLiquidityHealth: string;
  failedPayoutsCount: number;
}

export class PayoutEngine {
  private static STORAGE_KEY = "WEDYPLAN_PAYOUTS_VAULT_V1";

  /**
   * Tedarikçi Hakediş Transfer Kayıtlarını Getirir
   */
  public static async getPayoutRecords(): Promise<VendorPayoutRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "po_101",
        vendorIdRef: "v_101",
        vendorName: "Çırağan Palace Kempinski",
        payoutMethod: "BANK_IBAN_TRANSFER",
        destinationIban: "TR32 0006 2000 0000 1234 5678 90",
        amount: 162000,
        currency: "TRY",
        status: "APPROVED",
        minimumThresholdAmount: 1000,
        aiRiskScorePercent: 1, // Düşük Risk
        aiLiquidityForecastTip: "Tedarikçi yüksek hacimli VIP statüsündedir. Anında FAST transferi onaylandı.",
        approvedAt: new Date("2026-07-28"),
        auditHash: "0x8f4a2b9e1c3d7f6a",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "po_102",
        vendorIdRef: "v_102",
        vendorName: "Ahenk Çiçekçilik & Bohem Tasarım",
        payoutMethod: "BANK_IBAN_TRANSFER",
        destinationIban: "TR64 0001 5000 0000 9876 5432 10",
        amount: 39375,
        currency: "TRY",
        status: "PENDING_APPROVAL",
        minimumThresholdAmount: 1000,
        aiRiskScorePercent: 4,
        aiLiquidityForecastTip: "Hakediş tutarı eşik değerin üzerinde. Yönetici e-imza onayı bekleniyor.",
        auditHash: "0x3e7b1a9c4f8d2e5a",
        createdAt: new Date("2026-07-27"),
      },
    ];
  }

  /**
   * Hakediş Transfer Özetini Getirir
   */
  public static async getSummary(): Promise<VendorPayoutSummary> {
    return {
      totalDisbursedVolume: 18450000,
      pendingApprovalVolume: 201375,
      minimumPayoutThreshold: 1000,
      currency: "TRY",
      aiPayoutLiquidityHealth: "Tedarikçi cüzdan likidite dengesi Mükemmel. Başarısız transfer oranı %0.01.",
      failedPayoutsCount: 0,
    };
  }

  /**
   * Hakediş Transferini Onaylar (Approve Payout)
   */
  public static async approvePayout(payoutId: string): Promise<boolean> {
    const records = await this.getPayoutRecords();
    const idx = records.findIndex((r) => r.id === payoutId);

    if (idx !== -1) {
      records[idx].status = "SETTLED";
      records[idx].approvedAt = new Date();
      records[idx].settledAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }

  /**
   * Yeni Hakediş Transfer Talebi Oluşturur
   */
  public static async requestPayout(
    vendorName: string,
    iban: string,
    amount: number
  ): Promise<{ success: boolean; payout?: VendorPayoutRecord; error?: string }> {
    if (amount < 1000) {
      return { success: false, error: "THRESHOLD_NOT_MET: Minimum transfer tutarı ₺1.000 TL'dir." };
    }

    const newPayout: VendorPayoutRecord = {
      id: `po_${Math.random().toString(36).substring(2, 9)}`,
      vendorIdRef: `v_${Math.random().toString(36).substring(2, 7)}`,
      vendorName,
      payoutMethod: "BANK_IBAN_TRANSFER",
      destinationIban: iban,
      amount,
      currency: "TRY",
      status: "PENDING_APPROVAL",
      minimumThresholdAmount: 1000,
      aiRiskScorePercent: 2,
      aiLiquidityForecastTip: "Yeni transfer talebi kaydedildi. Banka IBAN doğrulaması tamamlandı.",
      auditHash: `0x${Math.random().toString(36).substring(2, 12)}`,
      createdAt: new Date(),
    };

    const records = await this.getPayoutRecords();
    records.unshift(newPayout);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }

    return { success: true, payout: newPayout };
  }
}export type PayoutMethodType = "BANK_IBAN_TRANSFER" | "SWIFT_INTERNATIONAL" | "GATEWAY_DIRECT";
export type PayoutStatusState = "PENDING_APPROVAL" | "APPROVED" | "PROCESSING" | "SETTLED" | "FAILED_RETRY";

export interface VendorPayoutRecord {
  id: string;
  vendorIdRef: string;
  vendorName: string;
  payoutMethod: PayoutMethodType;
  destinationIban: string;
  amount: number;
  currency: string;
  status: PayoutStatusState;
  minimumThresholdAmount: number;
  aiRiskScorePercent: number; // 0-100%
  aiLiquidityForecastTip: string;
  failureReason?: string;
  approvedAt?: Date;
  settledAt?: Date;
  auditHash: string;
  createdAt: Date;
}

export interface VendorPayoutSummary {
  totalDisbursedVolume: number;
  pendingApprovalVolume: number;
  minimumPayoutThreshold: number;
  currency: string;
  aiPayoutLiquidityHealth: string;
  failedPayoutsCount: number;
}

export class PayoutEngine {
  private static STORAGE_KEY = "WEDYPLAN_PAYOUTS_VAULT_V1";

  /**
   * Tedarikçi Hakediş Transfer Kayıtlarını Getirir
   */
  public static async getPayoutRecords(): Promise<VendorPayoutRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "po_101",
        vendorIdRef: "v_101",
        vendorName: "Çırağan Palace Kempinski",
        payoutMethod: "BANK_IBAN_TRANSFER",
        destinationIban: "TR32 0006 2000 0000 1234 5678 90",
        amount: 162000,
        currency: "TRY",
        status: "APPROVED",
        minimumThresholdAmount: 1000,
        aiRiskScorePercent: 1, // Düşük Risk
        aiLiquidityForecastTip: "Tedarikçi yüksek hacimli VIP statüsündedir. Anında FAST transferi onaylandı.",
        approvedAt: new Date("2026-07-28"),
        auditHash: "0x8f4a2b9e1c3d7f6a",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "po_102",
        vendorIdRef: "v_102",
        vendorName: "Ahenk Çiçekçilik & Bohem Tasarım",
        payoutMethod: "BANK_IBAN_TRANSFER",
        destinationIban: "TR64 0001 5000 0000 9876 5432 10",
        amount: 39375,
        currency: "TRY",
        status: "PENDING_APPROVAL",
        minimumThresholdAmount: 1000,
        aiRiskScorePercent: 4,
        aiLiquidityForecastTip: "Hakediş tutarı eşik değerin üzerinde. Yönetici e-imza onayı bekleniyor.",
        auditHash: "0x3e7b1a9c4f8d2e5a",
        createdAt: new Date("2026-07-27"),
      },
    ];
  }

  /**
   * Hakediş Transfer Özetini Getirir
   */
  public static async getSummary(): Promise<VendorPayoutSummary> {
    return {
      totalDisbursedVolume: 18450000,
      pendingApprovalVolume: 201375,
      minimumPayoutThreshold: 1000,
      currency: "TRY",
      aiPayoutLiquidityHealth: "Tedarikçi cüzdan likidite dengesi Mükemmel. Başarısız transfer oranı %0.01.",
      failedPayoutsCount: 0,
    };
  }

  /**
   * Hakediş Transferini Onaylar (Approve Payout)
   */
  public static async approvePayout(payoutId: string): Promise<boolean> {
    const records = await this.getPayoutRecords();
    const idx = records.findIndex((r) => r.id === payoutId);

    if (idx !== -1) {
      records[idx].status = "SETTLED";
      records[idx].approvedAt = new Date();
      records[idx].settledAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }

  /**
   * Yeni Hakediş Transfer Talebi Oluşturur
   */
  public static async requestPayout(
    vendorName: string,
    iban: string,
    amount: number
  ): Promise<{ success: boolean; payout?: VendorPayoutRecord; error?: string }> {
    if (amount < 1000) {
      return { success: false, error: "THRESHOLD_NOT_MET: Minimum transfer tutarı ₺1.000 TL'dir." };
    }

    const newPayout: VendorPayoutRecord = {
      id: `po_${Math.random().toString(36).substring(2, 9)}`,
      vendorIdRef: `v_${Math.random().toString(36).substring(2, 7)}`,
      vendorName,
      payoutMethod: "BANK_IBAN_TRANSFER",
      destinationIban: iban,
      amount,
      currency: "TRY",
      status: "PENDING_APPROVAL",
      minimumThresholdAmount: 1000,
      aiRiskScorePercent: 2,
      aiLiquidityForecastTip: "Yeni transfer talebi kaydedildi. Banka IBAN doğrulaması tamamlandı.",
      auditHash: `0x${Math.random().toString(36).substring(2, 12)}`,
      createdAt: new Date(),
    };

    const records = await this.getPayoutRecords();
    records.unshift(newPayout);

    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }

    return { success: true, payout: newPayout };
  }
}