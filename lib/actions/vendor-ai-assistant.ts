"use server";

import { revalidatePath } from "next/cache";
import {
  sendVendorAIChatSchema,
  SendVendorAIChatInput,
  generateQuickCopilotDraftSchema,
  GenerateQuickCopilotDraftInput,
  getVendorAIDailyBriefingSchema,
  GetVendorAIDailyBriefingInput,
} from "@/lib/validations/vendor-ai-assistant";

export async function sendVendorAIChatAction(
  vendorId: string,
  data: SendVendorAIChatInput
) {
  const validation = sendVendorAIChatSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const { message, contextType = "GENERAL" } = validation.data;
    const mockReply = `[${contextType}] Talebiniz başarıyla yanıtlandı: "${message}"`;

    revalidatePath("/vendor/assistant");

    return {
      success: true,
      reply: mockReply,
    };
  } catch (error) {
    console.error("Vendor AI Chat Error:", error);
    return { success: false, error: "AI asistan yanıt veremedi." };
  }
}

export async function generateQuickCopilotDraftAction(
  vendorId: string,
  data: GenerateQuickCopilotDraftInput
) {
  const validation = generateQuickCopilotDraftSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const activeType = validation.data.draftType || validation.data.actionType || "PROPOSAL_DRAFT";
    const recipient = validation.data.recipientName ? `Sayın ${validation.data.recipientName}, ` : "Sayın Çiftimiz, ";

    let mockDraft = `${recipient}WedyPlan üzerindeki teklif talebiniz için teşekkür ederiz. Özel paket detaylarımız hazırlanmıştır.`;

    if (activeType.includes("DISCOUNT") || activeType.includes("OFFER")) {
      mockDraft = `${recipient}Erken rezervasyon fırsatıyla %15 indirimli düğün paketimiz için detaylı fiyat teklifi ekte sunulmuştur.`;
    } else if (activeType.includes("CONTRACT")) {
      mockDraft = `${recipient}Sözleşme Taslağı Özeti: %30 kapora ödemesi, iptal şartları ve 12 saatlik mekan kullanım izni onaylanmıştır.`;
    } else if (activeType.includes("FOLLOW") || activeType.includes("MESSAGE")) {
      mockDraft = `${recipient}Merhabalar! Düğün tarihinize özel durumumuzu kontrol ettik, detayları konuşmak için müsaitseniz haber bekliyoruz.`;
    }

    if (validation.data.promptHint) {
      mockDraft += ` (${validation.data.promptHint} notu dikkate alındı)`;
    }

    revalidatePath("/vendor/assistant");

    return {
      success: true,
      draft: mockDraft,
      actionType: activeType,
      message: "Hızlı Copilot taslağı başarıyla üretildi ✨",
    };
  } catch (error) {
    console.error("Generate Quick Copilot Draft Error:", error);
    return { success: false, error: "Hızlı taslak üretilemedi." };
  }
}

export async function getVendorAIDailyBriefingAction(vendorId: string) {
  const validation = getVendorAIDailyBriefingSchema.safeParse({ vendorId });

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    return {
      success: true,
      briefing: {
        pendingProposalsCount: 3,
        upcomingEventsCount: 2,
        highPriorityLeadsCount: 1,
        aiSummary: "Bugün 3 yeni teklif talebiniz var. Bodrum Kır Düğünü talebine hızlı yanıt vermeniz dönüşüm olasılığını %40 artıracaktır.",
        topRecommendation: "Hafta sonu etkinliği için son ekipman kontrol listesini onaylayın.",
      },
    };
  } catch (error) {
    console.error("Get Vendor AI Daily Briefing Error:", error);
    return { success: false, error: "Günlük AI özet bilgisi alınamadı." };
  }
}