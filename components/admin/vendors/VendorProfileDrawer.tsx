"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VendorProfileDrawer({
  vendor,
  isOpen,
  onClose,
}: {
  vendor: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !vendor) return null;

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
              <span className="text-[10px] font-bold uppercase text-indigo-600">360° Tedarikçi Profil Denetleyici</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{vendor.companyName}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* Şirket Detay Özeti */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Vergi Kimlik No</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{vendor.taxNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Komisyon Oranı</span>
              <span className="font-mono font-bold text-indigo-600">%{vendor.commissionRate || 5} Sabit</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">CSAT Müşteri Puanı</span>
              <span className="font-bold text-amber-500">★ {vendor.csatScore || "4.9"} / 5.0</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Abonelik Paketi</span>
              <span className="font-bold text-purple-600">{vendor.subscriptionPlan || "Pro Business"}</span>
            </div>
          </div>

          {/* Yüklenen Evraklar */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">📁 Yasal Doğrulama Evrakları</span>

            <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Vergi Levhası (2026)</h4>
                <span className="text-[10px] text-emerald-600 font-bold">✓ VKN Doğrulandı</span>
              </div>
              <button onClick={() => alert("📄 PDF Görünütüleniyor...")} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold">
                İncele 👁️
              </button>
            </div>

            <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">İmza Sirküleri & Ticaret Sicil Gazetesi</h4>
                <span className="text-[10px] text-emerald-600 font-bold">✓ Onaylı</span>
              </div>
              <button onClick={() => alert("📄 PDF Görünütüleniyor...")} className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold">
                İncele 👁️
              </button>
            </div>
          </div>

          {/* Admin Hızlı Not */}
          <div className="space-y-2 pt-2">
            <label className="font-semibold block text-slate-700 dark:text-slate-200">Admin Dahili Notu Add/Edit</label>
            <textarea
              rows={3}
              placeholder="Tedarikçi hakkındaki özel denetim notlarınızı buraya yazabilirsiniz..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">Kapat</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
