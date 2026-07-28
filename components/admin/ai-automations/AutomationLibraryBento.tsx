"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AutomationLibraryBento() {
  const libraryTemplates = [
    { title: "CRM Lead Otomatik Nitelendirme", domain: "CRM", savedHours: "65 Sa/Ay", status: "AKTİF", icon: "🎯", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { title: "Geciken Fatura & Ödeme Anımsatıcı", domain: "FINANCE", savedHours: "48 Sa/Ay", status: "AKTİF", icon: "💰", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Sözleşme İptal Şartı Otomatik Risk Taraması", domain: "CONTRACTS", savedHours: "52 Sa/Ay", status: "AKTİF", icon: "📄", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Çok Kanallı VIP Hoş Geldin Kampanyası", domain: "MARKETING", savedHours: "70 Sa/Ay", status: "AKTİF", icon: "📣", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📚 Öne Çıkan Otomasyon Kütüphanesi (Automation Library)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {libraryTemplates.map((item, i) => (
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
                    <span className="text-[10px] text-slate-400 font-mono">Modül: {item.domain}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Operasyonel Tasarruf:</span>
              <span className="font-bold text-emerald-600 text-xs">{item.savedHours}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
