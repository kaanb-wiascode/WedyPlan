import { z } from "zod";

export const workflowTypeEnum = z.enum([
  "CONTRACT_ANALYSIS_AND_APPROVAL",
  "AUTOMATED_VENDOR_RFOP_DISPATCH",
  "INTELLIGENT_BUDGET_REBALANCE",
  "EMERGENCY_TIMELINE_RESCHEDULE",
]);

export const executeWorkflowSchema = z.object({
  workflowType: workflowTypeEnum.default("CONTRACT_ANALYSIS_AND_APPROVAL"),
  payloadDescription: z.string().min(5, "Açıklama en az 5 karakter olmalıdır"),
  requiresHumanApproval: z.boolean().default(true),
  maxRetryAttempts: z.number().min(1).max(5).default(3),
});

export const approveWorkflowStepSchema = z.object({
  instanceId: z.string().min(1),
  approved: z.boolean(),
  notes: z.string().optional(),
});

export type ExecuteWorkflowInput = z.infer<typeof executeWorkflowSchema>;
export type ApproveWorkflowStepInput = z.infer<typeof approveWorkflowStepSchema>;
