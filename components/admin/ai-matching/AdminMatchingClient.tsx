"use client";

import React, { useState } from "react";
import MatchingHeader from "./MatchingHeader";
import AIMatchingAnalyticsWidget from "./AIMatchingAnalyticsWidget";
import MatchingFactorsBento from "./MatchingFactorsBento";
import MatchingExplorerTable from "./MatchingExplorerTable";

export default function AdminMatchingClient() {
  const [aiReport] = useState({
    matchingEngineHealthScore: 99,
    successfulMatchRatePct: "%94.2",
    avgMatchingLatencyMs: "6ms",
    totalMatchesToday: 18400,
    aiAnalysis: "Vendor Matching Engine son 24 saatte 18.400 eşleştirme sorgusu yürütmüş, %94.2 yüksek uyumluluk skoru yakalamıştır. 12 Faktörlü Matris sayesinde teklif reddetme oranları %32 düşmüştür.",
    recommendation: "Fotoğrafçılık kategorisinde 'Portfolio Quality' faktör ağırlığının %25'ten %30'a yükseltilmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MatchingHeader
        healthScore={aiReport.matchingEngineHealthScore}
        successfulMatchRate={aiReport.successfulMatchRatePct}
        avgLatency={aiReport.avgMatchingLatencyMs}
        totalMatchesToday={aiReport.totalMatchesToday}
        onOpenMatchTesterModal={() => alert("🎯 Live 12-Factor Matchmaking Tester Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMatchingAnalyticsWidget aiReport={aiReport} />
          <MatchingFactorsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <MatchingExplorerTable />
        </div>
      </div>
    </div>
  );
}
