import { z } from "zod";

export const configCategoryEnum = z.enum([
  "GENERAL",
  "BRAND",
  "REGIONAL",
  "COMMUNICATION",
  "STORAGE",
  "PAYMENTS",
  "TAXES",
  "SECURITY",
  "AI_PROVIDERS",
  "SEARCH",
  "MARKETPLACE",
]);

export const updateCategoryConfigSchema = z.object({
  category: configCategoryEnum,
  settings: z.record(z.string(), z.any()),
  changeReason: z.string().min(5, "Lütfen değişiklik gerekçesini açıklayınız"),
  requiresApproval: z.boolean().default(false),
});

export const rollbackConfigSchema = z.object({
  targetVersion: z.string().min(1, "Hedef sürüm numarası gereklidir"),
  reason: z.string().min(5, "Geri alma gerekçesi belirtilmelidir"),
});

export type UpdateCategoryConfigInput = z.infer<typeof updateCategoryConfigSchema>;
export type RollbackConfigInput = z.infer<typeof rollbackConfigSchema>;
