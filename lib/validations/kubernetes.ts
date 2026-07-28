import { z } from "zod";

export const deploymentStrategyEnum = z.enum(["ROLLING_UPDATE", "CANARY", "BLUE_GREEN"]);

export const triggerDeploymentSchema = z.object({
  serviceName: z.string().min(2, "Servis adı zorunludur"),
  imageTag: z.string().min(1, "Docker image tag zorunludur"),
  strategy: deploymentStrategyEnum.default("CANARY"),
  canaryTrafficPct: z.number().min(5).max(100).default(10),
});

export const updateAutoscalingSchema = z.object({
  deploymentName: z.string().min(1),
  minReplicas: z.number().min(1).default(3),
  maxReplicas: z.number().min(3).default(50),
  targetCpuUtilizationPct: z.number().min(50).max(90).default(75),
});

export type TriggerDeploymentInput = z.infer<typeof triggerDeploymentSchema>;
export type UpdateAutoscalingInput = z.infer<typeof updateAutoscalingSchema>;
