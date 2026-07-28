"use client";

import React, { useState } from "react";
import { startFineTuningJobAction, deployTrainedModelAction } from "@/lib/actions/ai-training-center";

export default function ModelDeploymentExplorerTable() {
  const [jobName, setJobName] = useState("wedyplan-llama3-8b-wedding-expert-v3");
  const [baseModel, setBaseModel] = useState<any>("llama-3-8b-instruct");
  const [jobResult, setJobResult] = useState<any>(null);

  const handleStartTraining = async () => {
    const res = await startFineTuningJobAction({
      jobName,
      baseModel,
      datasetId: "wedding_jargon_v2",
      epochs: 3,
      learningRate: 0.0002,
    });

    if (res.success) {
      setJobResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleDeploy = async (jobId: string) => {
    const res = await deployTrainedModelAction({
      modelJobId: jobId,
      targetGatewayPriority: 1,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Training Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive AI Fine-Tuning & GPU Training Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            GPU Compute Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Temel Model (Base LLM)</label>
              <select
                value={baseModel}
                onChange={(e) => setBaseModel(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="llama-3-8b-instruct">Llama 3 8B (Self-Hosted)</option>
                <option value="mistral-7b-v0.3">Mistral 7B (Open Source)</option>
                <option value="gpt-4o-mini">OpenAI GPT-4o-mini (Fine-Tune API)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Eğitilecek Özel Model Adı</label>
              <input
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <button
            onClick={handleStartTraining}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-bold hover:shadow-md transition"
          >
            ⚡ GPU Kümesinde Model İnce Ayar Eğitimini Tetikle
          </button>

          {jobResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Eğitim Başarıyla Tamamlandı: {jobResult.jobId}</span>
                <span className="text-slate-400 text-[10px]">Eğitim Süresi: {jobResult.executionTimeMinutes} Dk</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Eğitim Kaybı (Loss): <span className="text-emerald-400 font-bold">{jobResult.finalTrainingLoss}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Doğruluk Skoru: <span className="text-emerald-400 font-bold">%{jobResult.accuracyScorePct}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Maliyet Tasarrufu: <span className="text-purple-400 font-bold">%{jobResult.estimatedCostSavingPct}</span></div>
              </div>

              <button
                onClick={() => handleDeploy(jobResult.jobId)}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition font-sans text-xs"
              >
                Eğitilen Modeli AI Gateway'e Birincil Model Olarak Yayınla (Deploy) 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
