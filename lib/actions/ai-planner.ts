"use server";

import { AIChatMessage, aiPromptRequestSchema } from "@/lib/validations/ai-planner";

export async function processAIPrompt(
  userMessage: string,
  userId: string,
  intent?: string
): Promise<{ success: boolean; response?: AIChatMessage; error?: string }> {
  const validation = aiPromptRequestSchema.safeParse({ message: userMessage, userId, intent });

  if (!validation.success) {
    return { success: false, error: "Geçersiz istek parametresi." };
  }

  try {
    const lower = userMessage.toLowerCase();
    let detectedIntent: AIChatMessage["intent"] = "GENERAL";
    let payloadData = null;
    let replyText = "";

    if (lower.includes("zaman") || lower.includes("timeline") || lower.includes("program")) {
      detectedIntent = "TIMELINE";
      replyText = "Düğün gününüz ve öncesi için kişiselleştirilmiş zaman çizelgenizi hazırladım.";
      payloadData = {
        schedule: [
          { time: "10:00", title: "Hazırlık Başlangıcı", desc: "Kuaför ve makyaj" },
          { time: "15:00", title: "Fotoğraf Çekimi", desc: "Gün batımı çekimleri" },
          { time: "18:30", title: "Nikah Seremonisi", desc: "Davetlilerin karşılanması" },
        ],
      };
    } else if (lower.includes("bütçe") || lower.includes("risk") || lower.includes("maliyet")) {
      detectedIntent = "RISK_CHECK";
      replyText = "Düğün bütçenizi ve tedarikçi durumunuzu analiz ettim.";
      payloadData = {
        risks: [
          { level: "HIGH", title: "Fotoğrafçı Rezervasyonu", desc: "Haziran ayı için kontenjanlar doluyor." },
          { level: "MEDIUM", title: "Catering Bütçe Aşımı", desc: "İçki menüsü seçimi bütçeyi zorlayabilir." },
        ],
      };
    } else if (lower.includes("konsept") || lower.includes("tema") || lower.includes("moodboard")) {
      detectedIntent = "MOODBOARD";
      replyText = "Ege & Akdeniz dokunuşlu Bohem Lüks konseptiniz için fikirler oluşturdum.";
      payloadData = {
        palette: ["#F8FAFC", "#E2E8F0", "#D97706", "#E11D48"],
        ideas: ["Zeytin dalları ve kuru çiçekler", "Mum ışığında akşam yemeği konsepti"],
      };
    } else {
      replyText = '"' + userMessage + '" talebiniz için yapay zeka asistanınız verilerinizi güncelliyor.';
    }

    const aiMessage: AIChatMessage = {
      id: "msg_" + Date.now(),
      sender: "ai",
      content: replyText,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      intent: detectedIntent,
      payload: payloadData,
    };

    return { success: true, response: aiMessage };
  } catch (error) {
    console.error("AI Planner Error:", error);
    return { success: false, error: "Yapay zeka asistanına ulaşılırken bir hata oluştu." };
  }
}
