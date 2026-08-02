import { z } from "zod";

export const PaymentStatusEnum = z.enum([
  "PAID",       // Ödendi
  "PENDING",    // Bekliyor
  "OVERDUE",    // Gecikmede
  "CANCELLED",  // İptal
]);

export const TransactionTypeEnum = z.enum([
  "DEPOSIT",       // Kapora
  "INSTALLMENT",   // Taksit
  "FINAL_PAYMENT"  // Kapanış / Düğün Günü Ödemesi
]);

export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type TransactionType = z.infer<typeof TransactionTypeEnum>;

export const TransactionSchema = z.object({
  id: z.string(),
  coupleName: z.string(),
  leadId: z.string().optional(),
  title: z.string(),
  type: TransactionTypeEnum,
  status: PaymentStatusEnum,
  amount: z.number().min(0),
  currency: z.string().default("EUR"),
  dueDate: z.string(),
  paidDate: z.string().optional(),
  aiRiskScore: z.number().min(0).max(100).default(10), // Gecikme riski %
  aiNotes: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;