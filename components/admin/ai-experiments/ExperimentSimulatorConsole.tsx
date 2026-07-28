"use client";

import React, { useState } from "react";
import { runModelExperimentAction, selectAutomaticWinnerAction } from "@/lib/actions/ai-experiment-lab";

export default function ExperimentSimulatorConsole() {
  const [experimentName, setExperimentName] = useState("Copilot_Prompt_AB_Benchmark_2026");
  const [category, setCategory] = useState<any>("COPILOT_CHAT");
  const [testPrompt, setTestPrompt] = useState("Bodrum kır düğünü 200 kişilik organizasyon bütçe ve tedarikçi tavsiyesini çıkar.");
  const [experimentResult, setExperimentResult] = useState<any>(null);

  const handleRunExperiment = async () => {
    const res = await runModelExperimentAction({
      experimentName,
      category,
      testPrompt,
      candidateModels: ["gpt-4o", "claude-3-5-sonnet", "gemini-1.5-pro"],
      autoSelectWinner: true,
    });

    if (res.success) {
      setExperimentResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleSelectWinner = async (modelName: string) => {
    if (!experimentResult) return;

    const res = await selectAutomaticWinnerAction({
      experimentId: experimentResult.experimentId,
      winningModel: modelName,
      reason: "Yönetici manuel benchmark tercihi.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Experiment Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Model A/B Test & Benchmark Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            Lab Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Deney Kategorisi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="COPILOT_CHAT">Copilot Chat Yanıtları</option>
                <option value="CONTRACT_ANALYSIS">Sözleşme İnceleme</option>
                <option value="BUDGET_FORECAST">Bütçe Tahminleme</option>
                <option value="MULTIMODAL_VISION">Multimodal Vision</option>
                <option value="SEARCH_RANKING">Arama Sıralaması</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Deney Adı</label>
              <input
                type="text"
                value={experimentName}
                onChange={(e) => setExperimentName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Test İstem Metni (Test Prompt)</label>
            <input
              type="text"
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <button
            onClick={handleRunExperiment}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold hover:shadow-md transition"
          >
            🧪 Modelleri Eşzamanlı Yarıştır & Benchmark Yap
          </button>

          {experimentResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Experiment ID: {experimentResult.experimentId}</span>
                <span className="text-emerald-400 font-bold">Kazanan: {experimentResult.winningModel}</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                🏆 <strong>Kazanan Nedeni:</strong> {experimentResult.winningReason} (Tahmini Tasarruf: +%{experimentResult.costSavingsPct})
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-white font-bold block text-[10px]">📊 A/B Model Performans Dökümü:</span>
                {experimentResult.variants.map((v: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white">{v.modelName} ({v.provider})</span>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400">{v.latencyMs} ms</span>
                        <span className="text-emerald-400">%{v.qualityScorePct} Kalite</span>
                        {v.isWinner && <span className="text-xs text-amber-400 font-bold">👑 WINNER</span>}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 italic">"{v.responseSample}"</div>
                    {!v.isWinner && (
                      <button
                        onClick={() => handleSelectWinner(v.modelName)}
                        className="mt-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] font-bold transition"
                      >
                        Bu Modeli Primary Olarak Seç 🚀
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
