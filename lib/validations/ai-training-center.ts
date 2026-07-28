import { z } from "zod";

export const baseModelEnum = z.enum(["llama-3-8b-instruct", "mistral-7b-v0.3", "gpt-4o-mini"]);
export const trainingStatusEnum = z.enum(["QUEUED", "TRAINING", "COMPLETED", "FAILED"]);

export const startFineTuningSchema = z.object({
  jobName: z.string().min(3, "Eğitim işi adı gereklidir"),
  baseModel: baseModelEnum.default("llama-3-8b-instruct"),
  datasetId: z.string().min(1, "Veri seti ID gereklidir"),
  epochs: z.number().min(1).max(10).default(3),
  learningRate: z.number().default(0.0002),
});

export const deployModelSchema = z.object({
  modelJobId: z.string().min(1, "Model iş ID gereklidir"),
  targetGatewayPriority: z.number().min(1).max(10).default(1),
});

export type StartFineTuningInput = z.infer<typeof startFineTuningSchema>;
export type DeployModelInput = z.infer<typeof deployModelSchema>;
