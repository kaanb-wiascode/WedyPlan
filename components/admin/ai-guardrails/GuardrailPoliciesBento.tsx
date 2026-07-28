"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GuardrailPoliciesBento() {
  const policies = [
    { name: "Rol Tabanlı Kalkan (Role-Based)", target: "COUPLE / VENDOR / ADMIN", icon: "👤", desc: "Kullanıcı rolüne göre hassas veritabanı komutlarını kısıtlar." },
    { name: "Kiracı İzolasyon Kalkanı (Tenant-Based)", target: "WHITE_LABEL / FRANCHISE", icon: "🏢", desc: "A kiracısının B kiracısının AI bağlamına erişmesini engeller." },
    { name: "Bölgesel Yasal Uyum (Country-Based)", target: "TR (KVKK) / DE (GDPR) / UAE", icon: "🌍", desc: "Ülke yasal mevzuatına göre PII maskeleme hassasiyetini ayarlar." },
    { name: "Yaş Sınırı Filtresi (Age-Based)", target: "UNDER_18 / ADULT", icon: "🛡️", desc: "Reşit olmayan kullanıcılar için uygunsuz içerik filtresini sıkılaştırır." },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚙️ 4 Katmanlı Güvenlik Politika Matrixi
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {policies.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{p.icon}</span>
                <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  AKTİF
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{p.name}</h4>
              <span className="text-[10px] text-indigo-600 font-mono font-bold block">{p.target}</span>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
