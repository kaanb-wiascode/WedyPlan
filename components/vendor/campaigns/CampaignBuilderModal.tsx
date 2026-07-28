"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVendorCampaignAction, generateAICampaignCopyAction } from "@/lib/actions/vendor-campaigns";
import type { CreateCampaignInput } from "@/lib/validations/vendor-campaigns";

export default function CampaignBuilderModal({
  isOpen,
  onClose,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
}) {
  const [title, setTitle] = useState("2027 Erken Rezervasyon Fırsatı");
  const [type, setType] = useState<CreateCampaignInput["type"]>("EARLY_BOOKING");
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [couponCode, setCouponCode] = useState("EARLY2027");
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-04-30");
  const [budget, setBudget] = useState(5000);
  const [marketingCopy, setMarketingCopy] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  if (!isOpen) return null;

  const handleGenerateCopy = async () => {
    setIsGeneratingCopy(true);
    const res = await generateAICampaignCopyAction(title, type, discountPercentage);
    setIsGeneratingCopy(false);

    if (res.success) {
      setMarketingCopy(res.marketingCopy ?? "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createVendorCampaignAction(vendorId, {
      title,
      type,
      discountPercentage,
      couponCode,
      startDate,
      endDate,
      budget,
      targetAudience: "TÜM_ÇİFTLER",
      marketingCopy,
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
              <span className="text-[10px] font-bold uppercase text-purple-600">Pazarlama & Büyüme Mimarisi</span>
              <h2 className="text-xl font-serif font-bold">Yeni Kampanya & Kupon Oluştur</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Kampanya Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Kampanya Türü</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CreateCampaignInput["type"])}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="EARLY_BOOKING">Erken Rezervasyon</option>
                  <option value="DISCOUNT">Özel İndirim</option>
                  <option value="COUPON">Kupon Kodu</option>
                  <option value="LAST_MINUTE">Son Dakika Fırsatı</option>
                  <option value="BUNDLE">Paket Avantajı</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">İndirim Oranı (%)</label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Kupon Kodu (Opsiyonel)</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold block">Reklam Metni</label>
                <button
                  type="button"
                  onClick={handleGenerateCopy}
                  disabled={isGeneratingCopy}
                  className="text-[10px] font-bold text-purple-600 hover:underline"
                >
                  {isGeneratingCopy ? "AI Üretiyor..." : "✦ AI Metin Yazarı"}
                </button>
              </div>
              <textarea
                rows={3}
                value={marketingCopy}
                onChange={(e) => setMarketingCopy(e.target.value)}
                placeholder="Kampanya metnini buraya yazın veya AI'a ürettirin..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Yayınlanıyor..." : "Kampanyayı Başlat ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
