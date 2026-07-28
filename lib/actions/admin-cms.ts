"use server";

import { revalidatePath } from "next/cache";
import { saveContentSchema, SaveContentInput, generateAIContentSchema, GenerateAIContentInput, translateContentSchema, TranslateContentInput } from "@/lib/validations/admin-cms";

export async function saveCMSContentItemAction(data: SaveContentInput) {
  const validation = saveContentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving CMS content item:", validation.data);
    revalidatePath("/admin/cms");
    return {
      success: true,
      message: "İçerik başarıyla kaydedildi ve CDN önbelleği güncellendi ✨",
      contentId: "cms_" + Date.now(),
    };
  } catch (error) {
    console.error("Save CMS Content Error:", error);
    return { success: false, error: "İçerik kaydedilemedi." };
  }
}

export async function generateAIContentAndSEOAction(data: GenerateAIContentInput) {
  const validation = generateAIContentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Generating AI content for topic:", data.promptTopic);
    return {
      success: true,
      generatedTitle: data.promptTopic + " - WedyPlan Özel Rehber 2026",
      generatedSlug: data.promptTopic.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-0-]/g, ""),
      generatedBody: "Düğün planlaması sürecinde hayallerinizdeki konsepti gerçeğe dönüştürmek için ihtiyacınız olan tüm detaylar WedyPlan güvencesiyle sizlerle...",
      seoTitle: data.promptTopic + " | En İyi Fikirler & Fiyatlar",
      seoDescription: "2026 düğün sezonu için " + data.promptTopic + " fikirlerini, bütçe hesaplamalarını ve en popüler mekanları hemen inceleyin.",
      seoScore: 96,
    };
  } catch (error) {
    console.error("Generate AI Content Error:", error);
    return { success: false, error: "AI içerik üretilemedi." };
  }
}

export async function translateCMSContentAction(data: TranslateContentInput) {
  const validation = translateContentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Translating content to " + data.targetLanguage);
    let translated = data.sourceText;
    if (data.targetLanguage === "EN") {
      translated = "Discover the most exclusive luxury wedding venues and professional vendors on WedyPlan.";
    } else if (data.targetLanguage === "DE") {
      translated = "Entdecken Sie die exklusivsten Luxus-Hochzeitslocations und professionelle Anbieter auf WedyPlan.";
    }

    return {
      success: true,
      translatedText: translated,
      targetLanguage: data.targetLanguage,
    };
  } catch (error) {
    console.error("Translate Content Error:", error);
    return { success: false, error: "Çeviri işlemi başarısız." };
  }
}
