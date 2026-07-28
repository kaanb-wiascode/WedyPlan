"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProfileQualityScoreWidget({ score }: { score: number }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🏆 Profil Onay Standardı
        </span>
        <span className="font-mono font-bold text-emerald-600 text-sm">%{score}</span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Vergi ve Şirket Bilgileri Doğrulandı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>Hizmet Bölgeleri ve Fiyat Skalası Tanımlandı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-bold">✓</span>
          <span>AI Tarafından SEO Meta Etiketleri Üretildi</span>
        </div>
      </div>
    </motion.div>
  );
}
