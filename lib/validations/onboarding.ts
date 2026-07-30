import { z } from "zod";

// Çift Onboarding Şeması (OnboardingWizard'daki tüm alanları kapsar)
export const OnboardingFormSchema = z.object({
  relationshipStatus: z.string().optional(),
  partnerName: z.string().optional(),
  partnerEmail: z.string().email().optional().or(z.literal("")),
  brideFirstName: z.string().optional(),
  brideLastName: z.string().optional(),
  groomFirstName: z.string().optional(),
  groomLastName: z.string().optional(),
  weddingDate: z.string().optional(),
  weddingCity: z.string().optional(),
  languages: z.array(z.string()).default(["TR"]),
  estimatedGuestCount: z.number().default(150),
  estimatedBudget: z.number().default(250000),
  style: z.string().optional(),
  notes: z.string().optional(),
}).passthrough(); // passthrough: Gelecekte gelebilecek ekstra objelere izin verir

export type OnboardingFormData = z.infer<typeof OnboardingFormSchema>;

// Çift Kayıt Şeması (CoupleRegisterSchema)
export const CoupleRegisterSchema = z.object({
  brideFirstName: z.string().min(1, "Gelin adı gereklidir"),
  brideLastName: z.string().min(1, "Gelin soyadı gereklidir"),
  groomFirstName: z.string().min(1, "Damat adı gereklidir"),
  groomLastName: z.string().min(1, "Damat soyadı gereklidir"),
  weddingDate: z.string().min(1, "Düğün tarihi gereklidir"),
  organizationType: z.string().min(1, "Organizasyon türü gereklidir"),
  organizationDate: z.string().min(1, "Organizasyon tarihi gereklidir"),
  guestCount: z.number().min(1, "Kişi sayısı gereklidir"),
  phone: z.string().min(1, "Telefon gereklidir"),
  email: z.string().email("Geçerli bir e-posta giriniz"),
  address: z.string().min(1, "Adres gereklidir"),
});

export type CoupleRegisterInput = z.infer<typeof CoupleRegisterSchema>;