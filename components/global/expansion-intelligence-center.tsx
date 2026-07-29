"use client";

import React, { useState, useEffect } from "react";
import { Compass, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, TrendingUp, Target, AlertTriangle, ArrowRight, Award } from "lucide-react";
import { ExpansionIntelligenceEngine, CandidateMarketRecord, ExpansionIntelligenceSummary } from "@/lib/global/expansion-intelligence-engine";

export const ExpansionIntelligenceCenter: React.FC = () => {
  const [markets, setMarkets] = useState<CandidateMarketRecord[]>([]);
  const [summary, setSummary] = useState<ExpansionIntelligenceSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ExpansionIntelligenceEngine.getCandidateMarkets().then(setMarkets);
    ExpansionIntelligenceEngine.getExpansionSummary().then(setSummary);
  }, []);

  const handlePromoteToLaunch = async (marketId: string, countryName: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await ExpansionIntelligenceEngine.promoteToLaunchPipeline(marketId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${countryName}' pazarı Lansman Boru Hattına (Country Launch Pipeline) başarıyla aktarıldı!` });
        ExpansionIntelligenceEngine.getCandidateMarkets().then(setMarkets);
      } else {
        setStatusMsg({ type: "error", text: "Pazar aktarımı gerçekleştirilemedi." });
      }
    }, 500);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Expansion Intelligence Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Genişleme İstihbarat Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Top Priority: {summary.topPriorityCountryCode}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Stratejik uluslararası büyüme kararları, pazar potansiyeli puanlaması, rakip doygunluk analizleri ve WedyAI 3 yıllık GMV projeksiyonları.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Analiz Edilen Aday</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.candidateMarketsCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Birincil Hedef</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.topPriorityCountryCode} Market
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Fizibilite</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageFeasibilityScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Expansion Recommendation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Genişleme & Projeksiyon Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Growth AI
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiExpansionInsightNote}
          </p>
        </div>
      </div>

      {/* Candidate Markets Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#D4AF37]" />
          <span>Aday Pazar Derecelendirmeleri ({markets.length})</span>
        </h4>

        <div className="space-y-3">
          {markets.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-[#111111] text-[#F5F4F0] rounded-full flex items-center justify-center text-[10px] font-mono font-bold">
                    #{m.priorityRank}
                  </span>
                  <span>{m.countryName} ({m.countryCode})</span>
                </span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  m.aiRiskLevel === "LOW"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  Risk: {m.aiRiskLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Pazar Potansiyeli: <span className="font-bold text-emerald-500">%{m.marketPotentialScorePercent}</span></div>
                <div>Rakip Doygunluğu: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">%{m.competitorSaturationScorePercent}</span></div>
                <div>3 Yıllık GMV: <span className="font-bold text-[#D4AF37]">${(m.projected3YearGmvAmountUsd / 1000000).toFixed(1)}M USD</span></div>
                <div>Talep Endeksi: <span className="font-bold text-emerald-500">{m.destinationWeddingDemandIndex} / 100</span></div>
              </div>

              <p className="text-[10px] text-[#86868B] pt-1">
                ✦ WedyAI Analizi: {m.aiExpansionTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                {m.isReadyForLaunchPipeline ? (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Lansman Boru Hattında
                  </span>
                ) : (
                  <button
                    onClick={() => handlePromoteToLaunch(m.id, m.countryName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                        <span>Lansman Hattına Aktar</span>
                      </>
                    )}
                  </button>
                )}

                <span className="font-mono text-[#86868B]">Bölge: {m.targetRegion}</span>
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