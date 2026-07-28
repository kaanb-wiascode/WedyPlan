"use client";

import React, { useState } from "react";
import SupportAgentHeader from "./SupportAgentHeader";
import AISupportAnalyticsWidget from "./AISupportAnalyticsWidget";
import SupportToolsBentoGrid from "./SupportToolsBentoGrid";
import SupportConsoleAndTicketsTable from "./SupportConsoleAndTicketsTable";

export default function AdminSupportClient() {
  const [aiReport] = useState({
    supportHealthScore: 99,
    resolutionRatePct: "%84.2",
    avgResponseTimeMin: "1.4 Dk",
    escalatedTicketsCount: 8,
    aiAnalysis: "Destek Ajanı bugün gelen 420 biletin %84.2'sini insan müdahalesiz RAG doğruluk güvencesiyle çözmüştür. Yüksek öncelikli finansal biletler otonom olarak insan uzmanlara aktarılmıştır.",
    recommendation: "Almanca ve Fransızca dillerinde gelen sözleşme sorularında RAG önbelleğinin güncellenmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SupportAgentHeader
        healthScore={aiReport.supportHealthScore}
        resolutionRate={aiReport.resolutionRatePct}
        avgResponseTime={aiReport.avgResponseTimeMin}
        escalatedCount={aiReport.escalatedTicketsCount}
        onOpenSupportConsole={() => alert("🎧 Support AI Agent Console")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISupportAnalyticsWidget aiReport={aiReport} />
          <SupportToolsBentoGrid />
        </div>

        <div className="lg:col-span-7 font-sans">
          <SupportConsoleAndTicketsTable />
        </div>
      </div>
    </div>
  );
}
