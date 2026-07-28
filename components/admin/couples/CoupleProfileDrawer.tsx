"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoupleProfileDrawer({
  couple,
  isOpen,
  onClose,
}: {
  couple: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !couple) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 md:p-8 overflow-y-auto space-y-6 shadow-2xl text-xs"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-rose-600">360° Çift Profil Denetleyici</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{couple.coupleNames}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* Düğün & Bütçe Özeti */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Düğün Tarihi</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{couple.weddingDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Hedef Bütçe</span>
              <span className="font-mono font-bold text-rose-600">{couple.budget.toLocaleString("tr-TR")} ₺</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Anlaşmalı Tedarikçiler</span>
              <span className="font-bold text-indigo-600">{couple.signedVendorsCount || 3} Tedarikçi</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Harcanan AI Jetonu</span>
              <span className="font-bold text-purple-600">142.500 Jeton</span>
            </div>
          </div>

          {/* Aktif Sözleşmeler */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">📄 İmzalı Sözleşmeler & Ödemeler</span>

            <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Bodrum Sunset Venue (Mekan)</h4>
                <span className="text-[10px] text-emerald-600 font-bold">✓ 120.000 ₺ Kapora Ödendi (Escrow)</span>
              </div>
              <button onClick={() => alert("📄 Sözleşme İncele")} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold">
                Oku 👁️
              </button>
            </div>
          </div>

          {/* VIP Destek Müdahalesi */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 space-y-2">
            <h4 className="font-bold text-rose-900 dark:text-rose-200">👑 Çifte VIP Platform Danışmanı Ata</h4>
            <p className="text-[10px] text-rose-700 dark:text-rose-300">
              Düğün günü yaklaşan bu çifte özel bir organizasyon uzmanı atayarak sorunsuz bir deneyim sağlayabilirsiniz.
            </p>
            <button
              onClick={() => alert("👑 VIP Danışman Atandı!")}
              className="w-full py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
            >
              VIP Danışmanlığı Başlat ✨
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">Kapat</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
