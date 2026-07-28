"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ComplianceMatrixBento({ auditItems }: { auditItems: any[] }) {
  if (!auditItems || auditItems.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📋 Regülasyon & Uyum Matrisi (KVKK, GDPR, SOC2, ISO27001)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {auditItems.map((item, i) => {
          const isPass = item.status === "PASS";
          const badgeClass = isPass ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-600 font-mono text-xs">{item.standard}</span>
                  <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + badgeClass}>
                    {item.status}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs pt-1">{item.requirement}</h4>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-mono flex justify-between text-slate-400">
                <span>Uyum Kontrolü:</span>
                <span className="text-emerald-600 font-bold">✓ Onaylandı</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
