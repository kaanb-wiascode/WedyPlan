"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RegionalFormatsBento() {
  const regions = [
    { country: "Türkiye (TR)", lang: "Türkçe (TR)", currency: "TRY (₺)", tax: "%20 KDV", dateFormat: "DD.MM.YYYY", phone: "+90" },
    { country: "Almanya (DE)", lang: "Deutsch (DE)", currency: "EUR (€)", tax: "%19 MwSt", dateFormat: "DD.MM.YYYY", phone: "+49" },
    { country: "Birleşik Krallık / ABD", lang: "English (EN)", currency: "USD ($) / GBP (£)", tax: "%0 - %20 Sales Tax", dateFormat: "MM/DD/YYYY", phone: "+1 / +44" },
    { country: "Birleşik Arap Emirlikleri", lang: "العربية (AR)", currency: "AED (د.إ)", tax: "%5 VAT", dateFormat: "YYYY/MM/DD (RTL)", phone: "+971" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🌍 Bölgesel Formatlar, Para Birimleri & Vergi Matrahları Matrix
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {regions.map((reg, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{reg.country}</h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {reg.lang}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Para Birimi</span>
                <span className="font-bold text-emerald-600">{reg.currency}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Vergi Kuralları</span>
                <span className="font-bold text-purple-600">{reg.tax}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Tarih Formatı</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{reg.dateFormat}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Telefon Kodu</span>
                <span className="font-bold text-indigo-600">{reg.phone}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
