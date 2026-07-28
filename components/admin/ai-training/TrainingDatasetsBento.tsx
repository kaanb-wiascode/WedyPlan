"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrainingDatasetsBento() {
  const datasets = [
    { name: "Türkçe Düğün Terim & Jargon Verisi", code: "wedding_jargon_v2", count: "142,000", status: "READY", icon: "📖" },
    { name: "Escrow & Hukuki Sözleşme Analizi", code: "contracts_nlp_v3", count: "84,000", status: "READY", icon: "📄" },
    { name: "Tedarikçi-Çift Pazarlık Diyalogları", code: "negotiation_chats_v1", count: "210,000", status: "READY", icon: "💬" },
    { name: "Sentetik Düğün Kriz Senaryoları", code: "synthetic_crisis_v1", count: "46,000", status: "READY", icon: "🚨" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📁 Doğrulanmış Eğitim Veri Setleri ({datasets.length} Dataset)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {datasets.map((d, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{d.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">key: {d.code}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                  {d.status}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Temizlenmiş Örnek Sayısı:</span>
              <span className="font-bold text-indigo-600 text-xs">{d.count} Sample</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
