"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Sliders, DollarSign, Activity, Layers, ArrowRight, Server, Zap, GitBranch } from "lucide-react";
import { AiModelManagementEngine, RegisteredModelRecord, ModelManagementSummary, ModelProviderType } from "@/lib/ai-native/ai-model-management-engine";

export const ModelManagementCenter: React.FC = () => {
  const [models, setModels] = useState<RegisteredModelRecord[]>([]);
  const [summary, setSummary] = useState<ModelManagementSummary | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ModelProviderType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiModelManagementEngine.getRegisteredModels().then(setModels);
    AiModelManagementEngine.getSummary().then(setSummary);
  }, []);

  const handlePromotePriority = async (modelId: string, title: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiModelManagementEngine.updateModelPriority(modelId, 1);
      setIsProcessing(false);
      AiModelManagementEngine.getRegisteredModels().then(setModels);
      AiModelManagementEngine.getSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredModels = selectedProvider === "ALL"
    ? models
    : models.filter((m) => m.provider === selectedProvider);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Model Management Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Model Yönetim & Yönlendirme Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Failover: {summary.averageFailoverTimeMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm AI modellerinin (OpenAI, Google, Anthropic, Open Source) tekil yaşam döngüsü yönetimi, sağlayıcı soyutlaması, otomatik fallback ve A/B değerlendirme testi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kayıtlı AI Modelleri</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalRegisteredModelsCount} Model
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yönlendirilen İstek</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalRequestsRouted24h / 1000).toFixed(1)}K Req
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Maliyet Tasarrufu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              -%{summary.totalCostSavedPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Automatic Routing & Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Model Yönlendirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Smart Router Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiModelManagementInsightNote}
          </p>
        </div>
      </div>

      {/* Provider Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "OPENAI", "ANTHROPIC", "GOOGLE", "OPEN_SOURCE_LOCAL"] as (ModelProviderType | "ALL")[]).map((prov) => (
          <button
            key={prov}
            onClick={() => setSelectedProvider(prov)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedProvider === prov
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {prov === "ALL" ? "Tüm Sağlayıcılar" : prov.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Models Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Kayıtlı AI Model Havuzu ({filteredModels.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredModels.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-[#111111] text-[#F5F4F0] rounded-full flex items-center justify-center font-mono text-[9px] font-bold">
                    #{m.aiRoutingPriorityRank}
                  </span>
                  <span>{m.modelIdentifier}</span>
                </span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {m.provider} ({m.status})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Giriş Token: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">${m.inputCostPer1mTokensUsd}/1M</span></div>
                <div>Çıkış Token: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">${m.outputCostPer1mTokensUsd}/1M</span></div>
                <div>Gecikme: <span className="font-bold text-emerald-500">{m.averageLatencyMs} ms</span></div>
                <div>Kalite Skoru: <span className="font-bold text-[#D4AF37]">%{m.qualityBenchmarkScorePercent}</span></div>
              </div>

              {m.isAbTestActive && (
                <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] font-mono flex justify-between items-center">
                  <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                    <GitBranch className="w-3 h-3" /> A/B Test Payı: %{m.abTestTrafficSharePercent}
                  </span>
                  <span className="text-[#86868B]">Fallback: {m.fallbackModelId}</span>
                </div>
              )}

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Yönlendirme Notu: {m.aiEfficiencyTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handlePromotePriority(m.id, m.modelIdentifier)}
                  disabled={isProcessing || m.aiRoutingPriorityRank === 1}
                  className="px-3 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-[#D4AF37]" />
                      <span>1. Yönlendirme Sırasına Al</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Sürüm: {m.versionTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};