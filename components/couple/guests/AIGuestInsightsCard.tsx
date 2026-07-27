"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIGuestInsightsCard({ confirmedCount, totalCount }: { confirmedCount: number; totalCount: number }) {
  const predictedTotal = Math.round(confirmedCount + (totalCount - confirmedCount) * 0.75);

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-rose-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-rose-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          ✦ AI Attendance Prediction
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          %89 Güven
        </span>
      </div>

      <div>
        <div className="text-3xl font-serif font-bold">{predictedTotal} Tahmini Katılımcı</div>
        <p className="text-xs text-slate-500 mt-1">
          Yanıt vermeyen 42 davetlinin geçmiş verilere göre yaklaşık 31 tanesinin katılması öngörülmektedir.
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 border border-purple-100 dark:border-purple-900/30">
        💡 <span className="font-semibold text-purple-600 dark:text-purple-400">Masa İpucu:</span> Üniversite grubundan 3 davetli henüz eşleşmedi. Masa 4'e yerleştirmeleri önerilir.
      </div>
    </motion.div>
  );
}
