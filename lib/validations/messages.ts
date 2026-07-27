import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1, "Sohbet ID gereklidir"),
  content: z.string().min(1, "Mesaj boş olamaz"),
  attachmentUrl: z.string().optional(),
  attachmentType: z.enum(["IMAGE", "DOCUMENT", "VOICE"]).optional(),
});

export const translateMessageSchema = z.object({
  messageId: z.string().min(1),
  targetLanguage: z.enum(["TR", "EN", "DE", "FR"]).default("TR"),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type TranslateMessageInput = z.infer<typeof translateMessageSchema>;
