export type FinOpsModuleDomain =
  | "PAYMENTS"
  | "WALLET"
  | "ESCROW"
  | "BILLING"
  | "PAYOUTS"
  | "RECONCILIATION"
  | "SUBSCRIPTIONS"
  | "TAX"
  | "TREASURY";

export type CasePriority = "CRITICAL_SLA" | "HIGH" | "MEDIUM" | "LOW";
export type CaseStatus = "OPEN_PENDING_APPROVAL" | "IN_REVIEW" | "APPROVED_RESOLVED" | "REJECTED";

export interface FinOpsCaseRecord {
  id: string;
  caseNumber: string;
  domain: FinOpsModuleDomain;
  title: string;
  requestedBy: string;
  amount: number;
  currency: string;
  priority: CasePriority;
  status: CaseStatus;
  aiSlaRiskScorePercent: number; // 0-100%
  aiWorkflowOptimizationTip: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface FinOpsMetricsSummary {
  activePendingCasesCount: number;
  criticalSlaBreachRiskCount: number;
  meanTimeToSettlementMinutes: number;
  unifiedPlatformLiquidity: number;
  currency: string;
  aiFinOpsInsightNote: string;
}

export class FinOpsEngine {
  private static STORAGE_KEY = "WEDYPLAN_FINOPS_CASES_V1";

  /**
   * Aktif Operasyonel Vakaları ve Onay Kuyruğunu Getirir
   */
  public static async getCases(): Promise<FinOpsCaseRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "case_101",
        caseNumber: "FOP-2026-0042",
        domain: "PAYOUTS",
        title: "Çırağan Palace Yüksek Tutarlı Hakediş Transfer Onayı",
        requestedBy: "Sistem Otomasyonu (Fast Payout Rail)",
        amount: 162000,
        currency: "TRY",
        priority: "CRITICAL_SLA",
        status: "OPEN_PENDING_APPROVAL",
        aiSlaRiskScorePercent: 92,
        aiWorkflowOptimizationTip: "Tedarikçi VIP statüsündedir ve IBAN doğrulanmıştır. 'Çift E-İmza Onayı' ile anında FAST transferi yapılabilir.",
        createdAt: new Date("2026-07-29T10:15:00"),
      },
      {
        id: "case_102",
        caseNumber: "FOP-2026-0043",
        domain: "RECONCILIATION",
        title: "EFT Masraf Sapması Manuel Mutabakat Kapatma",
        requestedBy: "Banka Entegrasyon Botu",
        amount: 75,
        currency: "TRY",
        priority: "MEDIUM",
        status: "OPEN_PENDING_APPROVAL",
        aiSlaRiskScorePercent: 12,
        aiWorkflowOptimizationTip: "₺75 TL tutarındaki fark banka FAST işlem masrafıdır. Otomatik gider yazma kuralı önerilir.",
        createdAt: new Date("2026-07-28T18:30:00"),
      },
      {
        id: "case_103",
        caseNumber: "FOP-2026-0044",
        domain: "ESCROW",
        title: "Ahenk Çiçekçilik Revizyon İhtilaf Havuz Dondurması",
        requestedBy: "Çift Düğün Asistanı",
        amount: 22500,
        currency: "TRY",
        priority: "HIGH",
        status: "IN_REVIEW",
        aiSlaRiskScorePercent: 78,
        aiWorkflowOptimizationTip: "Çift ve tedarikçi e-imzalı sözleşme revizyonunu onayladı. Dondurma kaldırılarak 2. aşama ödemesi serbest bırakılabilir.",
        createdAt: new Date("2026-07-27T14:20:00"),
      },
    ];
  }

  /**
   * Finans Operasyonları Genel Metrik Özeti
   */
  public static async getMetricsSummary(): Promise<FinOpsMetricsSummary> {
    return {
      activePendingCasesCount: 3,
      criticalSlaBreachRiskCount: 1,
      meanTimeToSettlementMinutes: 4.2,
      unifiedPlatformLiquidity: 52800000,
      currency: "TRY",
      aiFinOpsInsightNote: "Finans ekibi SLA yanıt süresi ortalama 4.2 dakikadır. Tüm 9 FinTech modülü %100 senkronize çalışıyor.",
    };
  }

  /**
   * Vaka / Onay Talebini Onaylar (Approve Case)
   */
  public static async approveCase(caseId: string): Promise<boolean> {
    const cases = await this.getCases();
    const idx = cases.findIndex((c) => c.id === caseId);

    if (idx !== -1) {
      cases[idx].status = "APPROVED_RESOLVED";
      cases[idx].resolvedAt = new Date();

      if (typeof window !== "undefined") {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cases));
      }
      return true;
    }
    return false;
  }
}