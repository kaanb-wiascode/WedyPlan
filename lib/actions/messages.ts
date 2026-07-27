"use server";

import { revalidatePath } from "next/cache";
import { sendMessageSchema, SendMessageInput } from "@/lib/validations/messages";

export async function sendMessageAction(userId: string, data: SendMessageInput) {
  const validation = sendMessageSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Sending message for user " + userId + " in conversation " + data.conversationId);
    revalidatePath("/couple/messages");
    return {
      success: true,
      message: {
        id: "msg_" + Date.now(),
        sender: "COUPLE",
        content: data.content,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        status: "READ",
      },
    };
  } catch (error) {
    console.error("Send Message Error:", error);
    return { success: false, error: "Mesaj gönderilemedi." };
  }
}

export async function getConversationSummaryAction(conversationId: string) {
  try {
    return {
      success: true,
      summary: "Bodrum Sunset Venue ile yapılan konuşmada 350 kişilik menü detayları netleştirildi. Tedarikçi cuma gününe kadar revize sözleşmeyi ileteceğini taahhüt etti.",
      extractedReminders: [
        { date: "Cuma, 18:00", title: "Bodrum Sunset revize sözleşme kontrolü" },
      ],
      suggestedReplies: [
        "Sözleşmeyi sabırsızlıkla bekliyoruz, teşekkürler!",
        "Menüdeki vegan seçenekleri de ekleyebilir misiniz?",
        "Tadım etkinliği saatini netleştirebilir miyiz?",
      ],
    };
  } catch (error) {
    console.error("AI Summary Error:", error);
    return { success: false, error: "Özet oluşturulamadı." };
  }
}

export async function translateMessageAction(messageId: string, text: string) {
  try {
    return {
      success: true,
      translatedText: "[Çeviri]: " + text,
    };
  } catch (error) {
    console.error("Translation Error:", error);
    return { success: false, error: "Çeviri yapılamadı." };
  }
}
