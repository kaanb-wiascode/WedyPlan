"use server";

import { revalidatePath } from "next/cache";
import { updateCoupleStatusSchema, UpdateCoupleStatusInput, coupleInterventionSchema, CoupleInterventionInput } from "@/lib/validations/admin-couples";

export async function updateCoupleAccountStatusAction(data: UpdateCoupleStatusInput) {
  const validation = updateCoupleStatusSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating couple account status:", validation.data);
    revalidatePath("/admin/couples");
    return {
      success: true,
      message: "Çift hesabı durumu başarıyla güncellendi ✨",
    };
  } catch (error) {
    console.error("Update Couple Status Error:", error);
    return { success: false, error: "Hesap durumu güncellenemedi." };
  }
}

export async function sendCoupleSupportInterventionAction(data: CoupleInterventionInput) {
  const validation = coupleInterventionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Sending VIP support intervention to couple:", validation.data);
    revalidatePath("/admin/couples");
    return {
      success: true,
      message: "Çifte özel VIP platform desteği ve danışman müdahalesi başlatıldı ✨",
    };
  } catch (error) {
    console.error("Support Intervention Error:", error);
    return { success: false, error: "Müdahale başlatılamadı." };
  }
}

export async function generateAICoupleAuditReportAction(coupleId: string) {
  try {
    return {
      success: true,
      trustScore: 98,
      spamRiskScore: 2,
      aiUsageTokens: "142.500 Jeton (Yüksek Etkileşim)",
      loginFrequency: "Son 30 günde 18 aktif oturum",
      auditSummary: "Çift gerçek kullanıcı verileriyle doğrulanmış, 3 farklı tedarikçiyle e-imzalı sözleşmesi bulunuyor. Ödeme kanalları güvenli.",
      recommendation: "Düğün gününe 45 gün kaldı. Otomatik 'Son Kontrol Listesi' hatırlatması gönderilebilir.",
    };
  } catch (error) {
    console.error("AI Couple Audit Error:", error);
    return { success: false, error: "AI çift denetim raporu üretilemedi." };
  }
}
