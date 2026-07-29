"use client";

import React, { useState, useEffect } from "react";
import { BarChart2, Sparkles, ShieldCheck, RefreshCw, Globe, TrendingUp, DollarSign, Users, Activity, Target } from "lucide-react";
import { CrossBorderAnalyticsEngine, CountryPerformanceMetrics, CrossBorderAnalyticsSummary } from "@/lib/global/cross-border-analytics-engine";

export const CrossBorderAnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<CountryPerformanceMetrics[]>([]);
  const [summary, setSummary] = useState<CrossBorderAnalyticsSummary | null>(null);

  useEffect(() => {
    CrossBorderAnalyticsEngine.getCountryMetrics().then(setMetrics);
    CrossBorderAnalyticsEngine.getAnalyticsSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Cross-Border Analytics Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çapraz Sınır Analitik & Karşılaştırma
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Global LTV/CAC: {summary.globalLtvToCacRatio}x
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Bölgesel büyüme hızları, pazaryeri likidite skorları, müşteri edinme maliyetleri (CAC/LTV) ve WedyAI pazar fırsat analizleri.
        </p>

        {/* Global Analytics Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Analiz Edilen Bölge</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalAnalyzedTerritoriesCount} Bölge
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Pazaryeri Likiditesi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{summary.averageCrossBorderLiquidityPercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Birim Ekonomisi (LTV/CAC)</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.globalLtvToCacRatio}x Ratio
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Market Opportunity & Benchmarking Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Pazar Fırsat Tespit Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Cross-Territory AI
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiMarketInsightNote}
          </p>
        </div>
      </div>

      {/* Country Performance Benchmarking Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Ülke Bazlı Karşılaştırmalı Metrikler ({metrics.length})</span>
        </h4>

        <div className="space-y-3">
          {metrics.map((m) => (
            <div
              key={m.countryCode}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{m.countryName} ({m.countryCode})</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  AI Skor: {m.aiMarketOpportunityRating} / 5.0
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Çeyreklik GMV: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{m.quarterlyRevenueGmvAmount.toLocaleString()} {m.currencyCode}</span></div>
                <div>Tedarikçi Büyümesi: <span className="font-bold text-emerald-500">+% {m.vendorGrowthPercent}</span></div>
                <div>CAC: <span className="font-bold text-[#D4AF37]">${m.customerAcquisitionCostUsd} USD</span></div>
                <div>LTV: <span className="font-bold text-emerald-500">${m.customerLifetimeValueUsd} USD</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                  <span>Pazaryeri Likidite Skoru</span>
                  <span>%{m.marketplaceLiquidityScorePercent}</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${m.marketplaceLiquidityScorePercent}%` }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-[#86868B] pt-1">
                ✦ WedyAI Analizi: {m.aiOpportunityTip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};