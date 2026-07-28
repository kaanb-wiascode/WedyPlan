import { z } from "zod";

export const searchModeEnum = z.enum([
  "SEMANTIC_VECTOR",
  "HYBRID_RANKING",
  "GEO_INTENT",
  "EXACT_KEYWORD",
]);

export const executeSemanticSearchSchema = z.object({
  query: z.string().min(2, "Arama sorgusu en az 2 karakter olmalıdır"),
  mode: searchModeEnum.default("HYBRID_RANKING"),
  userLocation: z.string().optional(),
  budgetScope: z.number().optional(),
  guestCount: z.number().optional(),
});

export const detectTrendingSearchesSchema = z.object({
  timeframeDays: z.number().min(1).max(30).default(7),
  includeZeroResultQueries: z.boolean().default(true),
});

export type ExecuteSemanticSearchInput = z.infer<typeof executeSemanticSearchSchema>;
export type DetectTrendingSearchesInput = z.infer<typeof detectTrendingSearchesSchema>;
