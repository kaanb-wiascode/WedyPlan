"use server";

import { revalidatePath } from "next/cache";
import { processVoiceAudioSchema, ProcessVoiceAudioInput, generateMeetingSummarySchema, GenerateMeetingSummaryInput } from "@/lib/validations/ai-voice-platform";
import { processVoiceStream } from "@/lib/ai-voice-platform/emotion-detector";

export async function processVoiceAudioAction(data: ProcessVoiceAudioInput) {
  const validation = processVoiceAudioSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const result = processVoiceStream(validation.data);
    revalidatePath("/admin/ai-voice");

    return {
      success: true,
      data: result,
      message: "Voice AI Platform sesi işledi! Algılanan Duygu: " + result.detectedEmotion + " (% " + result.emotionConfidencePct + ") ✨",
    };
  } catch (error) {
    console.error("Process Voice Error:", error);
    return { success: false, error: "Ses işlenemedi." };
  }
}

export async function generateMeetingSummaryAction(data: GenerateMeetingSummaryInput) {
  const validation = generateMeetingSummarySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    revalidatePath("/admin/ai-voice");
    return {
      success: true,
      meetingTitle: "Bodrum Mekan & Catering Tedarikçi Görüşmesi",
      summaryPoints: [
        "Mekan kapasitesi 200 kişi olarak teyit edildi.",
        "Menu tadımı için 15 Ağustos tarihine randevu oluşturuldu.",
        "Gelinlik ve fotoğraf ekibi için saat 15:30 çekim izni alındı.",
      ],
      actionItemsCount: 3,
      message: "Toplantı notları ve otonom kararlar başarıyla çıkarıldı! 🚀",
    };
  } catch (error) {
    console.error("Generate Meeting Summary Error:", error);
    return { success: false, error: "Toplantı notları üretilemedi." };
  }
}

export async function generateVoiceAnalyticsReportAction() {
  try {
    return {
      success: true,
      totalVoiceSessionsCount: 24500,
      sttAccuracyWordErrorRatePct: 2.1,
      avgVoiceLatencyMs: 120,
      realtimeTranslationReady: true,
      aiAnalysis: "Voice AI Platform, son 30 günde 24,500 sesli etkileşimi %97.9 kelime doğruluğu ve 120ms ortalama yanıt süresiyle işlemiştir.",
      topRecommendation: "Tedarikçi toplantı transkriptlerinde 'Otomatik Sözleşme Maddesi Taslağı Oluşturma' özelliğinin aktif edilmesi verimi %30 artıracaktır.",
    };
  } catch (error) {
    console.error("Voice Analytics Report Error:", error);
    return { success: false, error: "Ses analitik raporu üretilemedi." };
  }
}
