"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DashboardHeader({ names, location }: { names: string; location: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-[1600px] mx-auto gap-4"
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            Düğün Paneli
          </span>
          <span className="text-xs text-slate-400">📍 {location}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-light mt-1 tracking-tight">
          Hoş geldiniz, <span className="font-normal italic text-rose-600 dark:text-rose-400">{names}</span>
        </h1>
      </div>

      {/* AI Status Badge */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          AI Asistanı Aktif: 3 Yeni Öneri Hazır
        </span>
      </div>
    </motion.div>
  );
}