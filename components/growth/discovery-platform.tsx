"use client";

import React, { useState, useEffect } from "react";
import { Compass, Sparkles, MapPin, Star, ShieldCheck, Search, Filter, Layers, CheckCircle2, ArrowUpRight, SlidersHorizontal, RefreshCw } from "lucide-react";
import { DiscoveryEngine, VendorDiscoveryCard, CuratedCollection, DiscoveryCategory } from "@/lib/growth/discovery-engine";

export const DiscoveryPlatform: React.FC = () => {
  const [feed, setFeed] = useState<VendorDiscoveryCard[]>([]);
  const [collections, setCollections] = useState<CuratedCollection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiIntentResult, setAiIntentResult] = useState<{ priceTier: string; aiIntentSummary: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<DiscoveryCategory | "ALL">("ALL");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    DiscoveryEngine.getPersonalizedFeed().then(setFeed);
    DiscoveryEngine.getCuratedCollections().then(setCollections);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const intent = DiscoveryEngine.detectUserIntent(searchQuery);
      setAiIntentResult(intent);
      setIsSearching(false);
    }, 600);
  };

  const filteredFeed = selectedCategory === "ALL"
    ? feed
    : feed.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Pazar Yeri Keşif & Akıllı Akış
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Personalized
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Zevkinize ve düğün konseptinize en uygun doğrulanmış mekanlar, stili eşleşen tedarikçiler ve akıllı koleksiyonlar.
        </p>

        {/* Search Input */}
        <div className="flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Örn: İstanbul Boğaz manzaralı lüks düğün mekanı..."
              className="w-full h-11 pl-10 pr-4 bg-white/10 border border-white/15 rounded-2xl text-xs text-white placeholder:text-[#86868B] outline-none focus:border-[#D4AF37]"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-5 h-11 bg-[#D4AF37] text-[#111111] text-xs font-bold rounded-2xl shadow-md hover:bg-[#b8952d] transition-all flex items-center gap-1 shrink-0"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Keşfet</span>}
          </button>
        </div>
      </div>

      {/* WedyAI Intent Detection Result Card */}
      {aiIntentResult && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
            <span>WedyAI Niyet Analiz Raporu</span>
          </div>
          <p className="text-xs text-[#111111] dark:text-[#F5F4F0] font-semibold">
            {aiIntentResult.aiIntentSummary}
          </p>
          <span className="text-[10px] font-mono text-[#86868B] block">
            Algılanan Segment: {aiIntentResult.priceTier} • Eşleşen Akış Güncellendi
          </span>
        </div>
      )}

      {/* Curated Collections Carousel */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Küratörlü Koleksiyonlar</span>
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {collections.map((coll) => (
            <div
              key={coll.id}
              className="relative rounded-2xl overflow-hidden h-28 border border-black/10 dark:border-white/10 group cursor-pointer shadow-sm"
            >
              <img
                src={coll.coverImageUrl}
                alt={coll.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end text-white space-y-0.5">
                <span className="text-[9px] font-mono text-[#D4AF37] font-bold">
                  {coll.itemCount} Seçkin Mekan
                </span>
                <h5 className="font-bold text-xs leading-tight line-clamp-1">{coll.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "VENUE", "DECORATION", "PHOTOGRAPHY", "CATERING"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {cat === "ALL" ? "Tüm Kategoriler" : cat === "VENUE" ? "Mekanlar" : cat === "DECORATION" ? "Dekorasyon" : cat === "PHOTOGRAPHY" ? "Fotoğraf" : "Catering"}
          </button>
        ))}
      </div>

      {/* Discovery Cards Stream */}
      <div className="space-y-4">
        {filteredFeed.map((card) => (
          <div
            key={card.id}
            className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm space-y-3 p-4"
          >
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#D4AF37] border border-white/20">
                %{card.aiMatchScorePercent} Uyum
              </div>
              {card.isEscrowGuaranteed && (
                <div className="absolute top-3 right-3 bg-emerald-500/90 text-white px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md">
                  <ShieldCheck className="w-3 h-3" /> Escrow Korumalı
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#86868B] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {card.cityLocation} {card.distanceKm && `(${card.distanceKm} km yakınınızda)`}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#D4AF37] bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-xl">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{card.ratingScore.toFixed(1)} ({card.reviewsCount})</span>
                </div>
              </div>

              <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-xs space-y-1">
                <span className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> WedyAI Eşleşme Notu
                </span>
                <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                  {card.aiMatchReason}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-[#111111] dark:text-[#F5F4F0]">
                  {card.startingPriceText}
                </span>

                <button className="px-4 py-2 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-1">
                  <span>Mekanı İncele</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};