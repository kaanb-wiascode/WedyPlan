import { z } from "zod";

export const weddingStyleEnum = z.enum([
  "LUXURY_ELEGANCE",
  "BOHO_CHIC",
  "MODERN_MINIMALIST",
  "RUSTIC_GARDEN",
  "CLASSIC_BALLROOM",
]);

export const currencyEnum = z.enum(["TRY", "USD", "EUR"]);

export const analyzeBudgetSchema = z.object({
  totalBudget: z.number().min(1000, "Bütçe en az 1.000 olmalıdır"),
  currency: currencyEnum.default("TRY"),
  guestCount: z.number().min(10).max(2000).default(150),
  location: z.string().min(2, "Konum gereklidir"),
  weddingStyle: weddingStyleEnum.default("MODERN_MINIMALIST"),
  weddingDate: z.string().min(1, "Düğün tarihi gereklidir"),
});

export const runBudgetSimulationSchema = z.object({
  baseBudget: z.number().min(1000),
  currency: currencyEnum.default("TRY"),
  newGuestCount: z.number().min(10).max(2000),
  targetLocation: z.string(),
  selectedStyle: weddingStyleEnum,
});

export type AnalyzeBudgetInput = z.infer<typeof analyzeBudgetSchema>;
export type RunBudgetSimulationInput = z.infer<typeof runBudgetSimulationSchema>;
