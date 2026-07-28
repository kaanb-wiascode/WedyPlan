import { z } from "zod";

export const vectorSourceEnum = z.enum([
  "DOCUMENT",
  "CONTRACT",
  "PORTFOLIO",
  "KNOWLEDGE_BASE",
  "BLOG",
  "VENDOR_PROFILE",
]);

export const vectorSearchSchema = z.object({
  queryText: z.string().min(2, "Arama sorgusu en az 2 karakter olmalıdır"),
  sourceType: vectorSourceEnum.optional(),
  topK: z.number().min(1).max(50).default(5),
  minSimilarityScore: z.number().min(0).max(1).default(0.75),
});

export const indexDocumentSchema = z.object({
  sourceId: z.string().min(1, "Kaynak ID gereklidir"),
  sourceType: vectorSourceEnum,
  rawContent: z.string().min(10, "İndekslenecek metin en az 10 karakter olmalıdır"),
  chunkSize: z.number().default(512),
  chunkOverlap: z.number().default(50),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type VectorSearchInput = z.infer<typeof vectorSearchSchema>;
export type IndexDocumentInput = z.infer<typeof indexDocumentSchema>;
