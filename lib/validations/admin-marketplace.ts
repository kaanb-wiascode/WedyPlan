import { z } from "zod";

export const categoryStatusEnum = z.enum(["ACTIVE", "HIDDEN"]);

export const saveCategorySchema = z.object({
  name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır"),
  slug: z.string().min(2, "URL Slug alanı gereklidir"),
  icon: z.string().default("🏰"),
  defaultCommissionPercentage: z.number().min(0).max(50).default(5),
  minPriceCap: z.number().min(0).default(0),
  status: categoryStatusEnum.default("ACTIVE"),
});

export const toggleFeaturedSchema = z.object({
  listingId: z.string().min(1, "İlan ID gereklidir"),
  isFeatured: z.boolean(),
  positionIndex: z.number().min(1).default(1),
});

export type SaveCategoryInput = z.infer<typeof saveCategorySchema>;
export type ToggleFeaturedInput = z.infer<typeof toggleFeaturedSchema>;
