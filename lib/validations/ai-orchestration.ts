import { z } from "zod";

export const providerEnum = z.enum(["OPENAI", "GEMINI", "ANTHROPIC", "AZURE_OPENAI", "SELF_HOSTED"]);
export const taskTypeEnum = z.enum(["WEDDING_PLANNING", "CONTRACT_ANALYSIS", "VISION_INSPECTION", "TRANSLATION", "FAST_SUMMARY"]);

export const aiRequestSchema = z.object({
  taskType: taskTypeEnum,
  prompt: z.string().min(1, "Prompt boş olamaz"),
  callerPortal: z.enum(["COUPLE", "VENDOR", "ADMIN", "PUBLIC"]).default("COUPLE"),
  maxTokens: z.number().optional().default(1000),
  temperature: z.number().min(0).max(2).default(0.7),
});

export const updateProviderConfigSchema = z.object({
  provider: providerEnum,
  priorityOrder: z.number().min(1).max(10),
  isActive: z.boolean(),
  maxLatencyBudgetMs: z.number().min(100).max(30000).default(3000),
});

export type AIRequestInput = z.infer<typeof aiRequestSchema>;
export type UpdateProviderConfigInput = z.infer<typeof updateProviderConfigSchema>;
