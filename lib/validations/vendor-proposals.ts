import { z } from "zod";

export const proposalItemSchema = z.object({
  title: z.string().min(2, "Hizmet başlığı gereklidir"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Miktar en az 1 olmalıdır"),
  unitPrice: z.number().min(0, "Birim fiyat negatif olamaz"),
});

export const paymentStepSchema = z.object({
  title: z.string().min(2, "Milat başlığı gereklidir"),
  percentage: z.number().min(1).max(100),
  dueDate: z.string().min(1, "Vade tarihi gereklidir"),
});

export const createProposalSchema = z.object({
  leadId: z.string().min(1, "Lütfen bir talep/müşteri seçiniz"),
  coupleName: z.string().min(2, "Çift ismi gereklidir"),
  title: z.string().min(3, "Teklif başlığı gereklidir"),
  expirationDate: z.string().min(1, "Son geçerlilik tarihi girilmelidir"),
  discountAmount: z.number().default(0),
  taxRatePercentage: z.number().default(20),
  items: z.array(proposalItemSchema).min(1, "En az bir hizmet kalemi eklenmelidir"),
  paymentPlan: z.array(paymentStepSchema).optional(),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;
