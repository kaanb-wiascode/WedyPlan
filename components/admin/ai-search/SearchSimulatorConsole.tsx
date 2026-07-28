"use client";

import React, { useState } from "react";
import { executeSemanticSearchAction, detectTrendingSearchesAction } from "@/lib/actions/ai-search-engine";

export default function SearchSimulatorConsole() {
  const [query, setQuery] = useState("Bodrum kır düğünü deniz kenarında 200 kişilik lüks mekan");
  const [userLocation, setUserLocation] = useState("Muğla / Bodrum");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [trendingResult, setTrendingResult] = useState<any>(null);

  const handleSearch = async () => {
    const res = await executeSemanticSearchAction({
      query,
      mode: "HYBRID_RANKING",
      userLocation,
      guestCount: 200,
    });

    if (res.success) {
      setSearchResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleFetchTrending = async () => {
    const res = await detectTrendingSearchesAction({
      timeframeDays: 7,
      includeZeroResultQueries: true,
    });

    if (res.success) {
      setTrendingResult(res);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Semantic Search Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Natural Language Search & Hybrid Ranking Simulator
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            Engine Ready
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Doğal Dil Arama Cümlesi (Prompt Query)</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-sky-600"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Konum Filtresi</label>
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleSearch}
              className="py-2.5 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition"
            >
              🔎 Semantik Arama & Niyet Çıkarımı Yap
            </button>

            <button
              onClick={handleFetchTrending}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition"
            >
              🔥 Trend Aramaları & Sıfır Sonuçları Getir
            </button>
          </div>

          {searchResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-sky-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Search Engine Output</span>
                <span className="text-emerald-400 font-bold">Niyet: {searchResult.detectedIntent} (%{searchResult.confidenceScorePct})</span>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 space-y-1 text-[10px]">
                <div>Çıkarılan Parametreler: Lokasyon: <span className="text-sky-400 font-bold">{searchResult.extractedEntities.location}</span> | Kapasite: <span className="text-sky-400 font-bold">{searchResult.extractedEntities.capacity}</span> | Stil: <span className="text-sky-400 font-bold">{searchResult.extractedEntities.style}</span></div>
                <div>Genişletilmiş Anahtar Kelimeler: <span className="text-slate-400">{searchResult.expandedKeywords.join(", ")}</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">🏆 Hibrit Sıralama Sonuçları:</span>
                {searchResult.searchResults.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-slate-300 text-[10px] border-b border-slate-900 pb-1">
                    <span><strong>{item.title}</strong> ({item.location} - {item.category})</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sky-400 font-bold">%{item.relevanceScorePct} Uyum</span>
                      <span className="text-slate-500 font-mono">[{item.matchType}]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trendingResult && (
            <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-200 border border-indigo-800 text-[11px] font-mono space-y-1">
              <span className="font-bold block text-white">🔥 Trend Aramalar:</span>
              {trendingResult.trendingKeywords.map((k: any, idx: number) => (
                <div key={idx} className="flex justify-between text-[10px]">
                  <span>{k.keyword} ({k.searchCount} arama)</span>
                  <span className="text-emerald-400 font-bold">+{k.growthPct}% Artış</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
