"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MatchingFactorsBento() {
  const factors = [
    { name: "Budget (Bütçe)", weight: "%20", icon: "💰", desc: "Çift bütçesi ile paket fiyat çakışması" },
    { name: "Date (Düğün Tarihi)", weight: "%15", icon: "📅", desc: "Takvim müsaitliği ve esneklik derecesi" },
    { name: "Location (Lokasyon)", weight: "%15", icon: "📍", desc: "Şehir, bölge ve coğrafi yarıçap uyumu" },
    { name: "Style (Stil/Konsept)", weight: "%15", icon: "🎨", desc: "Boho, Rustik, Lüks konsept vektör eşleşmesi" },
    { name: "Language (Dil Yetkinliği)", weight: "%5", icon: "🌐", desc: "Çift ve tedarikçinin ortak konuştuğu diller" },
    { name: "Availability (Doluluk)", weight: "%5", icon: "⏱️", desc: "Sezonsal takvim kilit durumu" },
    { name: "Reviews (Değerlendirme)", weight: "%5", icon: "⭐", desc: "Doğrulanmış çift puanı ve duygu skoru" },
    { name: "Response Time (SLA)", weight: "%5", icon: "💬", desc: "Ortalama mesaj ve teklif yanıt hızı" },
    { name: "Price (Fiyat/Performans)", weight: "%5", icon: "🏷️", desc: "Bölgesel f/p rekabet indeksi" },
    { name: "Quality (Kalite Skoru)", weight: "%4", icon: "💎", desc: "Sertifika ve HD içerik denetim puanı" },
    { name: "Portfolio (Portföy)", weight: "%3", icon: "🖼️", desc: "Yüklenen görsel galerisi derinliği" },
    { name: "Experience (Tecrübe)", weight: "%3", icon: "📜", desc: "Sektördeki aktif hizmet yılı" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚙️ 12 Hassas Eşleştirme Faktörü (12-Factor Matching Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {factors.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{f.icon}</span>
                <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                  {f.weight} Ağırlık
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{f.name}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
