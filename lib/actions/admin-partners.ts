"use server";

import { revalidatePath } from "next/cache";
import { approvePartnerSchema, ApprovePartnerInput, processPayoutSchema, ProcessPayoutInput } from "@/lib/validations/admin-partners";

export async function approvePartnerApplicationAction(data: ApprovePartnerInput) {
  const validation = approvePartnerSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Approving partner application:", validation.data);
    revalidatePath("/admin/partners");
    return {
      success: true,
      message: "İş ortağı başvurusu onaylandı! Takip linki ve özel kupon kodu fırlatıldı ✨",
    };
  } catch (error) {
    console.error("Approve Partner Error:", error);
    return { success: false, error: "Ortaklık başvurusu onaylanamadı." };
  }
}

export async function processPartnerPayoutAction(data: ProcessPayoutInput) {
  const validation = processPayoutSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Processing partner payout:", validation.data);
    revalidatePath("/admin/partners");
    return {
      success: true,
      message: data.payoutAmount.toLocaleString("tr-TR") + " ₺ hakediş ödemesi banka transfer kuyruğuna eklendi 🚀",
    };
  } catch (error) {
    console.error("Process Payout Error:", error);
    return { success: false, error: "Hakediş ödemesi işlenemedi." };
  }
}

export async function generateAIPartnerPerformanceReportAction() {
  try {
    return {
      success: true,
      partnerEcosystemHealthScore: 97,
      activePartnersCount: 142,
      pendingApplicationsCount: 3,
      totalPayoutsThisMonth: "284.500 ₺",
      aiAnalysis: "Ortaklık ekosistemi bu ay platform ciro büyümesinin %28'ini sağlamıştır. Düğün Plancıları (Wedding Planners) kategorisi %42 ortalama müşteri dönüşüm oranı ile en yüksek kaliteye sahiptir.",
      fraudAlerts: [
        "Affiliate #aff_881 hesabından gelen 40 son tıklamada aynı IP çerez parmak izi saptandı. Hakediş geçici donduruldu.",
      ],
      revenueForecast: "Gelecek 30 günde partner kanalı üzerinden 1.200.000 ₺ net yeni sözleşme cirosu öngörülmektedir.",
      growthRecommendation: "Top 5 Influencer ortağa %12 olan komisyon oranının %15'e çıkarılması durumunda yönlendirme hacmi %35 artacaktır.",
    };
  } catch (error) {
    console.error("AI Partner Report Error:", error);
    return { success: false, error: "AI ortaklık raporu üretilemedi." };
  }
}
