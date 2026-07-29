"use client";

import React, { useState, useEffect } from "react";
import { Globe2, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Clock, Landmark, FileText, Layers, Globe, MapPin } from "lucide-react";
import { GlobalEngine, RegionalDomainProfile, GlobalPlatformSummary, RegionScopeCode } from "@/lib/global/global-engine";

export const GlobalPlatformCenter: React.FC = () => {
  const [domains, setDomains] = useState<RegionalDomainProfile[]>([]);
  const [summary, setSummary] = useState<GlobalPlatformSummary | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionalDomainProfile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    GlobalEngine.getRegionalDomains().then((data) => {
      setDomains(data);
      if (data.length > 0) setSelectedRegion(data[0]);
    });
    GlobalEngine.getGlobalSummary().then(setSummary);
  }, []);

  const handleToggle = async (regionId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await GlobalEngine.toggleRegionStatus(regionId);
      setIsProcessing(false);
      GlobalEngine.getRegionalDomains().then((data) => {
        setDomains(data);
        const updated = data.find((d) => d.id === regionId);
        if (updated) setSelectedRegion(updated);
      });
      GlobalEngine.getGlobalSummary().then(setSummary);
    }, 400);
  };

  if (!summary || !selectedRegion) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Platform & Genişleme Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Global Readiness: %{summary.aiGlobalReadinessScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çoklu ülke, dil, saat dilimi, para birimi, vergi ve bölgesel yasal uyum (GDPR, KVKK, PDPL) yönetim altyapısı.
        </p>

        {/* Global Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Bölgeler</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeRegionsCount} Bölge
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Diller</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedLanguagesCount} Dil
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ana Merkez Bölge</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.primaryActiveRegion}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Localization & Readiness Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Genişleme & Uyum Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Multi-Tenant Isolated
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiLocalizationInsightNote}
          </p>
        </div>
      </div>

      {/* Regional Domain Models Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Alan Modelleri ({domains.length})</span>
        </h4>

        <div className="space-y-3">
          {domains.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedRegion(d)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-3 ${
                selectedRegion.id === d.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{d.regionName} ({d.regionCode})</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  d.isActive
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {d.isActive ? "ACTIVE" : "DISABLED"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono opacity-80">
                <div>Dil / Saat: {d.defaultLanguage.toUpperCase()} • {d.timeZoneIana}</div>
                <div>Para Birimi / Vergi: {d.defaultCurrency} • %{d.vatTaxRateDefaultPercent}</div>
              </div>

              <div className="p-2 bg-white/10 dark:bg-black/30 rounded-xl text-[10px] font-medium flex justify-between items-center">
                <span>Yasal Çerçeve: {d.privacyComplianceFramework}</span>
                <span>Konsept: {d.culturalWeddingTemplate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};