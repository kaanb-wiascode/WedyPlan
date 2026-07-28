"use client";

import React, { useState } from "react";
import { generateDRDashboardDataAction } from "@/lib/actions/disaster-recovery";

export default function ReadinessAnalysisViewer() {
  const [readinessData, setReadinessData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateDRDashboardDataAction();
    if (res.success) {
      setReadinessData(res.readiness);
      alert("✨ AI Recovery Validation & Integrity Raporu Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Recovery Validation & Data Integrity Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Raporu Yenile
        </button>
      </div>

      {readinessData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Değerlendirme ID: {readinessData.evaluationId}</span>
            <span className="text-emerald-400 font-bold">Hazırlık Skoru: %{readinessData.recoveryReadinessScorePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">🔎 Veri Bütünlük Kontrolleri (Integrity Check):</span>
            {readinessData.dataConsistencyDetails.map((det: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">✓ {det}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Felaket Kurtarma Tavsiyeleri:</span>
            {readinessData.aiRecoveryRecommendations.map((rec: string, idx: number) => (
              <div key={idx} className="text-teal-400 text-[10px]">● {rec}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Hazırlık Skoru ve Veri Bütünlük Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
