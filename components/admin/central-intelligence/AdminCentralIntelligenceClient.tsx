"use client";

import React, { useState } from "react";
import CentralHeader from "./CentralHeader";
import AICentralAnalyticsWidget from "./AICentralAnalyticsWidget";
import CentralAgentMeshBento from "./CentralAgentMeshBento";
import ExecutiveConsoleSimulator from "./ExecutiveConsoleSimulator";

export default function AdminCentralIntelligenceClient() {
  const [aiReport] = useState({
    globalPlatformHealthScorePct: 99.9,
    totalActiveAIServicesCount: 13,
    totalDailyMetaReasoningCount: "428K",
    crossAgentSyncLatencyMs: 12,
    aiAnalysis: "WedyPlan Central Intelligence, platformdaki 13 bağımsız AI servisini, 48 otonom kuralı ve tüm ajan ağlarını 12ms çapraz senkronizasyon hızı ve %99.9 küresel sağlık skoru ile yönetmektedir.",
    topRecommendation: "Kış sezonu geçişi öncesinde Dynamic Pricing ve Search Intelligence vektör indekslerinin küresel bellek üzerinden toplu yeniden senkronizasyonu önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CentralHeader
        healthScore={aiReport.globalPlatformHealthScorePct}
        activeServices={aiReport.totalActiveAIServicesCount}
        metaReasoningToday={aiReport.totalDailyMetaReasoningCount}
        syncLatencyMs={aiReport.crossAgentSyncLatencyMs}
        onOpenSimulatorModal={() => alert("🧠 WedyPlan Central Intelligence Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AICentralAnalyticsWidget aiReport={aiReport} />
          <CentralAgentMeshBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ExecutiveConsoleSimulator />
        </div>
      </div>
    </div>
  );
}
