"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CommandCenterHeader({
  ecosystemHealthScore,
  criticalIncidentsCount,
  onOpenCommandPalette,
  onToggleVoiceCommand,
  isListeningVoice,
}: {
  ecosystemHealthScore: number;
  criticalIncidentsCount: number;
  onOpenCommandPalette: () => void;
  onToggleVoiceCommand: () => void;
  isListeningVoice: boolean;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-rose-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
              👑 WedyPlan Flagship OS — Executive AI Command Center
            </span>
            <span className="text-xs text-slate-400">360° Ekosistem Komuta & Otonom Karar Odası</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Executive AI Command Center</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleVoiceCommand}
            className={"px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border " +
              (isListeningVoice
                ? "bg-rose-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-500/30"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100")
            }
          >
            🎙️ {isListeningVoice ? "Ses Dinleniyor..." : "Sesli Komut"}
          </button>

          <button
            onClick={onOpenCommandPalette}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            💬 Evrensel Komut Paleti (Cmd + K)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ekosistem Genel Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-emerald-600">%{ecosystemHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Tam Denge</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">12 Ekosistem Paneli Canlı Bağlı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Konsolide Net MRR</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">1.420.000 ₺</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %18.4 Aylık Büyüme Oranı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kritik Siber & Altyapı İnsidantı</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-emerald-600">{criticalIncidentsCount} İnsidant</span>
            <span className="text-xs font-mono font-normal text-slate-400">Sıfır Risk</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom WAF & Self-Healing Aktif</span>
        </motion.div>
      </div>
    </div>
  );
}
