"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerCustomerInterventionAction } from "@/lib/actions/admin-customer-success";

export default function SuccessPlanDrawer({
  account,
  isOpen,
  onClose,
}: {
  account: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [interventionNotes, setInterventionNotes] = useState("");

  if (!isOpen || !account) return null;

  const handleIntervention = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await triggerCustomerInterventionAction({
      accountId: account.id,
      interventionType: "FREE_TRAINING",
      notes: interventionNotes || "Müşteri başarı temsilcisi 1-on-1 arama planladı.",
    });

    if (res.success) {
      alert("✨ " + res.message);
      onClose();
    }
  };

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
              <span className="text-[10px] font-bold uppercase text-emerald-600">360° Müşteri Başarı İş İstasyonu</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{account.name}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* Sağlık & Onboarding Metrikleri */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sağlık Skoru</span>
              <span className="font-serif font-bold text-emerald-600 text-sm">%{account.healthScore}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Onboarding Durumu</span>
              <span className="font-mono font-bold text-indigo-600">%{account.onboardingProgress} Tamam</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Atanan CSM</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{account.assignedCsm}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">VIP Statüsü</span>
              <span className="font-bold text-purple-600">{account.isVIP ? "Evet (Lüks Segment)" : "Standart"}</span>
            </div>
          </div>

          {/* Başarı Milat Taşları */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-200 block">🎯 Müşteri Başarı Planı & Milat Taşları</span>
            <div className="p-3 rounded-xl border bg-white dark:bg-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-semibold">
                <span>1. Profil & Vergi Levhası Onayı</span>
                <span className="text-emerald-600 font-bold">✓ Tamamlandı</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-semibold">
                <span>2. İlk 3 Dijital Sözleşme İmzası</span>
                <span className="text-emerald-600 font-bold">✓ Tamamlandı</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-semibold">
                <span>3. AI Copilot Eğitim Webincisi Katılımı</span>
                <span className="text-amber-600 font-bold">● Bekliyor</span>
              </div>
            </div>
          </div>

          {/* Proaktif Müdahale Formu */}
          <form onSubmit={handleIntervention} className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 space-y-3">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">⚡ Proaktif CSM Müdahalesi Başlat</h4>
            <textarea
              rows={3}
              value={interventionNotes}
              onChange={(e) => setInterventionNotes(e.target.value)}
              placeholder="Müşteriyi elde tutmak veya eğitimi tamamlatmak için notlarınızı girin..."
              className="w-full p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
            />
            <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition">
              Müdahaleyi Kaydet & Çağrı Başlat ✨
            </button>
          </form>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">Kapat</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
