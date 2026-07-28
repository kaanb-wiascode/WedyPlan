import { z } from "zod";

export const deploymentTargetEnum = z.enum(["DEVELOPMENT", "QA", "STAGING", "PRODUCTION", "PREVIEW"]);
export const pipelineTriggerTypeEnum = z.enum(["GIT_PUSH", "PR_MERGE", "MANUAL_RELEASE", "CRON_SCHEDULE"]);

export const triggerPipelineSchema = z.object({
  branchOrTag: z.string().min(1, "Branch veya Tag zorunludur"),
  targetEnvironment: deploymentTargetEnum.default("STAGING"),
  triggerType: pipelineTriggerTypeEnum.default("MANUAL_RELEASE"),
  runSecurityScan: z.boolean().default(true),
  runE2eTests: z.boolean().default(true),
});

export const triggerDeploymentActionSchema = z.object({
  pipelineId: z.string().min(1),
  environment: deploymentTargetEnum,
  actionType: z.enum(["DEPLOY", "ROLLBACK", "VERIFY"]),
});

export type TriggerPipelineInput = z.infer<typeof triggerPipelineSchema>;
export type TriggerDeploymentActionInput = z.infer<typeof triggerDeploymentActionSchema>;
