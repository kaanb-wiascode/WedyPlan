"use server";

import { revalidatePath } from "next/cache";
import { websiteSettingsSchema, WebsiteSettingsInput, generateStorySchema, GenerateStoryInput } from "@/lib/validations/website";

export async function saveWebsiteSettingsAction(userId: string, data: WebsiteSettingsInput) {
  const validation = websiteSettingsSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving website settings for user " + userId + ":", validation.data);
    revalidatePath("/couple/website");
    return { success: true, message: "Düğün web siteniz başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Save Website Error:", error);
    return { success: false, error: "Web sitesi ayarları kaydedilemedi." };
  }
}

export async function generateAIStoryAction(data: GenerateStoryInput) {
  const validation = generateStorySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Geçersiz girdi verisi." };
  }

  try {
    const generatedStory = "Her şey küçük bir kahve molasıyla başladı... " + data.howWeMet + " " +
      (data.proposalDetails ? "Ve Bodrum'da gün batımında unutulmaz o evlilik teklifi geldi: " + data.proposalDetails : "") +
      " Şimdi hayatımızın en özel gününü siz sevdiklerimizle kutlamaya hazırlanıyoruz!";

    return {
      success: true,
      storyTitle: "Bizim Masalımız",
      storyContent: generatedStory,
      seoSuggestions: {
        title: "Selin & Kaan Düğün Daveti | 19 Haziran 2027",
        description: "Selin & Kaan'ın Bodrum Sunset Venue'deki düğün davetine ait LCV, konum ve detaylar.",
      },
    };
  } catch (error) {
    console.error("AI Story Error:", error);
    return { success: false, error: "AI hikaye oluşturulamadı." };
  }
}

export async function publishWebsiteAction(userId: string, slug: string) {
  try {
    console.log("Publishing website for user " + userId + " with slug " + slug);
    revalidatePath("/couple/website");
    return {
      success: true,
      publishedUrl: "https://wed.yplan.com/" + slug,
      message: "Tebrikler! Düğün web siteniz canlıya alındı ✨",
    };
  } catch (error) {
    console.error("Publish Website Error:", error);
    return { success: false, error: "Web sitesi yayınlanamadı." };
  }
}
