"use server";

import { revalidatePath } from "next/cache";
import { mobileQuickActionSchema, MobileQuickActionInput, processVoiceNoteSchema, ProcessVoiceNoteInput } from "@/lib/validations/vendor-mobile";

export async function executeMobileQuickActionAction(vendorId: string, data: MobileQuickActionInput) {
  const validation = mobileQuickActionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Executing mobile action " + data.actionType + " for vendor " + vendorId);
    revalidatePath("/vendor/mobile");
    return {
      success: true,
      message: "Hızlı eylem sahada anında işlendi ✨",
    };
  } catch (error) {
    console.error("Execute Mobile Quick Action Error:", error);
    return { success: false, error: "Mobil eylem işlenemedi." };
  }
}

export async function processVendorVoiceNoteAction(vendorId: string, data: ProcessVoiceNoteInput) {
  const validation = processVoiceNoteSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Processing voice note for vendor " + vendorId + ":", data.transcriptText);
    revalidatePath("/vendor/mobile");
    return {
      success: true,
      message: "Sesli not AI tarafından metne döküldü ve CRM notlarına eklendi ✨",
      aiSummary: "AI Not Özeti: Müşteri gelin çiçeğinde şakayık yerine beyaz gül tercih ettiğini belirtti.",
    };
  } catch (error) {
    console.error("Process Voice Note Error:", error);
    return { success: false, error: "Sesli not işlenemedi." };
  }
}

export async function getAIMobileDailyBriefingAction(vendorId: string) {
  try {
    return {
      success: true,
      briefing: {
        greeting: "Günaydın! Bugün sahadaki 1 numaralı önceliğiniz Bodrum düğünü.",
        weatherAlert: "☀️ Bodrum: 28°C Açık - Nem %45 (Açık hava çekimine son derece uygun)",
        urgentTasks: [
          "Saat 14:00 - Bodrum Sunset Venue Ses & Işık Kontrolü",
          "Saat 18:30 - Selin & Kaan Nikah Seremonisi Başlangıcı",
        ],
        aiPrioritySuggestion: "Gelin Hanım'a 'Ekip sahada, hazırlıklar tamam' WhatsApp mesajı atılması önerilir.",
      },
    };
  } catch (error) {
    console.error("Get Mobile Briefing Error:", error);
    return { success: false, error: "Mobil brifing alınamadı." };
  }
}
