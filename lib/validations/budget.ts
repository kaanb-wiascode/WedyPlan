import { z } from "zod";

export const addExpenseSchema = z.object({
  title: z.string().min(2, "Harcama adı en az 2 karakter olmalıdır"),
  categoryId: z.string().min(1, "Kategori seçiniz"),
  amount: z.number().positive("Tutar 0'dan büyük olmalıdır"),
  estimatedAmount: z.number().optional(),
  currency: z.enum(["TRY", "USD", "EUR", "GBP"]).default("TRY"),
  taxAmount: z.number().nonnegative().optional(),
  receiptUrl: z.string().url().optional().or(z.literal("")),
  vendorName: z.string().optional(),
  isInstallment: z.boolean().default(false),
  installmentCount: z.number().min(1).max(24).optional(),
  requiresPartnerApproval: z.boolean().default(false),
});

export const updateBudgetGoalSchema = z.object({
  totalBudget: z.number().positive("Toplam bütçe pozitif olmalıdır"),
  emergencyFundPercentage: z.number().min(0).max(30).default(10),
  currency: z.enum(["TRY", "USD", "EUR", "GBP"]).default("TRY"),
});

export type AddExpenseFormData = z.infer<typeof addExpenseSchema>;
export type UpdateBudgetGoalData = z.infer<typeof updateBudgetGoalSchema>;
