"use client";

import React, { useState } from "react";
import { predictOptimalPriceAction, generateCampaignSuggestionsAction } from "@/lib/actions/ai-pricing-engine";

export default function PricingSimulatorConsole() {
  const [basePrice, setBasePrice] = useState(150000);
  const [month, setMonth] = useState(7);
  const [occupancyRatePct, setOccupancyRatePct] = useState(75);
  const [priceResult, setPriceResult] = useState<any>(null);
  const [campaignResult, setCampaignResult] = useState<any>(null);

  const handlePredictPrice = async () => {
    const res = await predictOptimalPriceAction({
      basePrice,
      currency: "TRY",
      category: "VENUE",
      month,
      occupancyRatePct,
      leadQualityScore: 85,
    });

    if (res.success) {
      setPriceResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleGenerateCampaign = async () => {
    const res = await generateCampaignSuggestionsAction({
      category: "VENUE",
      targetMonth: month,
      currentOccupancyPct: occupancyRatePct,
    });

    if (res.success) {
      setCampaignResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Pricing Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Dynamic Price & Campaign Simulator Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Baz Fiyat (₺)</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Ay (1-12)</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Doluluk Oranı (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={occupancyRatePct}
                onChange={(e) => setOccupancyRatePct(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handlePredictPrice}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              💰 AI Optimal Fiyatı Hesapla
            </button>

            <button
              onClick={handleGenerateCampaign}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              💡 Otomatik Kampanya Önerisi Üret
            </button>
          </div>

          {priceResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Dynamic Pricing Engine Output</span>
                <span className="text-emerald-400 font-bold">Fiyat Değişimi: +%{priceResult.priceDeltaPct}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Baz Fiyat: <span className="text-slate-300">₺{priceResult.basePrice.toLocaleString()}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Önerilen Optimal Fiyat: <span className="text-emerald-400 font-bold">₺{priceResult.optimalPrice.toLocaleString()}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Tahmini Ciro Artışı: <span className="text-indigo-400 font-bold">+%{priceResult.predictedRevenueIncreasePct}</span></div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                📢 <strong>Stratejik Öneri:</strong> {priceResult.suggestedCampaign}
              </div>
            </div>
          )}

          {campaignResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono">
              🚀 <strong>Kampanya Önerisi:</strong> {campaignResult.suggestedCampaignTitle} (Tahmini Doluluk Artışı: +%{campaignResult.expectedOccupancyBoostPct})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
