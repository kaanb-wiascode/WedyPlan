"use client";

import React, { useState } from "react";
import IntegrationHeader from "./IntegrationHeader";
import AIIntegrationDiagnosticsWidget from "./AIIntegrationDiagnosticsWidget";
import ProvidersStatusBento from "./ProvidersStatusBento";
import SyncLogsAndWebhooksTable from "./SyncLogsAndWebhooksTable";
import { testIntegrationConnectionAction } from "@/lib/actions/admin-integrations";

export default function AdminIntegrationsClient() {
  const [aiReport] = useState({
    globalHealthScore: 99,
    totalActiveIntegrations: 9,
    avgSystemLatencyMs: "24ms (Mükemmel)",
    failedWebhooksCount: 1,
    aiAnalysis: "Tüm dış API servisleri kesintisiz çalışmaktadır. iyzico ödeme altyapısı ortalama 32ms ile en yüksek performansında yanıt vermektedir.",
    failurePredictionWarning: "Google Calendar API kota kullanımı yoğun saatlerde (14:00 - 17:00) %85 seviyesine yaklaşıyor. Arka plan senkronizasyonu için 'Rate-Limit Smoothing' devrededir.",
    recommendation: "AWS S3 görsel depolama erişim anahtarının süresi 60 gün içinde dolacaktır. Anahtar yenileme (Key Rotation) önerilir.",
  });

  const [providers] = useState([
    { id: "GOOGLE", name: "Google API (OAuth & Calendar)", icon: "🌐", category: "Takvim & Auth", latency: "18ms", version: "v3", status: "HEALTHY", lastSync: "1 Dk Önce" },
    { id: "APPLE", name: "Apple Sign-In & APNs", icon: "🍎", category: "Auth & Push", latency: "14ms", version: "v1", status: "HEALTHY", lastSync: "Anlık" },
    { id: "META", name: "Meta & WhatsApp Cloud API", icon: "💬", category: "Mesajlaşma", latency: "35ms", version: "v19.0", status: "HEALTHY", lastSync: "3 Dk Önce" },
    { id: "IYZICO", name: "iyzico Escrow Payment POS", icon: "💳", category: "Ödeme Geçidi", latency: "32ms", version: "v2", status: "HEALTHY", lastSync: "Anlık" },
    { id: "STRIPE", name: "Stripe Global Connect", icon: "💵", category: "Uluslararası POS", latency: "28ms", version: "v2026-03", status: "HEALTHY", lastSync: "5 Dk Önce" },
    { id: "CLOUDFLARE", name: "Cloudflare R2 & CDN", icon: "🛡️", category: "Depolama & Güvenlik", latency: "12ms", version: "v4", status: "HEALTHY", lastSync: "Anlık" },
    { id: "AWS", name: "AWS S3 & SES Email", icon: "☁️", category: "Bulut Depolama", latency: "22ms", version: "v2026", status: "HEALTHY", lastSync: "Anlık" },
  ]);

  const [webhookLogs] = useState([
    { id: "log_w_101", provider: "IYZICO", eventType: "PAYMENT_SETTLEMENT_SUCCESS", timestamp: "01:48:12", httpCode: "200 OK", durationMs: 28, status: "SUCCESS" },
    { id: "log_w_102", provider: "WHATSAPP", eventType: "MESSAGE_DELIVERY_ACK", timestamp: "01:42:05", httpCode: "200 OK", durationMs: 34, status: "SUCCESS" },
    { id: "log_w_103", provider: "GOOGLE", eventType: "CALENDAR_EVENT_SYNC", timestamp: "01:30:00", httpCode: "500 TIMEOUT", durationMs: 1200, status: "FAILED" },
  ]);

  const handleTestConnection = async (providerKey: string) => {
    const res = await testIntegrationConnectionAction({
      providerKey: providerKey as any,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <IntegrationHeader
        globalHealthScore={aiReport.globalHealthScore}
        activeIntegrationsCount={providers.length}
        failedWebhooksCount={aiReport.failedWebhooksCount}
        onTriggerGlobalDiagnostic={() => alert("🔍 AI Tüm Entegrasyonları Bağlantı Testine Tabi Tutuyor...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIIntegrationDiagnosticsWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ProvidersStatusBento
            providers={providers}
            onTestConnection={handleTestConnection}
          />
          <SyncLogsAndWebhooksTable webhookLogs={webhookLogs} />
        </div>
      </div>
    </div>
  );
}
