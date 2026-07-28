import { z } from "zod";

export const listingStatusEnum = z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]);

export const createListingSchema = z.object({
  title: z.string().min(3, "Hizmet/İlan başlığı en az 3 karakter olmalıdır"),
  category: z.string().min(1, "Lütfen bir ana kategori seçiniz"),
  subCategory: z.string().min(1, "Alt kategori seçiniz"),
  basePrice: z.number().min(1, "Taban fiyat 0'dan büyük olmalıdır"),
  status: listingStatusEnum.default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  isPremium: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  description: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
