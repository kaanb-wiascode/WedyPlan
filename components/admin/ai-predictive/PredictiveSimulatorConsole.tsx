"use client";

import React, { useState } from "react";
import { runPredictiveForecastAction, predictPlatformRisksAction } from "@/lib/actions/ai-predictive-engine";

export default function PredictiveSimulatorConsole() {
  const [metric, setMetric] = useState<any>("REVENUE");
  const [timeHorizonDays, setTimeHorizonDays] = useState(90);
  const [growthScenario, setGrowthScenario] = useState<any>("BASELINE");
  const [forecastResult, setForecastResult] = useState<any>(null);
  const [riskResult, setRiskResult] = useState<any>(null);

  const handleRunForecast = async () => {
    const res = await runPredictiveForecastAction({
      metric,
      timeHorizonDays,
      confidenceIntervalPct: 95,
      growthScenario,
    });

    if (res.success) {
      setForecastResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handlePredictRisks = async () => {
    const res = await predictPlatformRisksAction({
      targetScope: "PLATFORM_WIDE",
      riskThresholdPct: 20,
    });

    if (res.success) {
      setRiskResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Predictive Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Predictive Model & Time-Series Forecast Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Tahmin Metriği</label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="REVENUE">Ciro & İşlem Hacmi (Revenue)</option>
                <option value="DEMAND">Müşteri Talebi (Demand)</option>
                <option value="VENDOR_GROWTH">Tedarikçi Büyümesi</option>
                <option value="CUSTOMER_GROWTH">Müşteri Kaydı Büyümesi</option>
                <option value="CANCELLATION">İptal & Churn Riski</option>
                <option value="RENEWALS">Yenileme Oranı</option>
                <option value="SUPPORT_LOAD">Destek Yükü Hacmi</option>
                <option value="MARKETING_ROI">Pazarlama ROI</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Zaman Ufku (Gün)</label>
              <input
                type="number"
                value={timeHorizonDays}
                onChange={(e) => setTimeHorizonDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Büyüme Senaryosu</label>
              <select
                value={growthScenario}
                onChange={(e) => setGrowthScenario(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="BASELINE">BASELINE (Beklenen Trend)</option>
                <option value="OPTIMISTIC">OPTIMISTIC (Yüksek Büyüme)</option>
                <option value="PESSIMISTIC">PESSIMISTIC (Temkinli Trend)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleRunForecast}
              className="py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
            >
              📈 Gelecek Tahmini Projeksiyonunu Çalıştır
            </button>

            <button
              onClick={handlePredictRisks}
              className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-md transition"
            >
              ⚠️ Gelecek Risk & Churn Taraması Yap
            </button>
          </div>

          {forecastResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Forecast Model Output: {forecastResult.metric}</span>
                <span className="text-emerald-400 font-bold">Öngörülen Büyüme: +%{forecastResult.projectedGrowthPct}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Beklenen Değer: <span className="text-emerald-400 font-bold">{forecastResult.baselineValue}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">İyimser Senaryo: <span className="text-indigo-400 font-bold">{forecastResult.optimisticEstimate}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Temkinli Senaryo: <span className="text-amber-400 font-bold">{forecastResult.pessimisticEstimate}</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">📅 Çeyrek Bazlı Tahmin Dağılımı:</span>
                {forecastResult.quarterlyBreakdown.map((q: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span>{q.quarter}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{q.projectedValue}</span>
                      <span className="text-indigo-400 font-mono">[{q.trendStatus}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {riskResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono space-y-1">
              <span className="font-bold block text-white">⚠️ Tespit Edilen Gelecek Riskleri:</span>
              {riskResult.detectedRisks.map((r: any, idx: number) => (
                <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[10px] space-y-0.5">
                  <div className="flex justify-between font-bold">
                    <span className="text-amber-400">{r.riskType}</span>
                    <span className="text-rose-400">Risk Skoru: %{r.riskScorePct}</span>
                  </div>
                  <div className="text-slate-300">{r.recommendation}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
