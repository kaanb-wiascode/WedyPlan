import { z } from "zod";

export const OrganizationTypeEnum = z.enum([
  "DUGUN",
  "NISAN",
  "KINA",
  "SOZ",
  "SUNNET",
  "BABY_SHOWER",
  "DOGUM_GUNU",
  "DIGER",
]);

// Çift Kayıt Şeması
export const CoupleRegisterSchema = z.object({
  brideFirstName: z.string().min(2, "Gelin adı en az 2 karakter olmalıdır"),
  brideLastName: z.string().min(2, "Gelin soyadı en az 2 karakter olmalıdır"),
  groomFirstName: z.string().min(2, "Damat adı en az 2 karakter olmalıdır"),
  groomLastName: z.string().min(2, "Damat soyadı en az 2 karakter olmalıdır"),
  weddingDate: z.string().min(1, "Düğün tarihi seçiniz"),
  organizationType: OrganizationTypeEnum,
  organizationDate: z.string().min(1, "Organizasyon tarihi seçiniz"),
  guestCount: z.coerce.number().min(1, "Lütfen kişi sayısını giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  address: z.string().min(5, "Lütfen adres detaylarını giriniz"),
});

export type CoupleRegisterInput = z.infer<typeof CoupleRegisterSchema>;

// Onboarding Action'larının beklediği tam şema ve tipler
export const fullOnboardingSchema = CoupleRegisterSchema.extend({
  // İhtiyaç halinde ek onboarding adımları buraya eklenebilir
  partnerEmail: z.string().email().optional(),
  budget: z.coerce.number().optional(),
});

export type OnboardingFormData = z.infer<typeof fullOnboardingSchema>;