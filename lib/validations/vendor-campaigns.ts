import { z } from "zod";

export const campaignTypeEnum = z.enum([
  "DISCOUNT",
  "PACKAGE",
  "COUPON",
  "SEASONAL",
  "EARLY_BOOKING",
  "LAST_MINUTE",
  "REFERRAL",
  "BUNDLE",
]);

export const createCampaignSchema = z.object({
  title: z.string().min(3, "Kampanya başlığı gereklidir"),
  type: campaignTypeEnum,
  discountPercentage: z.number().min(1).max(100),
  couponCode: z.string().optional(),
  startDate: z.string().min(1, "Başlangıç tarihi gereklidir"),
  endDate: z.string().min(1, "Bitiş tarihi gereklidir"),
  budget: z.number().min(0, "Bütçe negatif olamaz"),
  targetAudience: z.string().default("TÜM_ÇİFTLER"),
  marketingCopy: z.string().optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
