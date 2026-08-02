import { z } from "zod";

// Salon / Davet Alanı Şeması
export const SpaceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Salon adı gereklidir"), // Örn: Karina Balo Salonu
  type: z.enum(["KAPALI_SALON", "AÇIK_HAVA", "HAVUZ_BAŞI", "RESTORAN"]),
  capacityYemekliMin: z.number().min(0),
  capacityYemekliMax: z.number().min(1),
  capacityKokteylMax: z.number().optional(),
  ceilingHeight: z.number().optional(), // Örn: 6.2 metre
  features: z.array(z.string()), // ["Kolonsuz", "Deniz Manzaralı", "Açılır Tavan"]
  images: z.array(z.string()), // Salona ait görseller
});

// Ana Profil Şeması
export const VendorProfileSchema = z.object({
  // 1. Kimlik & Temel Bilgiler
  title: z.string().min(3, "Firma adı en az 3 karakter olmalıdır"),
  category: z.string(),
  city: z.string(),
  district: z.string(),
  address: z.string(),
  geoLat: z.number().optional(),
  geoLng: z.number().optional(),
  bio: z.string().min(20, "Detaylı bir tanıtım yazısı giriniz"),
  
  // Vitrin Fiyatları
  minPriceWeekday: z.number(),
  minPriceWeekend: z.number(),
  currency: z.enum(["TRY", "EUR", "USD"]).default("TRY"),

  // 2. Davet Alanları (Array)
  spaces: z.array(SpaceSchema),

  // 3. Hizmet & Paket Özellikleri
  features: z.array(z.string()), // ["Gelin Odası", "Vale", "Menü Tadımı"]
  cateringTypes: z.array(z.string()), // ["Kırmızı Et", "Beyaz Et", "Vegan"]
  alcoholService: z.boolean().default(false),
  outsideVendorAllowed: z.boolean().default(true), // Dışarıdan fotoğrafçı/organizasyon izni

  // 4. Medya & Vitrin
  coverImage: z.string().url("Geçerli bir kapak görseli giriniz"),
  promoVideoUrl: z.string().optional(),
  gallery: z.array(z.object({
    url: z.string(),
    tag: z.string().optional(), // "Masa Düzenlemeleri", "Gelin Yolu" vb.
    isFeatured: z.boolean().default(false)
  })),
});

export type VendorProfileFormValues = z.infer<typeof VendorProfileSchema>;