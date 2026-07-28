"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SearchAnalyticsBento() {
  const popularSearches = [
    { query: "Bodrum Kır Düğünü Mekanları", count: 12400, ctr: "%8.4" },
    { query: "Lüks Dış Çekim Fotoğrafçıları", count: 9800, ctr: "%12.1" },
    { query: "Canlı Müzik & Orkestra Grupları", count: 6400, ctr: "%6.9" },
  ];

  const zeroResultSearches = [
    { query: "Sualtı Fotoğraf Çekimi", count: 420, lastSearched: "Bugün 01:10" },
    { query: "Helikopter Transfer Gelin Arabası", count: 280, lastSearched: "Dün 22:45" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Popüler Aramalar vs. Sonuçsuz Kalan Sorgular (Search Analytics)
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Popüler Aramalar */}
        <motion.div whileHover={{ y: -2 }} className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-[10px] text-cyan-600 font-bold uppercase block">🔥 En Çok Aratılan 3 Kelime</span>
          <div className="space-y-2">
            {popularSearches.map((ps, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{ps.query}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{ps.count.toLocaleString("tr-TR")} Sorgu/Ay</span>
                </div>
                <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full text-[10px]">
                  CTR: {ps.ctr}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sonuçsuz Kalan Aramalar */}
        <motion.div whileHover={{ y: -2 }} className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3">
          <span className="text-[10px] text-rose-600 font-bold uppercase block">⚠️ Sonuç Bulunamayan Sorgular (Search Gaps)</span>
          <div className="space-y-2">
            {zeroResultSearches.map((zr, i) => (
              <div key={i} className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{zr.query}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{zr.lastSearched}</span>
                </div>
                <span className="font-mono font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2.5 py-1 rounded-full text-[10px]">
                  {zr.count} Cevapsız
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
