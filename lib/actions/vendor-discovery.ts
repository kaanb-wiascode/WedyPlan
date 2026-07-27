"use server";

import { revalidatePath } from "next/cache";
import { vendorFilterSchema, VendorFilterFormData } from "@/lib/validations/vendor-discovery";

export async function toggleVendorFavoriteAction(userId: string, vendorId: string) {
  try {
    console.log("Toggling favorite vendor " + vendorId + " for user " + userId);
    revalidatePath("/couple/vendors");
    return { success: true, message: "Favori durumu güncellendi ✨" };
  } catch (error) {
    console.error("Toggle Favorite Error:", error);
    return { success: false, error: "Favori eklenemedi." };
  }
}

export async function calculateAIMatchScoreAction(userId: string, vendorId: string) {
  try {
    return {
      success: true,
      matchScore: 96,
      budgetMatch: 98,
      styleMatch: 95,
      availabilityMatch: 100,
    };
  } catch (error) {
    console.error("AI Match Error:", error);
    return { success: false, matchScore: 80 };
  }
}
