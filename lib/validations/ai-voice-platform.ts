import { z } from "zod";

export const voiceIntentModeEnum = z.enum([
  "VOICE_SEARCH",
  "NAVIGATION_COMMAND",
  "MEETING_TRANSCRIBE",
  "COPILOT_CONVERSATION",
]);

export const processVoiceAudioSchema = z.object({
  audioPromptText: z.string().min(2, "Sesli komut simülasyon metni gereklidir"),
  mode: voiceIntentModeEnum.default("VOICE_SEARCH"),
  language: z.enum(["tr-TR", "en-US"]).default("tr-TR"),
  enableEmotionDetection: z.boolean().default(true),
});

export const generateMeetingSummarySchema = z.object({
  meetingId: z.string().min(1),
  rawTranscript: z.string().min(10, "Transkript en az 10 karakter olmalıdır"),
});

export type ProcessVoiceAudioInput = z.infer<typeof processVoiceAudioSchema>;
export type GenerateMeetingSummaryInput = z.infer<typeof generateMeetingSummarySchema>;
