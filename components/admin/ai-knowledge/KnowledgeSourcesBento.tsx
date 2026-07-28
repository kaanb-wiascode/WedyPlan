"use client";

import React from "react";
import { motion } from "framer-motion";

export default function KnowledgeSourcesBento() {
  const sources = [
    { type: "WEDDING_GUIDES", name: "Düğün Rehberleri & Trendler", count: 142, icon: "📖" },
    { type: "CONTRACTS", name: "Standart Sözleşme Şablonları", count: 28, icon: "📄" },
    { type: "POLICIES", name: "Platform & İptal Koşulları", count: 18, icon: "📜" },
    { type: "FAQ", name: "Çift & Tedarikçi Sık Sorulanlar", count: 94, icon: "❓" },
    { type: "VENDOR_DOCS", name: "Tedarikçi Onboarding Belgeleri", count: 64, icon: "🏢" },
    { type: "SUPPORT", name: "Destek Operasyon Çözüm Rehberi", count: 42, icon: "🎧" },
    { type: "LEGAL_DOCS", name: "Yasal Mevzuat & KVKK Metinleri", count: 14, icon: "⚖️" },
    { type: "BLOGS", name: "SEO Düğün Makaleleri & Konseptler", count: 20, icon: "📝" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📚 8 Desteklenen Yapay Zeka Bilgi Kaynağı
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sources.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-mono font-bold text-indigo-600 text-xs">{s.count} Kayıt</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{s.name}</h4>
              <span className="text-[10px] text-slate-400 font-mono block">{s.type}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Vector Synced</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
