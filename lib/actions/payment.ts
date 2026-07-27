"use server";

import { revalidatePath } from "next/cache";
import { recordPaymentSchema, RecordPaymentInput } from "@/lib/validations/payment";

export async function recordPaymentAction(userId: string, data: RecordPaymentInput) {
  const validation = recordPaymentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Recording completed payment " + data.paymentId + " for user " + userId);
    revalidatePath("/couple/payments");
    return { success: true, message: "Ödeme kaydı başarıyla tamamlandı ve bütçeye işlendi ✨" };
  } catch (error) {
    console.error("Record Payment Error:", error);
    return { success: false, error: "Ödeme kaydedilemedi." };
  }
}

export async function getAIPaymentForecastAction(userId: string) {
  try {
    return {
      success: true,
      healthScore: 91,
      upcomingDue30Days: "95.000 ₺",
      cashFlowStatus: "HEALTHY",
      forecastMessage: "Önümüzdeki 30 gün içinde 2 taksit ödemeniz bulunmaktadır. Mevcut nakit akışınız ve ayrılan bütçe sınırları bu ödemeleri karşılamak için tamamen uygundur.",
      lateAlerts: [
        "Studio Aegean 2. Taksit ödemesi için son 5 gün! Zamanında ödeme erken teslim garantisini korur.",
      ],
      savingsTips: [
        "Bodrum Sunset Venue peşin ödeme seçeneğinde %5 KDV indirimi teklif ediyor (Tasarruf: 16.000 ₺).",
      ],
    };
  } catch (error) {
    console.error("AI Payment Forecast Error:", error);
    return { success: false, error: "Finansal tahmin oluşturulamadı." };
  }
}
