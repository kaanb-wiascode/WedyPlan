"use client";

import React, { useState } from "react";
import AdminExecutiveHeader from "./AdminExecutiveHeader";
import AIPlatformBriefingWidget from "./AIPlatformBriefingWidget";
import PlatformKpiBentoGrid from "./PlatformKpiBentoGrid";
import InfrastructureHealthWidget from "./InfrastructureHealthWidget";
import { executePlatformEmergencyAction } from "@/lib/actions/admin-dashboard";

export default function AdminDashboardClient() {
  const [metrics] = useState({
    financials: {
      mrr: "1.420.000 ₺",
      mrrGrowth: "+%18.4",
      arr: "17.040.000 ₺",
      grossMerchandiseValue: "148.500.000 ₺",
      activeSubscriptions: 840,
    },
    ecosystem: {
      activeCouples: 14250,
      activeVendors: 840,
      pendingVendorApprovals: 12,
      supportQueueOpenCount: 4,
      openIncidentsCount: 0,
    },
    growthAndTraffic: {
      monthlyVisitors: "340.000",
      conversionRate: "%4.2",
      cancellationRate: "%1.1",
      refundRate: "%0.3",
    },
    infrastructure: {
      dbHealth: "HEALTHY (18ms)",
      apiHealth: "ONLINE (28ms)",
      queueHealth: "0 PENDING (Redis OK)",
      storageUsedGb: 1420,
      aiModelStatus: "OPERATIONAL (GPT-4o & Claude 3.5)",
    },
  });

  const [aiData] = useState({
    businessHealthScore: 98,
    executiveBriefing: "Günaydın WedyPlan Yönetimi! Platform MRR'ı bu ay %18.4 büyüme ile 1.420.000 ₺ barajını aştı. Ekosistemde 14.250 aktif çift ve 840 doğrulanmış tedarikçi bulunuyor. Tüm altyapı servisleri %99.99 erişilebilirlik ile çalışıyor.",
    todaysRisks: [
      "12 adet yeni tedarikçi başvurusu onay bekliyor (SLA süresi 24 saati geçmek üzere).",
    ],
    growthOpportunities: [
      "Gelinlik & Abiye kategorisindeki arama hacmi son 7 günde %64 arttı. Bu alanda onboarding kampanyası başlatılması önerilir.",
    ],
    revenueForecast: "Mevcut büyüme hızıyla yıl sonu ARR hedefi olan 20.000.000 ₺ sınırının aşılması öngörülmektedir.",
  });

  const handleActionMock = async () => {
    const res = await executePlatformEmergencyAction({
      actionType: "APPROVE_VENDOR",
      reason: "Yönetici hızlı onay paneli",
    });

    if (res.success) {
      alert("👑 " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminExecutiveHeader
        mrrAmount={metrics.financials.mrr}
        activeCouplesCount={metrics.ecosystem.activeCouples}
        activeVendorsCount={metrics.ecosystem.activeVendors}
        onTriggerAction={handleActionMock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPlatformBriefingWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <PlatformKpiBentoGrid metrics={metrics} />
          <InfrastructureHealthWidget infra={metrics.infrastructure} />
        </div>
      </div>
    </div>
  );
}
