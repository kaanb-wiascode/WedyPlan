"use client";

import React, { useState } from "react";
import { generateChaosDashboardDataAction } from "@/lib/actions/chaos";

export default function FailureReportViewer() {
  const [reportData, setReportData] = useState<any>(null);

  const handleFetchReport = async () => {
    const res = await generateChaosDashboardDataAction();
    if (res.success) {
      setReportData(res.report);
      alert("✨ AI Dayanıklılık Raporu Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Failure Prediction & System Recovery Validation Report
        </span>
        <button
          onClick={handleFetchReport}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Raporu Yenile
        </button>
      </div>

      {reportData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-rose-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Rapor ID: {reportData.reportId}</span>
            <span className="text-emerald-400 font-bold">Otonom İyileşme: ✓ Doğrulandı</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">🔎 Tespit Edilen Hassas Noktalar:</span>
            {reportData.weakPointsDetected.map((wp: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">● {wp}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Mimari Sertleştirme Önerileri:</span>
            {reportData.hardeningRecommendations.map((hr: string, idx: number) => (
              <div key={idx} className="text-emerald-400 text-[10px]">✓ {hr}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Dayanıklılık ve Otonom Kurtarma Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
