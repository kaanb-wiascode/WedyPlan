"use client";

import React, { useState } from "react";
import ExperimentHeader from "./ExperimentHeader";
import AIExperimentAnalyticsWidget from "./AIExperimentAnalyticsWidget";
import ExperimentBenchmarkBento from "./ExperimentBenchmarkBento";
import ExperimentSimulatorConsole from "./ExperimentSimulatorConsole";

export default function AdminExperimentClient() {
  const [aiReport] = useState({
    costSavingsPct: 42.5,
    totalExperimentsCount: 1280,
    qualityScorePct: 97.4,
    activeWinnersCount: 5,
    aiAnalysis: "AI Experimentation Lab, son 30 günde 1,280 A/B testi gerçekleştirmiş, otomasyon router yönlendirmesiyle AI token maliyetlerinde %42.5 tasarruf sağlamıştır.",
    topRecommendation: "Copilot Chat servisinde 'gpt-4o-mini' modeline geçilmesi kalite kaybı yaşanmadan maliyeti 4 kat düşürebilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ExperimentHeader
        costSavings={aiReport.costSavingsPct}
        totalExperiments={aiReport.totalExperimentsCount}
        qualityScore={aiReport.qualityScorePct}
        activeWinners={aiReport.activeWinnersCount}
        onOpenSimulatorModal={() => alert("🧪 AI Experiment Lab Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIExperimentAnalyticsWidget aiReport={aiReport} />
          <ExperimentBenchmarkBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ExperimentSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
