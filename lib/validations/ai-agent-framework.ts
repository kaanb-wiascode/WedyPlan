import { z } from "zod";

export const agentRoleEnum = z.enum(["PLANNER", "EXECUTOR", "REVIEWER", "SUPERVISOR"]);
export const taskStatusEnum = z.enum(["PLANNING", "EXECUTING", "WAITING_HUMAN_APPROVAL", "REVIEWING", "COMPLETED", "FAILED"]);

export const dispatchTaskSchema = z.object({
  taskDescription: z.string().min(3, "Görev tanımı en az 3 karakter olmalıdır"),
  targetAgentKey: z.string().min(1, "Hedef ajan kodu gereklidir"),
  callerPortal: z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]).default("COUPLE"),
  requiresSupervisorReview: z.boolean().default(true),
  allowParallelExecution: z.boolean().default(true),
});

export const approveHumanTaskSchema = z.object({
  taskId: z.string().min(1, "Görev ID gereklidir"),
  approved: z.boolean(),
  notes: z.string().optional(),
});

export const registerToolSchema = z.object({
  toolCode: z.string().min(2, "Araç kural kodu zorunludur"),
  toolName: z.string().min(2, "Araç adı zorunludur"),
  description: z.string().min(5, "Açıklama gereklidir"),
  requiresHumanApproval: z.boolean().default(false),
});

export type DispatchTaskInput = z.infer<typeof dispatchTaskSchema>;
export type ApproveHumanTaskInput = z.infer<typeof approveHumanTaskSchema>;
export type RegisterToolInput = z.infer<typeof registerToolSchema>;
