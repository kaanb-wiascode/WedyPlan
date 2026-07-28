"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SettingsCategoryBento({
  onSelectCategory,
}: {
  onSelectCategory: (categoryKey: string) => void;
}) {
  const categories = [
    { key: "GENERAL", name: "Genel Sistem & Site Kuralları", icon: "⚙️", desc: "Platform adı, bakım modu & genel çalışma modları" },
    { key: "BRAND", name: "Marka & Görsel Kimlik", icon: "🎨", desc: "Logo, tipografi, renk paleti & lüks tema varlıkları" },
    { key: "REGIONAL", name: "Bölgesel & Para Birimi", icon: "🌍", desc: "Varsayılan dil (TR/EN/DE/FR), zaman dilimi & döviz kurları" },
    { key: "COMMUNICATION", name: "E-Posta, SMS & WhatsApp", icon: "💬", desc: "Resend, Netgsm, Twilio & WhatsApp Cloud API ayarları" },
    { key: "STORAGE", name: "Bulut Depolama & CDN", icon: "☁️", desc: "Cloudflare R2, AWS S3 & otomatik WebP sıkıştırma" },
    { key: "PAYMENTS", name: "Ödeme Geçitleri & Escrow", icon: "💳", desc: "iyzico, Stripe, PayTR & komisyon kesinti oranları" },
    { key: "TAXES", name: "Vergi & KDV Matrahları", icon: "🧾", desc: "Resmi KDV %, stopaj & e-fatura entegrasyon kuralları" },
    { key: "SECURITY", name: "Siber Güvenlik & Oturum", icon: "🔒", desc: "MFA zorunluluğu, JWT oturum süreleri & IP WAF kalkanı" },
    { key: "AI_PROVIDERS", name: "AI Model Sağlayıcıları", icon: "🤖", desc: "OpenAI, Claude, Gemini API anahtarları & token kotaları" },
    { key: "SEARCH", name: "Arama Motoru & İndeks", icon: "🔍", desc: "Meilisearch / Vektör arama ayarları & reindex sıklığı" },
    { key: "MARKETPLACE", name: "Pazar Yeri & Vitrin", icon: "🏪", desc: "Sponsorlu ilan fiyatları, taban/tavan fiyat kuralları" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📁 Platform Konfigürasyon Kategorileri ({categories.length} Kategori)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((cat) => (
          <motion.div
            key={cat.key}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{cat.name}</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{cat.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[9px] font-mono text-emerald-600 font-bold">✓ Doğrulandı</span>
              <button
                onClick={() => onSelectCategory(cat.key)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
              >
                Ayarları Düzenle →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
