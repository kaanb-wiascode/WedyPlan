"use client";

import React, { useState } from "react";
import { fetchPersonalizedRecommendationsAction, trackUserInteractionSignalAction } from "@/lib/actions/ai-recommendation-engine";

export default function RecommendationExplorerTable() {
  const [entityId, setEntityId] = useState("couple_bodrum_2026");
  const [recType, setRecType] = useState<any>("VENDORS");
  const [recResult, setRecResult] = useState<any>(null);

  const handleFetchRecs = async () => {
    const res = await fetchPersonalizedRecommendationsAction({
      entityId,
      recommendationType: recType,
      limit: 5,
      city: "Bodrum",
      maxBudget: 850000,
    });

    if (res.success) {
      setRecResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleTrackSignal = async (targetId: string, actionValue: any) => {
    const res = await trackUserInteractionSignalAction({
      entityId,
      signalType: "FAVORITES",
      targetId,
      actionValue,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Recommendation Playground */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive Recommendation Engine Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Real-Time Engine Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Kullanıcı/Çift ID</label>
              <input
                type="text"
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Öneri Kapsamı (Domain)</label>
              <select
                value={recType}
                onChange={(e) => setRecType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="VENDORS">VENDORS (Tedarikçiler)</option>
                <option value="PACKAGES">PACKAGES (Paketler)</option>
                <option value="CAMPAIGNS">CAMPAIGNS (Kampanyalar)</option>
                <option value="BLOG_ARTICLES">BLOG_ARTICLES (Rehberler)</option>
                <option value="CHECKLISTS">CHECKLISTS (Görevler)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleFetchRecs}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Kişiselleştirilmiş Önerileri Üret & Skorla
          </button>

          {recResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Algoritma: {recResult.algorithmUsed}</span>
                <span className="text-slate-400 text-[10px]">Eşleşme Süresi: {recResult.latencyMs}ms</span>
              </div>

              <div className="space-y-2">
                {recResult.items.map((item: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-400 font-bold text-xs">{item.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono font-bold text-[10px]">
                        Uyum Skoru: %{item.matchScore}
                      </span>
                    </div>
                    <p className="text-slate-200 text-[11px] leading-relaxed italic">"{item.reasonExplanation}"</p>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleTrackSignal(item.itemId, "CLICKED")}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition text-[10px]"
                      >
                        🖱️ Tıkla (Signal)
                      </button>
                      <button
                        onClick={() => handleTrackSignal(item.itemId, "FAVORITED")}
                        className="px-2 py-1 rounded bg-pink-950 text-pink-300 font-bold hover:bg-pink-900 transition text-[10px]"
                      >
                        ❤️ Favorile (+1.0 Weight)
                      </button>
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
