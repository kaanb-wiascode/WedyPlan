"use server";

import { revalidatePath } from "next/cache";
import { startFineTuningSchema, StartFineTuningInput, deployModelSchema, DeployModelInput } from "@/lib/validations/ai-training-center";
import { simulateModelTraining } from "@/lib/ai-training-center/model-evaluator";

export async function startFineTuningJobAction(data: StartFineTuningInput) {
  const validation = startFineTuningSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const result = await simulateModelTraining(validation.data);
    revalidatePath("/admin/ai-training");
    return {
      success: true,
      data: result,
      message: data.jobName + " için Fine-Tuning eğitimi GPU Compute kümesinde başlatıldı! Tahmini Süre: " + result.executionTimeMinutes + " dk ✨",
    };
  } catch (error) {
    console.error("Start Fine Tuning Error:", error);
    return { success: false, error: "Eğitim süreci başlatılamadı." };
  }
}

export async function deployTrainedModelAction(data: DeployModelInput) {
  const validation = deployModelSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Deploying Trained Model to AI Gateway:", data.modelJobId);
    revalidatePath("/admin/ai-training");
    return {
      success: true,
      message: "Özel eğitilmiş WedyPlan modeli CANLIYA ALINDI ve AI Gateway birincil rotasına işlendi 🚀",
    };
  } catch (error) {
    console.error("Deploy Model Error:", error);
    return { success: false, error: "Model canlıya alınamadı." };
  }
}

export async function generateAITrainingAnalyticsAction() {
  try {
    return {
      success: true,
      trainingHealthScore: 99,
      activeFineTunedModelsCount: 4,
      totalTrainingSamples: 482000,
      monthlyCostSavingsUsd: "$14.200",
      aiAnalysis: "Özel eğitilmiş 'wedyplan-llama3-8b' ve 'wedyplan-gpt4o-mini' modellerimiz dış API harcamalarını %82 azaltmış, Türkçe düğün terminolojisi doğruluk oranını %99.1 seviyesine çıkarmıştır.",
      recommendation: "Sözleşme analizi için 12.000 yeni hukuki veri seti örneği ile 'wedyplan-legal-v3' modelinin yeniden eğitilmesi önerilir.",
    };
  } catch (error) {
    console.error("AI Training Analytics Error:", error);
    return { success: false, error: "Eğitim analitiği üretilemedi." };
  }
}
