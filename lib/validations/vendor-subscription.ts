import { z } from "zod";

export const planTierEnum = z.enum(["BASIC", "PRO_BUSINESS", "ENTERPRISE_LUXURY"]);
export const billingCycleEnum = z.enum(["MONTHLY", "ANNUAL"]);

export const upgradePlanSchema = z.object({
  targetPlan: planTierEnum,
  billingCycle: billingCycleEnum,
  paymentMethodId: z.string().min(1, "Lütfen bir ödeme yöntemi seçiniz"),
});

export const buyCreditsSchema = z.object({
  addonType: z.enum(["AI_CREDITS", "LEAD_CREDITS", "STORAGE_GB"]),
  quantity: z.number().min(1, "Miktar en az 1 olmalıdır"),
});

export type UpgradePlanInput = z.infer<typeof upgradePlanSchema>;
export type BuyCreditsInput = z.infer<typeof buyCreditsSchema>;
