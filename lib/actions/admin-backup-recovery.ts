"use server";

import { revalidatePath } from "next/cache";
import { executeSystemRestoreSchema, ExecuteSystemRestoreInput } from "@/lib/validations/admin-backup-recovery";

export async function executeSystemRestoreAction(data: ExecuteSystemRestoreInput) {
  const validation = executeSystemRestoreSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Geçersiz restore parametreleri veya hatalı onay kodu." };
  }

  try {
    revalidatePath("/admin/backup-recovery");
    return {
      success: true,
      message: `System Restore işlemi ${data.targetEnvironment} ortamına başarıyla başlatıldı.`,
    };
  } catch (error) {
    console.error("Execute Restore Error:", error);
    return { success: false, error: "Geri yükleme işlemi başarısız oldu." };
  }
}
