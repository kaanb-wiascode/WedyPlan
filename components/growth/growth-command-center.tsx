"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, TrendingUp, BarChart3, Zap, Crown, Flame, ArrowUpRight, Award, CheckCircle2, Layers } from "lucide-react";
import { GrowthCommandEngine, GlobalGrowthMetrics, ExecutiveInsight, ExecutiveRole } from "@/lib/growth/growth-command-engine";

export const GrowthCommandCenter: React.FC = () => {
  const [metrics, setMetrics] = useState<GlobalGrowthMetrics | null>(null);
  const [insights, setInsights] = useState<ExecutiveInsight[]>([]);
  const [selectedRole, setSelectedRole] = useState<ExecutiveRole>("CEO");

  useEffect(() => {
    GrowthCommandEngine.getGlobalMetrics().then(setMetrics);
    GrowthCommandEngine.getExecutiveInsights().then(setInsights);
  }, []);

  if (!metrics) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Büyüme Komuta Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyPlan Command Center
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm pazarlama, satış, CRM, SEO, referral, affiliate ve finansal büyüme operasyonlarının otonom komuta yönetim paneli.
        </p>

        {/* Global Executive Kpis */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(metrics.totalGmvAmount / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Gelir (MRR)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(metrics.monthlyRecurringRevenue / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Escrow Güvencede</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{(metrics.activeEscrowValue / 1000000).toFixed(1)}M TL
            </span>
          </div>
        </div>
      </div>

      {/* Role Viewport Selectors */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["CEO", "CMO", "GROWTH", "SALES"] as ExecutiveRole[]).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedRole === role
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {role === "CEO" ? "CEO View" : role === "CMO" ? "CMO View" : role === "GROWTH" ? "Head of Growth" : "Head of Sales"}
          </button>
        ))}
      </div>

      {/* WedyAI Autonomous Insights Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Otonom Büyüme & Fırsat Radarı
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Viral K-Factor: {metrics.viralKFactor}
          </span>
        </div>

        <div className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ins.headline}</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {ins.projectedGmvImpact}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{ins.description}</p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-semibold">
                ✦ Önerilen Aksiyon: {ins.actionableStep}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Module Operational Status Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Operasyonel Modül Durumu</span>
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">LTV / CAC Oranı</span>
            <span className="font-mono font-bold text-emerald-500 text-sm">{metrics.cacToLtvRatio}x (Sınıfının En İyisi)</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block">Marka Skoru</span>
            <span className="font-mono font-bold text-[#D4AF37] text-sm">{metrics.overallBrandReputationScore} / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
};