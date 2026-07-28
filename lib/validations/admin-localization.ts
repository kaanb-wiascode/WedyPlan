import { z } from "zod";

export const supportedLocaleEnum = z.enum(["TR", "EN", "DE", "FR", "ES", "IT", "AR", "RU"]);
export const translationCategoryEnum = z.enum(["STATIC_UI", "EMAIL", "SMS", "PUSH", "BLOG", "MARKETPLACE", "LEGAL_CONTRACT"]);

export const saveTranslationKeySchema = z.object({
  key: z.string().min(2, "Çeviri anahtarı gereklidir"),
  category: translationCategoryEnum.default("STATIC_UI"),
  translations: z.record(z.string(), z.string()),
});

export const batchAITranslateSchema = z.object({
  sourceText: z.string().min(1, "Kaynak metin gereklidir"),
  sourceLocale: supportedLocaleEnum.default("TR"),
  targetLocales: z.array(supportedLocaleEnum),
  context: z.string().optional(),
});

export type SaveTranslationKeyInput = z.infer<typeof saveTranslationKeySchema>;
export type BatchAITranslateInput = z.infer<typeof batchAITranslateSchema>;
