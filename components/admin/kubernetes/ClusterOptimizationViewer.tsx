"use client";

import React, { useState } from "react";
import { generateK8sDashboardDataAction } from "@/lib/actions/kubernetes";

export default function ClusterOptimizationViewer() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateK8sDashboardDataAction();
    if (res.success) {
      setAnalysisData(res.analysis);
      alert("✨ AI Kubernetes Küme ve Kaynak Analizi Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Cluster Optimization & Pod Resource Suggestions Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {analysisData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-blue-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Değerlendirme ID: {analysisData.analysisId}</span>
            <span className="text-emerald-400 font-bold">Verimlilik Skoru: %{analysisData.clusterEfficiencyScorePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Pod Request/Limit Tavsiyeleri:</span>
            {analysisData.resourceAdvice.map((adv: any, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">
                ● <span className="text-blue-400 font-bold">[{adv.deploymentName}]</span> {adv.advice} (%{adv.potentialSavingPct} Tasarruf)
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block text-[10px]">✓ Küme Sağlık Özeti:</span>
            <p className="text-slate-300 text-[10px]">{analysisData.aiClusterSummary}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Küme Optimizasyonu ve Pod Kaynak Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
