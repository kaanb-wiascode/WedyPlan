"use client";

import React, { useState, useEffect } from "react";
import { Store, Sparkles, ShieldCheck, RefreshCw, Globe, MapPin, Eye, EyeOff, Tag, Star, Search } from "lucide-react";
import { MultiCountryMarketplaceEngine, CountryCatalogVendor, MultiCountryMarketplaceSummary } from "@/lib/global/multi-country-marketplace-engine";

export const GlobalMarketplaceCenter: React.FC = () => {
  const [vendors, setVendors] = useState<CountryCatalogVendor[]>([]);
  const [summary, setSummary] = useState<MultiCountryMarketplaceSummary | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    MultiCountryMarketplaceEngine.getCountryCatalogVendors().then(setVendors);
    MultiCountryMarketplaceEngine.getMarketplaceSummary().then(setSummary);
  }, []);

  const handleToggleVisibility = async (vendorId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await MultiCountryMarketplaceEngine.toggleVendorVisibility(vendorId);
      setIsProcessing(false);
      MultiCountryMarketplaceEngine.getCountryCatalogVendors().then(setVendors);
    }, 400);
  };

  if (!summary) return null;

  const filteredVendors = vendors.filter((v) => {
    const matchesCountry = selectedCountryCode === "ALL" || v.countryCode === selectedCountryCode;
    const matchesSearch = v.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Marketplace Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çok Ülkeli Pazaryeri Yönetimi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Catalogs: {summary.activeCountryCatalogsCount}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Ülke katalogları, bölgesel tedarikçi eşleştirme, yerelleştirilmiş fiyatlandırma ve WedyAI bölgesel talep tahminleri.
        </p>

        {/* Executive Marketplace Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Ülke Katalogları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeCountryCatalogsCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Bölgesel Tedarikçi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalRegionalVendorsCount} Firma
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kampanyalar</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeRegionalCampaignsCount} Kampanya
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Regional Demand Forecast Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Bölgesel Talep Tahmini & Eşleştirme
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            AI Demand Forecast
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDemandForecastInsightNote}
          </p>
        </div>
      </div>

      {/* Country Catalog Selector & Search Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {["ALL", "TR", "DE", "AE", "US"].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCountryCode(code)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
                selectedCountryCode === code
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
              }`}
            >
              {code === "ALL" ? "Tüm Ülkeler" : `Katalog (${code})`}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tedarikçi adı, şehir veya kategori ara..."
            className="w-full h-11 pl-10 pr-4 bg-white/80 dark:bg-[#141418]/80 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />
        </div>
      </div>

      {/* Vendors Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Ülke Kataloğu Tedarikçileri ({filteredVendors.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredVendors.map((v) => (
            <div
              key={v.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{v.vendorName}</span>
                <span className="font-mono text-[#D4AF37] text-sm font-bold">
                  {v.localizedBasePriceAmount.toLocaleString()} {v.currencyCode}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed flex items-center gap-2">
                <span>{v.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-[#86868B]">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" /> {v.city}, {v.countryCode}
                </span>
              </p>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" /> AI Skor: {v.aiVendorMatchRating} / 5.0
                </span>
                <span>Talep Skoru: %{v.aiDemandForecastScorePercent}</span>
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleToggleVisibility(v.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : v.isVisibleInCountryCatalog ? (
                    <>
                      <Eye className="w-3 h-3 text-[#D4AF37]" />
                      <span>Katalogda Görünür (Gizle)</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-red-400" />
                      <span>Gizli (Kataloga Ekle)</span>
                    </>
                  )}
                </button>

                {v.isRegionalCampaignEligible && (
                  <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Bölgesel Kampanya
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};