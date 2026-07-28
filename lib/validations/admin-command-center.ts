import { z } from "zod";

export const quickActionTypeEnum = z.enum([
  "APPROVE_VENDOR",
  "SUSPEND_ACCOUNT",
  "LAUNCH_CAMPAIGN",
  "TRIGGER_AUTOMATION",
  "SEND_ANNOUNCEMENT",
  "REVIEW_INCIDENT",
  "MANAGE_RELEASE",
  "RUN_REPORT",
]);

export const universalCommandSchema = z.object({
  query: z.string().min(2, "Komut metni gereklidir"),
  isVoiceInput: z.boolean().default(false),
});

export const executeExecutiveActionSchema = z.object({
  actionType: quickActionTypeEnum,
  targetId: z.string().optional(),
  payload: z.record(z.string(), z.any()).optional(),
  confirmationCode: z.string().optional(),
});

export type UniversalCommandInput = z.infer<typeof universalCommandSchema>;
export type ExecuteExecutiveActionInput = z.infer<typeof executeExecutiveActionSchema>;
