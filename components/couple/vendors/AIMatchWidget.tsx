"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMatchWidget({ matchScore, style, budget }: { matchScore: number; style: string; budget: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Perfect Match
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
          %{matchScore} Uyumlu
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
        <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block text-[9px]">Bütçe Eşleşmesi</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">{budget}</span>
        </div>
        <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block text-[9px]">Stil Uyumu</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">{style}</span>
        </div>
      </div>
    </motion.div>
  );
}
