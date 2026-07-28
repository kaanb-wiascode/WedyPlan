"use server";

import { revalidatePath } from "next/cache";
import { reviewReplySchema, ReviewReplyInput, sendReviewRequestSchema, SendReviewRequestInput } from "@/lib/validations/vendor-reviews";

export async function replyToReviewAction(vendorId: string, data: ReviewReplyInput) {
  const validation = reviewReplySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Replying to review " + data.reviewId + " for vendor " + vendorId + ":", data.replyText);
    revalidatePath("/vendor/reviews");
    return {
      success: true,
      message: "Yanıtınız başarıyla yayınlandı ve çifte bildirildi ✨",
    };
  } catch (error) {
    console.error("Reply Review Error:", error);
    return { success: false, error: "Yanıt yayınlanamadı." };
  }
}

export async function pinReviewAction(vendorId: string, reviewId: string, isPinned: boolean) {
  try {
    console.log("Toggling pin status for review " + reviewId + " to " + isPinned);
    revalidatePath("/vendor/reviews");
    return {
      success: true,
      message: isPinned ? "Yorum vitrin en üstüne sabitlendi 📌" : "Yorum sabitlemesi kaldırıldı",
    };
  } catch (error) {
    console.error("Pin Review Error:", error);
    return { success: false, error: "Yorum sabitlenemedi." };
  }
}

export async function generateAIReviewReplyAction(coupleName: string, rating: number, reviewText: string) {
  try {
    let reply = "";
    if (rating >= 4) {
      reply = "Sayın " + coupleName + ", Bodrum Sunset Venue ailesi olarak en özel gününüzde sizlere hizmet vermekten büyük mutluluk duyduk. Güzel temennileriniz için teşekkür eder, ömür boyu mutluluklar dileriz! ✨";
    } else {
      reply = "Sayın " + coupleName + ", yaşadığınız olumsuz deneyim için içtenlikle üzgünüz. Müşteri memnuniyeti bizim için her şeyden önceliklidir. Konuyu detaylıca görüşmek ve telafi etmek adına sizinle en kısa sürede iletişime geçeceğiz.";
    }

    return {
      success: true,
      suggestedReply: reply,
      sentiment: rating >= 4 ? "POZİTİF (%98)" : "AÇIKLAMA GEREKTİREN (NEGATİF)",
      crisisAlert: rating < 3,
    };
  } catch (error) {
    console.error("AI Review Reply Error:", error);
    return { success: false, error: "AI yanıtı üretilemedi." };
  }
}

export async function sendReviewRequestAction(vendorId: string, data: SendReviewRequestInput) {
  const validation = sendReviewRequestSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Sending review request to " + data.coupleName + " for vendor " + vendorId);
    revalidatePath("/vendor/reviews");
    return {
      success: true,
      message: "Yorum & Değerlendirme daveti linki çifte başarıyla iletildi ✨",
    };
  } catch (error) {
    console.error("Send Review Request Error:", error);
    return { success: false, error: "Davet gönderilemedi." };
  }
}
