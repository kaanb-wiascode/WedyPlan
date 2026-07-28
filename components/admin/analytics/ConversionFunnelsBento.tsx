"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ConversionFunnelsBento() {
  const funnelSteps = [
    { step: "1. Pazar Yeri Arama / İlan Görünümü", count: "340.000", conversion: "%100", drop: "%0" },
    { step: "2. Tedarikçi Detay & Portföy İnceleme", count: "142.800", conversion: "%42.0", drop: "%58.0" },
    { step: "3. Fiyat Teklifi / Mesaj Gönderimi", count: "48.960", conversion: "%34.2", drop: "%65.8" },
    { step: "4. Dijital Sözleşme E-İmzalama", count: "21.500", conversion: "%43.9", drop: "%56.1" },
    { step: "5. Escrow Güvenceli Kapora Ödemesi", count: "14.280", conversion: "%66.4", drop: "%33.6" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Ana Çift Dönüşüm Hunisi (End-to-End Couple Journey Funnel)
      </span>

      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
        {funnelSteps.map((fs, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -1 }}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
          >
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">{fs.step}</h4>
              <span className="text-[10px] text-slate-400 font-mono">{fs.count} Kullanıcı</span>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                Adım Başarısı: {fs.conversion}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold">
                Terk (Drop): {fs.drop}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
