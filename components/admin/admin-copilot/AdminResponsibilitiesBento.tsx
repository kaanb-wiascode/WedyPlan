"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminResponsibilitiesBento() {
  const responsibilities = [
    { title: "Tedarikçi Onay Masası", scope: "Vendor Approval", icon: "🏢", desc: "Yeni kayıtların evrak ve vergi kontrollerini otonom yapar" },
    { title: "Sahtecilik & Fraud İncelemesi", scope: "Fraud Investigation", icon: "🛡️", desc: "Mükerrer kapora ve sahte yönlendirme tıklamalarını engeller" },
    { title: "Destek Operasyon Denetimi", scope: "Support Review", icon: "🎧", desc: "Çözüm bekleyen biletleri analiz edip yanıt taslağı hazırlar" },
    { title: "Altyapı & Sistem Sağlığı", scope: "Platform Health", icon: "💻", desc: "Latency, CPU, RAM ve veritabanı kilitlenmelerini izler" },
    { title: "Ciro & Finansal Takip", scope: "Revenue Monitoring", icon: "💳", desc: "MRR, kapora akışları ve komisyon tevkifatlarını simüle eder" },
    { title: "İçerik Moderasyon Kalkanı", scope: "Moderation", icon: "📜", desc: "Uygulama içi kural ihlallerini ve küfürlü içerikleri eler" },
    { title: "Kampanya & Vitrin Denetimi", scope: "Campaign Review", icon: "🚀", desc: "Öne çıkarılan ilanların ROI performansını ölçer" },
    { title: "Sürüm & Release Takibi", scope: "Release Monitoring", icon: "📦", desc: "Canary yayınlarındaki hata oranlarını ve rollback ihtiyacını izler" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚙️ Copilot'un Üstlendiği 8 Temel Yönetici Sorumluluğu
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {responsibilities.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{r.icon}</span>
                <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                  AKTİF
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs mt-1">{r.title}</h4>
              <span className="text-[10px] text-indigo-600 font-mono font-bold block">{r.scope}</span>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-0.5">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
