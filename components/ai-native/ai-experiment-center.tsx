"use client";

import React, { useState, useEffect } from "react";
import { FlaskConical, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Zap, ArrowUpRight, ShieldAlert, GitBranch, Eye, Check, AlertTriangle } from "lucide-react";
import { AiExperimentationEngine, AiExperimentRecord, AiExperimentationSummary, ExperimentType } from "@/lib/ai-native/ai-experimentation-engine";

export const AiExperimentCenter: React.FC = () => {
  const [experiments, setExperiments] = useState<AiExperimentRecord[]>([]);
  const [summary, setSummary] = useState<AiExperimentationSummary | null>(null);
  const [selectedType, setSelectedType] = useState<ExperimentType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiExperimentationEngine.getExperiments().then(setExperiments);
    AiExperimentationEngine.getSummary().then(setSummary);
  }, []);

  const handlePromote = async (experimentId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiExperimentationEngine.promoteExperiment(experimentId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' deneyi canlı üretime (Production) aktarıldı!` });
        AiExperimentationEngine.getExperiments().then(setExperiments);
        AiExperimentationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Promosyon işlemi başarısız oldu." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredExperiments = selectedType === "ALL"
    ? experiments
    : experiments.filter((e) => e.experimentType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Experimentation Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal AI Deney & Test Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Eval Confidence: %{summary.averageEvaluationConfidencePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Yeni istemlerin (Prompt), modellerin, iş akışlarının ve güvenlik kalkanlarının Shadow Mode, Canary ve A/B testleriyle güvenli değerlendirilmesi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Deneyler</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeExperimentsCount} Deney
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Değerlendirilen Sorgu</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalEvaluatedQueries24h / 1000).toFixed(1)}K Eval
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Regresyon</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.automatedRegressionsPreventedCount} Regresyon
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Experimentation & Regression Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Regresyon & Değerlendirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Evaluation Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiExperimentationInsightNote}
          </p>
        </div>
      </div>

      {/* Experiment Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "PROMPT_TESTS", "MODEL_COMPARISON", "GUARDRAIL_TESTING", "WORKFLOW_EVALUATION"] as (ExperimentType | "ALL")[]).map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === t
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {t === "ALL" ? "Tüm Deneyler" : t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Experiments Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-[#D4AF37]" />
          <span>Yürütülen Deneyler & Karşılaştırmalar ({filteredExperiments.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{exp.title}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  exp.status === "PROMOTED_TO_PRODUCTION"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {exp.status}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span>Mevcut (Baseline): <strong>{exp.baselineCandidateName}</strong></span>
                  <span className="text-emerald-500 font-bold">%{exp.baselineAccuracyScorePercent}</span>
                </div>
                <div className="flex justify-between text-[#D4AF37]">
                  <span>Aday (Candidate): <strong>{exp.experimentalCandidateName}</strong></span>
                  <span className="font-bold">%{exp.experimentalAccuracyScorePercent}</span>
                </div>
                <div className="flex justify-between text-[#86868B] pt-1 border-t border-black/5 dark:border-white/5">
                  <span>Mod: {exp.trafficMode}</span>
                  <span>Trafik Payı: %{exp.trafficSharePercent}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Analizi: {exp.aiOptimizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {exp.status === "PROMOTED_TO_PRODUCTION" ? (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Canlı Üretimde (100% Traffic)
                  </span>
                ) : (
                  <button
                    onClick={() => handlePromote(exp.id, exp.title)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Aday Versiyonu Canlıya Al (Promote to Production)</span>
                      </>
                    )}
                  </button>
                )}
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