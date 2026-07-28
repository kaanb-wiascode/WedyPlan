"use client";

import React, { useState } from "react";
import IntegrationHeader from "./IntegrationHeader";
import AIIntegrationDiagnosticsWidget from "./AIIntegrationDiagnosticsWidget";
import IntegrationCardGrid from "./IntegrationCardGrid";
import IntegrationLogsTable from "./IntegrationLogsTable";
import { toggleIntegrationConnectionAction } from "@/lib/actions/vendor-integrations";

export default function VendorIntegrationsClient({ vendorId }: { vendorId: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [aiData] = useState({
    overallHealthScore: 94,
    diagnostics: [
      {
        integrationName: "Google Calendar",
        status: "HEALTHY",
        latency: "32ms",
        message: "Çift yönlü takvim senkronizasyonu aktif.",
      },
      {
        integrationName: "WhatsApp Business API",
        status: "WARNING",
        latency: "120ms",
        message: "Access Token süresi 3 gün içinde dolacak. Yenileme önerilir.",
      },
    ],
    aiRecommendations: [
      "iyzico veya PayTR sanal pos entegrasyonunu bağlayarak müşterilerinizden kredi kartı ile kapora tahsilatını aktifleştirin.",
      "Açık hava düğün fotoğraflarının yedeklenmesi için Google Drive entegrasyonu otomatik kurala bağlandı.",
    ],
  });

  const [services, setServices] = useState([
    {
      id: "srv_google_cal",
      name: "Google Calendar",
      category: "Takvim",
      icon: "📅",
      description: "Düğün günlerini ve görüşmeleri Google Takviminiz ile iki yönlü senkronize edin.",
      isConnected: true,
      lastSync: "2 dakika önce",
    },
    {
      id: "srv_apple_cal",
      name: "Apple Calendar (iCal)",
      category: "Takvim",
      icon: "🍏",
      description: "macOS ve iOS cihazlarınızdaki takvim ile anlık canlı etkinlik senkronizasyonu.",
      isConnected: true,
      lastSync: "5 dakika önce",
    },
    {
      id: "srv_whatsapp",
      name: "WhatsApp Business API",
      category: "Mesajlaşma",
      icon: "💬",
      description: "Çiftlere otomatik teklif, hatırlatma ve sözleşme onay mesajları iletin.",
      isConnected: true,
      lastSync: "Anlık",
    },
    {
      id: "srv_gdrive",
      name: "Google Drive",
      category: "Bulut Depolama",
      icon: "📁",
      description: "Yüksek çözünürlüklü düğün fotoğrafları ve videoları için otomatik yedekleme.",
      isConnected: false,
      lastSync: null,
    },
    {
      id: "srv_iyzico",
      name: "iyzico Sanal POS",
      category: "Ödemeler",
      icon: "💳",
      description: "Kredi kartı ile kapora ve taksit ödemelerini doğrudan WedyPlan üzerinden tahsil edin.",
      isConnected: true,
      lastSync: "Anlık",
    },
    {
      id: "srv_webhooks",
      name: "Custom Webhooks & REST API",
      category: "Geliştirici",
      icon: "⚡",
      description: "Kendi CRM veya ERP sisteminize canlı event ve veri akışı sağlayan Webhook altyapısı.",
      isConnected: false,
      lastSync: null,
    },
  ]);

  const [logs] = useState([
    {
      id: "log_101",
      serviceName: "Google Calendar",
      action: "SYNC_WEDDING_EVENT",
      timestamp: "Bugün 01:12",
      latency: "32ms",
      status: "SUCCESS",
    },
    {
      id: "log_102",
      serviceName: "WhatsApp Business API",
      action: "SEND_PROPOSAL_NOTIFICATION",
      timestamp: "Bugün 00:45",
      latency: "118ms",
      status: "SUCCESS",
    },
    {
      id: "log_103",
      serviceName: "iyzico Sanal POS",
      action: "DEPOSIT_PAYMENT_WEBHOOK",
      timestamp: "Dün 22:30",
      latency: "44ms",
      status: "SUCCESS",
    },
  ]);

  const handleToggleConnection = async (id: string, currentConnected: boolean) => {
    const nextState = !currentConnected;
    const res = await toggleIntegrationConnectionAction(vendorId, {
      integrationId: id,
      connect: nextState,
    });

    if (res.success) {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isConnected: nextState } : s))
      );
      alert("✨ " + res.message);
    }
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const connectedCount = services.filter((s) => s.isConnected).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <IntegrationHeader
        connectedCount={connectedCount}
        totalServicesCount={services.length}
        healthScore={aiData.overallHealthScore}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIIntegrationDiagnosticsWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <IntegrationCardGrid
            services={filteredServices}
            onToggleConnection={handleToggleConnection}
          />
          <IntegrationLogsTable logs={logs} />
        </div>
      </div>
    </div>
  );
}
