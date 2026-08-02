import { z } from "zod";

// Paket Özellik (Feature) Şeması
export const PackageFeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  included: z.boolean().default(true),
});

// Ana Paket Şeması
export const PackageSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Paket adı gereklidir"),
  description: z.string(),
  price: z.number().min(0, "Fiyat 0'dan küçük olamaz"),
  currency: z.string().default("TRY"),
  minGuests: z.number(),
  maxGuests: z.number(),
  isPopular: z.boolean().default(false),
  features: z.array(PackageFeatureSchema),
  
  // AI Dinamik Fiyatlandırma Metrikleri
  aiSuggestedPrice: z.number().optional(), 
  aiReason: z.string().optional(),
});

export type PackageFeature = z.infer<typeof PackageFeatureSchema>;
export type PackageFormValues = z.infer<typeof PackageSchema>;