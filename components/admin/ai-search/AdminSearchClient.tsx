"use client";

import React, { useState } from "react";
import SearchHeader from "./SearchHeader";
import AISearchAnalyticsWidget from "./AISearchAnalyticsWidget";
import SearchIntentBento from "./SearchIntentBento";
import SearchSimulatorConsole from "./SearchSimulatorConsole";

export default function AdminSearchClient() {
  const [aiReport] = useState({
    accuracyRatePct: 97.2,
    totalQueriesProcessed: "84.2K",
    avgLatencyMs: 42,
    zeroResultRecoveryRatePct: 94.5,
    aiAnalysis: "Search Intelligence Engine, hibrit sıralama algoritması sayesinde kullanıcıların doğal dille yaptığı aramaları %97.2 doğrulukla doğru tedarikçi ve mekanlarla eşleştirmiştir.",
    topRecommendation: "Sıfır sonuç veren 'Helikopterle Giriş Yapılabilen Mekanlar' sorgusu için tedarikçi özellik filtrelerine 'Heli-Pad' etiketinin eklenmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SearchHeader
        accuracyRate={aiReport.accuracyRatePct}
        totalQueries={aiReport.totalQueriesProcessed}
        avgLatencyMs={aiReport.avgLatencyMs}
        zeroResultRecovery={aiReport.zeroResultRecoveryRatePct}
        onOpenSimulatorModal={() => alert("🔍 Search Intelligence Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISearchAnalyticsWidget aiReport={aiReport} />
          <SearchIntentBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <SearchSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
