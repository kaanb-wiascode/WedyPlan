"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminModerationHeader({
  pendingQueueCount,
  cleanlinessScore,
  todayResolvedCount,
  onOpenShieldSettings,
}: {
  pendingQueueCount: number;
  cleanlinessScore: number;
  todayResolvedCount: number;
  onOpenShieldSettings: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Platform Trust & Safety OS
            </span>
            <span className="text-xs text-slate-400">İçerik Moderasyonu, Telif & Güvenlik Kalkanı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Moderation Center</h1>
        </div>

        <button
          onClick={onOpenShieldSettings}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🛡️ AI Otomatik Moderasyon Kalkanı Ayarları
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">İnceleme Bekleyen Şikayetler</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{pendingQueueCount} İçerik</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">SLA İnceleme Süresi: 12 Dakika</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Platform İçerik Temizlik Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{cleanlinessScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Güvenli</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">256-bit Bilgisayarlı Görü Taraması</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bugün Çözüme Ulaşan Raporlar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{todayResolvedCount} Karar</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %100 Doğruluk Oranı</span>
        </motion.div>
      </div>
    </div>
  );
}
