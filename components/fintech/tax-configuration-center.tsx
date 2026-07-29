"use client";

import React, { useState, useEffect } from "react";
import { Receipt, Sparkles, ShieldCheck, CheckCircle2, RefreshCw, AlertCircle, Building, Layers, Sliders, Globe } from "lucide-react";
import { TaxEngine, TaxProfileRule, TaxReportSummary, TaxRegionScope } from "@/lib/fintech/tax-engine";

export const TaxConfigurationCenter: React.FC = () => {
  const [profiles, setProfiles] = useState<TaxProfileRule[]>([]);
  const [summary, setSummary] = useState<TaxReportSummary | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<TaxRegionScope | "ALL">("ALL");
  const [rateInput, setRateInput] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    TaxEngine.getTaxProfiles().then((data) => {
      setProfiles(data);
      if (data.length > 0) {
        setSelectedProfileId(data[0].id);
        setRateInput(data[0].taxRatePercent.toString());
      }
    });
    TaxEngine.getTaxSummary().then(setSummary);
  }, []);

  const handleUpdateRate = async () => {
    if (!selectedProfileId || !rateInput) return;
    const numRate = Number(rateInput);
    if (isNaN(numRate)) return;

    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await TaxEngine.updateTaxProfileRate(selectedProfileId, numRate);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Vergi profili oranı başarıyla güncellendi!" });
        TaxEngine.getTaxProfiles().then(setProfiles);
      } else {
        setStatusMsg({ type: "error", text: "Oran güncellenemedi." });
      }
    }, 600);
  };

  if (!summary) return null;

  const filteredProfiles = selectedRegion === "ALL"
    ? profiles
    : profiles.filter((p) => p.regionScope === selectedRegion);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Tax Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Vergi Konfigürasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Multi-Region Tax
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          KDV/VAT vergi profilleri, bölgesel kurallar, muafiyetler ve WedyAI akıllı vergi kural önerileri.
        </p>

        {/* Executive Tax Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplanan KDV Rezervi</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalTaxLiabilityCollected / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ayrılan Stopaj</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(summary.totalWithholdingTaxReserved / 1000).toFixed(0)}K TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Profiller</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeTaxProfilesCount} Bölge
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Tax Suggestions & Compliance Alert Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Vergi Önerisi & Uyum Uyarısı
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Tax Engine Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs space-y-1">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
              ✦ {summary.aiTaxComplianceAlert}
            </p>
            <p className="text-[10px] text-[#86868B] pt-1">
              Öneri: {summary.aiTaxRuleSuggestionNote}
            </p>
          </div>
        </div>
      </div>

      {/* Region Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "TR_LOCAL", "EU_VAT", "GCC_VAT", "US_SALES_TAX"] as (TaxRegionScope | "ALL")[]).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRegion === reg
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {reg === "ALL" ? "Tüm Bölgeler" : reg}
          </button>
        ))}
      </div>

      {/* Update Selected Tax Profile Rate Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#D4AF37]" />
          <span>Vergi Profili Oranını Yapılandır</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <select
              value={selectedProfileId || ""}
              onChange={(e) => {
                setSelectedProfileId(e.target.value);
                const found = profiles.find((p) => p.id === e.target.value);
                if (found) setRateInput(found.taxRatePercent.toString());
              }}
              className="col-span-2 h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>{p.profileName}</option>
              ))}
            </select>

            <input
              type="number"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              placeholder="Oran (%)"
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <button
            onClick={handleUpdateRate}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Receipt className="w-4 h-4 text-[#D4AF37]" />
                <span>Vergi Oranını Kaydet & Güncelle</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tax Profiles Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Vergi Kuralları ({filteredProfiles.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredProfiles.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{p.profileName}</span>
                <span className="font-mono text-[#D4AF37] text-sm font-bold">
                  %{p.taxRatePercent}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{p.description}</p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Bölge: {p.regionScope}</span>
                <span>Stopaj: {p.withholdingTaxRatePercent ? `%${p.withholdingTaxRatePercent}` : "Yok"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};