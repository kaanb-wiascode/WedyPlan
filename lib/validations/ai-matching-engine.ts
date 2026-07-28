import { z } from "zod";

export const vendorCategoryEnum = z.enum(["VENUE", "PHOTOGRAPHY", "CATERING", "MUSIC", "ORGANIZATION", "DRESS"]);

export const matchVendorsSchema = z.object({
  coupleId: z.string().min(1, "Çift ID gereklidir"),
  category: vendorCategoryEnum.default("VENUE"),
  targetCity: z.string().default("Bodrum"),
  maxBudget: z.number().min(5000).default(750000),
  weddingDate: z.string().optional(),
  preferredStyle: z.string().optional().default("BOHO_LUXURY"),
  topK: z.number().min(1).max(20).default(5),
});

export const updateWeightMatrixSchema = z.object({
  category: vendorCategoryEnum,
  budgetWeightPct: z.number().min(0).max(100).default(20),
  styleWeightPct: z.number().min(0).max(100).default(20),
  locationWeightPct: z.number().min(0).max(100).default(15),
  responseTimeWeightPct: z.number().min(0).max(100).default(15),
  qualityWeightPct: z.number().min(0).max(100).default(30),
});

export type MatchVendorsInput = z.infer<typeof matchVendorsSchema>;
export type UpdateWeightMatrixInput = z.infer<typeof updateWeightMatrixSchema>;
