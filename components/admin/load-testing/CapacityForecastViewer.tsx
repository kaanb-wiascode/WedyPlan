"use client";

import React, { useState } from "react";
import { generateLoadTestDashboardDataAction } from "@/lib/actions/load-testing";

export default function CapacityForecastViewer() {
  const [forecastData, setForecastData] = useState<any>(null);

  const handleFetchForecast = async () => {
    const res = await generateLoadTestDashboardDataAction();
    if (res.success) {
      setForecastData(res.forecast);
      alert("✨ AI Kapasite Tahmini ve Darboğaz Analizi Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🔮 AI Capacity Forecast & Bottleneck Inspector Report
        </span>
        <button
          onClick={handleFetchForecast}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {forecastData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Forecast ID: {forecastData.forecastId}</span>
            <span className="text-emerald-400 font-bold">Safe Scale: {forecastData.maxSafeConcurrentUsers.toLocaleString()} VU</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block text-[10px]">⚠️ Tespit Edilen Darboğaz: {forecastData.bottleneckDetected}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Kapasite ve İndeks Önerileri:</span>
            {forecastData.aiOptimizationAdvice.map((adv: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">✓ {adv}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-200 space-y-1">
            <span className="text-white font-bold block text-[10px]">🚀 Sistem Ölçekleme Tavsiyesi:</span>
            <p className="text-[10px]">{forecastData.systemScalingRecommendation}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Kapasite Tahmini ve Darboğaz Analizi Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
