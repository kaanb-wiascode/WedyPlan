"use client";

import React, { useState } from "react";
import WeddingPlannerHeader from "./WeddingPlannerHeader";
import AIReadinessAndRiskWidget from "./AIReadinessAndRiskWidget";
import PlannerToolsBentoGrid from "./PlannerToolsBentoGrid";
import AgentConversationConsole from "./AgentConversationConsole";

export default function AdminWeddingPlannerClient() {
  const [aiReport] = useState({
    weddingReadinessScore: 84,
    daysRemaining: 98,
    riskLevel: "DÜŞÜK RİSK",
    dailyPlan: "Bugün: Fotoğrafçı portföy incelemesi ve tadım randevusu teyidi.",
    weeklyPlan: "Bu Hafta: Davetiye baskı taslağının onaylanması ve LCV listesi güncellemesi.",
    monthlyPlan: "Bu Ay: Gelinlik/Damatlık son provası ve müzik orkestrası repertuar seçimi.",
    aiAnalysis: "Çiftin düğün hazırlıkları %84 hazır durumdadır. Kritik zaman tünelinde hiçbir gecikme yok. Bütçe harcama oranı %62 seviyesinde dengelidir.",
    riskAlerts: [
      "Catering menü seçimi için son 14 gün. Zamanında tamamlanmazsa tedarikçi opsiyonu düşebilir.",
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <WeddingPlannerHeader
        readinessScore={aiReport.weddingReadinessScore}
        daysRemaining={aiReport.daysRemaining}
        riskLevel={aiReport.riskLevel}
        onOpenCopilotModal={() => alert("💍 AI Düğün Asistanı Copilot Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIReadinessAndRiskWidget aiReport={aiReport} />
          <PlannerToolsBentoGrid />
        </div>

        <div className="lg:col-span-7 font-sans">
          <AgentConversationConsole />
        </div>
      </div>
    </div>
  );
}
