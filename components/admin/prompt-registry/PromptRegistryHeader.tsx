"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PromptRegistryHeader({
  qualityScore,
  totalActivePrompts,
  publishedVersionsCount,
  onOpenNewPromptModal,
}: {
  qualityScore: number;
  totalActivePrompts: number;
  publishedVersionsCount: number;
  onOpenNewPromptModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Shared AI Prompt Infrastructure OS
            </span>
            <span className="text-xs text-slate-400">Merkezi Prompt Kütüphanesi, Sürüm Kontrolü & Dinamik Şablonlar</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Prompt Registry</h1>
        </div>

        <button
          onClick={onOpenNewPromptModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          📝 Yeni Prompt & Sürüm Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Prompt Genel Kalite Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{qualityScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz Rehberlik</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sıfır Hallüsinasyon Riski</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Merkezi Yönetilen Promptlar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalActivePrompts} Şablon</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Çift, Tedarikçi & Admin AI Ajanları</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Yayınlanan Canlı Sürümler</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{publishedVersionsCount} Sürüm</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Edge Redis Cache %99.8 Hit Rate</span>
        </motion.div>
      </div>
    </div>
  );
}
