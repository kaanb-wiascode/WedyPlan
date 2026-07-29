"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Tag, Percent, Sliders, TrendingUp } from "lucide-react";
import { GlobalPricingEngine, RegionalPricingRule, GlobalPricingSummary } from "@/lib/global/global-pricing-engine";

export const GlobalPricingCenter: React.FC = () => {
  const [rules, setRules] = useState<RegionalPricingRule[]>([]);
  const [summary, setSummary] = useState<GlobalPricingSummary | null>(null);
  const [selectedRule, setSelectedRule] = useState<RegionalPricingRule | null>(null);

  // Form State
  const [basePrice, setBasePrice] = useState(0);
  const [takeRate, setTakeRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    GlobalPricingEngine.getPricingRules().then((data) => {
      setRules(data);
      if (data.length > 0) {
        setSelectedRule(data[0]);
        setBasePrice(data[0].baseSubscriptionPriceAmount);
        setTakeRate(data[0].marketplaceTakeRatePercent);
        setDiscount(data[0].promotionalDiscountPercent);
      }
    });
    GlobalPricingEngine.getPricingSummary().then(setSummary);
  }, []);

  const handleSelectRule = (r: RegionalPricingRule) => {
    setSelectedRule(r);
    setBasePrice(r.baseSubscriptionPriceAmount);
    setTakeRate(r.marketplaceTakeRatePercent);
    setDiscount(r.promotionalDiscountPercent);
  };

  const handleSavePricing = async () => {
    if (!selectedRule) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await GlobalPricingEngine.updatePricingRule(selectedRule.id, {
        baseSubscriptionPriceAmount: Number(basePrice),
        marketplaceTakeRatePercent: Number(takeRate),
        promotionalDiscountPercent: Number(discount),
      });
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${selectedRule.countryCode}' bölgesel fiyatlandırma stratejisi güncellendi!` });
        GlobalPricingEngine.getPricingRules().then((data) => {
          setRules(data);
          const updated = data.find((r) => r.id === selectedRule.id);
          if (updated) setSelectedRule(updated);
        });
      } else {
        setStatusMsg({ type: "error", text: "Fiyatlandırma güncellenemedi." });
      }
    }, 500);
  };

  if (!summary || !selectedRule) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Pricing Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Fiyatlandırma & İndirim Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Optimization: %{summary.aiPriceOptimizationHealthPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Ülkelere özel dinamik abonelik fiyatları, pazaryeri komisyon oranları (Take-Rate), Purchasing Power Parity (PPP) ve WedyAI fiyat optimizasyonu.
        </p>

        {/* Executive Pricing Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Yapılandırılan Bölge</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.configuredPricingRegionsCount} Bölge
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Promosyon</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activePromotionsCount} Kampanya
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">PPP Entegrasyonu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Price Optimization & Recommendation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Fiyat & Rekabet Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Dynamic Pricing
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedRule.aiPriceTip}
          </p>
        </div>
      </div>

      {/* Rule Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {rules.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelectRule(r)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedRule.id === r.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {r.countryCode} ({r.currencyCode})
          </button>
        ))}
      </div>

      {/* Edit Selected Pricing Rule Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedRule.ruleTitle}
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Para Birimi: {selectedRule.currencyCode} • PPP: {selectedRule.isPurchasingPowerParityApplied ? "Aktif" : "Pasif"}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Skor: %{selectedRule.aiOptimizationScorePercent}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Taban Abonelik Fiyatı ({selectedRule.currencyCode})</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-[#86868B] block pb-1">Pazaryeri Komisyonu (%)</label>
              <input
                type="number"
                step="0.5"
                value={takeRate}
                onChange={(e) => setTakeRate(Number(e.target.value))}
                className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#86868B] block pb-1">Promosyon İndirimi (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSavePricing}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                <span>Bölgesel Fiyat Stratejisini Kaydet</span>
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
    </div>
  );
};