"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVendorWorkflowAction } from "@/lib/actions/vendor-automation";

export default function WorkflowBuilderModal({
  isOpen,
  onClose,
  vendorId,
  aiWorkflowData,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
  aiWorkflowData?: any;
}) {
  const [title, setTitle] = useState(aiWorkflowData?.title || "Sözleşme İmzalandığında Otomatik Onay & Görev");
  const [triggerType, setTriggerType] = useState<any>(aiWorkflowData?.triggerType || "CONTRACT_SIGNED");
  const [steps, setSteps] = useState(
    aiWorkflowData?.suggestedSteps || [
      { id: "1", type: "TRIGGER", title: "⚡ Tetikleyici: Sözleşme İmzalandı" },
      { id: "2", type: "DELAY", title: "⏳ Zamanlayıcı: 10 Dakika Bekle" },
      { id: "3", type: "ACTION", actionType: "SEND_WHATSAPP", title: "📲 Eylem: Çifte Hoş Geldin WhatsApp Mesajı Gönder" },
      { id: "4", type: "ACTION", actionType: "CREATE_TASK", title: "📋 Eylem: Mutfak Ekibine Menü Tadımı Görevi Oluştur" },
    ]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createVendorWorkflowAction(vendorId, {
      title,
      triggerType,
      steps,
    });

    setIsSubmitting(false);

    if (res.success) {
      alert(res.message);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 my-8"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">Visual Workflow Builder</span>
              <h2 className="text-xl font-serif font-bold">Görsel Otomasyon Akışı Tasarla</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Akış Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Olay Tetikleyicisi (Trigger)</label>
                <select
                  value={triggerType}
                  onChange={(e) => setTriggerType(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="NEW_LEAD">Yeni Müşteri Talebi Geldiğinde</option>
                  <option value="PROPOSAL_ACCEPTED">Teklif Onaylandığında</option>
                  <option value="PAYMENT_RECEIVED">Ödeme / Kapora Alındığında</option>
                  <option value="CONTRACT_SIGNED">Sözleşme İmzalandığında</option>
                  <option value="NEW_REVIEW">Yeni Müşteri Yorumu Geldiğinde</option>
                  <option value="CALENDAR_EVENT">Takvim Etkinliği Yaklaştığında</option>
                </select>
              </div>
            </div>

            {/* Adım Adım Akış Zirvesi */}
            <div className="space-y-3 pt-2">
              <span className="font-bold text-slate-700 dark:text-slate-200 block">🪜 Akış Adımları Çizelgesi</span>

              <div className="space-y-2">
                {steps.map((st: any, i: number) => (
                  <div key={st.id || i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold flex items-center justify-center text-[10px]">
                        {i + 1}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{st.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{st.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Kaydediliyor..." : "Otomasyonu Yayına Al ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
