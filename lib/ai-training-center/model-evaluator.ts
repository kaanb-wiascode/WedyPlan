import { StartFineTuningInput } from "@/lib/validations/ai-training-center";

export interface EvaluationResultPayload {
  jobId: string;
  jobName: string;
  finalTrainingLoss: number;
  accuracyScorePct: number;
  weddingJargonScorePct: number;
  estimatedCostSavingPct: number;
  executionTimeMinutes: number;
}

export async function simulateModelTraining(input: StartFineTuningInput): Promise<EvaluationResultPayload> {
  const startTime = Date.now();
  console.log("Simulating AI Model Fine-Tuning for Model:", input.jobName);

  return {
    jobId: "job_" + Math.random().toString(36).substring(2, 10),
    jobName: input.jobName,
    finalTrainingLoss: 0.084,
    accuracyScorePct: 98.6,
    weddingJargonScorePct: 99.1,
    estimatedCostSavingPct: 82,
    executionTimeMinutes: 42,
  };
}
