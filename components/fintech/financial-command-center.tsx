"use client";

import React, { useState, useEffect } from "react";
import { Crown, Sparkles, ShieldCheck, TrendingUp, DollarSign, Wallet, Lock, Layers, BarChart3, Activity, Command, ArrowUpRight } from "lucide-react";
import { CommandCenterEngine, CommandCenterMetrics, StrategicExecutiveInsight, ExecutiveViewportRole } from "@/lib/fintech/command-center-engine";

export const FinancialCommandCenter: React.FC = () => {
  const [metrics, setMetrics] = useState<CommandCenterMetrics | null>(null);
  const [insights, setInsights] = useState<StrategicExecutiveInsight[]>([]);
  const [selectedRole, setSelectedRole] = useState<ExecutiveViewportRole>("CEO");

  useEffect(() => {
    CommandCenterEngine.getMetrics().then(setMetrics);
    CommandCenterEngine.getInsights(selectedRole).then(setInsights);
  }, [selectedRole]);

  if (!metrics) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              WedyPlan Finansal Komuta Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{metrics.marketplaceHealthScore}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          CEO, CFO ve Direktörler için tüm FinTech ekosisteminin gerçek zamanlı üst düzey finansal komuta ve strateji paneli.
        </p>

        {/* Global Executive Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Pazaryeri GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(metrics.totalGmv / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Net Gelir</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(metrics.netRevenue / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Net Kar Marjı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{metrics.netProfitMarginPercent}
            </span>
          </div>
        </div>
      </div>

      {/* Role Viewport Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["CEO", "CFO", "FINANCE_DIRECTOR", "MARKETPLACE_DIRECTOR", "OPERATIONS_DIRECTOR"] as ExecutiveViewportRole[]).map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRole === r
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* WedyAI Executive Strategic Insights */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>{selectedRole} Stratejik Yapay Zeka Karar Desteği</span>
        </h4>

        <div className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ins.title}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  Etki: %{ins.impactScorePercent}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{ins.insightText}</p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-semibold">
                ✦ Stratejik Öneri: {ins.recommendationNote}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FinTech Core Domains Overview Grid */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>FinTech Core Ekosistem Durumu</span>
        </h4>

        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">Escrow Kilitli Hacim</span>
            <span className="font-bold text-[#D4AF37]">₺{(metrics.escrowLockedTotal / 1000000).toFixed(1)}M TL</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">Toplanan Komisyon</span>
            <span className="font-bold text-emerald-500">₺{(metrics.commissionsCollectedTotal / 1000000).toFixed(2)}M TL</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">Abonelik MRR</span>
            <span className="font-bold text-blue-500">₺{(metrics.mrrSubscriptionsTotal / 1000000).toFixed(2)}M TL</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[9px] text-[#86868B] block">Vergi Rezervi (KDV)</span>
            <span className="font-bold text-amber-500">₺{(metrics.taxReservesHeldTotal / 1000000).toFixed(2)}M TL</span>
          </div>
        </div>
      </div>
    </div>
  );
};