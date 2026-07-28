"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityHeader({
  securityScore,
  twoFactorEnabled,
  activeSessionsCount,
  onOpenDataExportModal,
}: {
  securityScore: number;
  twoFactorEnabled: boolean;
  activeSessionsCount: number;
  onOpenDataExportModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Enterprise Security & Compliance OS
            </span>
            <span className="text-xs text-slate-400">Zero-Trust Güvenlik & KVKK Uyum Kasası</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Security & Compliance Center</h1>
        </div>

        <button
          onClick={onOpenDataExportModal}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          📦 KVKK / GDPR Veri Paketini İndir
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Genel Güvenlik Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{securityScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AES-256 Şifreleme & Tehdit Kalkanı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">İki Aşamalı Doğrulama (2FA)</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{twoFactorEnabled ? "● Aktif" : "Devre Dışı"}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-mono">TOTP</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Authenticator App Koruyucu</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Bağlı Cihazlar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeSessionsCount} Cihaz</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Uzaktan Oturum Kapatılabilir</span>
        </motion.div>
      </div>
    </div>
  );
}
