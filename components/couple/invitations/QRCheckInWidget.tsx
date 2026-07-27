"use client";

import React from "react";
import { motion } from "framer-motion";

export default function QRCheckInWidget() {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📱 Dijital Kapı Geçiş & QR Karşılama
        </span>
        <span className="text-xs text-emerald-600 font-bold">● Sistem Aktif</span>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
        <div className="w-16 h-16 bg-white p-2 rounded-xl shadow-sm flex items-center justify-center font-mono font-bold text-xs text-slate-900 border">
          [QR CODE]
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-slate-800 dark:text-slate-100">Kişiye Özel Check-in QR</h4>
          <p className="text-[11px] text-slate-400 leading-normal">
            Onaylanan her davetliye WhatsApp üzerinden dijital giriş kartı iletilir. Kapıda okutulduğunda masa numarası anında ekranında belirir.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
