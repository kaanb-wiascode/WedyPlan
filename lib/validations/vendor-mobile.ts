import { z } from "zod";

export const mobileQuickActionSchema = z.object({
  actionType: z.enum(["QUICK_REPLY", "COMPLETE_TASK", "VOICE_NOTE", "CAMERA_UPLOAD"]),
  targetId: z.string().optional(),
  payloadText: z.string().optional(),
});

export const processVoiceNoteSchema = z.object({
  audioBase64: z.string().optional(),
  transcriptText: z.string().min(2, "Sesli not boş olamaz"),
  relatedLeadId: z.string().optional(),
});

export type MobileQuickActionInput = z.infer<typeof mobileQuickActionSchema>;
export type ProcessVoiceNoteInput = z.infer<typeof processVoiceNoteSchema>;
