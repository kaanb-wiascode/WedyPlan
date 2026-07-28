import { z } from "zod";

export const triggerTypeEnum = z.enum([
  "VENDOR_CREATED",
  "VENDOR_APPROVED",
  "COUPLE_REGISTERED",
  "SUBSCRIPTION_RENEWED",
  "PAYMENT_FAILED",
  "REVIEW_SUBMITTED",
  "CAMPAIGN_STARTED",
  "CONTRACT_SIGNED",
  "SUPPORT_TICKET",
  "WEBHOOK_EVENT",
  "API_EVENT",
]);

export const actionTypeEnum = z.enum([
  "SEND_EMAIL",
  "SEND_SMS",
  "PUSH_NOTIFICATION",
  "ASSIGN_TEAM",
  "CREATE_TASK",
  "GENERATE_REPORT",
  "RUN_AI",
  "WEBHOOK_CALL",
  "API_CALL",
  "DELAY",
  "APPROVAL",
  "CONDITIONS",
]);

export const saveWorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Akış adı en az 3 karakter olmalıdır"),
  description: z.string().optional(),
  trigger: triggerTypeEnum,
  isActive: z.boolean().default(true),
  steps: z.array(z.object({
    id: z.string(),
    actionType: actionTypeEnum,
    config: z.record(z.string(), z.any()).optional(),
  })).min(1, "En az bir eylem adımı eklenmelidir"),
});

export const generateWorkflowPromptSchema = z.object({
  userPrompt: z.string().min(10, "Lütfen yapmak istediğiniz otomasyonu detaylı açıklayınız"),
});

export type SaveWorkflowInput = z.infer<typeof saveWorkflowSchema>;
export type GenerateWorkflowPromptInput = z.infer<typeof generateWorkflowPromptSchema>;
