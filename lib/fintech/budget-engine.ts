export type BudgetScopeType =
  | "WEDDING_COUPLE"
  | "VENDOR_OPERATIONS"
  | "CORPORATE_ENTERPRISE"
  | "DEPARTMENTAL_ADMIN";

export interface BudgetItemCategory {
  id: string;
  categoryName: string;
  allocatedAmount: number;
  spentAmount: number;
  committedEscrowAmount: number;
  remainingAmount: number;
  currency: string;
  isOverbudget: boolean;
}

export interface BudgetRecord {
  id: string;
  scope: BudgetScopeType;
  tenantName: string;
  totalTargetBudgetAmount: number;
  totalSpentAmount: number;
  totalCommittedEscrowAmount: number;
  totalRemainingAmount: number;
  currency: string;
  categories: BudgetItemCategory[];
  aiBudgetOptimizationTip: string;
  aiSavingsPotentialAmount: number;
  updatedAt: Date;
}

export class BudgetEngine {
  private static STORAGE_KEY = "WEDYPLAN_BUDGETS_VAULT_V1";

  /**
   * Bütçe Kayıtlarını Getirir
   */
  public static async getBudgets(): Promise<BudgetRecord[]> {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    }

    return [
      {
        id: "bdg_101",
        scope: "WEDDING_COUPLE",
        tenantName: "Sena & Kaan B.",
        totalTargetBudgetAmount: 500000,
        totalSpentAmount: 180000,
        totalCommittedEscrowAmount: 120000,
        totalRemainingAmount: 200000,
        currency: "TRY",
        updatedAt: new Date("2026-07-29"),
        aiSavingsPotentialAmount: 38000,
        aiBudgetOptimizationTip: "Süsleme ve Orkestra kalemlerinde WedyPlan indirimli partner paketi seçilerek ₺38.000 TL bütçe tasarrufu sağlanabilir.",
        categories: [
          {
            id: "cat_1",
            categoryName: "Mekan & Yeme-İçme (Venue & Catering)",
            allocatedAmount: 250000,
            spentAmount: 180000,
            committedEscrowAmount: 0,
            remainingAmount: 70000,
            currency: "TRY",
            isOverbudget: false,
          },
          {
            id: "cat_2",
            categoryName: "Fotoğraf & Video Çekimi",
            allocatedAmount: 60000,
            spentAmount: 0,
            committedEscrowAmount: 50000,
            remainingAmount: 10000,
            currency: "TRY",
            isOverbudget: false,
          },
          {
            id: "cat_3",
            categoryName: "Çiçek & Bohem Süsleme Tasarımı",
            allocatedAmount: 50000,
            spentAmount: 0,
            committedEscrowAmount: 70000,
            remainingAmount: -20000,
            currency: "TRY",
            isOverbudget: true, // Bütçe Aşımı
          },
        ],
      },
      {
        id: "bdg_102",
        scope: "VENDOR_OPERATIONS",
        tenantName: "Çırağan Palace Kempinski Düğün Departmanı",
        totalTargetBudgetAmount: 2500000,
        totalSpentAmount: 850000,
        totalCommittedEscrowAmount: 450000,
        totalRemainingAmount: 1200000,
        currency: "TRY",
        updatedAt: new Date("2026-07-28"),
        aiSavingsPotentialAmount: 120000,
        aiBudgetOptimizationTip: "Sezonluk menü satın alımlarında toplu tedarik ile %12 operasyonel maliyet tasarrufu öngörülmektedir.",
        categories: [
          {
            id: "cat_10",
            categoryName: "Operasyonel Malzeme & Lojistik",
            allocatedAmount: 1000000,
            spentAmount: 850000,
            committedEscrowAmount: 0,
            remainingAmount: 150000,
            currency: "TRY",
            isOverbudget: false,
          },
        ],
      },
    ];
  }

  /**
   * Bütçe Kalemine Yeni Harcama Ekleme Veya Bütçe Güncelleme
   */
  public static async updateCategoryAllocation(
    budgetId: string,
    categoryId: string,
    newAllocation: number
  ): Promise<boolean> {
    const budgets = await this.getBudgets();
    const bIdx = budgets.findIndex((b) => b.id === budgetId);

    if (bIdx !== -1) {
      const cIdx = budgets[bIdx].categories.findIndex((c) => c.id === categoryId);
      if (cIdx !== -1) {
        budgets[bIdx].categories[cIdx].allocatedAmount = newAllocation;
        budgets[bIdx].categories[cIdx].remainingAmount =
          newAllocation -
          (budgets[bIdx].categories[cIdx].spentAmount + budgets[bIdx].categories[cIdx].committedEscrowAmount);
        budgets[bIdx].categories[cIdx].isOverbudget = budgets[bIdx].categories[cIdx].remainingAmount < 0;

        if (typeof window !== "undefined") {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(budgets));
        }
        return true;
      }
    }
    return false;
  }
}