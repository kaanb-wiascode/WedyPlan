"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SupportToolsBentoGrid() {
  const tools = [
    { name: "Yapay Zeka Bilgi Bankası", code: "Knowledge Base Tool", icon: "📚", desc: "RAG Engine ile doğrulanmış rehber ve SSS arar" },
    { name: "Kullanıcı & CRM Sorgulayıcı", code: "CRM Tool", icon: "👥", desc: "Kullanıcı paketini, geçmiş biletlerini ve statüsünü çeker" },
    { name: "Sözleşme & İptal Denetimi", code: "Contracts Tool", icon: "📄", desc: "Escrow kapora ve iptal maddelerini RAG ile doğrular" },
    { name: "Finans & Fatura Kontrolü", code: "Billing Tool", icon: "💳", desc: "Ödeme, iade, tevkifat ve fatura durumunu kontrol eder" },
    { name: "Çok Kanallı Bildirim", code: "Messages Tool", icon: "💬", desc: "WhatsApp, SMS ve E-Posta ile çözümü iletir" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🧰 Destek Ajanının Kullandığı 5 Enterprise Araç (Support Tools)
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
              <span className="text-emerald-600 font-bold">✓ Bound to Agent</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
