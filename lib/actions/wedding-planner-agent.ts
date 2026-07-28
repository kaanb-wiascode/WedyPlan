"use server";

import { revalidatePath } from "next/cache";
import { interactWithPlannerSchema, InteractWithPlannerInput, createChecklistSchema, CreateChecklistInput } from "@/lib/validations/wedding-planner-agent";
import { processWeddingPlannerAgent } from "@/lib/ai-agent-framework/agents/wedding-planner";

export async function interactWithWeddingPlannerAgentAction(data: InteractWithPlannerInput) {
  const validation = interactWithPlannerSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const result = await processWeddingPlannerAgent(validation.data);
    revalidatePath("/admin/wedding-planner-agent");
    return {
      success: true,
      data: result,
      message: "Düğün Asistanı Ajanı yanıtı üretti (" + result.executionTimeMs + "ms) ✨",
    };
  } catch (error) {
    console.error("Interact Wedding Planner Error:", error);
    return { success: false, error: "Düğün asistanı yanıt veremedi." };
  }
}

export async function generateWeddingReadinessAndRiskAction() {
  try {
    return {
      success: true,
      weddingReadinessScore: 84,
      daysRemaining: 98,
      riskLevel: "LOW",
      dailyPlan: "Bugün: Fotoğrafçı portföy incelemesi ve tadım randevusu teyidi.",
      weeklyPlan: "Bu Hafta: Davetiye baskı taslağının onaylanması ve LCV listesi güncellemesi.",
      monthlyPlan: "Bu Ay: Gelinlik/Damatlık son provası ve müzik orkestrası repertuar seçimi.",
      aiAnalysis: "Çiftin düğün hazırlıkları %84 hazır durumdadır. Kritik zaman tünelinde hiçbir gecikme yok. Bütçe harcama oranı %62 seviyesinde dengelidir.",
      riskAlerts: [
        "Catering menü seçimi için son 14 gün. Zamanında tamamlanmazsa tedarikçi opsiyonu düşebilir.",
      ],
    };
  } catch (error) {
    console.error("Wedding Readiness Error:", error);
    return { success: false, error: "Düğün hazırlık raporu üretilemedi." };
  }
}
