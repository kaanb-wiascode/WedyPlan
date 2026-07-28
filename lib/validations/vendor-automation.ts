import { z } from "zod";

export const triggerTypeEnum = z.enum([
  "NEW_LEAD",
  "PROPOSAL_ACCEPTED",
  "PAYMENT_RECEIVED",
  "CONTRACT_SIGNED",
  "NEW_REVIEW",
  "CALENDAR_EVENT",
  "SUPPORT_TICKET",
  "MESSAGE_RECEIVED",
  "CAMPAIGN_STARTED",
]);

export const actionTypeEnum = z.enum([
  "SEND_EMAIL",
  "SEND_SMS",
  "SEND_WHATSAPP",
  "ASSIGN_EMPLOYEE",
  "CREATE_TASK",
  "GENERATE_CONTRACT",
  "GENERATE_PROPOSAL",
  "NOTIFY_TEAM",
  "UPDATE_CRM",
]);

export const workflowStepSchema = z.object({
  id: z.string(),
  type: z.enum(["TRIGGER", "CONDITION", "DELAY", "ACTION"]),
  actionType: actionTypeEnum.optional(),
  title: z.string(),
  details: z.string().optional(),
});

export const createWorkflowSchema = z.object({
  title: z.string().min(3, "Akış başlığı en az 3 karakter olmalıdır"),
  triggerType: triggerTypeEnum,
  description: z.string().optional(),
  steps: z.array(workflowStepSchema).min(1, "En az bir eylem adımı gereklidir"),
});

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
