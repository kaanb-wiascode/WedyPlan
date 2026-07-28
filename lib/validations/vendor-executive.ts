import { z } from "zod";

export const executiveActionTypeEnum = z.enum([
  "APPROVE_PROPOSAL",
  "APPROVE_CONTRACT",
  "ASSIGN_STAFF",
  "LAUNCH_CAMPAIGN",
  "CONTACT_CUSTOMER",
  "CREATE_TASK",
  "SCHEDULE_MEETING",
]);

export const executeActionSchema = z.object({
  actionType: executiveActionTypeEnum,
  targetId: z.string().optional(),
  notes: z.string().optional(),
});

export type ExecuteActionInput = z.infer<typeof executeActionSchema>;
