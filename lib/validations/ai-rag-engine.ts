import { z } from "zod";

export const ragCallerPortalEnum = z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]);

export const executeRAGQuerySchema = z.object({
  userQuery: z.string().min(2, "Sorgu metni gereklidir"),
  callerPortal: ragCallerPortalEnum.default("COUPLE"),
  topK: z.number().min(1).max(20).default(5),
  enableHybridSearch: z.boolean().default(true),
  minSimilarityScore: z.number().min(0).max(1).default(0.75),
});

export const updateRAGConfigSchema = z.object({
  pipelineId: z.string().min(1, "Boru hattı ID gereklidir"),
  vectorSearchWeight: z.number().min(0).max(1).default(0.7),
  bm25SearchWeight: z.number().min(0).max(1).default(0.3),
  maxContextTokens: z.number().default(4000),
});

export type ExecuteRAGQueryInput = z.infer<typeof executeRAGQuerySchema>;
export type UpdateRAGConfigInput = z.infer<typeof updateRAGConfigSchema>;
