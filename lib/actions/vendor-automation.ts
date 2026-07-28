"use server";

import { revalidatePath } from "next/cache";
import { createWorkflowSchema, CreateWorkflowInput } from "@/lib/validations/vendor-automation";

export async function createVendorWorkflowAction(vendorId: string, data: CreateWorkflowInput) {
  const validation = createWorkflowSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating workflow for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/automation");
    return {
      success: true,
      message: "Otomasyon akışı başarıyla oluşturuldu ve yayına alındı ✨",
      workflowId: "wf_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Workflow Error:", error);
    return { success: false, error: "Otomasyon akışı oluşturulamadı." };
  }
}

export async function toggleWorkflowStatusAction(vendorId: string, workflowId: string, isActive: boolean) {
  try {
    console.log("Toggling workflow " + workflowId + " status to " + isActive + " for vendor " + vendorId);
    revalidatePath("/vendor/automation");
    return {
      success: true,
      message: isActive ? "Otomasyon akışı aktifleştirildi ⚡" : "Otomasyon akışı duraklatıldı ⏸️",
    };
  } catch (error) {
    console.error("Toggle Workflow Error:", error);
    return { success: false, error: "Akış durumu değiştirilemedi." };
  }
}

export async function generateAIWorkflowAction(promptText: string) {
  try {
    return {
      success: true,
      title: "Teklif Onayı Sonrası Otomatik WhatsApp & Görev Kurgusu",
      triggerType: "PROPOSAL_ACCEPTED",
      suggestedSteps: [
        { id: "s1", type: "TRIGGER", title: "Tetikleyici: Teklif Kabul Edildi" },
        { id: "s2", type: "DELAY", title: "Zamanlayıcı: 15 Dakika Bekle" },
        { id: "s3", type: "ACTION", actionType: "SEND_WHATSAPP", title: "Eylem: Çifte Hoş Geldin WhatsApp Mesajı Gönder" },
        { id: "s4", type: "ACTION", actionType: "CREATE_TASK", title: "Eylem: Saha Şefine Menü Tadımı Görevi Ata" },
      ],
      aiExplanation: "Bu akış teklif kabul edildiği an çifte samimi bir onay mesajı atar ve ekibinize görev tanımlar.",
    };
  } catch (error) {
    console.error("AI Workflow Generator Error:", error);
    return { success: false, error: "AI otomasyon kurgusu üretilemedi." };
  }
}
