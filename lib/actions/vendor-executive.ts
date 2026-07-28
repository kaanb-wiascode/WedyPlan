"use server";

import { revalidatePath } from "next/cache";
import { executeActionSchema, ExecuteActionInput } from "@/lib/validations/vendor-executive";

export async function executeExecutiveAction(vendorId: string, data: ExecuteActionInput) {
  const validation = executeActionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Executing executive action " + data.actionType + " for vendor " + vendorId);
    revalidatePath("/vendor/executive");
    return {
      success: true,
      message: "Yönetici talimatı başarıyla yürütüldü ve alt sistemlere iletildi ✨",
    };
  } catch (error) {
    console.error("Execute Executive Action Error:", error);
    return { success: false, error: "Yönetici eylemi gerçekleştirilemedi." };
  }
}

export async function generateAIExecutiveBriefingAction(vendorId: string) {
  try {
    return {
      success: true,
      businessHealthScore: 97,
      morningBriefing: "Günaydın Sayın Yönetici! Bugün 102.750 ₺ kapora tahsilat vadeniz bulunmaktadır. Bodrum Sunset Venue'deki düğün için kurulum ekibi %100 tamamlandı.",
      eveningSummary: "Dünün raporu: 2 yeni nitelikli talep alındı, 1 sözleşme onaylandı, 0 şikayet veya kriz yaşanmadı.",
      growthOpportunities: [
        "Temmuz ayının 2. haftasındaki boş Cuma günü için %10 Fırsat Kampanyası başlatmak ek 180.000 ₺ ciro getirebilir.",
      ],
      revenueRisks: [
        "Ece & Mert çiftinin sözleşme onay süresi 3 gündür beklemede. Müşteri temsilcisini yönlendirmeniz önerilir.",
      ],
      competitorSignals: "Bodrum lüks düğün kategorisinde yanıt verme süreniz rakiplerinizden %42 daha hızlı.",
    };
  } catch (error) {
    console.error("AI Executive Briefing Error:", error);
    return { success: false, error: "AI brifingi üretilemedi." };
  }
}
