"use client";

import React, { useState } from "react";
import { generateReleaseDashboardDataAction } from "@/lib/actions/releases";

export default function ReleaseAnalyticsViewer() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateReleaseDashboardDataAction();
    if (res.success) {
      setAnalysisData(res.analysis);
      alert("✨ AI Release Summary & Risk Analysis Raporu Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Release Summary & Change Impact Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Raporu Yenile
        </button>
      </div>

      {analysisData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Değerlendirme ID: {analysisData.analysisId}</span>
            <span className="text-emerald-400 font-bold">Hazırlık Skoru: %{analysisData.readinessScorePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">🔎 Etkilenen Bileşenler (Impacted Components):</span>
            {analysisData.impactedComponents.map((comp: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">● {comp}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block text-[10px]">💡 Yapay Zeka Sürüm Özeti (Release Summary):</span>
            <p className="text-slate-300 text-[10px] font-sans">{analysisData.aiReleaseSummaryText}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Sürüm Özeti ve Risk Analiz Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
