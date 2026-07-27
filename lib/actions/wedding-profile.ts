"use server";

import { revalidatePath } from "next/cache";
import { weddingProfileSchema, WeddingProfileFormData } from "@/lib/validations/wedding-profile";

export async function updateWeddingProfile(userId: string, data: WeddingProfileFormData) {
  const validation = weddingProfileSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    // Veritabanı güncelleme simülasyonu / Prisma entegrasyonu
    console.log(`[Database Update] Wedding profile updated for user: ${userId}`, validation.data);

    revalidatePath("/couple/profile");
    return { success: true, message: "Düğün profiliniz başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Wedding profile update error:", error);
    return { success: false, error: "Profil güncellenirken bir hata oluştu." };
  }
}