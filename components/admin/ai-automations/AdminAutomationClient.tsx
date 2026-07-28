"use client";

import React, { useState } from "react";
import AutomationHeader from "./AutomationHeader";
import AIAutomationAnalyticsWidget from "./AIAutomationAnalyticsWidget";
import AutomationLibraryBento from "./AutomationLibraryBento";
import AutomationSimulatorConsole from "./AutomationSimulatorConsole";

export default function AdminAutomationClient() {
  const [aiReport] = useState({
    healthScorePct: 99.4,
    activeAutomationsCount: 48,
    savedHoursMonthly: 385,
    executionsTodayCount: 18420,
    aiAnalysis: "AI Automation Hub, son 30 günde platform genelinde 18,420 otonom işlemi %99.4 sağlık skoruyla gerçekleştirmiş, ekibe aylık 385 saat operasyonel zaman kazandırmıştır.",
    topRecommendation: "Pazaryeri modülündeki 'Son Dakika Boş Tarih Otomatik İndirimi' kuralının aktif edilmesiyle doluluk oranları %12 daha artırılabilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AutomationHeader
        healthScore={aiReport.healthScorePct}
        activeAutomations={aiReport.activeAutomationsCount}
        savedHours={aiReport.savedHoursMonthly}
        executionsToday={aiReport.executionsTodayCount}
        onOpenSimulatorModal={() => alert("⚡ AI Automation Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIAutomationAnalyticsWidget aiReport={aiReport} />
          <AutomationLibraryBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <AutomationSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
