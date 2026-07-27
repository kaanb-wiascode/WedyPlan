"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InvitationHeader({
  totalGuests,
  confirmedCount,
  pendingCount,
  declinedCount,
  checkedInCount,
  onOpenCreateModal,
  onExportStatus,
}: {
  totalGuests: number;
  confirmedCount: number;
  pendingCount: number;
  declinedCount: number;
  checkedInCount: number;
  onOpenCreateModal: () => void;
  onExportStatus: () => void;
}) {
  const confirmationRate = Math.round((confirmedCount / totalGuests) * 100) || 0;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Smart Digital RSVP
            </span>
            <span className="text-xs text-slate-400">Dijital Davetiye & Giriş Kontrolü</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Invitation & RSVP Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onExportStatus}
            className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5"
          >
            📥 LCV Listesini İndir (Excel)
          </button>
          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:shadow-lg transition"
          >
            + Yeni Dijital Davetiye Tasarla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Katılım Onaylandı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{confirmedCount} Kişi (%{confirmationRate})</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Menü Tercihli</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Yanıt Bekliyor</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{pendingCount} Kişi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Hatırlatma Gönderilebilir</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Katılamayacak</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{declinedCount} Kişi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kayıtlı Yanıt</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">QR Giriş Yapanlar</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{checkedInCount} Kişi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Düğün Günü Canlı Kapı Kaydı</span>
        </motion.div>
      </div>
    </div>
  );
}
