"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExecutivePanelsBentoGrid({
  onQuickAction,
}: {
  onQuickAction: (actionType: any) => void;
}) {
  const panels = [
    { name: "Platform Health", icon: "💎", status: "%99.99", note: "29 Modül Aktif", color: "text-emerald-600" },
    { name: "Business & Revenue", icon: "💳", status: "1.42M ₺", note: "MRR Büyüme +%18.4", color: "text-indigo-600" },
    { name: "Marketplace & Vendors", icon: "🏢", status: "840 Tedarikçi", note: "CSAT: 4.9/5", color: "text-purple-600" },
    { name: "Couple Success", icon: "💍", status: "14.2K Çift", note: "Aktivasyon: %88.1", color: "text-teal-600" },
    { name: "Support & Operations", icon: "🎧", status: "4.2 Dk SLA", note: "Çözüm Oranı: %98.8", color: "text-emerald-600" },
    { name: "Infrastructure & Security", icon: "🛡️", status: "14ms Latency", note: "Zero-Trust Active", color: "text-indigo-600" },
    { name: "AI Ops & Search", icon: "🤖", status: "%97 Kalite", note: "18ms Search Speed", color: "text-purple-600" },
    { name: "Localization & Global", icon: "🌐", status: "8 Dil Aktif", note: "RTL Uyum %100", color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 12 Panelli Konsolide Ekosistem Bento Odası
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {panels.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{p.icon}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{p.name}</h4>
              <div className={"text-lg font-bold " + p.color}>{p.status}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>{p.note}</span>
              <button
                onClick={() => onQuickAction("RUN_REPORT")}
                className="text-indigo-600 font-bold hover:underline"
              >
                İncele →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
