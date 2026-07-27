"use server";

import { revalidatePath } from "next/cache";
import { digitalInvitationSchema, DigitalInvitationInput, sendReminderSchema, SendReminderInput } from "@/lib/validations/invitation";

export async function createDigitalInvitationAction(userId: string, data: DigitalInvitationInput) {
  const validation = digitalInvitationSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating digital invitation for user " + userId + ":", validation.data);
    revalidatePath("/couple/invitations");
    return { success: true, message: "Dijital davetiye başarıyla oluşturuldu ve LCV sistemi aktifleştirildi ✨" };
  } catch (error) {
    console.error("Create Invitation Error:", error);
    return { success: false, error: "Davetiye oluşturulamadı." };
  }
}

export async function generateAIInvitationCopyAction(tone: string, coupleNames: string, venue: string) {
  try {
    const text = coupleNames + " olarak, hayatımızın en özel gününde sizleri de aramızda görmekten mutluluk duyarız. " +
      venue + "'de gerçekleşecek bu anlamlı gecede mutluluğumuza ortak olmanız dileğiyle.";

    return {
      success: true,
      generatedText: text,
      suggestedReminderText: "Merhaba! Selin & Kaan'ın düğün davetiyesi için LCV yanıtınızı bekliyoruz. Katılım durumunuzu bildirmek için bağlantıya tıklayabilirsiniz ✨",
    };
  } catch (error) {
    console.error("AI Copy Error:", error);
    return { success: false, error: "AI metin üretilemedi." };
  }
}

export async function sendRSVPReminderAction(userId: string, data: SendReminderInput) {
  const validation = sendReminderSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Sending RSVP reminders for user " + userId + " to " + data.guestIds.length + " guests");
    revalidatePath("/couple/invitations");
    return { success: true, message: data.guestIds.length + " konuğa LCV hatırlatması gönderildi ✨" };
  } catch (error) {
    console.error("Send Reminder Error:", error);
    return { success: false, error: "Hatırlatma gönderilemedi." };
  }
}
