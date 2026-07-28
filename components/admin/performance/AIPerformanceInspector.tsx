"use client";

import React, { useState } from "react";
import { triggerPerformanceOptimizationAction, recordPerformanceMetricAction } from "@/lib/actions/performance";

export default function AIPerformanceInspector() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleRunAnalysis = async () => {
    const res = await triggerPerformanceOptimizationAction();
    if (res.success) {
      setAnalysisResult(res.analysis);
      alert("✨ " + res.message);
    }
  };

  const handleTestMetricRecord = async () => {
    const res = await recordPerformanceMetricAction({
      routePath: "/marketplace/wedding-venues",
      metricType: "LCP",
      metricValue: 740,
      deviceCategory: "DESKTOP",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Performance Regression Inspector & Optimization Advisor
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          AI Inspector
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleRunAnalysis}
            className="py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            ⚡ AI Regresyon & Kod Optimizasyon Taraması Çalıştır
          </button>

          <button
            onClick={handleTestMetricRecord}
            className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
          >
            📊 Test Core Web Vital Metriği Gönder
          </button>
        </div>

        {analysisResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-amber-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
              <span className="font-bold">● Analysis ID: {analysisResult.analysisId}</span>
              <span className="text-emerald-400 font-bold">Regresyon Riski: %{analysisResult.scoreImpactPct}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Kod ve Sorgu Optimizasyon Önerileri:</span>
              {analysisResult.recommendations.map((rec: any, idx: number) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                  <div className="flex justify-between text-amber-400 font-bold text-[10px]">
                    <span>[{rec.category}] {rec.title}</span>
                    <span className="text-emerald-400">+{rec.expectedGainMs}ms Gain</span>
                  </div>
                  <p className="text-slate-300 text-[10px] font-sans">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
