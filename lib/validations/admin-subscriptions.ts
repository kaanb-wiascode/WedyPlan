import { z } from "zod";

export const planTierEnum = z.enum(["BASIC", "PRO_BUSINESS", "ENTERPRISE_LUXURY"]);

export const savePlanSchema = z.object({
  planName: z.string().min(2, "Plan adı gereklidir"),
  tier: planTierEnum,
  priceMonthly: z.number().min(0, "Aylık fiyat 0 veya büyük olmalıdır"),
  priceAnnual: z.number().min(0, "Yıllık fiyat 0 veya büyük olmalıdır"),
  commissionPercentage: z.number().min(0).max(50).default(5),
  aiCreditsLimit: z.number().min(100),
  leadCreditsLimit: z.number().min(5),
  storageGbLimit: z.number().min(10),
});

export const generateCouponSchema = z.object({
  code: z.string().min(4, "Kupon kodu en az 4 karakter olmalıdır"),
  discountPercentage: z.number().min(1).max(100),
  maxUses: z.number().min(1).default(100),
  validUntil: z.string().min(1, "Geçerlilik tarihi gereklidir"),
});

export const processRefundSchema = z.object({
  invoiceNumber: z.string().min(1, "Fatura numarası gereklidir"),
  refundAmount: z.number().min(1),
  reason: z.string().min(5, "İade gerekçesi belirtilmelidir"),
});

export type SavePlanInput = z.infer<typeof savePlanSchema>;
export type GenerateCouponInput = z.infer<typeof generateCouponSchema>;
export type ProcessRefundInput = z.infer<typeof processRefundSchema>;
