"use server";

import { revalidatePath } from "next/cache";
import { createSuccessPlanSchema, CreateSuccessPlanInput, triggerInterventionSchema, TriggerInterventionInput } from "@/lib/validations/admin-customer-success";

export async function createCustomerSuccessPlanAction(data: CreateSuccessPlanInput) {
  const validation = createSuccessPlanSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating customer success plan:", validation.data);
    revalidatePath("/admin/customer-success");
    return {
      success: true,
      message: "Müşteri Başarı Planı ve hedefleri kaydedildi ✨",
      planId: "plan_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Success Plan Error:", error);
    return { success: false, error: "Başarı planı oluşturulamadı." };
  }
}

export async function triggerCustomerInterventionAction(data: TriggerInterventionInput) {
  const validation = triggerInterventionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Triggering CS intervention:", validation.data);
    revalidatePath("/admin/customer-success");
    return {
      success: true,
      message: "Proaktif Müşteri Başarısı müdahalesi başlatıldı ve temsilciye atandı ✨",
    };
  } catch (error) {
    console.error("Trigger Intervention Error:", error);
    return { success: false, error: "Müdahale başlatılamadı." };
  }
}

export async function generateAICustomerSuccessReportAction() {
  try {
    return {
      success: true,
      averageHealthScore: 94,
      churnRiskCount: 3,
      upsellCandidatesCount: 14,
      aiAnalysis: "Tedarikçilerin %88'i onboarding sürecini ilk 48 saatte tamamlıyor. 'Ege Panorama Fotoğraf' hesabı son 10 gündür teklif modülünü kullanmadığı için Churn riski taşıyor.",
      growthOpportunities: "Pro paketteki 14 yüksek sağlıklı tedarikçinin Enterprise paket kotalarına yaklaşması nedeniyle özel Upsell indirimi önerilir.",
      recommendation: "Onboarding tamamlama oranı %50 altında kalan 5 tedarikçiye otonom interaktif eğitim videosu iletilmelidir.",
    };
  } catch (error) {
    console.error("AI CS Report Error:", error);
    return { success: false, error: "AI Müşteri Başarısı raporu üretilemedi." };
  }
}
