import { z } from "zod";

export const aiToneEnum = z.enum([
  "LUXURY_FORMAL",
  "WARM_FRIENDLY",
  "DIRECT_EXECUTIVE",
  "CREATIVE_CASUAL",
]);

export const currencyEnum = z.enum(["TRY", "EUR", "USD", "GBP"]);

export const updateCompanySchema = z.object({
  companyName: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır"),
  taxOffice: z.string().min(2, "Vergi dairesi gereklidir"),
  taxNumber: z.string().min(10, "Geçerli bir vergi numarası giriniz"),
  brandColor: z.string().default("#4F46E5"),
  primaryLanguage: z.string().default("TR"),
});

export const updateAIPrioritiesSchema = z.object({
  tone: aiToneEnum,
  autoReplyEnabled: z.boolean(),
  autoFollowUpDays: z.number().min(1).max(30),
  smartRulesEnabled: z.boolean(),
});

export const updateRegionalTaxSchema = z.object({
  defaultCurrency: currencyEnum,
  vatRatePercentage: z.number().min(0).max(100),
  timezone: z.string().default("Europe/Istanbul"),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type UpdateAIPrioritiesInput = z.infer<typeof updateAIPrioritiesSchema>;
export type UpdateRegionalTaxInput = z.infer<typeof updateRegionalTaxSchema>;
