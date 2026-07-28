import { z } from "zod";

export const partnerTypeEnum = z.enum([
  "AFFILIATE",
  "AGENCY",
  "WEDDING_PLANNER",
  "INFLUENCER",
  "RESELLER",
  "TECH_PARTNER",
  "ENTERPRISE_PARTNER",
]);

export const partnerStatusEnum = z.enum(["PENDING_APPROVAL", "ACTIVE", "SUSPENDED", "REJECTED"]);

export const approvePartnerSchema = z.object({
  partnerId: z.string().min(1, "Ortak ID gereklidir"),
  commissionRate: z.number().min(1).max(50).default(10),
  customCouponCode: z.string().optional(),
  assignedTier: z.enum(["BRONZE", "SILVER", "GOLD", "PLATINUM_VIP"]).default("GOLD"),
});

export const processPayoutSchema = z.object({
  partnerId: z.string().min(1, "Ortak ID gereklidir"),
  payoutAmount: z.number().min(100, "Minimum ödeme tutarı 100 ₺'dir"),
  taxDeductionRate: z.number().min(0).max(30).default(20),
  notes: z.string().optional(),
});

export type ApprovePartnerInput = z.infer<typeof approvePartnerSchema>;
export type ProcessPayoutInput = z.infer<typeof processPayoutSchema>;
