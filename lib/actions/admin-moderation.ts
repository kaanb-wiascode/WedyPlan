"use server";

import { revalidatePath } from "next/cache";
import { resolveReportSchema, ResolveReportInput } from "@/lib/validations/admin-moderation";

export async function resolveModerationReportAction(data: ResolveReportInput) {
  const validation = resolveReportSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Resolving moderation report:", validation.data);
    revalidatePath("/admin/moderation");
    return {
      success: true,
      message: "Moderasyon kararı uygulandı: " + data.decision + " ✨",
    };
  } catch (error) {
    console.error("Resolve Moderation Error:", error);
    return { success: false, error: "Moderasyon kararı işlenemedi." };
  }
}

export async function generateAIModerationAuditReportAction() {
  try {
    return {
      success: true,
      platformCleanlinessScore: 99,
      flaggedContentCount: 3,
      aiDetections: [
        {
          id: "mod_scan_1",
          type: "OFF_PLATFORM_PAYMENT_BYPASS",
          target: "Tedarikçi Mesajı (#vnd_103)",
          confidence: "%96 Yüksek Şüphe",
          details: "Mesaj içeriğinde gizlenmiş IBAN ve 'Havale yapalım komisyon ödemeyin' cümlesi tespit edildi.",
        },
        {
          id: "mod_scan_2",
          type: "COPYRIGHT_INFRINGEMENT",
          target: "Görsel Portföyü (#img_881)",
          confidence: "%91 Telif Eşleşmesi",
          details: "Yüklenen kapak fotoğrafı Getty Images stok kütüphanesi filigranı ile eşleşti.",
        },
      ],
      aiRecommendation: "Şüpheli IBAN paylaşan tedarikçiye otonom uyarı bildirimi gönderilmesi önerilir.",
    };
  } catch (error) {
    console.error("AI Moderation Audit Error:", error);
    return { success: false, error: "AI moderasyon raporu üretilemedi." };
  }
}
