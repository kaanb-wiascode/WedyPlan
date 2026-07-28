"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorToolsBentoGrid() {
  const tools = [
    { name: "Talep & CRM Taraması", code: "CRM Tool", icon: "👥", desc: "Yüksek dönüşüm olasılıklı çift taleplerini önceliklendirir" },
    { name: "Gelir & Analitik Paneli", code: "Analytics Tool", icon: "📈", desc: "Profil tıklanma, teklifleşme ve MRR grafikleri" },
    { name: "Kampanya Yöneticisi", code: "Campaign Manager", icon: "🚀", desc: "Boş günler için erken rezervasyon indirimleri kurgular" },
    { name: "Finans & Nakit Akışı", code: "Finance Tool", icon: "💳", desc: "Kaporalar, hakedişler ve komisyon tevkifat takibi" },
    { name: "Müsaitlik Takvimi", code: "Calendar Tool", icon: "📅", desc: "Düğün günlerini ve randevuları otomatik senkronize eder" },
    { name: "Portföy & SEO İyileştirici", code: "Portfolio Tool", icon: "🖼️", desc: "Galeri fotoğraflarının SEO açıklamalarını optimize eder" },
    { name: "Yorum & Duygu Analizi", code: "Reviews Tool", icon: "⭐", desc: "Çift yorumlarına yapay zeka ile otomatik yanıt hazırlar" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🧰 B2B Satış Koçunun Kullandığı 7 İşletme Aracı (Vendor Tools)
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
                  <span className="text-[10px] text-indigo-600 font-mono font-bold">{t.code}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Connected</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
