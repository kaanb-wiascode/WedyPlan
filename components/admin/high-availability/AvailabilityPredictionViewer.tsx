"use client";

import React, { useState } from "react";
import { generateHADashboardDataAction } from "@/lib/actions/high-availability";

export default function AvailabilityPredictionViewer() {
  const [predictionData, setPredictionData] = useState<any>(null);

  const handleFetchPrediction = async () => {
    const res = await generateHADashboardDataAction();
    if (res.success) {
      setPredictionData(res.prediction);
      alert("✨ AI Availability Prediction & Prevention Raporu Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Availability Prediction & Failure Prevention Report
        </span>
        <button
          onClick={handleFetchPrediction}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {predictionData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Tahmin ID: {predictionData.predictionId}</span>
            <span className="text-emerald-400 font-bold">Kullanılabilirlik: %{predictionData.overallUptimePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">🌐 Coğrafi Trafik Dağılımı:</span>
            {predictionData.activeTrafficDistribution.map((dist: any, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">● {dist.regionName}: %{dist.trafficWeightPct} ({dist.avgLatencyMs}ms)</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Arıza Önleme Analizleri:</span>
            {predictionData.aiOptimizationInsights.map((ins: string, idx: number) => (
              <div key={idx} className="text-teal-400 text-[10px]">✓ {ins}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Kullanılabilirlik Tahmini ve Arıza Önleme Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
