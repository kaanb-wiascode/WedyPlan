"use client";

import React, { useState, useEffect } from "react";
import { Globe2, Sparkles, ShieldCheck, RefreshCw, TrendingUp, MapPin, BarChart3, Languages, DollarSign, Activity } from "lucide-react";
import { GlobalOpsEngine, RegionalRevenueBreakdown, GlobalExpansionForecast, GlobalOpsTelemetrySummary } from "@/lib/global/global-ops-engine";

export const GlobalOperationsDashboard: React.FC = () => {
  const [breakdown, setBreakdown] = useState<RegionalRevenueBreakdown[]>([]);
  const [forecast, setForecast] = useState<GlobalExpansionForecast | null>(null);
  const [summary, setSummary] = useState<GlobalOpsTelemetrySummary | null>(null);

  useEffect(() => {
    GlobalOpsEngine.getRegionalBreakdown().then(setBreakdown);
    GlobalOpsEngine.getExpansionForecast().then(setForecast);
    GlobalOpsEngine.getSummary().then(setSummary);
  }, []);

  if (!summary || !forecast) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Ops Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Operasyonlar Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Global Sync: %{summary.overallLocalizationProgressPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Uluslararası pazaryeri aktivitesi, bölge bazlı gelir ve büyüme ivmesi, yerelleştirme seviyeleri ve WedyAI küresel genişleme projeksiyonları.
        </p>

        {/* Global Ops Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Pazarlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeCountriesCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Konsolide Net Gelir</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(summary.globalNetRevenueTotal / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Diller</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.supportedLanguagesCount} Dil
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Expansion Forecast & Regional Risk Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Genişleme & Risk Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            12M Forecast: ₺{(forecast.predictedGmv12Months / 1000000).toFixed(1)}M
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {forecast.aiExpansionRecommendationTip}
            </p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold pt-1">
              Risk Uyarısı: {forecast.aiRegionalRiskAlert}
            </p>
          </div>
        </div>
      </div>

      {/* Regional Revenue & Growth Breakdown Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Gelir & Büyüme Performansı ({breakdown.length})</span>
        </h4>

        <div className="space-y-3">
          {breakdown.map((r) => (
            <div
              key={r.countryCode}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.countryName} ({r.countryCode})</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +%{r.quarterlyGrowthPercent}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Bölgesel GMV: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{r.regionalGmvAmount.toLocaleString()} {r.currencyCode}</span></div>
                <div>Net Gelir: <span className="font-bold text-[#D4AF37]">{r.netRevenueAmount.toLocaleString()} {r.currencyCode}</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                  <span>Yerelleştirme Tamamlanma</span>
                  <span>%{r.localizationProgressPercent}</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                    style={{ width: `${r.localizationProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};