"use client";

import React from "react";

export default function VendorFilterSidebar({
  selectedCity,
  setSelectedCity,
  selectedPrice,
  setSelectedPrice,
  onlyVerified,
  setOnlyVerified,
  onlyCampaigns,
  setOnlyCampaigns,
}: {
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  selectedPrice: string;
  setSelectedPrice: (p: string) => void;
  onlyVerified: boolean;
  setOnlyVerified: (v: boolean) => void;
  onlyCampaigns: boolean;
  setOnlyCampaigns: (c: boolean) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        🎛️ Detaylı Filtreler
      </h3>

      {/* Şehir Seçimi */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Şehir / Bölge</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
        >
          <option value="ALL">Tüm Şehirler</option>
          <option value="Bodrum">Bodrum, Muğla</option>
          <option value="İstanbul">İstanbul</option>
          <option value="İzmir">İzmir</option>
          <option value="Antalya">Antalya</option>
        </select>
      </div>

      {/* Fiyat Segmenti */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Fiyat Segmenti</label>
        <div className="grid grid-cols-4 gap-1">
          {["₺", "₺₺", "₺₺₺", "₺₺₺₺"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPrice(selectedPrice === p ? "ALL" : p)}
              className={"py-1.5 rounded-lg text-xs font-bold transition border " +
                (selectedPrice === p
                  ? "bg-rose-500 text-white border-rose-500"
                  : "border-slate-200 dark:border-slate-800 text-slate-500")
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Anahtarlar */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
          <span>Yalnızca Onaylı (Verified)</span>
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="w-4 h-4 accent-rose-500 rounded"
          />
        </label>

        <label className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
          <span>Kampanyalı Tedarikçiler</span>
          <input
            type="checkbox"
            checked={onlyCampaigns}
            onChange={(e) => setOnlyCampaigns(e.target.checked)}
            className="w-4 h-4 accent-rose-500 rounded"
          />
        </label>
      </div>
    </div>
  );
}
