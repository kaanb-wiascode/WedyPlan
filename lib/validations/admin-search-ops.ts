import { z } from "zod";

export const saveSynonymSchema = z.object({
  mainTerm: z.string().min(2, "Ana kelime en az 2 karakter olmalıdır"),
  synonyms: z.array(z.string()).min(1, "En az 1 eş anlamlı kelime gereklidir"),
});

export const updateRankingWeightsSchema = z.object({
  csatWeight: z.number().min(0).max(100),
  responseTimeWeight: z.number().min(0).max(100),
  sponsoredWeight: z.number().min(0).max(100),
  distanceWeight: z.number().min(0).max(100),
});

export const triggerReindexSchema = z.object({
  targetIndex: z.enum(["ALL", "VENDORS", "LISTINGS", "BLOGS"]),
  forceFullReindex: z.boolean().default(false),
});

export type SaveSynonymInput = z.infer<typeof saveSynonymSchema>;
export type UpdateRankingWeightsInput = z.infer<typeof updateRankingWeightsSchema>;
export type TriggerReindexInput = z.infer<typeof triggerReindexSchema>;
