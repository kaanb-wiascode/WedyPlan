"use client";

import React, { useState } from "react";
import { generateCiCdDashboardDataAction } from "@/lib/actions/cicd";

export default function CiCdAnalyticsViewer() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateCiCdDashboardDataAction();
    if (res.success) {
      setAnalysisData(res.analysis);
      alert("✨ AI CI/CD Pipeline & Risk Report Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Pipeline Optimization & Failure Root Cause Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {analysisData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Değerlendirme ID: {analysisData.analysisId}</span>
            <span className="text-emerald-400 font-bold">Tasarruf Potansiyeli: %{analysisData.buildTimeOptimizationGainPct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Derleme Süresi Optimizasyonları:</span>
            {analysisData.pipelineOptimizationAdvice.map((adv: any, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">
                ● <span className="text-emerald-400 font-bold">[{adv.stage}]</span> {adv.advice} (-{adv.timeSavingSeconds}s Gain)
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block text-[10px]">✓ AI CI/CD Boru Hattı Özeti:</span>
            <p className="text-slate-300 text-[10px]">{analysisData.aiCiCdSummary}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI CI/CD Boru Hattı ve Derleme Optimizasyonu Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
