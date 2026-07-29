"use client";

import React, { useState, useEffect } from "react";
import { Handshake, Sparkles, ShieldCheck, CheckCircle2, Building2, Landmark, Shield, Plane, Percent, RefreshCw, Plus } from "lucide-react";
import { PartnershipEngine, StrategicPartner, PartnershipForecast, PartnerIndustry } from "@/lib/growth/partnership-engine";

export const PartnerCenter: React.FC = () => {
  const [partners, setPartners] = useState<StrategicPartner[]>([]);
  const [forecast, setForecast] = useState<PartnershipForecast | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<PartnerIndustry | "ALL">("ALL");

  // New Partner Form
  const [partnerNameInput, setPartnerNameInput] = useState("");
  const [industryInput, setIndustryInput] = useState<PartnerIndustry>("HOTEL_CHAIN");
  const [contractInput, setContractInput] = useState("");
  const [shareInput, setShareInput] = useState("10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    PartnershipEngine.getPartners().then(setPartners);
    PartnershipEngine.getForecast().then(setForecast);
  }, []);

  const handleCreatePartner = async () => {
    if (!partnerNameInput.trim() || !contractInput.trim()) return;
    setIsSubmitting(true);

    setTimeout(async () => {
      const created = await PartnershipEngine.createPartner(
        partnerNameInput,
        industryInput,
        contractInput,
        Number(shareInput) || 10
      );

      setIsSubmitting(false);
      setPartnerNameInput("");
      setContractInput("");
      setStatusMsg(`'${created.partnerName}' kurumsal partner anlaşması başarıyla sisteme tanımlandı!`);
      PartnershipEngine.getPartners().then(setPartners);
      setTimeout(() => setStatusMsg(null), 3000);
    }, 600);
  };

  if (!forecast) return null;

  const filteredPartners = selectedIndustry === "ALL"
    ? partners
    : partners.filter((p) => p.industry === selectedIndustry);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Stratejik Ortaklık & Partner Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> B2B Corporate Alliance
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Otel zincirleri, bankalar, sigorta şirketleri, seyahat acenteleri ve lüks markalar için çok taraflı gelir paylaşımı ve sözleşme altyapısı.
        </p>

        {/* Forecast Summary Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Partner GMV Katkısı</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(forecast.totalAttributedGmv / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Tahmini Yıllık Gelir</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(forecast.projectedAnnualRevenueShare / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kurumsal Ortak</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {forecast.activeStrategicPartnersCount} Şirket
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Opportunity Detection & Recommendation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı B2B Fırsat Analizi
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Partner Intelligence</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {forecast.aiGrowthRecommendation}
          </p>
        </div>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "HOTEL_CHAIN", "COMMERCIAL_BANK", "INSURANCE_PROVIDER", "TRAVEL_AGENCY"] as const).map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedIndustry === ind
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {ind === "ALL" ? "Tüm Sektörler" : ind === "HOTEL_CHAIN" ? "Oteller" : ind === "COMMERCIAL_BANK" ? "Bankalar" : ind === "INSURANCE_PROVIDER" ? "Sigorta" : "Acenteler"}
          </button>
        ))}
      </div>

      {/* Register New Corporate Partner Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Kurumsal Stratejik Anlaşma Ekle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={partnerNameInput}
              onChange={(e) => setPartnerNameInput(e.target.value)}
              placeholder="Partner Şirket Adı..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />

            <select
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value as PartnerIndustry)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="HOTEL_CHAIN">Otel Zinciri</option>
              <option value="COMMERCIAL_BANK">Banka / Finans</option>
              <option value="INSURANCE_PROVIDER">Sigorta</option>
              <option value="TRAVEL_AGENCY">Seyahat Acentesi</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={contractInput}
              className="col-span-2 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
              onChange={(e) => setContractInput(e.target.value)}
              placeholder="Sözleşme Konusu / Başlığı..."
            />
            <div className="relative">
              <input
                type="number"
                value={shareInput}
                onChange={(e) => setShareInput(e.target.value)}
                placeholder="Pay %"
                className="w-full h-11 pl-4 pr-7 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
              />
              <Percent className="w-3.5 h-3.5 text-[#86868B] absolute right-3 top-3.5" />
            </div>
          </div>

          <button
            onClick={handleCreatePartner}
            disabled={!partnerNameInput.trim() || !contractInput.trim() || isSubmitting}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Handshake className="w-4 h-4 text-[#D4AF37]" />
                <span>Anlaşmayı Kaydet</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Strategic Partners List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Aktif Stratejik Ortaklıklar ({filteredPartners.length})
        </h4>

        <div className="space-y-3">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <div>
                  <span className="text-sm block">{partner.partnerName}</span>
                  <span className="text-[10px] text-[#86868B] font-mono">
                    {partner.industry} • Gelir Payı: %{partner.revenueSharePercent}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                  Skor: {partner.aiPartnerScore}/100
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{partner.contractTitle}</span>
                <p className="text-[10px] text-[#D4AF37] font-semibold">✦ WedyAI Tespiti: {partner.aiOpportunityAlert}</p>
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Ayrılan Hakediş: ₺{partner.partnerEarningsTotal.toLocaleString()}</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">
                  GMV: ₺{partner.attributedGmvTotal.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};