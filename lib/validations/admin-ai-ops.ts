import { z } from "zod";

export const providerEnum = z.enum(["OPENAI", "GEMINI", "CLAUDE", "AZURE_OPENAI", "OPEN_SOURCE"]);

export const toggleProviderSchema = z.object({
  provider: providerEnum,
  isActive: z.boolean(),
  isFallback: z.boolean().default(false),
});

export const savePromptSchema = z.object({
  slug: z.string().min(2, "Prompt slug gereklidir"),
  title: z.string().min(3, "Prompt başlığı en az 3 karakter olmalıdır"),
  systemPrompt: z.string().min(10, "Sistem talimatı en az 10 karakter olmalıdır"),
  temperature: z.number().min(0.0).max(1.0).default(0.7),
  maxTokens: z.number().min(100).max(16000).default(2000),
  targetModel: z.string().default("gpt-4o"),
});

export type ToggleProviderInput = z.infer<typeof toggleProviderSchema>;
export type SavePromptInput = z.infer<typeof savePromptSchema>;
