"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TablePlannerWidget() {
  const tables = [
    { name: "Masa 1 - Protokol", filled: 8, capacity: 10 },
    { name: "Masa 2 - Aile", filled: 10, capacity: 10 },
    { name: "Masa 3 - İş Arkadaşları", filled: 6, capacity: 8 },
    { name: "Masa 4 - Üniversite Grubu", filled: 7, capacity: 10 },
  ];

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🪑 Masa Yerleşim Durumu
        </span>
        <span className="text-xs text-rose-600 font-medium">31 / 38 Dolu</span>
      </div>

      <div className="space-y-3">
        {tables.map((tbl, i) => (
          <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">{tbl.name}</h4>
              <p className="text-[10px] text-slate-400">{tbl.filled} / {tbl.capacity} Koltuk</p>
            </div>
            <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: ((tbl.filled / tbl.capacity) * 100) + "%" }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
