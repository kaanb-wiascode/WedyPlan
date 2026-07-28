import { z } from "zod";

export const vendorCategoryEnum = z.enum([
  "VENUE",
  "CATERING",
  "PHOTOGRAPHY",
  "DECORATION",
  "MUSIC_DJ",
]);

export const currencyEnum = z.enum(["TRY", "USD", "EUR"]);

export const predictOptimalPriceSchema = z.object({
  basePrice: z.number().min(100, "Baz fiyat en az 100 olmalıdır"),
  currency: currencyEnum.default("TRY"),
  category: vendorCategoryEnum.default("VENUE"),
  month: z.number().min(1).max(12).default(6),
  occupancyRatePct: z.number().min(0).max(100).default(65),
  competitorAvgPrice: z.number().optional(),
  leadQualityScore: z.number().min(1).max(100).default(80),
});

export const generateCampaignSchema = z.object({
  category: vendorCategoryEnum,
  targetMonth: z.number().min(1).max(12),
  currentOccupancyPct: z.number().min(0).max(100),
});

export type PredictOptimalPriceInput = z.infer<typeof predictOptimalPriceSchema>;
export type GenerateCampaignInput = z.infer<typeof generateCampaignSchema>;
