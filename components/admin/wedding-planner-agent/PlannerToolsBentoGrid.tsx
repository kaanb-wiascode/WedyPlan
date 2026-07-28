"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PlannerToolsBentoGrid() {
  const tools = [
    { name: "Takvim Entegrasyonu", code: "Calendar Tool", icon: "📅", desc: "Randevu, tadım ve prova günlerini otomatik senkronize eder" },
    { name: "Akıllı Bütçe Yönetimi", code: "Budget Tool", icon: "💰", desc: "Kategori bazlı harcama dağılımı ve bütçe aşım uyarısı" },
    { name: "Tedarikçi Arama & Eşleme", code: "Vendor Search Tool", icon: "🏢", desc: "Anlamsal arama ile çifte en uygun 3 lüks mekan önerir" },
    { name: "Sözleşme & Escrow Denetimi", code: "Contracts Tool", icon: "📄", desc: "İptal şartları ve kapora güvencesini RAG ile doğrular" },
    { name: "Düğün Günü Zaman Çizelgesi", code: "Timeline Tool", icon: "⏱️", desc: "Düğün gününün dakikalık akış programını hazırlar" },
    { name: "Otomatik Mesajlaşma", code: "Messaging Tool", icon: "💬", desc: "Tedarikçilere otomatik teklif ve LCV mesajı iletir" },
    { name: "Doküman & Davetli Kasası", code: "Documents Tool", icon: "📂", desc: "Davetli listesi, oturma düzeni ve menü kartlarını yönetir" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🧰 Ajanın Kullanabildiği 7 Enterprise Araç (Agent Tools)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{t.name}</h4>
                  <span className="text-[10px] text-pink-600 font-mono font-bold">{t.code}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Bound to Agent</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
