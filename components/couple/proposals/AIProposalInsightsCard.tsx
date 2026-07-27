"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIProposalInsightsCard({
  bestValueVendor,
  hiddenCosts,
  negotiationTips,
}: {
  bestValueVendor: string;
  hiddenCosts: string[];
  negotiationTips: string[];
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Best Value & Risk Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          En Yüksek F/P: {bestValueVendor}
        </span>
      </div>

      <div className="space-y-3">
        {/* Gizli Maliyet Uyarıları */}
        <div>
          <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider block mb-1">⚠️ Gizli Maliyet & Risk Uyarıları</span>
          <div className="space-y-1.5">
            {hiddenCosts.map((cost, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs text-rose-800 dark:text-rose-300">
                🚨 {cost}
              </div>
            ))}
          </div>
        </div>

        {/* Pazarlık İpuçları */}
        <div>
          <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider block mb-1">💡 AI Pazarlık & İndirim Taktikleri</span>
          <div className="space-y-1.5">
            {negotiationTips.map((tip, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-800 dark:text-amber-300">
                💬 {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
