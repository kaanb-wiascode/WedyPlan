"use client";

import React, { useState } from "react";
import { generateIdpDashboardDataAction } from "@/lib/actions/idp";

export default function ArchitectureAdvisorViewer() {
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleFetchAnalysis = async () => {
    const res = await generateIdpDashboardDataAction();
    if (res.success) {
      setAnalysisData(res.aiAdvice);
      alert("✨ AI Architecture Recommendations & Suggestions Güncellendi!");
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Project Generator & Architecture Recommendations Report
        </span>
        <button
          onClick={handleFetchAnalysis}
          className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
        >
          🔄 Analizi Yenile
        </button>
      </div>

      {analysisData ? (
        <div className="p-4 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
            <span className="font-bold">● Değerlendirme ID: {analysisData.analysisId}</span>
            <span className="text-emerald-400 font-bold">Mimari Skoru: %{analysisData.architectureScorePct}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block text-[10px]">🤖 Önerilen Proje Şablonu: {analysisData.recommendedTemplate}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Altyapı & Kaynak Önerileri:</span>
            {analysisData.suggestedResources.map((resItem: string, idx: number) => (
              <div key={idx} className="text-slate-300 text-[10px]">✓ {resItem}</div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block text-[10px]">🛠️ IDP Üretim Özeti:</span>
            <p className="text-slate-300 text-[10px]">{analysisData.aiProjectGenerationSummary}</p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-center font-mono">
          AI Proje Oluşturucu ve Mimari Öneri Raporunu görmek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
