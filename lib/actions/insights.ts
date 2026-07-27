"use server";

import { revalidatePath } from "next/cache";

export async function getExecutiveInsightsAction(userId: string) {
  try {
    console.log("Analyzing executive insights for user " + userId);
    return {
      success: true,
      readinessScore: 89,
      successProbability: 96,
      stressIndex: "DÜŞÜK",
      stressLevelPercentage: 24,
      nextBestAction: {
        title: "Fotoğraf & Video Sözleşmesini İmzala",
        deadline: "Bu Cuma",
        impact: "Düğün günündeki çekim rotasını netleştirecek.",
      },
      predictions: {
        budgetOverrunRisk: "%4 (Tolerans Sınırında)",
        delayRisk: "1 Görev Gecikmede (Tadımlık Menü)",
        missingVendors: ["Müzik & DJ", "Transfer Servisi"],
      },
      weeklyPlan: [
        { id: "wp1", title: "Mekan ile son 350 kişilik menü teyidini yap", completed: true },
        { id: "wp2", title: "Studio Aegean fotoğraf sözleşmesini e-imza ile onayla", completed: false },
        { id: "wp3", title: "LCV vermeyen 14 konuğa WhatsApp hatırlatması at", completed: false },
      ],
    };
  } catch (error) {
    console.error("AI Insights Error:", error);
    return { success: false, error: "Yapay zeka analizi oluşturulamadı." };
  }
}

export async function completeCoachingAction(actionId: string) {
  try {
    console.log("Completing coaching action " + actionId);
    revalidatePath("/couple/insights");
    return { success: true, message: "Aksiyon tamamlandı ve hazırlık skorunuz güncellendi ✨" };
  } catch (error) {
    console.error("Coaching Action Error:", error);
    return { success: false, error: "Aksiyon güncellenemedi." };
  }
}
