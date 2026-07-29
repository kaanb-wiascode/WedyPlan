"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ShieldCheck, RefreshCw, CheckCircle2, Zap, Code2, Sparkles, ArrowUpRight } from "lucide-react";
import { DataScienceEngine, MlExperimentRecord, DataSciencePlatformSummary, ModelStageStatus } from "@/lib/data/data-science-engine";

export const DataScienceWorkspace: React.FC = () => {
  const [experiments, setExperiments] = useState<MlExperimentRecord[]>([]);
  const [summary, setSummary] = useState<DataSciencePlatformSummary | null>(null);
  const [selectedStage, setSelectedStage] = useState<ModelStageStatus | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataScienceEngine.getExperiments().then(setExperiments);
    DataScienceEngine.getSummary().then(setSummary);
  }, []);

  const handlePromote = async (expId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataScienceEngine.promoteModel(expId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' ML modeli başarıyla doğrulandı ve Phase 13 AI Ajan servislerine (Production Stage) canlı olarak yayınlandı!` });
        DataScienceEngine.getExperiments().then(setExperiments);
        DataScienceEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Model prodüksiyona yükseltme işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredExperiments = selectedStage === "ALL"
    ? experiments
    : experiments.filter((e) => e.stage === selectedStage);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Data Science Çalışma Alanı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Model Accuracy: %{summary.averageModelAccuracyScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Veri bilimcileri ve ML mühendisleri için Notebook ortamları, MLflow deney takibi, Feature Store erişimi ve otonom AutoML önerileri.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Deney</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveExperimentsCount} Deney
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Çalışan Notebook</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalNotebookInstancesRunningCount} Instance
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Canlı Prodüksiyon Modeli</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.promotedProductionModelsCount} Model
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI AutoML & Deney Önerisi Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            AutoML Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDataScienceInsightNote}
          </p>
        </div>
      </div>

      {/* Stage Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "STAGING_REVIEW", "PROMOTED_TO_PRODUCTION", "EXPERIMENTATION"] as (ModelStageStatus | "ALL")[]).map((stg) => (
          <button
            key={stg}
            onClick={() => setSelectedStage(stg)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedStage === stg
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {stg === "ALL" ? "Tüm Aşamalar" : stg.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Experiments Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#D4AF37]" />
          <span>ML Deney Takip Kayıtları ({filteredExperiments.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{exp.experimentName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  exp.stage === "PROMOTED_TO_PRODUCTION" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  exp.stage === "STAGING_REVIEW" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                  "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}>
                  {exp.stage} ({exp.runtimeStatus})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Mimar: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{exp.authorScientist}</span></div>
                <div>Notebook: <span className="font-bold text-[#D4AF37]">{exp.notebookName}</span></div>
                <div>Metrik ({exp.primaryMetricName}): <span className="font-bold text-emerald-500">{exp.primaryMetricValue}</span></div>
                <div>Feature Bağlantısı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{exp.featureStoreDependencies.join(", ")}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] block">✦ Hiperparametre Özeti:</span>
                <code className="text-[#111111] dark:text-[#F5F4F0] block truncate">{exp.hyperparametersSummary}</code>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-emerald-500 block">✦ WedyAI Deney Önerisi:</span>
                <p className="text-[#111111] dark:text-[#F5F4F0]">{exp.aiExperimentRecommendation}</p>
                <p className="text-[#86868B] text-[9px] pt-1">{exp.aiSuggestedDatasetJoin}</p>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {exp.stage !== "PROMOTED_TO_PRODUCTION" ? (
                  <button
                    onClick={() => handlePromote(exp.id, exp.experimentName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                        <span>Prodüksiyona Yayınla (Promote to Prod)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Canlı Prodüksiyonda (Production Active)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Eğitim: {new Date(exp.lastTrainedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};