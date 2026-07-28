import { z } from "zod";

export const knowledgeSourceEnum = z.enum([
  "VENDOR_DOCS",
  "WEDDING_GUIDES",
  "FAQ",
  "POLICIES",
  "SUPPORT",
  "CONTRACTS",
  "LEGAL_DOCS",
]);

export const knowledgeStatusEnum = z.enum(["DRAFT", "PENDING_APPROVAL", "PUBLISHED", "ARCHIVED"]);

export const saveKnowledgeAssetSchema = z.object({
  assetKey: z.string().min(3, "Bilgi anahtarı gereklidir"),
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  sourceType: knowledgeSourceEnum.default("WEDDING_GUIDES"),
  versionTag: z.string().min(2, "Sürüm etiketi zorunludur (Örn: v1.0)"),
  contentMarkdown: z.string().min(10, "İçerik metni en az 10 karakter olmalıdır"),
  tags: z.array(z.string()).default([]),
});

export const approveKnowledgeSchema = z.object({
  assetId: z.string().min(1, "Bilgi varlığı ID gereklidir"),
  versionTag: z.string().min(1, "Sürüm etiketi gereklidir"),
  autoIndexVector: z.boolean().default(true),
});

export type SaveKnowledgeAssetInput = z.infer<typeof saveKnowledgeAssetSchema>;
export type ApproveKnowledgeInput = z.infer<typeof approveKnowledgeSchema>;
