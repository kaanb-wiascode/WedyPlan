"use client";

import React, { useState, useEffect } from "react";
import { GitPullRequest, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, TrendingUp, HelpCircle, Layers, Check, ArrowUpRight, ShieldAlert } from "lucide-react";
import { AiDecisionSupportEngine, EnterpriseDecisionItem, DecisionSupportSummary, DecisionDomain } from "@/lib/ai-native/ai-decision-support-engine";

export const DecisionSupportCenter: React.FC = () => {
  const [items, setItems] = useState<EnterpriseDecisionItem[]>([]);
  const [summary, setSummary] = useState<DecisionSupportSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DecisionDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AiDecisionSupportEngine.getDecisionItems().then(setItems);
    AiDecisionSupportEngine.getSummary().then(setSummary);
  }, []);

  const handleExecuteDecision = async (decisionId: string, title: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AiDecisionSupportEngine.executeDecision(decisionId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${title}' kararı onaylandı ve otonom sistemlere aktarıldı!` });
        AiDecisionSupportEngine.getDecisionItems().then(setItems);
        AiDecisionSupportEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Karar uygulanamadı." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredItems = selectedDomain === "ALL"
    ? items
    : items.filter((i) => i.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Decision Support Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              AI Stratejik Karar Destek Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Confidence: %{summary.averageDecisionConfidencePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          İş stratejileri için çoklu-senaryo simülasyonları, risk analizi, tahminsel projeksiyonlar ve WedyAI karar gerekçelendirme zincirleri.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Analiz Edilen Karar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalAnalyzedDecisionsCount} Karar
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Simüle GMV Etkisi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              +${(summary.simulatedGmvImpactTotalUsd / 1000).toFixed(0)}K USD
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. AI Güveni</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageDecisionConfidencePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Decision Explanations & Scenario Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Karar & Risk Değerlendirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Scenario Analysis
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDecisionInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "MARKETPLACE", "FINANCE", "GROWTH", "OPERATIONS", "SALES"] as (DecisionDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Alanlar" : dom}
          </button>
        ))}
      </div>

      {/* Decisions Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Stratejik Karar Değerlendirmeleri ({filteredItems.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredItems.map((dec) => (
            <div
              key={dec.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{dec.decisionTitle}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {dec.domain}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                Problem: {dec.problemStatement}
              </p>

              {/* Scenario Options View */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
                  Simüle Edilen Senaryolar
                </span>

                {dec.scenarioOptions.map((opt) => (
                  <div
                    key={opt.optionKey}
                    className={`p-3 rounded-xl space-y-1 text-[11px] border ${
                      opt.optionKey === dec.recommendedOptionKey
                        ? "bg-emerald-500/10 border-emerald-500/30 text-[#111111] dark:text-[#F5F4F0]"
                        : "bg-white dark:bg-black/40 border-black/5 dark:border-white/5 text-[#666666]"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="flex items-center gap-1">
                        {opt.optionKey === dec.recommendedOptionKey && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        <span>{opt.title}</span>
                      </span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        +${(opt.projectedRevenueImpactAmountUsd / 1000).toFixed(0)}K
                      </span>
                    </div>

                    <p className="text-[10px] text-[#86868B]">
                      {opt.strategicExplanationText}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#D4AF37] font-medium pt-1">
                ✦ {dec.aiExplanationChain}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {dec.isExecuted ? (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Karar Uygulandı & Aktif
                  </span>
                ) : (
                  <button
                    onClick={() => handleExecuteDecision(dec.id, dec.decisionTitle)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Önerilen Senaryoyu Onayla & Uygula</span>
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