"use client";

import React, { useState, useEffect } from "react";
import { Command, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, TrendingUp, DollarSign, Activity, Users, Layers, Award, ShieldAlert, Check } from "lucide-react";
import { GlobalCommandEngine, GlobalTelemetry9D, ExecutiveRolePerspective, GlobalCommandSummary, ExecutiveRoleView } from "@/lib/global/global-command-engine";

export const GlobalCommandCenter: React.FC = () => {
  const [telemetry, setTelemetry] = useState<GlobalTelemetry9D | null>(null);
  const [perspectives, setPerspectives] = useState<ExecutiveRolePerspective[]>([]);
  const [summary, setSummary] = useState<GlobalCommandSummary | null>(null);
  const [selectedRole, setSelectedRole] = useState<ExecutiveRoleView>("CEO");

  useEffect(() => {
    GlobalCommandEngine.get9DTelemetry().then(setTelemetry);
    GlobalCommandEngine.getRolePerspectives().then(setPerspectives);
    GlobalCommandEngine.getSummary().then(setSummary);
  }, []);

  if (!summary || !telemetry) return null;

  const currentPerspective = perspectives.find((p) => p.role === selectedRole) || perspectives[0];

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Command Center Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Command className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Komuta & Kontrol Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> PHASE 12 COMPLETED
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          C-Suite yöneticileri ve bölge direktörleri için konsolide 9 boyutlu küresel canlı operasyon paneli ve WedyAI stratejik briefingleri.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Konsolide GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ${(telemetry.consolidatedGmvAmountUsd / 1000000).toFixed(1)}M USD
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Küresel Kullanıcılar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.activeInternationalUsersCount / 1000).toFixed(0)}K User
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Uyum & Uptime</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{telemetry.operationalUptimePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Executive Briefing Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI C-Suite Stratejik İcra Briefing
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Executive AI Briefing
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {currentPerspective ? currentPerspective.aiBriefingHighlight : summary.aiExecutiveBriefingNote}
          </p>
        </div>
      </div>

      {/* Role View Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["CEO", "COO", "CFO", "CMO", "REGIONAL_DIRECTOR", "COUNTRY_MANAGER"] as ExecutiveRoleView[]).map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRole === r
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {r} Görünümü
          </button>
        ))}
      </div>

      {/* Active Role Perspective Card */}
      {currentPerspective && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>{currentPerspective.title}</span>
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
              <span className="text-[10px] text-[#86868B] block font-mono">{currentPerspective.primaryKpiLabel}</span>
              <span className="text-base font-bold font-mono text-[#D4AF37]">{currentPerspective.primaryKpiValue}</span>
            </div>
            <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
              <span className="text-[10px] text-[#86868B] block font-mono">{currentPerspective.secondaryKpiLabel}</span>
              <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">{currentPerspective.secondaryKpiValue}</span>
            </div>
          </div>
        </div>
      )}

      {/* 9-Dimensional Global Operations Grid */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <span>9 Boyutlu Canlı Küresel Telemetri</span>
        </h4>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center">
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">1. Ülkeler</span>
            <span className="font-bold text-[#111111] dark:text-[#F5F4F0] text-xs">{telemetry.activeCountriesCount} Ülke</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">2. Bölgeler</span>
            <span className="font-bold text-[#111111] dark:text-[#F5F4F0] text-xs">{telemetry.activeRegionsCount} Bölge</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">3. Yerelleştirme</span>
            <span className="font-bold text-emerald-500 text-xs">%{telemetry.overallLocalizationPercent}</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">4. Gelir (GMV)</span>
            <span className="font-bold text-[#D4AF37] text-xs">${(telemetry.consolidatedGmvAmountUsd / 1000000).toFixed(1)}M</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">5. Likidite</span>
            <span className="font-bold text-emerald-500 text-xs">%{telemetry.marketplaceLiquidityPercent}</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">6. Büyüme</span>
            <span className="font-bold text-emerald-500 text-xs">+%{telemetry.quarterlyGrowthPercent}</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">7. Uyum</span>
            <span className="font-bold text-emerald-500 text-xs">%{telemetry.complianceHealthPercent}</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">8. Uptime</span>
            <span className="font-bold text-emerald-500 text-xs">%{telemetry.operationalUptimePercent}</span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[#86868B] block">9. Genişleme</span>
            <span className="font-bold text-[#D4AF37] text-xs">%{telemetry.expansionFeasibilityScorePercent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};