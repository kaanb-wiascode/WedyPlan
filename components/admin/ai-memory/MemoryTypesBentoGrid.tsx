"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MemoryTypesBentoGrid() {
  const memoryTypes = [
    { key: "COUPLE_MEMORY", title: "Çift Tercih & Bütçe Hafızası", icon: "💍", desc: "Düğün tarihi, mekan bütçesi, konsept ve besin alerjileri" },
    { key: "VENDOR_MEMORY", title: "Tedarikçi Kapasite & Fiyat Hafızası", icon: "🏢", desc: "Fiyat listeleri, takvim müsaitlikleri ve özel indirim şartları" },
    { key: "ADMIN_MEMORY", title: "Yönetici Karar & Sistem Kuralları", icon: "👑", desc: "Özel komisyon tevkifatları, kriz müdahale geçmişi ve onaylar" },
    { key: "CONVERSATION_MEMORY", title: "Sohbet & Diyalog Özetleri", icon: "💬", desc: "AI Copilot konuşmalarının anlamsal kısa özetleri" },
    { key: "BUSINESS_MEMORY", title: "Pazar Yeri & Sezon Trendleri", icon: "📊", desc: "Bölgesel ortalama bütçeler ve popüler düğün konseptleri" },
    { key: "PREFERENCE_MEMORY", title: "Kullanıcı Arayüz & Dil Tercihleri", icon: "⚙️", desc: "Arayüz teması, bildirim sıklığı ve para birimi tercihleri" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🧠 6 Farklı Anlamsal Bellek Kategorisi
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {memoryTypes.map((mt) => (
          <motion.div
            key={mt.key}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mt.icon}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{mt.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{mt.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-purple-600 font-bold">Vektör İndeksli</span>
              <span className="text-emerald-600 font-bold">✓ Aktif</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
