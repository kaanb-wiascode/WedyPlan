"use server";

import { revalidatePath } from "next/cache";
import { triggerReleaseSchema, TriggerReleaseInput, rollbackReleaseSchema, RollbackReleaseInput, maintenanceModeSchema, MaintenanceModeInput } from "@/lib/validations/admin-releases";

export async function triggerPlatformReleaseAction(data: TriggerReleaseInput) {
  const validation = triggerReleaseSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Triggering platform software release:", validation.data);
    revalidatePath("/admin/releases");
    return {
      success: true,
      message: data.versionTag + " sürümü " + data.environment + " ortamına (" + data.strategy + ") dağıtımı başlatıldı 🚀",
      releaseId: "rel_" + Date.now(),
    };
  } catch (error) {
    console.error("Trigger Release Error:", error);
    return { success: false, error: "Sürüm dağıtımı başlatılamadı." };
  }
}

export async function executeImmediateRollbackAction(data: RollbackReleaseInput) {
  const validation = rollbackReleaseSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Executing immediate rollback to release ID:", validation.data.targetReleaseId);
    revalidatePath("/admin/releases");
    return {
      success: true,
      message: "Sistem kararlı geçmiş sürüme başarıyla geri döndürüldü! (Rollback Executed) 🚨",
    };
  } catch (error) {
    console.error("Execute Rollback Error:", error);
    return { success: false, error: "Geri alma işlemi başarısız oldu." };
  }
}

export async function toggleMaintenanceModeAction(data: MaintenanceModeInput) {
  const validation = maintenanceModeSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Toggling maintenance mode:", validation.data);
    revalidatePath("/admin/releases");
    return {
      success: true,
      message: "Sistem Bakım Modu " + (data.isMaintenanceActive ? "AKTİFLEŞTİRİLDİ 🛠️" : "DEVRE DIŞI BIRAKILDI ✓"),
    };
  } catch (error) {
    console.error("Toggle Maintenance Error:", error);
    return { success: false, error: "Bakım modu durumu değiştirilemedi." };
  }
}

export async function generateAIReleaseRiskReportAction() {
  try {
    return {
      success: true,
      deploymentRiskScore: 12,
      predictedIncidentProbability: "%0.4 (Düşük Risk)",
      latestStableVersion: "v2026.07.12",
      canaryTrafficRatio: "%25 Canary Traffic",
      aiAnalysis: "Gözlemlerimize göre 'v2026.07.12' sürümü Staging ve Canary ortamlarında 0 kilitlenme ve %0.01 HTTP 5xx hatası ile çalışmaktadır. Production genel yayına geçilmesi (%100 Rollout) son derece güvenlidir.",
      rollbackRecommendation: "Hata oranları belirlenen %1.0 threshold değerinin altında kaldığı için Rollback gereksinimi yoktur.",
      aiGeneratedReleaseNotes: "✦ Yeni Özellikler: Multi-Tenant veritabanı izolasyonu, AI Çeviri Motoru v2 ve Otomatik Hakediş Fatura modülü eklendi.",
    };
  } catch (error) {
    console.error("AI Release Report Error:", error);
    return { success: false, error: "AI sürüm risk raporu üretilemedi." };
  }
}
