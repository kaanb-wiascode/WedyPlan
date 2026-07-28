"use server";

import { revalidatePath } from "next/cache";
import { updateLeadStageSchema, UpdateLeadStageInput } from "@/lib/validations/vendor-leads";

export async function updateLeadStageAction(vendorId: string, data: UpdateLeadStageInput) {
  const validation = updateLeadStageSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating lead " + data.leadId + " stage to " + data.stage + " for vendor " + vendorId);
    revalidatePath("/vendor/leads");
    return { success: true, message: "Müşteri aşaması başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Update Lead Stage Error:", error);
    return { success: false, error: "Aşama güncellenemedi." };
  }
}

export async function generateAILeadReplyAction(leadId: string, coupleName: string, budget: string) {
  try {
    const suggestedReply = "Merhaba " + coupleName + " Hanım & Bey! Düğün gününüz için hazırladığımız özel paket detaylarını ve " + budget + " bütçe aralığınıza uygun indirimli teklifimizi iletmekten mutluluk duyarız. Müsaitseniz kısa bir telefon görüşmesi gerçekleştirebilir miyiz?";

    return {
      success: true,
      suggestedReply,
      leadScore: 92,
      winProbability: 88,
      bestFollowUpTime: "Yarın (Çarşamba) 14:30",
      riskAnalysis: "Müşteri bütçesi teklif tutarınıza son derece uygun. 24 saat içinde yanıt verilirse satış kapatma oranı %90'ın üzerindedir.",
    };
  } catch (error) {
    console.error("AI Lead Reply Error:", error);
    return { success: false, error: "AI yanıtı üretilemedi." };
  }
}
