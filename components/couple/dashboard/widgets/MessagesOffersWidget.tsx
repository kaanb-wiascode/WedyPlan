"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MessagesOffersWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Mesajlar & Teklifler</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold">
          2 Bekleyen Teklif
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-semibold">Studio Aegean (Fotoğraf)</h4>
            <p className="text-[11px] text-slate-400">Düğün Paketi Özel Fiyat Teklifi</p>
          </div>
          <span className="text-xs font-bold text-rose-600">85.000 ₺</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-semibold">Bodrum Sunset Venue</h4>
            <p className="text-[11px] text-slate-400">Tarih Konfirmasyonu Bekleniyor</p>
          </div>
          <span className="text-[10px] text-amber-600 font-medium bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
            İncele
          </span>
        </div>
      </div>
    </motion.div>
  );
}