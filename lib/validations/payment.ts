import { z } from "zod";

export const paymentSchema = z.object({
  title: z.string().min(3, "Ödeme başlığı en az 3 karakter olmalıdır"),
  vendorName: z.string().min(2, "Tedarikçi adı gereklidir"),
  amount: z.number().positive("Tutar 0'dan büyük olmalıdır"),
  currency: z.enum(["TRY", "USD", "EUR", "GBP"]).default("TRY"),
  dueDate: z.string().min(1, "Vade tarihi seçilmelidir"),
  category: z.string().min(1, "Kategori seçiniz"),
  isInstallment: z.boolean().default(false),
  installmentNumber: z.number().optional(),
  totalInstallments: z.number().optional(),
  notes: z.string().optional(),
});

export const recordPaymentSchema = z.object({
  paymentId: z.string().min(1, "Ödeme ID gereklidir"),
  paidAmount: z.number().positive(),
  paymentMethod: z.enum(["CREDIT_CARD", "BANK_TRANSFER", "CASH"]).default("BANK_TRANSFER"),
  transactionId: z.string().optional(),
  receiptUrl: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;
