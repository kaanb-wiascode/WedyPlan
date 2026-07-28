"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MarketplaceControlHeader({
  totalCategories,
  totalActiveListings,
  featuredListingsCount,
  searchQuery,
  setSearchQuery,
}: {
  totalCategories: number;
  totalActiveListings: number;
  featuredListingsCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Public Marketplace Control
            </span>
            <span className="text-xs text-slate-400">Kamusal Vitrin, Taksonomi & Arama Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Marketplace Control Center</h1>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Kategori, ilan başlığı veya etiket arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Pazar Yeri Kategorisi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalCategories} Ana Kategori</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">64 Alt Kategori Bağlı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Yayındaki Toplam Hizmet İlanı</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{totalActiveListings.toLocaleString("tr-TR")} Canlı İlan</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Arama İndeksinde Üst Sıralarda</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Ana Sayfada Öne Çıkarılanlar</span>
          <div className="text-2xl font-bold mt-1 text-amber-600 font-mono">{featuredListingsCount} Vitrin İlanı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sponsorlu & WedyPlan Choice</span>
        </motion.div>
      </div>
    </div>
  );
}
