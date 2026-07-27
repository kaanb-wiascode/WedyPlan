"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SettingsHeader({
  partnerStatus,
  securityScore,
}: {
  partnerStatus: string;
  securityScore: number;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              ✦ Preferences & Privacy
            </span>
            <span className="text-xs text-slate-400">Hesap & Güvenlik Kontrol Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Settings & Preferences</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Partner Senkronizasyonu</span>
          <div className="text-xl font-bold mt-1 text-slate-900 dark:text-slate-100">{partnerStatus}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ortak Bütçe & Davetli Erişimi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Hesap Güvenlik Skoru</span>
          <div className="text-xl font-bold mt-1 text-indigo-600">%{securityScore} Yüksek</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">2FA & Şifre Korumalı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">KVKK & Gizlilik Koruma</span>
          <div className="text-xl font-bold mt-1 text-rose-600">AES-256 Şifreli</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tam Veri Kontrolü Sizde</span>
        </motion.div>
      </div>
    </div>
  );
}
