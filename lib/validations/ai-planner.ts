import { z } from "zod";

export const aiChatMessageSchema = z.object({
  id: z.string(),
  sender: z.enum(["user", "ai"]),
  content: z.string().min(1),
  timestamp: z.string(),
  intent: z
    .enum(["GENERAL", "TIMELINE", "BUDGET_OPTIMIZE", "RISK_CHECK", "VENDOR_MATCH", "MOODBOARD", "CHECKLIST"])
    .optional(),
  payload: z.any().optional(),
});

export const aiPromptRequestSchema = z.object({
  message: z.string().min(1, "Mesaj boş olamaz"),
  userId: z.string(),
  intent: z.string().optional(),
});

export type AIChatMessage = z.infer<typeof aiChatMessageSchema>;
export type AIPromptRequest = z.infer<typeof aiPromptRequestSchema>;
