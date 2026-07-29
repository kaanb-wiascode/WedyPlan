export type CommissionModelType =
  | "FIXED"
  | "PERCENTAGE"
  | "TIERED"
  | "CAMPAIGN_BASED"
  | "PARTNER_BASED";

export interface CommissionRule {
  id: string;
  ruleName: string;
  modelType: CommissionModelType;
  fixedFeeAmount?: number;
  percentageRate?: number; // e.g. 10.5%
  tieredThresholdAmount?: number;
  partnerCategoryRef?: string;
  isActive: boolean;
}

export interface CommissionSettlementRecord {
  id: string;
  transactionRef: string;
  vendorName: string;
  grossTransactionAmount: number;
  appliedModel: CommissionModelType;
  platformTakeRatePercent: number;
  commissionCollectedAmount: number;
  netVendorPayoutAmount: number;
  currency: string;
  isReconciled: boolean;
  reconciledAt?: Date;
  auditHash: string;
  createdAt: Date;
}

export interface CommissionRevenueSummary {
  totalGrossMarketplaceVolumeGmv: number;
  totalCommissionCollected: number;
  averageTakeRatePercent: number;
  currency: string;
  aiRevenueOptimizationTip: string;
  aiAnomalyDetectionAlertCount: number;
  aiCommissionForecast30Days: number;
}

export class CommissionEngine {
  private static STORAGE_KEY = "WEDYPLAN_COMMISSIONS_VAULT_V1";

  /**
   * Komisyon ve Gelir Paylaşım Kurallarını Getirir
   */
  public static async getRules(): Promise<CommissionRule[]> {
    return [
      {
        id: "rule_1",
        ruleName: "Standart Pazaryeri Mekan Komisyonu",
        modelType: "PERCENTAGE",
        percentageRate: 10.0, // %10 Take Rate
        isActive: true,
      },
      {
        id: "rule_2",
        ruleName: "Lüks Otel Kademeli Komisyon (Tiered)",
        modelType: "TIERED",
        percentageRate: 8.0, // ₺500.000 üstü %8
        tieredThresholdAmount: 500000,
        isActive: true,
      },
      {
        id: "rule_3",
        ruleName: "Yaz 2026 Kampanya Özel Komisyonu",
        modelType: "CAMPAIGN_BASED",
        percentageRate: 12.5,
        isActive: true,
      },
      {
        id: "rule_4",
        ruleName: "Fotoğraf & Müzik Sabit Ücretli Komisyon",
        modelType: "FIXED",
        fixedFeeAmount: 1500,
        isActive: true,
      },
    ];
  }

  /**
   * Komisyon Mutabakat ve Hakediş Kayıtlarını Getirir
   */
  public static async getSettlements(): Promise<CommissionSettlementRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "com_101",
        transactionRef: "tx_escrow_deposit_101",
        vendorName: "Çırağan Palace Kempinski",
        grossTransactionAmount: 180000,
        appliedModel: "PERCENTAGE",
        platformTakeRatePercent: 10.0,
        commissionCollectedAmount: 18000,
        netVendorPayoutAmount: 162000,
        currency: "TRY",
        isReconciled: true,
        reconciledAt: new Date("2026-07-28"),
        auditHash: "0x8f4a2b9e1c3d7f6a",
        createdAt: new Date("2026-07-28"),
      },
      {
        id: "com_102",
        transactionRef: "tx_escrow_deposit_102",
        vendorName: "Ahenk Çiçekçilik & Bohem Tasarım",
        grossTransactionAmount: 45000,
        appliedModel: "CAMPAIGN_BASED",
        platformTakeRatePercent: 12.5,
        commissionCollectedAmount: 5625,
        netVendorPayoutAmount: 39375,
        currency: "TRY",
        isReconciled: false,
        auditHash: "0x3e7b1a9c4f8d2e5a",
        createdAt: new Date("2026-07-25"),
      },
    ];
  }

  /**
   * Komisyon Gelir Özetini Getirir
   */
  public static async getSummary(): Promise<CommissionRevenueSummary> {
    return {
      totalGrossMarketplaceVolumeGmv: 24800000,
      totalCommissionCollected: 2604000,
      averageTakeRatePercent: 10.5,
      currency: "TRY",
      aiRevenueOptimizationTip: "Lüks otel kategorisinde 'Kademeli Komisyon' modeli uygulanması yüksek tutarlı sözleşmelerde dönüşüm oranını %22 artırdı.",
      aiAnomalyDetectionAlertCount: 0,
      aiCommissionForecast30Days: 2980000,
    };
  }

  /**
   * Mutabakat Onayı Verir (Reconciliation)
   */
  public static async reconcileSettlement(settlementId: string): Promise<boolean> {
    const records = await this.getSettlements();
    const idx = records.findIndex((r) => r.id === settlementId);

    if (idx !== -1) {
      records[idx].isReconciled = true;
      records[idx].reconciledAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
      }
      return true;
    }
    return false;
  }
}