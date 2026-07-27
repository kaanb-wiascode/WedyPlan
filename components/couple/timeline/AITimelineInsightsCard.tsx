"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AITimelineInsightsCard() {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-rose-500/10 dark:from-amber-950/30 dark:via-slate-900/80 dark:to-rose-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          ✦ AI Critical Path Analysis
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          Dengeli Ritmi
        </span>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Gecikme Tahmini & Otomatik Yeniden Planlama</h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Gelinlik provası tarihinizin ertelenmesi durumunda, davetiye basım ve çekim süreçleri otomatik olarak 4 gün ileri ötelenecek şekilde simüle edildi.
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 border border-amber-100 dark:border-amber-900/30">
        ⚡ <span className="font-semibold text-amber-600">Önerilen Aksiyon:</span> Bodrum Sunset Venue mekan tadım etkinliğini bu hafta sonuna çekmeniz önerilir.
      </div>
    </motion.div>
  );
}
