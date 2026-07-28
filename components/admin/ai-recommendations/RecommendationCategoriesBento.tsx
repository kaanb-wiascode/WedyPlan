"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RecommendationCategoriesBento() {
  const categories = [
    { type: "VENDORS", name: "Kişiselleştirilmiş Tedarikçiler", icon: "🏢", desc: "Bütçe ve tarza uygun mekan, fotoğrafçı ve müzisyenler" },
    { type: "PACKAGES", name: "Avajtajlı Hizmet Paketleri", icon: "📦", desc: "İkili ve üçlü kombine düğün paket önerileri" },
    { type: "CAMPAIGNS", name: "Flaş Fırsat & İndirimler", icon: "🏷️", desc: "Sadece o çifte özel tanımlanan süreli kotalar" },
    { type: "BLOG_ARTICLES", name: "Düğün Rehberi & İçerikler", icon: "📖", desc: "Düğün gününe kalan süreye uygun rehber makaleler" },
    { type: "CHECKLISTS", name: "Yapılacaklar Liste Görevleri", icon: "✅", desc: "Kritik zaman tüneli eylem adımları" },
    { type: "TIMELINE", name: "Düğün Günü Zaman Akışı", icon: "⏱️", desc: "Saatlik kuaför, çekim ve nikah programı" },
    { type: "BUDGET", name: "Bütçe Optimize Tavsiyeleri", icon: "💰", desc: "Kategori bazlı harcama dağılım önerileri" },
    { type: "WEDDING_STYLES", name: "Konsept & Stil Önerileri", icon: "🎨", desc: "Boho, Rustik, Lüks ve Plaj düğün konseptleri" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 8 Desteklenen Öneri Kapsamı (Recommendation Domains)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{c.icon}</span>
                <span className="font-mono text-[9px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                  {c.type}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{c.name}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">{c.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">✓ Hybrid Matched</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
