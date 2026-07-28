import { z } from "zod";

export const mediaTypeEnum = z.enum(["IMAGE", "VIDEO", "BEFORE_AFTER"]);

export const uploadMediaSchema = z.object({
  title: z.string().min(2, "Medya başlığı gereklidir"),
  type: mediaTypeEnum.default("IMAGE"),
  url: z.string().min(1, "Medya adresi gereklidir"),
  albumId: z.string().optional(),
  category: z.string().min(1, "Kategori seçilmelidir"),
  tags: z.array(z.string()).optional(),
  altText: z.string().optional(),
  isFeatured: z.boolean().default(false),
  watermarkEnabled: z.boolean().default(true),
});

export const createAlbumSchema = z.object({
  name: z.string().min(2, "Albüm adı gereklidir"),
  category: z.string().min(1, "Kategori seçiniz"),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export type UploadMediaInput = z.infer<typeof uploadMediaSchema>;
export type CreateAlbumInput = z.infer<typeof createAlbumSchema>;
