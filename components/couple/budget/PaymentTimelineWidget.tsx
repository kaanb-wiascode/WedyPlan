"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PaymentTimelineWidget({ payments, currency }: { payments: any[]; currency: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          ⏳ Yaklaşan Taksitler & Vadeler
        </span>
        <span className="text-xs text-rose-600 font-medium">2 Ödeme Bekliyor</span>
      </div>

      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.vendor}</h4>
              <p className="text-[11px] text-slate-400">{p.title} • Vade: {p.dueDate}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{p.amount.toLocaleString("tr-TR")} {currency}</span>
              <span className="block text-[10px] text-amber-600 font-medium cursor-pointer">Ödeme Yap</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
