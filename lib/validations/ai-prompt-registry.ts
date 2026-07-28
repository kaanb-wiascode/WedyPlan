import { z } from "zod";

export const promptCategoryEnum = z.enum(["WEDDING_PLANNING", "CONTRACTS", "MATCHMAKING", "MODERATION", "TRANSLATION"]);
export const promptStatusEnum = z.enum(["DRAFT", "PENDING_APPROVAL", "PUBLISHED", "DEPRECATED"]);

export const savePromptVersionSchema = z.object({
  promptKey: z.string().min(3, "Prompt anahtarı gereklidir"),
  category: promptCategoryEnum.default("WEDDING_PLANNING"),
  versionTag: z.string().min(2, "Sürüm etiketi zorunludur (Örn: v1.1.0)"),
  systemPrompt: z.string().min(10, "Sistem prompt'u en az 10 karakter olmalıdır"),
  userPromptTemplate: z.string().min(5, "Kullanıcı şablonu gereklidir"),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().default(1000),
});

export const publishPromptSchema = z.object({
  promptKey: z.string().min(1, "Prompt anahtarı gereklidir"),
  versionTag: z.string().min(1, "Sürüm etiketi gereklidir"),
});

export const optimizePromptSchema = z.object({
  rawPrompt: z.string().min(10, "Optimize edilecek metin gereklidir"),
  targetGoal: z.string().optional(),
});

export type SavePromptVersionInput = z.infer<typeof savePromptVersionSchema>;
export type PublishPromptInput = z.infer<typeof publishPromptSchema>;
export type OptimizePromptInput = z.infer<typeof optimizePromptSchema>;
