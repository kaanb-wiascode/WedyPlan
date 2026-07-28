"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePlatformCouponAction, processPlatformRefundAction } from "@/lib/actions/admin-subscriptions";

export default function InvoicesAndCouponsDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [couponCode, setCouponCode] = useState("WEDYPROMO2026");
  const [discount, setDiscount] = useState(15);

  const [refundInvoiceNo, setRefundInvoiceNo] = useState("");
  const [refundAmount, setRefundAmount] = useState(4500);

  if (!isOpen) return null;

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await generatePlatformCouponAction({
      code: couponCode,
      discountPercentage: discount,
      maxUses: 100,
      validUntil: "2026-12-31",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundInvoiceNo) return;
    const res = await processPlatformRefundAction({
      invoiceNumber: refundInvoiceNo,
      refundAmount,
      reason: "Müşteri talebi ve hatalı mükerrer çekim",
    });

    if (res.success) {
      alert("✨ " + res.message);
      setRefundInvoiceNo("");
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
              <span className="text-[10px] font-bold uppercase text-emerald-600">Finansal İşlemler & Kupon Kasası</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Kupon & İade Yönetimi</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* Kupon Üretici */}
          <form onSubmit={handleCreateCoupon} className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 space-y-3">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">🎟️ Yeni Promo Kuponu Oluştur</h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block mb-1">Kupon Kodu</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">İndirim Oranı (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-800 font-mono font-bold"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition">
              Kuponu Tanımla ✨
            </button>
          </form>

          {/* İade İşlem Alanı */}
          <form onSubmit={handleRefund} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">💳 Fatura İadesi (Refund) Gerçekleştir</h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block mb-1">Fatura Numarası</label>
                <input
                  type="text"
                  placeholder="INV-2026-XXXX"
                  value={refundInvoiceNo}
                  onChange={(e) => setRefundInvoiceNo(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">İade Tutarı (₺)</label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition">
              İadeyi Onayla & Yürüt
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
