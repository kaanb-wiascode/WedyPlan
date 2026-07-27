"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProposalHeader({
  activeOffersCount,
  comparedOffersCount,
  savingsPotential,
  onExportPdf,
}: {
  activeOffersCount: number;
  comparedOffersCount: number;
  savingsPotential: string;
  onExportPdf: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ AI Proposal Intelligence
            </span>
            <span className="text-xs text-slate-400">Gelişmiş Teklif Kıyas Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Proposal Comparison Center</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onExportPdf}
            className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium hover:bg-slate-50 transition flex items-center gap-2"
          >
            📄 PDF Karşılaştırma Raporu İndir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Gelen Teklif Sayısı</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeOffersCount} Teklif</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Karşılaştırılan Teklifler</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{comparedOffersCount} Seçili Teklif</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">AI Tahmini Tasarruf Potansiyeli</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{savingsPotential}</div>
        </motion.div>
      </div>
    </div>
  );
}
