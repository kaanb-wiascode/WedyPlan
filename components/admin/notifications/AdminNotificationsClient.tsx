"use client";

import React, { useState } from "react";
import NotificationHeader from "./NotificationHeader";
import AINotificationWidget from "./AINotificationWidget";
import DeliveryAnalyticsBento from "./DeliveryAnalyticsBento";
import TemplatesAndQueueTable from "./TemplatesAndQueueTable";
import { dispatchTestNotificationAction } from "@/lib/actions/admin-notifications";

export default function AdminNotificationsClient() {
  const [aiReport] = useState({
    overallDeliveryRate: "%99.4 (Kusursuz İletim)",
    bestSendingWindow: "Salı & Perşembe 19:30 - 21:00 (Açılma Oranı +%34)",
    failedQueueCount: 2,
    aiAnalysis: "WhatsApp kanalındaki teslimat başarı oranı %99.8 ile zirvededir. E-posta kanalı açılma oranları 'Sözleşmeniz Onay Bekliyor' başlığında %68 seviyesine ulaşmıştır.",
    templateOptimizationSuggestion: "'Teklif Hatırlatma' SMS metnine çiftin adıyla başlanması tıklama oranını %18 artıracaktır.",
    channelHealth: {
      email: "ONLINE (Resend API 42ms)",
      sms: "ONLINE (Netgsm API 28ms)",
      whatsApp: "ONLINE (Meta Cloud API 35ms)",
      push: "ONLINE (FCM OK)",
    },
  });

  const handleDispatchTest = async () => {
    const res = await dispatchTestNotificationAction({
      channel: "WHATSAPP",
      recipient: "+90 532 111 2233",
      messageText: "WedyPlan Test Bildirimi: Sistem kanalları aktif!",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <NotificationHeader
        deliveryRate={aiReport.overallDeliveryRate}
        totalDispatchedMonth={342000}
        failedQueueCount={aiReport.failedQueueCount}
        onOpenTestModal={handleDispatchTest}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AINotificationWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <DeliveryAnalyticsBento channelHealth={aiReport.channelHealth} />
          <TemplatesAndQueueTable />
        </div>
      </div>
    </div>
  );
}
