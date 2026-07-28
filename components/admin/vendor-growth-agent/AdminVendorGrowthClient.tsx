"use client";

import React, { useState } from "react";
import VendorGrowthHeader from "./VendorGrowthHeader";
import AIVendorCoachAnalyticsWidget from "./AIVendorCoachAnalyticsWidget";
import VendorToolsBentoGrid from "./VendorToolsBentoGrid";
import VendorAgentConsole from "./VendorAgentConsole";

export default function AdminVendorGrowthClient() {
  const [aiReport] = useState({
    businessHealthScore: 92,
    conversionRatePct: "%28.4",
    avgResponseTimeMin: "12 Dk",
    dailyBusinessBriefing: "Günaydın! İşletmeniz %92 sağlık skoru ile yüksek performans gösteriyor. Bu hafta 320 profil ziyareti ve 8 doğrudan mesaj aldınız.",
    opportunityDetection: "Fotoğraf ve Video paketlerinize 'Drone Çekimi' opsiyonu eklemeniz durumunda ortalama sepet tutarınız %18 artacaktır.",
    competitorAnalysis: "Bodrum bölgesindeki lüks mekanların ortalama menü fiyatı 2.200 TL'dir. Fiyatlandırmanız son derece rekabetçidir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorGrowthHeader
        healthScore={aiReport.businessHealthScore}
        conversionRate={aiReport.conversionRatePct}
        avgResponseTime={aiReport.avgResponseTimeMin}
        onOpenCoachModal={() => alert("📈 B2B Satış Koçu Copilot Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIVendorCoachAnalyticsWidget aiReport={aiReport} />
          <VendorToolsBentoGrid />
        </div>

        <div className="lg:col-span-7 font-sans">
          <VendorAgentConsole />
        </div>
      </div>
    </div>
  );
}
