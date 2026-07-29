"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, RefreshCw, CheckCircle2, Globe, Users, Building, ToggleLeft, ToggleRight, Megaphone, Activity, Sliders } from "lucide-react";
import { RegionalAdminEngine, RegionalAdminRoleRecord, RegionalFeatureToggle, RegionalGovernanceSummary, AdminGovernanceLevel } from "@/lib/global/regional-admin-engine";

export const RegionalAdministrationCenter: React.FC = () => {
  const [admins, setAdmins] = useState<RegionalAdminRoleRecord[]>([]);
  const [toggles, setToggles] = useState<RegionalFeatureToggle[]>([]);
  const [summary, setSummary] = useState<RegionalGovernanceSummary | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<AdminGovernanceLevel | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    RegionalAdminEngine.getAdminRoles().then(setAdmins);
    RegionalAdminEngine.getFeatureToggles().then(setToggles);
    RegionalAdminEngine.getSummary().then(setSummary);
  }, []);

  const handleToggleFlag = async (flagId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await RegionalAdminEngine.toggleFeatureFlag(flagId);
      setIsProcessing(false);
      RegionalAdminEngine.getFeatureToggles().then(setToggles);
    }, 400);
  };

  if (!summary) return null;

  const filteredAdmins = selectedLevel === "ALL"
    ? admins
    : admins.filter((a) => a.governanceLevel === selectedLevel);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Regional Governance Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Bölgesel Yönetim & Yetki Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{summary.regionalHealthScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Merkezi yönetimi korurken 6 farklı idari seviyede (Global, Bölge, Ülke, İl, Şehir, Pazaryeri) yetki devri ve bölgesel yönetim.
        </p>

        {/* Executive Governance Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Bölgesel Yöneticiler</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeRegionalAdminsCount} Admin
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yönetilen Alanlar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalManagedScopesCount} Scope
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">RBAC Entegrasyonu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              Phase 01 Active
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Regional Capacity & Operational Forecast Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Bölgesel Kapasite Tahmini
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Capacity AI
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {summary.aiCapacityForecastTip}
            </p>
            <p className="text-[10px] text-[#86868B] pt-1">
              Öneri: {summary.aiOperationalRecommendationNote}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Governance Level Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "GLOBAL", "REGION", "COUNTRY", "STATE_PROVINCE", "CITY", "MARKETPLACE"] as (AdminGovernanceLevel | "ALL")[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedLevel === lvl
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {lvl === "ALL" ? "Tüm Seviyeler" : lvl}
          </button>
        ))}
      </div>

      {/* Regional Admin Roles Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span>Atanmış Bölgesel Yöneticiler ({filteredAdmins.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredAdmins.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{a.adminName} ({a.email})</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {a.governanceLevel}: {a.assignedScopeCode}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {a.delegatedPermissions.map((perm) => (
                  <span
                    key={perm}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6]"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Feature Toggles Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Özellik Şalterleri (Feature Flags)</span>
        </h4>

        <div className="space-y-3">
          {toggles.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span className="font-mono">{t.featureKey} ({t.scopeCode})</span>
                <button
                  onClick={() => handleToggleFlag(t.id)}
                  disabled={isProcessing}
                  className="flex items-center gap-1 text-xs font-bold"
                >
                  {t.isEnabled ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <ToggleRight className="w-6 h-6 text-emerald-500" /> AKTİF
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1">
                      <ToggleLeft className="w-6 h-6 text-red-400" /> PASİF
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Değerlendirmesi: {t.aiRiskAssessmentNote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};