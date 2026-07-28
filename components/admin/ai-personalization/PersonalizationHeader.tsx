"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PersonalizationHeader({
  personalizationScore,
  totalProfiles,
  ctrImprovement,
  avgScore,
  onOpenSimulatorModal,
}: {
  personalizationScore: number;
  totalProfiles: string;
  ctrImprovement: number;
  avgScore: number;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Shared AI Personalization & Omnichannel Recommendation Engine
            </span>
            <span className="text-xs text-slate-400">Davranış Tahmini, Tercih Öğrenme & Yaşam Döngüsü Analizi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Personalization Engine</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ✨ Kişiselleştirme & Öneri Simülatörünü Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kişiselleştirme Skoru</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>%{personalizationScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Hyper-Targeted</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kullanıcıya Özel Akış</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Profil Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalProfiles} Profil</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Real-time Behavioral Vector</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">CTR Tıklama Artışı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">+{ctrImprovement}%</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Omnichannel Recommendation</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ortalama Model Başarısı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%{avgScore}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sürekli Öğrenen AI Katmanı</span>
        </motion.div>
      </div>
    </div>
  );
}
