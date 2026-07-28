"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LocalizationHeader({
  completionRate,
  supportedLangs,
  missingKeysCount,
  onRunAIBatchTranslate,
}: {
  completionRate: number;
  supportedLangs: number;
  missingKeysCount: number;
  onRunAIBatchTranslate: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Global Localization & i18n OS
            </span>
            <span className="text-xs text-slate-400">8 Dil, Yerel Formatlar, Vergi & AI Çeviri Motoru</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Localization & Translation Center</h1>
        </div>

        <button
          onClick={onRunAIBatchTranslate}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🌐 AI Eksik Çeviri Taramasını Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Genel Çeviri Tamamlanma Oranı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{completionRate}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Yüksek Uyum</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">1.420 Toplam Çeviri Anahtarı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Desteklenen Global Diller</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{supportedLangs} Dil</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">TR, EN, DE, FR, ES, IT, AR, RU</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Eksik Çeviri Anahtarları</span>
          <div className="text-2xl font-bold mt-1 text-amber-600 font-mono">{missingKeysCount} Anahtar</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AI Otomatik Tamamlama Hazır</span>
        </motion.div>
      </div>
    </div>
  );
}
