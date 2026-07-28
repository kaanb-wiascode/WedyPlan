"use client";

import React, { useState } from "react";
import { analyzeBudgetHealthAction, runBudgetSimulationAction } from "@/lib/actions/ai-budget-engine";

export default function BudgetSimulatorConsole() {
  const [totalBudget, setTotalBudget] = useState(750000);
  const [guestCount, setGuestCount] = useState(200);
  const [location, setLocation] = useState("İstanbul / Bodrum");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const handleAnalyze = async () => {
    const res = await analyzeBudgetHealthAction({
      totalBudget,
      currency: "TRY",
      guestCount,
      location,
      weddingStyle: "MODERN_MINIMALIST",
      weddingDate: "2026-09-15",
    });

    if (res.success) {
      setAnalysisResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleSimulate = async () => {
    const res = await runBudgetSimulationAction({
      baseBudget: totalBudget,
      currency: "TRY",
      newGuestCount: guestCount + 50,
      targetLocation: location,
      selectedStyle: "LUXURY_ELEGANCE",
    });

    if (res.success) {
      setSimulationResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Budget Analysis Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive Budget Forecast & Risk Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Toplam Bütçe (₺)</label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Davetli Sayısı</label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Lokasyon / Destinasyon</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleAnalyze}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              📊 Bütçe Sağlık Skoru & Nakit Akışı Analizi Yap
            </button>

            <button
              onClick={handleSimulate}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              💡 +50 Davetli & Lüks Konsept Simülasyonu Çalıştır
            </button>
          </div>

          {analysisResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● AI Bütçe Analiz Çıktısı</span>
                <span className="text-emerald-400 font-bold">Sağlık Skoru: %{analysisResult.healthScore}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Beklenmedik Risk Tahmini: <span className="text-amber-400 font-bold">₺{analysisResult.unexpectedCostEstimate.toLocaleString()}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Potansiyel Tasarruf: <span className="text-emerald-400 font-bold">₺{analysisResult.potentialSavings.toLocaleString()}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Risk Skoru: <span className="text-indigo-400 font-bold">%{analysisResult.riskScore}</span></div>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-white font-bold block text-[10px]">📅 Örnek Nakit Akış Zaman Tüneli:</span>
                {analysisResult.cashFlowTimeline.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span>{item.month} ({item.milestone})</span>
                    <span className="text-emerald-400 font-bold">₺{item.paymentAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {simulationResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono">
              🚀 <strong>Simülasyon Sonucu:</strong> Davetli sayısı ve konsept güncellemesi sonrası tahmini toplam bütçe ihtiyacı: <span className="text-emerald-400 font-bold">₺{simulationResult.simulatedTotalBudget.toLocaleString()} {simulationResult.currency}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
