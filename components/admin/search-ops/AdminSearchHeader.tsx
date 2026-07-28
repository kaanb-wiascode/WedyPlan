"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminSearchHeader({
  searchHealthScore,
  avgLatency,
  zeroResultRate,
  onTriggerReindex,
}: {
  searchHealthScore: number;
  avgLatency: string;
  zeroResultRate: string;
  onTriggerReindex: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              ✦ WedyPlan Search Engine & Geo-Ops OS
            </span>
            <span className="text-xs text-slate-400">Arama Motoru, Sıralama Kuralları & İndeks Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Search Operations Center</h1>
        </div>

        <button
          onClick={onTriggerReindex}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🔄 Tüm Arama İndeksini Yenile (Reindex)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">Arama Motoru Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-cyan-600 flex items-center gap-2">
            <span>%{searchHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Mükemmel</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Semantik & Hibrit Vektör Arama Devrede</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Ortalama Arama Yanıt Hızı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{avgLatency}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Anında Sonuç Tamamlama (Autocomplete)</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Sonuçsuz Arama Oranı (Zero-Result)</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{zeroResultRate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Eş Anlamlı Kelime Kalkanı Aktif</span>
        </motion.div>
      </div>
    </div>
  );
}
