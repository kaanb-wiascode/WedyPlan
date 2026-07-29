"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, ShieldCheck, RefreshCw, Globe, MapPin, Navigation, Tag, SlidersHorizontal } from "lucide-react";
import { InternationalSearchEngine, InternationalSearchResultItem, InternationalSearchSummary } from "@/lib/global/international-search-engine";

export const InternationalSearchCenter: React.FC = () => {
  const [results, setResults] = useState<InternationalSearchResultItem[]>([]);
  const [summary, setSummary] = useState<InternationalSearchSummary | null>(null);
  const [queryInput, setQueryInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    handleExecuteSearch();
    InternationalSearchEngine.getSearchSummary().then(setSummary);
  }, []);

  const handleExecuteSearch = async () => {
    setIsProcessing(true);

    setTimeout(async () => {
      const res = await InternationalSearchEngine.searchListings({
        queryText: queryInput,
        targetCountryCode: selectedCountry,
      });
      setResults(res);
      setIsProcessing(false);
    }, 400);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive International Search Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Uluslararası Akıllı Arama Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Geo & Semantic AI
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sınır ötesi yerelleştirilmiş arama, çapraz dil çevirili indeksleme, yakındaki tedarikçi yarıçapı ve WedyAI semantik arama.
        </p>

        {/* Global Search Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İndekslenen İlanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.indexedSearchListingsCount / 1000).toFixed(1)}K İlan
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Arama Dilleri</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedSearchLanguagesCount} Dil
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Semantik Eşleşme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiSemanticSearchAccuracyPercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Semantic & Translation Search Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Semantik & Çevirili Arama Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Cross-Language Match
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiSearchInsightNote}
          </p>
        </div>
      </div>

      {/* Search Input & Filter Controls */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleExecuteSearch()}
              placeholder="Sınır ötesi mekan veya hizmet ara (Örn: Boğaz manzaralı düğün)..."
              className="w-full h-11 pl-10 pr-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
          >
            <option value="ALL">Tüm Ülkeler</option>
            <option value="TR">Türkiye (TR)</option>
            <option value="DE">Almanya (DE)</option>
            <option value="AE">BAE / Dubai (AE)</option>
            <option value="US">ABD (US)</option>
          </select>
        </div>

        <button
          onClick={handleExecuteSearch}
          disabled={isProcessing}
          className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
          ) : (
            <>
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>Sınır Ötesi Arama Yap</span>
            </>
          )}
        </button>
      </div>

      {/* Search Results Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Arama Sonuçları ({results.length})</span>
        </h4>

        <div className="space-y-3">
          {results.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.vendorName}</span>
                <span className="font-mono text-[#D4AF37] text-sm font-bold">
                  {r.basePriceAmount.toLocaleString()} {r.currencyCode}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" /> {r.cityName}, {r.countryCode} ({r.distanceKmFromUser} km)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  AI Eşleşme: %{r.aiSemanticIntentMatchPercent}
                </span>
              </div>

              {r.aiTranslatedSearchTermUsed && (
                <div className="p-2 bg-white dark:bg-black/40 rounded-xl text-[10px] text-[#D4AF37] font-medium">
                  ✦ Otomatik Çevirili Arama Terimi: '{r.aiTranslatedSearchTermUsed}'
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};