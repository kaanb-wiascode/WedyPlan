import { z } from "zod";

export const websiteSettingsSchema = z.object({
  slug: z.string().min(3, "Web site adresi en az 3 karakter olmalıdır"),
  themeId: z.string().default("theme_boho_luxe"),
  coupleNames: z.string().min(3, "Çift isimleri belirtilmelidir"),
  weddingDate: z.string().min(1, "Düğün tarihi seçilmelidir"),
  venueLocation: z.string().min(2, "Mekan ve şehir giriniz"),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  storyTitle: z.string().optional(),
  storyContent: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const generateStorySchema = z.object({
  howWeMet: z.string().min(5, "Lütfen tanışma hikayenizden kısaca bahsedin"),
  proposalDetails: z.string().optional(),
  tone: z.enum(["ROMANTIC", "HUMOROUS", "ELEGANT", "MINIMAL"]).default("ROMANTIC"),
});

export type WebsiteSettingsInput = z.infer<typeof websiteSettingsSchema>;
export type GenerateStoryInput = z.infer<typeof generateStorySchema>;
