"use client";

import React, { useState, useEffect } from "react";
import { Landmark, Sparkles, ShieldCheck, Calendar, ArrowUpRight, ArrowDownRight, RefreshCw, CheckCircle2, TrendingUp, DollarSign, Wallet, Layers } from "lucide-react";
import { TreasuryEngine, TreasuryCashPosition, FinancialCalendarEvent, TreasuryForecastReport } from "@/lib/fintech/treasury-engine";

export const TreasuryDashboard: React.FC = () => {
  const [position, setPosition] = useState<TreasuryCashPosition | null>(null);
  const [events, setEvents] = useState<FinancialCalendarEvent[]>([]);
  const [forecast, setForecast] = useState<TreasuryForecastReport | null>(null);

  useEffect(() => {
    TreasuryEngine.getCashPosition().then(setPosition);
    TreasuryEngine.getCalendarEvents().then(setEvents);
    TreasuryEngine.getTreasuryForecast().then(setForecast);
  }, []);

  if (!position || !forecast) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Treasury Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Platform Hazine & Likidite Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Liquidity Score: %{position.liquidityHealthScore}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Platform likidite yönetimi, giren/çıkan nakit akışı projeksiyonları, finansal takvim ve WedyAI hazine fonlama önerileri.
        </p>

        {/* Executive Treasury Position Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Likit Varlıklar</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(position.totalLiquidAssets / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Bankadaki Nakit</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(position.availableCashInBank / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Gelecek Nakit (Takas)</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{(position.pendingIncomingEscrowClearing / 1000000).toFixed(1)}M TL
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Cash Flow Forecast & Strategic Funding Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Hazine & Fonlama Önerisi
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Status: {forecast.aiLiquidityRiskLevel}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {forecast.aiCashFlowForecastNote}
            </p>
            <p className="text-[10px] text-[#86868B] pt-1">
              Öneri: {forecast.aiFundingRecommendationTip}
            </p>
          </div>
        </div>
      </div>

      {/* Financial Calendar Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#D4AF37]" />
          <span>Yaklaşan Finansal Takvim Etkinlikleri ({events.length})</span>
        </h4>

        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ev.title}</span>
                <span className="font-mono text-[#D4AF37] text-sm font-bold">
                  ₺{ev.amount.toLocaleString()} {ev.currency}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tür: {ev.eventType}</span>
                <span>Tarih: {new Date(ev.scheduledDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};