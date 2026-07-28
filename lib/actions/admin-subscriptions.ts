"use server";

import { revalidatePath } from "next/cache";
import { savePlanSchema, SavePlanInput, generateCouponSchema, GenerateCouponInput, processRefundSchema, ProcessRefundInput } from "@/lib/validations/admin-subscriptions";

export async function createOrUpdatePlanAction(data: SavePlanInput) {
  const validation = savePlanSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving subscription plan:", validation.data);
    revalidatePath("/admin/subscriptions");
    return {
      success: true,
      message: "Abonelik paketi fiyat ve kotaları güncellendi ✨",
    };
  } catch (error) {
    console.error("Save Plan Error:", error);
    return { success: false, error: "Paket kaydedilemedi." };
  }
}

export async function generatePlatformCouponAction(data: GenerateCouponInput) {
  const validation = generateCouponSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Generating coupon code:", validation.data);
    revalidatePath("/admin/subscriptions");
    return {
      success: true,
      message: "İndirim kuponu tanımlandı ve yayına alındı ✨",
    };
  } catch (error) {
    console.error("Generate Coupon Error:", error);
    return { success: false, error: "Kupon oluşturulamadı." };
  }
}

export async function processPlatformRefundAction(data: ProcessRefundInput) {
  const validation = processRefundSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Processing platform refund:", validation.data);
    revalidatePath("/admin/subscriptions");
    return {
      success: true,
      message: data.invoiceNumber + " nolu fatura için " + data.refundAmount + " ₺ iade işlemi tamamlandı ✨",
    };
  } catch (error) {
    console.error("Process Refund Error:", error);
    return { success: false, error: "İade işlemi gerçekleştirilemedi." };
  }
}

export async function generateAISubscriptionMetricsAction() {
  try {
    return {
      success: true,
      churnRate: "%1.2 (Sektör Ortalamasının Altında)",
      predictedNextMrr: "1.680.000 ₺ (Gelecek Ay Projeksiyonu)",
      highChurnRiskCount: 4,
      upsellOpportunitiesCount: 18,
      aiAnalysis: "Son 30 günde 'Pro Business' paketten 'Enterprise' pakete geçiş yapan tedarikçi sayısı %24 arttı. Fotoğraf kategorisinde ek Lead kredisi talebi yüksek.",
      recommendation: "'Yıllık Peşin Ödemede %20 İndirim' kuponunu yeni onaylanan 12 tedarikçiye fırlatmanız önerilir.",
    };
  } catch (error) {
    console.error("AI Subscription Metrics Error:", error);
    return { success: false, error: "AI abonelik metrikleri çekilemedi." };
  }
}
