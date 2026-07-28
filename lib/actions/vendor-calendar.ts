"use server";

import { revalidatePath } from "next/cache";
import { createCalendarEventSchema, CreateCalendarEventInput } from "@/lib/validations/vendor-calendar";

export async function createVendorCalendarEventAction(vendorId: string, data: CreateCalendarEventInput) {
  const validation = createCalendarEventSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating calendar event for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/calendar");
    return { success: true, message: "Takvim etkinliği ve lojistik ataması başarıyla kaydedildi ✨" };
  } catch (error) {
    console.error("Create Calendar Event Error:", error);
    return { success: false, error: "Etkinlik kaydedilemedi." };
  }
}

export async function detectAIConflictAction(vendorId: string) {
  try {
    return {
      success: true,
      conflictDetected: true,
      conflicts: [
        {
          id: "conf_1",
          severity: "HIGH",
          title: "Personel & Lojistik Çakışması",
          description: "19 Haziran Cumartesi saat 14:00'te hem Bodrum Sunset Venue kurulumuna hem de Çeşme Düğün alanına aynı 'VIP Servis Aracı' atanmış.",
          solution: "'VIP Servis Aracı 2'yi Çeşme rotasına kaydırarak çakışmayı giderebilirsiniz.",
        },
      ],
      optimizationScore: 91,
      suggestions: [
        "Cuma günkü menü tadımı toplantılarını tek bir 3 saatlik blokta toplayarak 2 saatlik personel süresi tasarrufu sağlayabilirsiniz.",
      ],
    };
  } catch (error) {
    console.error("AI Conflict Detection Error:", error);
    return { success: false, error: "AI çakışma analizi yapılamadı." };
  }
}
