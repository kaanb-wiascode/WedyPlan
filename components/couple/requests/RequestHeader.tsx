"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RequestHeader({
  activeRequestsCount,
  offersReceivedCount,
  avgResponseRate,
  onOpenWizard,
}: {
  activeRequestsCount: number;
  offersReceivedCount: number;
  avgResponseRate: number;
  onOpenWizard: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Smart Quotation Center
            </span>
            <span className="text-xs text-slate-400">Akıllı Teklif İstek Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Smart Offer Request Center</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenWizard}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-medium hover:shadow-lg transition flex items-center gap-2"
          >
            ✦ Akıllı Teklif Talebi Oluştur
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Aktif Talep Paketleri</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeRequestsCount} Paket</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Gelen Teklifler</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{offersReceivedCount} Teklif</div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">AI Tahmini Dönüş Hızı</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">%{avgResponseRate} Yüksek</div>
        </motion.div>
      </div>
    </div>
  );
}
