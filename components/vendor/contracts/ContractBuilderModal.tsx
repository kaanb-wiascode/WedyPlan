"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVendorContractAction } from "@/lib/actions/vendor-contracts";

export default function ContractBuilderModal({
  isOpen,
  onClose,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
}) {
  const [coupleName, setCoupleName] = useState("Selin & Kaan Yılmaz");
  const [title, setTitle] = useState("Düğün Organizasyon & Hizmet Sözleşmesi");
  const [weddingDate, setWeddingDate] = useState("2027-06-19");
  const [totalAmount, setTotalAmount] = useState(342500);
  const [depositAmount, setDepositAmount] = useState(102750);
  const [expirationDate, setExpirationDate] = useState("2027-05-30");

  const [content, setContent] = useState(
    "İŞBU SÖZLEŞME {{WEDDING_DATE}} tarihinde {{COUPLE_NAMES}} ile Bodrum Sunset Venue arasında akdedilmiştir.\n\n" +
    "1. HİZMET KAPSAMI: İşveren'in {{WEDDING_DATE}} tarihindeki 350 kişilik düğün organizasyon hizmetlerinin sunulması.\n" +
    "2. TOPLAM TUTAR VE ÖDEME: Toplam hizmet bedeli {{TOTAL_AMOUNT}} ₺ olup, {{DEPOSIT_AMOUNT}} ₺ tutarındaki kapora imzadan sonraki 3 iş günü içinde ödenecektir.\n" +
    "3. İPTAL ŞARTLARI: Düğün tarihine 60 günden az kala yapılan iptallerde kapora iade edilmez."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createVendorContractAction(vendorId, {
      title,
      coupleName,
      weddingDate,
      totalAmount,
      depositAmount,
      expirationDate,
      content,
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
          className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 my-8"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">Enterprise Contract Builder</span>
              <h2 className="text-xl font-serif font-bold">Yeni Sözleşme Taslağı Hazırla</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Müşteri / Çift Adı</label>
                <input
                  type="text"
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Sözleşme Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Toplam Anlaşma Tutarı (₺)</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Kapora Tutarı (₺)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold block">Sözleşme Metni (Dinamik Değişkenli)</label>
                <span className="text-[10px] text-indigo-600 font-mono">Değişkenler: &#123;&#123;COUPLE_NAMES&#125;&#125;, &#123;&#123;WEDDING_DATE&#125;&#125;</span>
              </div>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono text-[11px] leading-relaxed resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Oluşturuluyor..." : "Sözleşmeyi Oluştur & Müşteriye İlet ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
