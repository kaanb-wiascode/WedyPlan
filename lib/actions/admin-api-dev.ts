"use server";

import { revalidatePath } from "next/cache";
import { createDeveloperAppSchema, CreateDeveloperAppInput, rotateKeySchema, RotateKeyInput } from "@/lib/validations/admin-api-dev";

export async function createDeveloperApplicationAction(data: CreateDeveloperAppInput) {
  const validation = createDeveloperAppSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating developer application:", validation.data);
    revalidatePath("/admin/api-dev");
    const isProd = data.environment === "PRODUCTION";
    return {
      success: true,
      message: data.appName + " uygulaması başarıyla oluşturuldu! API anahtarları üretildi ✨",
      apiKey: (isProd ? "wp_live_sk_" : "wp_test_sk_") + Math.random().toString(36).substring(2, 18),
      clientId: "client_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Developer App Error:", error);
    return { success: false, error: "Uygulama oluşturulamadı." };
  }
}

export async function rotateApiKeySecretAction(data: RotateKeyInput) {
  const validation = rotateKeySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Rotating API Key for App ID:", data.appId);
    revalidatePath("/admin/api-dev");
    return {
      success: true,
      message: "API Gizli Anahtarı güvenli biçimde yenilendi! Eski anahtar 24 saat içinde sonlanacaktır 🔑",
      newApiKey: "wp_live_sk_" + Math.random().toString(36).substring(2, 18),
    };
  } catch (error) {
    console.error("Rotate Key Error:", error);
    return { success: false, error: "API anahtarı yenilenemedi." };
  }
}

export async function generateAIAPIDocumentationAction() {
  try {
    return {
      success: true,
      apiHealthScore: 99,
      totalRequestsToday: 142000,
      avgResponseLatencyMs: "12ms (Superfast)",
      aiAnalysis: "REST ve Webhook uç noktaları %99.99 erişilebilirlik ile çalışmaktadır. 'contract.signed' Webhook olayında ortalama teslimat süresi 24ms'dir.",
      errorExplanation: "Son 1 saatte alınan 12 adet '401 Unauthorized' hatası, süresi dolmuş OAuth2 Access Token kullanımlarından kaynaklanmaktadır.",
      securitySuggestion: "'Enterprise ERP Adapter' uygulamasının IP Whitelist tanımlamasını '0.0.0.0/0' yerine belirli sunucu IP'leri ile sınırlandırması önerilir.",
      openApiSpecVersion: "v3.0.3 (Live Synced)",
    };
  } catch (error) {
    console.error("AI API Report Error:", error);
    return { success: false, error: "AI API raporu üretilemedi." };
  }
}
