import { z } from "zod";

export const memoryTypeEnum = z.enum([
  "COUPLE_MEMORY",
  "VENDOR_MEMORY",
  "ADMIN_MEMORY",
  "CONVERSATION_MEMORY",
  "BUSINESS_MEMORY",
  "PREFERENCE_MEMORY",
]);

export const storeMemorySchema = z.object({
  entityId: z.string().min(1, "Varlık ID gereklidir"),
  memoryType: memoryTypeEnum,
  memoryText: z.string().min(3, "Bellek içeriği en az 3 karakter olmalıdır"),
  importanceScore: z.number().min(0).max(100).default(50),
  ttlDays: z.number().optional().default(365),
});

export const recallContextSchema = z.object({
  entityId: z.string().min(1, "Varlık ID gereklidir"),
  queryPrompt: z.string().min(1, "Sorgu metni gereklidir"),
  topK: z.number().min(1).max(20).default(5),
  minImportanceScore: z.number().min(0).max(100).default(30),
});

export const purgeMemorySchema = z.object({
  entityId: z.string().min(1, "Varlık ID gereklidir"),
  reason: z.string().min(5, "Temizleme gerekçesi açıklanmalıdır"),
});

export type StoreMemoryInput = z.infer<typeof storeMemorySchema>;
export type RecallContextInput = z.infer<typeof recallContextSchema>;
export type PurgeMemoryInput = z.infer<typeof purgeMemorySchema>;
