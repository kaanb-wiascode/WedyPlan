"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PaymentTimelineWidget({ installments }: { installments: any[] }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
        📅 Taksit & Ödeme Zaman Çizelgesi
      </span>

      <div className="relative border-l-2 border-emerald-500/30 ml-3 space-y-4 pl-6 py-1">
        {installments.map((inst, i) => (
          <div key={i} className="relative flex justify-between items-start">
            <span className={"absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 " + (inst.status === "PAID" ? "bg-emerald-500" : "bg-amber-500")} />
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400">{inst.dueDate}</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{inst.vendorName}</h4>
              <p className="text-[11px] text-slate-400">{inst.title} ({inst.installmentNumber}/{inst.totalInstallments}. Taksit)</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{inst.amount.toLocaleString("tr-TR")} {inst.currency}</span>
              <span className={"block text-[10px] font-semibold " + (inst.status === "PAID" ? "text-emerald-600" : "text-amber-600")}>
                {inst.status === "PAID" ? "✓ Ödendi" : "Bekliyor"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
