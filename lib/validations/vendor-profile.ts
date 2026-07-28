import { z } from "zod";

export const generalProfileSchema = z.object({
  businessName: z.string().min(2, "İşletme adı gereklidir"),
  slogan: z.string().optional(),
  category: z.string().min(1, "Kategori seçilmelidir"),
  city: z.string().min(2, "Şehir seçilmelidir"),
  district: z.string().min(2, "İlçe seçilmelidir"),
  address: z.string().min(5, "Açık adres giriniz"),
  phone: z.string().min(10, "Geçerli telefon giriniz"),
  email: z.string().email("Geçerli e-posta giriniz"),
  website: z.string().optional(),
  instagram: z.string().optional(),
  story: z.string().min(20, "Hikaye en az 20 karakter olmalıdır"),
});

export const seoProfileSchema = z.object({
  metaTitle: z.string().min(10, "Meta başlığı en az 10 karakter olmalıdır"),
  metaDescription: z.string().min(20, "Meta açıklaması en az 20 karakter olmalıdır"),
  keywords: z.array(z.string()).min(1, "En az bir anahtar kelime ekleyiniz"),
});

export type GeneralProfileInput = z.infer<typeof generalProfileSchema>;
export type SEOProfileInput = z.infer<typeof seoProfileSchema>;
