"use client";

import React, { useState } from "react";
import { generateStressDashboardDataAction } from "@/lib/actions/stress-testing";

export default function RecoveryAnalysisViewer() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateStressDashboardDataAction();
    if (res.success) {
      setAnalysisResult(res.analysis);
      alert("✨ AI Kırılma Noktası ve Otonom Toparlanma Analizi Güncellendi!");
    }
  };

  const setAnalysisResult = (data: any) => {
    setAnalysisData(data);
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Breaking Point Prediction & Self-Healing Recovery Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {analysisData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-rose-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Analysis ID: {analysisData.analysisId}</span>
            <span className="text-emerald-400 font-bold">Self-Healing Skoru: %{analysisData.selfHealingScorePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-rose-400 font-bold block text-[10px]">🚨 Kritik Kırılma Bileşenleri:</span>
            {analysisData.failedComponentsList.map((fc: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">● {fc}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Kapasite ve Sertleştirme Önerileri:</span>
            {analysisData.capacityScalingAdvice.map((adv: string, idx: number) => (
              <div key={idx} className="text-emerald-400 text-[10px]">✓ {adv}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Kırılma Noktası ve Otonom Toparlanma Analizi Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
