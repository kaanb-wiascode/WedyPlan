"use client";

import React, { useState } from "react";
import { matchWeddingVendorsAction } from "@/lib/actions/ai-matching-engine";

export default function MatchingExplorerTable() {
  const [coupleId, setCoupleId] = useState("couple_bodrum_2026");
  const [category, setCategory] = useState<any>("VENUE");
  const [targetCity, setTargetCity] = useState("Bodrum");
  const [maxBudget, setMaxBudget] = useState(750000);
  const [matchResult, setMatchResult] = useState<any>(null);

  const handleExecuteMatch = async () => {
    const res = await matchWeddingVendorsAction({
      coupleId,
      category,
      targetCity,
      maxBudget,
      preferredStyle: "BOHO_LUXURY",
      topK: 5,
    });

    if (res.success) {
      setMatchResult(res.data);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Matchmaking Tester Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive 12-Factor Vendor Matchmaking Tester
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Matching Matrix Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="VENUE">VENUE (Düğün Mekanı)</option>
                <option value="PHOTOGRAPHY">PHOTOGRAPHY (Fotoğrafçı)</option>
                <option value="CATERING">CATERING (Yemek & Menü)</option>
                <option value="MUSIC">MUSIC (Orkestra & DJ)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Şehir/Bölge</label>
              <input
                type="text"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Maksimum Bütçe (₺)</label>
              <input
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <button
            onClick={handleExecuteMatch}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-bold hover:shadow-md transition"
          >
            🎯 12 Faktörlü Yapay Zeka Eşleştirmesini Çalıştır
          </button>

          {matchResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Eşleşme Tamamlandı: {matchResult.coupleId}</span>
                <span className="text-slate-400 text-[10px]">Hesaplama Süresi: {matchResult.latencyMs}ms</span>
              </div>

              <div className="space-y-2">
                {matchResult.matchedVendors.map((v: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-400 font-bold text-xs">{v.vendorName}</span>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono font-bold text-[10px]">
                          Uyumluluk Skoru: %{v.compatibilityScore}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono font-bold text-[10px]">
                          Sözleşme Kapanış Tahmini: %{v.closingSuccessPredictionPct}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-200 text-[11px] leading-relaxed italic">"{v.whyMatchedReason}"</p>

                    <div className="grid grid-cols-4 gap-1 text-[10px] font-mono pt-1 text-slate-400 border-t border-slate-800">
                      <div>Bütçe Uyum: <span className="text-emerald-400 font-bold">%{v.matchingBreakdown.budgetFit}</span></div>
                      <div>Stil Uyum: <span className="text-emerald-400 font-bold">%{v.matchingBreakdown.styleFit}</span></div>
                      <div>Lokasyon Uyum: <span className="text-emerald-400 font-bold">%{v.matchingBreakdown.locationFit}</span></div>
                      <div>SLA Uyum: <span className="text-emerald-400 font-bold">%{v.matchingBreakdown.responseTimeFit}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
