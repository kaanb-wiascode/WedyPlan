"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SalesToolsBentoGrid() {
  const tools = [
    { name: "Müşteri Nitelendirme", code: "Lead Qualifier", icon: "🎯", desc: "Bütçe ve tarih uyumuna göre müşteri adaylarını skorlar" },
    { name: "Teklif & Paket Optimizasyonu", code: "Proposal Optimizer", icon: "📝", desc: "Çiftin konseptine özel cazip teklif paketleri oluşturur" },
    { name: "Dinamik Fiyatlandırma", code: "Dynamic Pricing", icon: "🏷️", desc: "Boş günler ve sezona göre en hızlı satış fiyatını hesaplar" },
    { name: "Pazarlık & İkna Koçluğu", code: "Negotiation Coach", icon: "💬", desc: "Çiftin itirazlarını çözen yapıcı pazarlık yanıtları üretir" },
    { name: "Çapraz & Üst Satış", code: "Upsell / Cross-Sell", icon: "🚀", desc: "Sözleşme tutarını artıran ek hizmet paketleri önerir" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🧰 Satış Ajanının Kullandığı 5 Enterprise Araç (Sales Tools)
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
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">{t.code}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Bound to Sales Agent</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
