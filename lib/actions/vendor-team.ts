"use server";

import { revalidatePath } from "next/cache";
import { inviteEmployeeSchema, InviteEmployeeInput, updatePermissionsSchema, UpdatePermissionsInput } from "@/lib/validations/vendor-team";

export async function inviteVendorEmployeeAction(vendorId: string, data: InviteEmployeeInput) {
  const validation = inviteEmployeeSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Inviting employee for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/team");
    return {
      success: true,
      message: "Ekip daveti e-posta adresine başarıyla gönderildi ✨",
      employeeId: "emp_" + Date.now(),
    };
  } catch (error) {
    console.error("Invite Employee Error:", error);
    return { success: false, error: "Davet gönderilemedi." };
  }
}

export async function updateEmployeePermissionsAction(vendorId: string, data: UpdatePermissionsInput) {
  const validation = updatePermissionsSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating permissions for employee " + data.employeeId + " for vendor " + vendorId);
    revalidatePath("/vendor/team");
    return { success: true, message: "Rol ve yetkiler başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Update Permissions Error:", error);
    return { success: false, error: "Yetkiler güncellenemedi." };
  }
}

export async function analyzeAITeamWorkloadAction(vendorId: string) {
  try {
    return {
      success: true,
      teamWorkloadScore: 84,
      overworkedEmployees: [
        { name: "Ahmet Yılmaz", role: "Saha Koordinatörü", hoursThisWeek: 48, risk: "YÜKSEK TÜKENMİŞLİK RİSKİ" },
      ],
      shiftSuggestions: [
        "19 Haziran Cumartesi düğünü için 350 kişilik yemek servisine +2 destek garson personeli atanması önerilir.",
      ],
      conflictAlerts: [
        "Mehmet Demir (Baş Şef) aynı saat diliminde 2 farklı etkinlik mutfağına atanmış.",
      ],
    };
  } catch (error) {
    console.error("AI Team Analysis Error:", error);
    return { success: false, error: "AI ekip analizi yapılamadı." };
  }
}
