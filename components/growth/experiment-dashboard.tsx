"use client";

import React, { useState, useEffect } from "react";
import { Beaker, Sparkles, Zap, Award } from "lucide-react";
import { ExperimentationEngine, ExperimentRecord } from "@/lib/growth/experimentation-engine";

export const ExperimentDashboard: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [selectedExp, setSelectedExp] = useState<ExperimentRecord | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<any | null>(null);

  useEffect(() => {
    ExperimentationEngine.getExperiments().then((data) => {
      setExperiments(data);
      if (data.length > 0) setSelectedExp(data[0]);
    });
  }, []);

  const handleSuggest = () => {
    if (!topicInput.trim()) return;
    const res = ExperimentationEngine.suggestNewExperiment(topicInput);
    setAiSuggestion(res);
  };

  if (!selectedExp) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Beaker className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Deney & A/B Test Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Statistically Significant
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          A/B Testleri, Çok Değişkenli (Multivariate) Testler, Feature Flagler, Canary Sürümleri ve WedyAI kazanan tahmin analizörü.
        </p>

        {/* High-Level Experiment Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Deney</span>
            <span className="font-mono font-bold text-white text-base">{experiments.length} Test</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Test Edilen Kullanıcı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">81.2K Sample</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Güven Oranı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">%98.4 Conf.</span>
          </div>
        </div>
      </div>

      {/* WedyAI Experiment Winner Prediction & Impact Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Kazanan Tahmin & Etki Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Güven: %{selectedExp.confidenceScorePercent}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
            {selectedExp.experimentName}
          </h4>
          <span className="text-[10px] font-mono text-[#86868B] block">
            Tür: {selectedExp.type} • Hedef Metrik: {selectedExp.targetMetric}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs border border-black/5 dark:border-white/5">
          <span className="font-bold text-[#D4AF37] text-[10px] block">✦ WedyAI Kazanan Tahmin Notu</span>
          <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] font-medium leading-relaxed">
            {selectedExp.aiWinnerPrediction}
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold pt-1">
            Finansal Etki: {selectedExp.aiImpactSummary}
          </p>
        </div>

        {/* Variants Performance Stream */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-[#86868B] uppercase block">Test Varyantları Performansı</span>
          {selectedExp.variants.map((variant) => (
            <div
              key={variant.id}
              className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                selectedExp.winningVariantId === variant.id
                  ? "bg-emerald-500/10 border-emerald-500/30 text-[#111111] dark:text-[#F5F4F0]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span>{variant.variantName}</span>
                {selectedExp.winningVariantId === variant.id && (
                  <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                    <Award className="w-3 h-3" /> Kazanan Varyant
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-[#555555] dark:text-[#A1A1A6]">
                <div>Trafik: %{variant.trafficAllocationPercent}</div>
                <div>Dönüşüm: %{variant.conversionRatePercent}</div>
                <div>Artış: +%{variant.revenueDeltaPercent}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WedyAI Experiment Suggestion Generator */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Beaker className="w-5 h-5 text-[#D4AF37]" />
          <span>WedyAI Akıllı Test Fikri Üretici</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Sayfa / Ekran Adı (Örn: Mekan Detay Ekranı)..."
              className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleSuggest}
              disabled={!topicInput.trim()}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Test Öner</span>
            </button>
          </div>

          {aiSuggestion && (
            <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5">
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0] text-xs block">{aiSuggestion.suggestedExperimentName}</span>
              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6]">{aiSuggestion.hypothesis}</p>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block pt-1">
                Öngörülen Etki: {aiSuggestion.expectedImpactGmv}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Experiments List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Tüm Deneyler & Canary Sürümleri ({experiments.length})
        </h4>

        <div className="space-y-3">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedExp.id === exp.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{exp.experimentName}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {exp.type}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Örneklem: {exp.sampleSizeTotal.toLocaleString()}</span>
                <span>Durum: {exp.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};