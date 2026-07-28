"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SettingsHeader({
  systemSecurityScore,
  lastBackupDate,
  onSaveAll,
}: {
  systemSecurityScore: number;
  lastBackupDate: string;
  onSaveAll: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              ✦ System & Business Configuration
            </span>
            <span className="text-xs text-slate-400">İşletme, Kurallar & Güvenlik Ayarları</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Settings & Configuration</h1>
        </div>

        <button
          onClick={onSaveAll}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          ✓ Tüm Değişiklikleri Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Sistem Güvenlik Skoru</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">%{systemSecurityScore} Yüksek Güvenlik</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">2FA & Şifreli Veri Kasası Devrede</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Son Başarılı Veri Yedeği</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{lastBackupDate}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Bulut Bulut Yedekleme Aktif</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Yapay Zeka Modu</span>
          <div className="text-2xl font-bold mt-1 text-purple-600">Lüks & Kurumsal Tone</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otomatik Yanıtlar Bu Tonla Atılır</span>
        </motion.div>
      </div>
    </div>
  );
}
