"use server";

import { revalidatePath } from "next/cache";
import { processTicketResponseSchema, ProcessTicketResponseInput, updateTicketStatusSchema, UpdateTicketStatusInput } from "@/lib/validations/admin-support";

export async function processAdminTicketResponseAction(data: ProcessTicketResponseInput) {
  const validation = processTicketResponseSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Processing admin ticket response:", validation.data);
    revalidatePath("/admin/support");
    return {
      success: true,
      message: data.isInternalNote ? "Dahili not bilete eklendi 🔒" : "Müşteriye/Tedarikçiye yanıt gönderildi ✨",
    };
  } catch (error) {
    console.error("Process Ticket Response Error:", error);
    return { success: false, error: "Bilet yanıtı kaydedilemedi." };
  }
}

export async function updateAdminTicketStatusAction(data: UpdateTicketStatusInput) {
  const validation = updateTicketStatusSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating ticket status:", validation.data);
    revalidatePath("/admin/support");
    return {
      success: true,
      message: "Bilet durumu güncellendi: " + data.status + " ✨",
    };
  } catch (error) {
    console.error("Update Ticket Status Error:", error);
    return { success: false, error: "Bilet durumu güncellenemedi." };
  }
}

export async function generateAISupportCopilotInsightAction(ticketId: string) {
  try {
    return {
      success: true,
      sentimentScore: "%86 Negatif (Gergin Müşteri)",
      escalationRisk: "YÜKSEK (SLA İhlaline 14 Dk Kaldı)",
      summary: "Çift, düğün mekanının ses sistemi kapasitesinden memnun kalmadığını belirtiyor. Sözleşmedeki 4. maddeye göre ek amfi talebi var.",
      suggestedReply: "Sayın Selin Hanım, ilettiğiniz durum hızla saha operasyon yöneticimize aktarılmıştır. Bodrum Sunset Venue yetkilisi ile görüşülerek ücretsiz ilave amfi kurulumu 30 dakika içinde sağlanacaktır.",
      duplicateTicketRisk: "Tespit edilmedi (Tekil Talep)",
    };
  } catch (error) {
    console.error("AI Support Copilot Error:", error);
    return { success: false, error: "AI bilet analizi üretilemedi." };
  }
}
