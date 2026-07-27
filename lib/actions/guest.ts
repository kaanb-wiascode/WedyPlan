"use server";

import { revalidatePath } from "next/cache";
import { guestSchema, GuestFormData } from "@/lib/validations/guest";

export async function createGuestAction(userId: string, data: GuestFormData) {
  const validation = guestSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating guest for user " + userId + ":", validation.data);
    revalidatePath("/couple/guests");
    return { success: true, message: "Misafir başarıyla eklendi ✨" };
  } catch (error) {
    console.error("Create Guest Error:", error);
    return { success: false, error: "Misafir eklenirken bir hata oluştu." };
  }
}

export async function updateRSVPAction(guestId: string, rsvpStatus: "CONFIRMED" | "DECLINED") {
  try {
    console.log("Updating RSVP for guest " + guestId + " to " + rsvpStatus);
    revalidatePath("/couple/guests");
    return { success: true, message: "LCV yanıtı güncellendi." };
  } catch (error) {
    console.error("RSVP Update Error:", error);
    return { success: false, error: "LCV güncellenemedi." };
  }
}
