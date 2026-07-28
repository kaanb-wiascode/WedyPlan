import { z } from "zod";

export const vendorOnboardingSchema = z.object({
  businessName: z.string().min(2, "İşletme adı en az 2 karakter olmalıdır"),
  category: z.string().min(1, "Lütfen bir ana kategori seçiniz"),
  subCategories: z.array(z.string()).min(1, "En az bir alt kategori seçiniz"),
  companyType: z.enum(["LIMITED", "ANONIM", "SOLE_PROPRIETORSHIP"]).default("LIMITED"),
  taxOffice: z.string().min(2, "Vergi dairesi belirtiniz"),
  taxNumber: z.string().min(10, "Vergi numarası geçerli olmalıdır"),
  authorizedPerson: z.string().min(2, "Yetkili kişi adı gereklidir"),
  city: z.string().min(2, "Şehir seçiniz"),
  district: z.string().min(2, "İlçe seçiniz"),
  address: z.string().min(5, "Açık adres giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  website: z.string().optional(),
  instagram: z.string().optional(),
  whatsapp: z.string().optional(),
  priceRange: z.string().min(1, "Fiyat aralığı seçiniz"),
  capacity: z.number().optional(),
  yearsOfExperience: z.number().min(0, "Deneyim yılı giriniz"),
  description: z.string().min(20, "İşletme açıklaması en az 20 karakter olmalıdır"),
  aiEnhancedDescription: z.string().optional(),
  logoUrl: z.string().optional(),
  coverUrl: z.string().optional(),
});

export type VendorOnboardingFormData = z.infer<typeof vendorOnboardingSchema>;
