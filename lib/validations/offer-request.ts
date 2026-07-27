import { z } from "zod";

export const offerRequestSchema = z.object({
  category: z.string().min(1, "Lütfen bir kategori seçiniz"),
  title: z.string().min(3, "Teklif başlığı en az 3 karakter olmalıdır"),
  weddingDate: z.string().min(1, "Etkinlik tarihi seçiniz"),
  location: z.string().min(2, "Konum / Şehir giriniz"),
  guestCount: z.number().min(1, "Kişi sayısı giriniz"),
  budgetRange: z.string().min(1, "Bütçe aralığı seçiniz"),
  stylePreference: z.string().optional(),
  userNotes: z.string().min(10, "Lütfen talebinizi detaylandırın"),
  aiEnhancedNotes: z.string().optional(),
  selectedVendorIds: z.array(z.string()).min(1, "En az bir tedarikçi seçiniz"),
});

export type OfferRequestFormData = z.infer<typeof offerRequestSchema>;
