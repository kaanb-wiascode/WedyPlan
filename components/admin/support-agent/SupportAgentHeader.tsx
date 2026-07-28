"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SupportAgentHeader({
  healthScore,
  resolutionRate,
  avgResponseTime,
  escalatedCount,
  onOpenSupportConsole,
}: {
  healthScore: number;
  resolutionRate: string;
  avgResponseTime: string;
  escalatedCount: number;
  onOpenSupportConsole: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Flagship AI Agent — Intelligent Support Agent
            </span>
            <span className="text-xs text-slate-400">RAG Destek, Bilet Sınıflandırma, Eskalasyon & Çok Dilli Çeviri</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Support AI Agent</h1>
        </div>

        <button
          onClick={onOpenSupportConsole}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🎧 Live Support Console & Ticket Simulator
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Destek Operasyon Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz SLA</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero Escalation Backlog</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">AI Otonom Çözüm Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{resolutionRate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">İnsan Müdahalesiz Kapatılan</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ortalama Bilet Yanıt Süresi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{avgResponseTime}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ultra Fast AI Response</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">İnsana Eskale Edilen Biletler</span>
          <div className="text-2xl font-mono font-bold mt-1 text-amber-600">{escalatedCount} Bilet</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Human-in-the-Loop Queue</span>
        </motion.div>
      </div>
    </div>
  );
}
