"use client";

import React, { useState } from "react";
import AdminCopilotHeader from "./AdminCopilotHeader";
import AIExecutiveSummaryWidget from "./AIExecutiveSummaryWidget";
import AdminResponsibilitiesBento from "./AdminResponsibilitiesBento";
import CopilotConsoleAndActionsTable from "./CopilotConsoleAndActionsTable";

export default function AdminAdminCopilotClient() {
  const [aiReport] = useState({
    platformHealthScore: 99,
    dailyNetRevenue: "₺1.420.000",
    activeCouplesCount: 14200,
    activeVendorsCount: 840,
    incidentSummary: "Sistemde 0 açık insidant bulunmaktadır. Son 24 saatte 142.800 API isteği ortalama 14ms gecikmeyle işlenmiştir.",
    riskAnalysis: "Marmara bölgesindeki 2 fotoğrafçının müşteri yanıt süresi 4 saati aştı. Müşteri memnuniyetini korumak için hatırlatma gönderildi.",
    actionSuggestions: [
      "Onay bekleyen 3 yeni tedarikçinin evrak doğrulamasını tamamla.",
      "Mayıs ayı öne çıkarılan vitrin ilan kotalarını %15 artır.",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminCopilotHeader
        healthScore={aiReport.platformHealthScore}
        dailyRevenue={aiReport.dailyNetRevenue}
        activeCouples={aiReport.activeCouplesCount}
        activeVendors={aiReport.activeVendorsCount}
        onOpenCopilotConsole={() => alert("👑 Executive Admin Copilot Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIExecutiveSummaryWidget aiReport={aiReport} />
          <AdminResponsibilitiesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <CopilotConsoleAndActionsTable />
        </div>
      </div>
    </div>
  );
}
