"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorDiscoveryHeader({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  activeCategory,
  setActiveCategory,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: "GRID" | "MAP";
  setViewMode: (m: "GRID" | "MAP") => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  const categories = [
    { id: "ALL", label: "Tüm Kategoriler", icon: "✨" },
    { id: "VENUE", label: "Düğün Mekanları", icon: "🏰" },
    { id: "PHOTOGRAPHY", label: "Fotoğraf & Video", icon: "📸" },
    { id: "CATERING", label: "Catering & Yiyecek", icon: "🍽️" },
    { id: "MUSIC", label: "Müzik & Orkestra", icon: "🎵" },
    { id: "DECOR", label: "Dekorasyon & Çiçek", icon: "💐" },
    { id: "BRIDAL", label: "Gelinlik & Moda", icon: "👰" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Premium Discovery Engine
            </span>
            <span className="text-xs text-slate-400">AI Destekli Tedarikçi Eşleşmesi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Vendor Discovery Experience</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("GRID")}
            className={"px-4 py-2.5 rounded-xl text-xs font-semibold transition " +
              (viewMode === "GRID"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
            }
          >
            🔲 Izgara Görünümü
          </button>
          <button
            onClick={() => setViewMode("MAP")}
            className={"px-4 py-2.5 rounded-xl text-xs font-semibold transition " +
              (viewMode === "MAP"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
            }
          >
            🗺️ Harita Görünümü
          </button>
        </div>
      </div>

      {/* Arama Barı */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tedarikçi adı, şehir veya hizmet ara... (Örn: Bodrum Sunset)"
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-xs focus:ring-2 focus:ring-rose-500 outline-none transition"
        />
      </div>

      {/* Kategori Pills Barı */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition " +
              (activeCategory === cat.id
                ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
