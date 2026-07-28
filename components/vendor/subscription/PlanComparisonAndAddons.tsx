"use client";

import React from "react";

export default function PlanComparisonAndAddons({
  onBuyCredits,
}: {
  onBuyCredits: (addonType: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🎁 Hızlı Kredi & Depolama Eklentileri (Add-ons)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">+500 AI Mesaj Kredisi</h4>
            <span className="font-serif font-bold text-emerald-600">450 ₺</span>
          </div>
          <button
            onClick={() => onBuyCredits("AI_CREDITS")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold"
          >
            Satın Al
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">+25 Ek Lead / İhale Kredisi</h4>
            <span className="font-serif font-bold text-indigo-600">850 ₺</span>
          </div>
          <button
            onClick={() => onBuyCredits("LEAD_CREDITS")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold"
          >
            Satın Al
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">+50 GB Bulut Depolama</h4>
            <span className="font-serif font-bold text-amber-600">350 ₺ / Ay</span>
          </div>
          <button
            onClick={() => onBuyCredits("STORAGE_GB")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold"
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}
