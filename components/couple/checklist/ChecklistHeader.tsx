"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ChecklistHeader({
  completedCount,
  totalCount,
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  onGenerateAI,
  isGeneratingAI,
}: {
  completedCount: number;
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPriority: string;
  setSelectedPriority: (p: string) => void;
  onGenerateAI: () => void;
  isGeneratingAI: boolean;
}) {
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ AI Wedding Checklist
            </span>
            <span className="text-xs text-slate-400">Akıllı Görev & İş Bölümü Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Wedding Checklist</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onGenerateAI}
            disabled={isGeneratingAI}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-medium hover:shadow-lg transition disabled:opacity-50 flex items-center gap-1.5"
          >
            {isGeneratingAI ? "Oluşturuluyor..." : "✦ AI Eksik Görevleri Üret"}
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition">
            + Özel Görev Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Hazırlık Tamamlanma Oranı</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">%{progressPercentage}</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full" style={{ width: progressPercentage + "%" }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Tamamlanan Görevler</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{completedCount} / {totalCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Planlanan Akışta</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kritik & Bekleyen Görevler</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{totalCount - completedCount} Görev</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Öncelikli İşler</span>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Görev adı veya kategori ara..."
          className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-xs focus:ring-2 focus:ring-rose-500 outline-none transition"
        />

        <div className="flex gap-2 overflow-x-auto">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
                (selectedPriority === p
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
              }
            >
              {p === "ALL" ? "Tüm Öncelikler" : p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
