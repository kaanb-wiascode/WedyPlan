"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SupportHeader({
  openTicketsCount,
  resolvedTicketsCount,
  systemStatus,
  onOpenNewTicketModal,
}: {
  openTicketsCount: number;
  resolvedTicketsCount: number;
  systemStatus: string;
  onOpenNewTicketModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              ✦ Premium Enterprise Support OS
            </span>
            <span className="text-xs text-slate-400">7/24 Teknik & Operasyonel Destek</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Support Center</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("🎧 Canlı Destek Temsilcisine Bağlanılıyor...")}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Canlı Destek Ready</span>
          </button>

          <button
            onClick={onOpenNewTicketModal}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
          >
            + Yeni Destek Talebi Aç
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-sky-600 font-medium uppercase">Açık / İşlemdeki Biletler</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{openTicketsCount} Destek Talebi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ort. Yanıt Süresi: 8 Dakika</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Çözüme Ulaşan Talepler</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{resolvedTicketsCount} Bilet Çözüldü</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">%99.4 Müşteri Memnuniyeti</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">WedyPlan Servis Durumu</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>{systemStatus}</span>
            <span className="text-xs font-mono font-normal text-emerald-600">%99.98 Uptime</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tüm Sistemler Çalışır Durumda</span>
        </motion.div>
      </div>
    </div>
  );
}
