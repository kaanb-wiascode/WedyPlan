"use client";

import React, { useState, useEffect } from "react";
import { Handshake, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Building2, Plane, Hotel, Award, TrendingUp, Sliders } from "lucide-react";
import { InternationalPartnerEngine, InternationalPartnerRecord, PartnerNetworkSummary, PartnerCategoryType } from "@/lib/global/international-partner-engine";

export const PartnerNetworkCenter: React.FC = () => {
  const [partners, setPartners] = useState<InternationalPartnerRecord[]>([]);
  const [summary, setSummary] = useState<PartnerNetworkSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategoryType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    InternationalPartnerEngine.getPartners().then(setPartners);
    InternationalPartnerEngine.getPartnerSummary().then(setSummary);
  }, []);

  const handleTogglePartner = async (partnerId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await InternationalPartnerEngine.togglePartnerStatus(partnerId);
      setIsProcessing(false);
      InternationalPartnerEngine.getPartners().then(setPartners);
      InternationalPartnerEngine.getPartnerSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  const filteredPartners = selectedCategory === "ALL"
    ? partners
    : partners.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Partner Network Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Uluslararası İş Ortaklığı Ağı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Network Health: %{summary.aiPartnerScoringHealthPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Bölgesel acenteler, düğün birlikleri, seyahat & otel ortakları, teknoloji ve pazarlama ortaklarının yönetimi ve WedyAI fırsat analizi.
        </p>

        {/* Executive Partner Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif İş Ortakları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActivePartnersCount} Ortak
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yönlendirilen Düğün</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalPartnerReferredWeddingsCount} Düğün
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kapsanan Ülkeler</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.coveredCountriesCount} Ülke
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Expansion Opportunities & Partner Scoring Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İş Ortaklığı & Büyüme Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Strategic Alliances
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiNetworkInsightNote}
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "WEDDING_ASSOCIATION", "TRAVEL_PARTNER", "HOSPITALITY_PARTNER", "REGIONAL_AGENCY"] as (PartnerCategoryType | "ALL")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {cat === "ALL" ? "Tüm Ortaklar" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Partners Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <span>Stratejik İş Ortakları ({filteredPartners.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredPartners.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{p.partnerName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {p.tierName} ({p.countryCode})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Kategori: {p.category}</div>
                <div>Sözleşme Ref: {p.activeContractRef}</div>
                <div>Yönlendirilen Düğün: {p.referredWeddingsCount}</div>
                <div>Gelir Payı: %{p.commissionRevenueSharePercent}</div>
              </div>

              <p className="text-[10px] text-[#86868B] pt-1">
                ✦ WedyAI Analizi: {p.aiExpansionOpportunityTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleTogglePartner(p.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : p.isActive ? (
                    <span>Ortaklık Aktif (Durdur)</span>
                  ) : (
                    <span>Ortaklık Pasif (Aktif Et)</span>
                  )}
                </button>

                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Performans Skoru: %{p.aiPartnerScorePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};