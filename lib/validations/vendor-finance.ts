import { z } from "zod";

export const expenseCategoryEnum = z.enum([
  "VENDOR_COST",
  "EMPLOYEE_COST",
  "TAX",
  "COMMISSION",
  "RECURRING",
  "OTHER",
]);

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE", "REFUND"]);

export const createExpenseSchema = z.object({
  title: z.string().min(2, "İşlem açıklaması gereklidir"),
  amount: z.number().min(1, "Tutar 0'dan büyük olmalıdır"),
  type: transactionTypeEnum,
  category: expenseCategoryEnum,
  dueDate: z.string().min(1, "Vade/Tarih girilmelidir"),
  invoiceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
