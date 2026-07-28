"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FraudCategoriesBento() {
  const threats = [
    { title: "Sahte Tedarikçi Tespiti (Fake Vendors)", blocked: "42 Profil", risk: "HIGH RISK", icon: "🏢", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40" },
    { title: "Ödeme Suiistimali (Payment Fraud)", blocked: "18 Kart", risk: "CRITICAL", icon: "💳", color: "text-red-600 bg-red-50 dark:bg-red-950/40" },
    { title: "Sahte Yorum & Derecelendirme", blocked: "84 Yorum", risk: "MEDIUM RISK", icon: "⭐", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
    { title: "Kupon Suiistimali & Spam Botlar", blocked: "112 İhlal", risk: "HIGH RISK", icon: "🎟️", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🛡️ Tehdit Kategorileri & Karantina Matrisi (Threat Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {threats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Engellenen: {item.blocked}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Risk Seviyesi:</span>
              <span className={`font-bold text-xs ${item.color}`}>{item.risk}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
