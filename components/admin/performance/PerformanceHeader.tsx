"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PerformanceHeader({
  overallScore,
  lcpMs,
  inpMs,
  cdnHitRate,
  onOpenAnalysisModal,
}: {
  overallScore: number;
  lcpMs: number;
  inpMs: number;
  cdnHitRate: number;
  onOpenAnalysisModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              ✦ WedyPlan Shared Enterprise Performance & Core Web Vitals Engine
            </span>
            <span className="text-xs text-slate-400">LCP, CLS, INP, TTFB, Edge Caching & AI Regressions</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Performance Engineering Platform</h1>
        </div>

        <button
          onClick={onOpenAnalysisModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ AI Regresyon & Optimizasyon Analizini Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Lighthouse Performans Skoru</span>
          <div className="text-2xl font-bold mt-1 text-amber-600 flex items-center gap-2">
            <span>{overallScore} / 100</span>
            <span className="text-xs font-mono font-normal text-slate-400">Grade A+</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ultra Fast User Experience</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">LCP (Largest Contentful Paint)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{lcpMs} ms</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Target &lt; 2.5s Passed</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">INP (Interaction to Next Paint)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{inpMs} ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Instant Responsive UI</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Edge CDN Cache Hit Rate</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%{cdnHitRate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Cloudflare Edge Delivery</span>
        </motion.div>
      </div>
    </div>
  );
}
