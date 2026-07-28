"use client";

import React, { useState } from "react";
import { generateUserRecommendationsAction, recordBehaviorSignalAction } from "@/lib/actions/ai-personalization-engine";

export default function PersonalizationSimulatorConsole() {
  const [userId, setUserId] = useState("usr_couple_bodrum_2026");
  const [preferredStyle, setPreferredStyle] = useState("Boho Chic & Kır Düğünü");
  const [budgetScopeMax, setBudgetScopeMax] = useState(850000);
  const [recommendationResult, setRecommendationResult] = useState<any>(null);
  const [signalResult, setSignalResult] = useState<any>(null);

  const handleGenerate = async () => {
    const res = await generateUserRecommendationsAction({
      userId,
      channel: "MARKETPLACE_FEED",
      lifecycleStage: "VENDOR_BOOKING",
      preferredStyle,
      budgetScopeMax,
      limit: 3,
    });

    if (res.success) {
      setRecommendationResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleRecordSignal = async () => {
    const res = await recordBehaviorSignalAction({
      userId,
      signalType: "CLICK_FAVORITE",
      targetCategory: "Mekan",
      weight: 0.8,
    });

    if (res.success) {
      setSignalResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Personalization Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Omnichannel Personalization & Recommendation Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kullanıcı ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Tahmini Stil Tercihi</label>
              <input
                type="text"
                value={preferredStyle}
                onChange={(e) => setPreferredStyle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Bütçe Limiti (₺)</label>
              <input
                type="number"
                value={budgetScopeMax}
                onChange={(e) => setBudgetScopeMax(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleGenerate}
              className="py-2.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
            >
              🎯 Kişiselleştirilmiş Öneri Akışını Üret
            </button>

            <button
              onClick={handleRecordSignal}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              ⚡ 'Favoriye Ekle' Davranış Sinyali Gönder
            </button>
          </div>

          {recommendationResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-rose-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Personalization Engine Output</span>
                <span className="text-emerald-400 font-bold">Kişiselleştirme Skoru: %{recommendationResult.personalizationScorePct}</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 space-y-1 text-[10px]">
                <div>Profil Çıkarımları: Stil: <span className="text-rose-400 font-bold">{recommendationResult.predictedAffinities.primaryStyle}</span> | Segment: <span className="text-rose-400 font-bold">{recommendationResult.predictedAffinities.budgetTier}</span></div>
                <div>Yaşam Döngüsü Evresi: <span className="text-indigo-400 font-bold">{recommendationResult.lifecycleStage}</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">🛍️ Kişiselleştirilmiş Marketplace Önerileri:</span>
                {recommendationResult.recommendedItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span><strong>{item.title}</strong> ({item.category}) - <span className="text-slate-400">{item.matchReason}</span></span>
                    <span className="text-emerald-400 font-bold">CTR Tahmini: %{item.predictedCtrPct}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {signalResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono">
              🚀 {signalResult.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
