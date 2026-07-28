"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MultiRegionHeader({
  activeRegionsCount,
  globalAvgLatencyMs,
  peakRegionText,
  globalStatusText,
  onOpenTrafficManagerModal,
}: {
  activeRegionsCount: number;
  globalAvgLatencyMs: number;
  peakRegionText: string;
  globalStatusText: string;
  onOpenTrafficManagerModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared Enterprise Global Multi-Region & Geo-Routing Engine
            </span>
            <span className="text-xs text-slate-400">6 Continents, Anycast Geo-Routing, Regional AI & Data Residency</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Multi-Region Global Platform</h1>
        </div>

        <button
          onClick={onOpenTrafficManagerModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🌐 Global Traffic & Geo-Routing Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Bölge Sayısı</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>{activeRegionsCount} Kıta / Bölge</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Küresel Dağıtım Aktif</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Küresel Ortalama Latens</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{globalAvgLatencyMs} ms</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Ultra-Low Global Latency</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Zirve Trafikli Bölge</span>
          <div className="text-sm font-bold mt-1 text-purple-600 font-mono">{peakRegionText}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otomatik Yük Dengeleme</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">Küresel Mimarisi</span>
          <div className="text-sm font-bold mt-1 text-cyan-600 font-mono">{globalStatusText}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Anycast + Edge Mesh</span>
        </motion.div>
      </div>
    </div>
  );
}
