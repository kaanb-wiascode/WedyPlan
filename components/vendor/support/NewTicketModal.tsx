"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVendorSupportTicketAction, generateAISupportSolutionAction } from "@/lib/actions/vendor-support";

export default function NewTicketModal({
  isOpen,
  onClose,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
}) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<any>("TECHNICAL");
  const [priority, setPriority] = useState<any>("MEDIUM");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiPreview, setAiPreview] = useState<any>(null);

  if (!isOpen) return null;

  const handleTextChange = async (val: string) => {
    setMessage(val);
    if (val.length > 20) {
      const res = await generateAISupportSolutionAction(subject, val);
      if (res.success) {
        setAiPreview(res);
        setCategory(res.suggestedCategory);
        setPriority(res.detectedPriority);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createVendorSupportTicketAction(vendorId, {
      subject,
      category,
      priority,
      message,
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
          className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 my-8"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-sky-600">Enterprise Helpdesk</span>
              <h2 className="text-xl font-serif font-bold">Yeni Destek Bilet Aç</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold block mb-1">Bilet Konusu</label>
              <input
                type="text"
                placeholder="Örn: Fatura Kesiminde KDV Oranı Uyumsuzluğu"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Kategori (AI Otomatik Algılar)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="TECHNICAL">Teknik Sorun</option>
                  <option value="BILLING">Faturalandırma & Abonelik</option>
                  <option value="PAYMENTS">Ödemeler & Escrow</option>
                  <option value="CONTRACTS">E-İmza & Sözleşmeler</option>
                  <option value="LEADS">Müşteri Talepleri</option>
                  <option value="SUGGESTIONS">Özellik İsteği & Öneri</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Aciliyet Seviyesi</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="LOW">Düşük</option>
                  <option value="MEDIUM">Orta</option>
                  <option value="HIGH">Yüksek</option>
                  <option value="URGENT">Acil (Saha Düğün Günü Sorunu)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1">Sorun Detayı</label>
              <textarea
                rows={4}
                placeholder="Lütfen karşılaştığınız durumu detaylıca açıklayınız..."
                value={message}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
              />
            </div>

            {aiPreview && (
              <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200/50 text-[11px] text-sky-800 dark:text-sky-300">
                🤖 <strong>AI Teşhis Önerisi:</strong> {aiPreview.suggestedSolution}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Gönderiliyor..." : "Bileti Oluştur & Destek İste ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
