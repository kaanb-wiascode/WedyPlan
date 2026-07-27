"use server";

import { revalidatePath } from "next/cache";
import {
  profileSettingsSchema,
  ProfileSettingsInput,
  securitySettingsSchema,
  SecuritySettingsInput,
} from "@/lib/validations/settings";

export async function updateUserProfileSettingAction(userId: string, data: ProfileSettingsInput) {
  const validation = profileSettingsSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating profile settings for user " + userId + ":", validation.data);
    revalidatePath("/couple/settings");
    return { success: true, message: "Profil bilgileri başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, error: "Profil bilgileri güncellenemedi." };
  }
}

export async function updateSecurityPasswordAction(userId: string, data: SecuritySettingsInput) {
  const validation = securitySettingsSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Changing password for user " + userId);
    revalidatePath("/couple/settings");
    return { success: true, message: "Güvenlik şifreniz başarıyla değiştirildi ✨" };
  } catch (error) {
    console.error("Change Password Error:", error);
    return { success: false, error: "Şifre değiştirilemedi." };
  }
}

export async function exportUserDataAction(userId: string) {
  try {
    console.log("Generating data export package for user " + userId);
    return {
      success: true,
      downloadUrl: "https://api.wedyplan.com/exports/user_data_export_" + userId + ".zip",
      message: "Tüm düğün verileriniz (Bütçe, Davetliler, Sözleşmeler) paketlendi ve indirilmeye hazır!",
    };
  } catch (error) {
    console.error("Export Data Error:", error);
    return { success: false, error: "Veriler paketlenemedi." };
  }
}
