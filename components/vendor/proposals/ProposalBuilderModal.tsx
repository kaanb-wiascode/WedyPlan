"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createVendorProposalAction } from "@/lib/actions/vendor-proposals";

export default function ProposalBuilderModal({
  isOpen,
  onClose,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
}) {
  const [coupleName, setCoupleName] = useState("Selin & Kaan Yılmaz");
  const [title, setTitle] = useState("Bodrum Sunset Venue - Ultra Lüks Düğün Paketi");
  const [expirationDate, setExpirationDate] = useState("2027-05-15");
  const [discount, setDiscount] = useState(15000);
  const [taxRate, setTaxRate] = useState(20);

  const [items, setItems] = useState([
    { title: "Açık Hava Mekan Kiralama (350 Kişi)", quantity: 1, unitPrice: 220000 },
    { title: "Set Menü & İkram Hizmeti", quantity: 350, unitPrice: 350 },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subTotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const grandTotal = Math.max(0, subTotal - discount) * (1 + taxRate / 100);

  const handleAddItem = () => {
    setItems([...items, { title: "Yeni Ek Hizmet", quantity: 1, unitPrice: 5000 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await createVendorProposalAction(vendorId, {
      leadId: "lead_1",
      coupleName,
      title,
      expirationDate,
      discountAmount: discount,
      taxRatePercentage: taxRate,
      items,
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
              <span className="text-[10px] font-bold uppercase text-indigo-600">Akıllı Teklif Mimarisi</span>
              <h2 className="text-xl font-serif font-bold">Yeni Teklif Oluştur</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">Müşteri / Çift İsimleri</label>
                <input
                  type="text"
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Teklif Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Kalem Listesi */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-200">📋 Hizmet & Paket Kalemleri</span>
                <button type="button" onClick={handleAddItem} className="text-indigo-600 font-bold hover:underline">+ Kalem Ekle</button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].title = e.target.value;
                      setItems(newItems);
                    }}
                    className="col-span-6 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity = Number(e.target.value);
                      setItems(newItems);
                    }}
                    className="col-span-2 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center"
                  />
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].unitPrice = Number(e.target.value);
                      setItems(newItems);
                    }}
                    className="col-span-3 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-right font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setItems(items.filter((_, i) => i !== index))}
                    className="col-span-1 text-rose-500 font-bold text-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Finansal Özet */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2 text-right">
              <div>
                <span className="text-slate-500">Ara Toplam: </span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{subTotal.toLocaleString("tr-TR")} ₺</span>
              </div>
              <div>
                <span className="text-slate-500">Özel İndirim: </span>
                <span className="font-mono font-bold text-rose-600">-{discount.toLocaleString("tr-TR")} ₺</span>
              </div>
              <div className="text-sm font-bold pt-2 border-t border-indigo-200/50 dark:border-indigo-900/40">
                <span>Genel Toplam (KDV Dahil): </span>
                <span className="font-serif text-indigo-600 text-lg">{grandTotal.toLocaleString("tr-TR")} ₺</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Gönderiliyor..." : "Teklifi Çifte Gönder ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
