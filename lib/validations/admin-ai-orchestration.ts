import { z } from "zod";

export const taskTypeEnum = z.enum([
  "WEDDING_PLANNING",
  "CONTRACT_ANALYSIS",
  "VISION_INSPECTION",
  "TRANSLATION",
  "FAST_SUMMARY",
]);

export const callerPortalEnum = z.enum(["PUBLIC", "COUPLE", "VENDOR", "ADMIN"]);

export const dispatchAIOrchestratedRequestSchema = z.object({
  taskType: taskTypeEnum,
  prompt: z.string().min(1, "Prompt boş olamaz"),
  callerPortal: callerPortalEnum.default("ADMIN"),
  maxTokens: z.number().min(1).default(2000),
  temperature: z.number().min(0).max(2).default(0.7),
});

export type DispatchAIOrchestratedRequestInput = z.infer<
  typeof dispatchAIOrchestratedRequestSchema
>;
