"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerProfileModal({
  customer,
  isOpen,
  onClose,
}: {
  customer: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !customer) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 my-8"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">360° Müşteri Profil Kasası</span>
              <h2 className="text-xl font-serif font-bold">{customer.coupleName}</h2>
              <p className="text-xs text-slate-400">{customer.weddingDate} • {customer.location}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
              <span className="text-slate-400 font-semibold block">İletişim Bilgileri</span>
              <p className="font-bold">{customer.phone}</p>
              <p className="text-slate-500">{customer.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
              <span className="text-slate-400 font-semibold block">Toplam Anlaşma Hacmi</span>
              <p className="font-serif font-bold text-indigo-600 text-sm">{customer.budget.toLocaleString("tr-TR")} ₺</p>
              <p className="text-emerald-600 font-bold">Ödeme Tamamlandı: %70</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
              <span className="text-slate-400 font-semibold block">Segment & Etiketler</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 inline-block">
                {customer.segment}
              </span>
              <div className="flex gap-1 pt-1">
                {customer.tags?.map((t: string, i: number) => (
                  <span key={i} className="text-[9px] font-mono text-slate-400">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Zaman Tüneli & İletişim Geçmişi */}
          <div className="space-y-3 pt-2 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">⏳ Etkileşim Zaman Tüneli & Geçmiş</h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border flex justify-between">
                <span>✍️ 350 Kişilik Düğün Sözleşmesi İmzalandı</span>
                <span className="text-slate-400">12 Şubat 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border flex justify-between">
                <span>💳 %30 Kapora Ödemesi Tahsil Edildi (102.750 ₺)</span>
                <span className="text-slate-400">14 Şubat 2026</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold">
              Kapat
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
