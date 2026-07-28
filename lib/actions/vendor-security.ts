"use server";

import { revalidatePath } from "next/cache";
import { createApiKeySchema, CreateApiKeyInput, revokeSessionSchema, RevokeSessionInput, requestDataExportSchema, RequestDataExportInput } from "@/lib/validations/vendor-security";

export async function revokeVendorSessionAction(vendorId: string, data: RevokeSessionInput) {
  const validation = revokeSessionSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Revoking session " + data.sessionId + " for vendor " + vendorId);
    revalidatePath("/vendor/security");
    return {
      success: true,
      message: "Seçilen cihaz oturumu başarıyla kapatıldı ve yetkisi kaldırıldı ✨",
    };
  } catch (error) {
    console.error("Revoke Session Error:", error);
    return { success: false, error: "Oturum kapatılamadı." };
  }
}

export async function generateVendorApiKeyAction(vendorId: string, data: CreateApiKeyInput) {
  const validation = createApiKeySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const rawKey = "sk_live_wedy_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log("Generated API key for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/security");
    return {
      success: true,
      message: "Yeni API Anahtarı üretildi. Güvenliğiniz için bu anahtarı bir daha göremeyeceksiniz! ✨",
      apiKey: rawKey,
    };
  } catch (error) {
    console.error("Generate API Key Error:", error);
    return { success: false, error: "API anahtarı üretilemedi." };
  }
}

export async function requestVendorDataExportAction(vendorId: string, data: RequestDataExportInput) {
  const validation = requestDataExportSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Exporting KVKK/GDPR data archive for vendor " + vendorId);
    return {
      success: true,
      message: "KVKK/GDPR Veri Paketiniz (256-bit AES Şifreli ZIP) hazırlandı ve e-postanıza iletildi ✨",
      exportUrl: "https://wedyplan.demo/security/exports/vendor_data_export_" + Date.now() + ".zip",
    };
  } catch (error) {
    console.error("Data Export Error:", error);
    return { success: false, error: "Veri paketi oluşturulamadı." };
  }
}

export async function generateAISecurityAnalysisAction(vendorId: string) {
  try {
    return {
      success: true,
      securityScore: 98,
      blockedThreatsCount: 2,
      suspiciousLogins: [
        {
          timestamp: "Dün 23:14",
          ip: "185.220.101.5",
          location: "Berlin, Almanya (VPN / Tor Node)",
          actionTaken: "AI TARAFINDAN OTOMATİK ENGELLENDİ",
          reason: "İmkansız Seyahat (10 dk önce İstanbul'dan aktif oturum var)",
        },
      ],
      aiSecurityRecommendations: [
        "API Anahtarlarınızın süresi 90 günden uzun. Anahtar yenileme (Credential Rotation) önerilir.",
        "Authenticator App (2FA) doğrulaması aktif. Güvenlik yedek kodlarınızı güvenli bir kasaya kaydedin.",
      ],
    };
  } catch (error) {
    console.error("AI Security Analysis Error:", error);
    return { success: false, error: "AI güvenlik analizi üretilemedi." };
  }
}
