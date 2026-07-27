import { z } from "zod";

export const onboardingStep1Schema = z.object({
  relationshipStatus: z.enum(["ENGAGED", "PLANNING", "JUST_STARTED"]),
  partnerName: z.string().min(2, "Partner adı en az 2 karakter olmalıdır"),
  partnerEmail: z.string().email("Geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
});

export const onboardingStep2Schema = z.object({
  weddingDate: z.string().min(1, "Düğün tarihi seçiniz"),
  weddingCity: z.string().min(2, "Şehir seçiniz"),
  languages: z.array(z.string()).min(1, "En az bir dil seçiniz"),
});

export const onboardingStep3Schema = z.object({
  estimatedGuestCount: z.number().min(10, "Minimum 10 davetli girmelisiniz"),
  estimatedBudget: z.number().min(1000, "Geçerli bir bütçe giriniz"),
  currency: z.string().default("TRY"),
  planningExperience: z.enum(["BEGINNER", "INTERMEDIATE", "EXPERIENCED"]),
});

export const onboardingStep4Schema = z.object({
  weddingStyle: z.string().min(1, "Düğün stilini seçiniz"),
  weddingTheme: z.string().min(1, "Tema seçiniz"),
  locationType: z.enum(["INDOOR", "OUTDOOR", "HYBRID"]),
  ceremonyType: z.enum(["CIVIL", "RELIGIOUS", "BOTH", "OTHER"]),
});

export const onboardingStep5Schema = z.object({
  preferredVendors: z.array(z.string()).min(1, "En az bir kategori seçiniz"),
});

export const fullOnboardingSchema = onboardingStep1Schema
  .merge(onboardingStep2Schema)
  .merge(onboardingStep3Schema)
  .merge(onboardingStep4Schema)
  .merge(onboardingStep5Schema);

export type OnboardingFormData = z.infer<typeof fullOnboardingSchema>;