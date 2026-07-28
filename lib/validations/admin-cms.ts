import { z } from "zod";

export const contentTypeEnum = z.enum([
  "BLOG_POST",
  "LANDING_PAGE",
  "FAQ",
  "EMAIL_TEMPLATE",
  "SMS_TEMPLATE",
  "PUSH_NOTIFICATION",
]);

export const contentStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const languageEnum = z.enum(["TR", "EN", "DE", "FR"]);

export const saveContentSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır"),
  type: contentTypeEnum,
  slug: z.string().min(2, "URL Slug gereklidir"),
  body: z.string().min(10, "İçerik metni en az 10 karakter olmalıdır"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  language: languageEnum.default("TR"),
  status: contentStatusEnum.default("PUBLISHED"),
});

export const generateAIContentSchema = z.object({
  promptTopic: z.string().min(3, "Konu başlığı yazılmalıdır"),
  contentType: contentTypeEnum,
  targetLanguage: languageEnum.default("TR"),
});

export const translateContentSchema = z.object({
  sourceText: z.string().min(5),
  targetLanguage: languageEnum,
});

export type SaveContentInput = z.infer<typeof saveContentSchema>;
export type GenerateAIContentInput = z.infer<typeof generateAIContentSchema>;
export type TranslateContentInput = z.infer<typeof translateContentSchema>;
