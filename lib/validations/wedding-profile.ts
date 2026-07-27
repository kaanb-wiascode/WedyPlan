import { z } from "zod";

export const weddingProfileSchema = z.object({
  title: z.string().min(2, "Başlık en az 2 karakter olmalıdır"),
  weddingDate: z.string().min(1, "Düğün tarihi seçiniz"),
  weddingCity: z.string().min(2, "Şehir seçiniz"),
  brideGroomName: z.string().min(2, "İsminiz en az 2 karakter olmalıdır"),
  partnerName: z.string().min(2, "Partner adı en az 2 karakter olmalıdır"),
  partnerEmail: z.string().email("Geçerli bir e-posta giriniz").optional().or(z.literal("")),
  weddingStory: z.string().optional(),
  weddingTheme: z.string().min(1, "Tema seçiniz"),
  colorPalette: z.array(z.string()).min(1, "En az bir renk seçiniz"),
  dressCode: z.string().min(1, "Kıyafet kodu seçiniz"),
  venuePreferences: z.array(z.string()).min(1, "Mekan tercihi seçiniz"),
  culture: z.string().optional(),
  traditions: z.array(z.string()).optional(),
  languages: z.array(z.string()).min(1, "Dil seçiniz"),
  familyNotes: z.string().optional(),
  isPrivateProfile: z.boolean().default(false),
  passcodeProtection: z.string().optional(),
});

export type WeddingProfileFormData = z.infer<typeof weddingProfileSchema>;