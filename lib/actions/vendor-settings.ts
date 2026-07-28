"use server";

import { revalidatePath } from "next/cache";
import { updateCompanySchema, UpdateCompanyInput, updateAIPrioritiesSchema, UpdateAIPrioritiesInput, updateRegionalTaxSchema, UpdateRegionalTaxInput } from "@/lib/validations/vendor-settings";

export async function updateVendorCompanySettingsAction(vendorId: string, data: UpdateCompanyInput) {
  const validation = updateCompanySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating company settings for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/settings");
    return {
      success: true,
      message: "Şirket bilgileri ve marka kimliği ayarları güncellendi ✨",
    };
  } catch (error) {
    console.error("Update Company Settings Error:", error);
    return { success: false, error: "Şirket ayarları güncellenemedi." };
  }
}

export async function updateVendorAIPreferencesAction(vendorId: string, data: UpdateAIPrioritiesInput) {
  const validation = updateAIPrioritiesSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating AI preferences for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/settings");
    return {
      success: true,
      message: "Yapay zeka marka sesi ve iletişim tercihleri kaydedildi ✨",
    };
  } catch (error) {
    console.error("Update AI Preferences Error:", error);
    return { success: false, error: "AI tercihleri güncellenemedi." };
  }
}

export async function triggerVendorDataBackupAction(vendorId: string) {
  try {
    console.log("Generating complete encrypted data backup for vendor " + vendorId);
    return {
      success: true,
      message: "Şifrelenmiş işletme yedek dosyanız (JSON & PDF kaseti) hazırlandı ve e-postanıza iletildi ✨",
      downloadUrl: "https://wedyplan.demo/backups/vendor_backup_" + Date.now() + ".zip",
    };
  } catch (error) {
    console.error("Trigger Backup Error:", error);
    return { success: false, error: "Yedekleme oluşturulamadı." };
  }
}
