"use server";

import { revalidatePath } from "next/cache";
import {
  dispatchAIOrchestratedRequestSchema,
  DispatchAIOrchestratedRequestInput,
} from "@/lib/validations/admin-ai-orchestration";

export async function dispatchAIOrchestratedRequestAction(
  data: DispatchAIOrchestratedRequestInput
) {
  const validation = dispatchAIOrchestratedRequestSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const { taskType, prompt, callerPortal, maxTokens, temperature } = validation.data;

    // AI Gateway Simülasyonu
    const mockProviders = {
      WEDDING_PLANNING: { provider: "OpenAI", model: "gpt-4o", cost: 0.0024 },
      CONTRACT_ANALYSIS: { provider: "Anthropic", model: "claude-3-5-sonnet", cost: 0.0036 },
      VISION_INSPECTION: { provider: "Google Gemini", model: "gemini-1.5-pro", cost: 0.0018 },
      TRANSLATION: { provider: "OpenAI", model: "gpt-4o-mini", cost: 0.0006 },
      FAST_SUMMARY: { provider: "Self-Hosted", model: "llama-3-8b-instruct", cost: 0.0001 },
    };

    const target = mockProviders[taskType] || mockProviders.WEDDING_PLANNING;

    revalidatePath("/admin/ai-orchestration");

    return {
      success: true,
      message: taskType + " görevi " + target.provider + " (" + target.model + ") modeline başarıyla yönlendirildi! ✨",
      data: {
        selectedProvider: target.provider,
        selectedModel: target.model,
        totalTokens: Math.floor(prompt.length * 1.3) + 120,
        costUSD: target.cost,
        latencyMs: Math.floor(Math.random() * 80 + 110),
        responseMessage: "[AI Gateway Router Output]: '" + prompt + "' sorgusu " + target.model + " ile işlendi ve yanıt üretildi.",
      },
    };
  } catch (error) {
    console.error("Dispatch AI Orchestrated Request Error:", error);
    return { success: false, error: "AI Gateway isteği işlenemedi." };
  }
}
