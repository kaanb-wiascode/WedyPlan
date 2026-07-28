"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveVendorListingAction } from "@/lib/actions/vendor-marketplace";

export default function ListingEditorModal({
  isOpen,
  onClose,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendorId: string;
}) {
  const [title, setTitle] = useState("Bodrum Sunset Venue - Ultra Lüks Sahil Düğünü");
  const [category, setCategory] = useState("Düğün Mekanı");
  const [subCategory, setSubCategory] = useState("Açık Hava & Kır Düğünü");
  const [basePrice, setBasePrice] = useState(340000);
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const [description, setDescription] = useState(
    "Bodrum Yalıkavak sahilinde 350 kişilik kapasitesi, özel iskelesi, helikopter pisti ve lüks set menü seçenekleriyle hayalinizdeki düğün organizasyonuna ev sahipliği yapıyoruz."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await saveVendorListingAction(vendorId, {
      title,
      category,
      subCategory,
      basePrice,
      description,
      isFeatured,
      isPremium,
      status: "PUBLISHED",
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
              <span className="text-[10px] font-bold uppercase text-indigo-600">Pazar Yeri Vitrin Düzenleyici</span>
              <h2 className="text-xl font-serif font-bold">Hizmet İlanı Oluştur & Düzenle</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1">İlan Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Taban Fiyat (₺)</label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Ana Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Düğün Mekanı">Düğün Mekanı</option>
                  <option value="Fotoğraf & Video">Fotoğraf & Video</option>
                  <option value="Catering">Catering</option>
                  <option value="Müzik & Orkestra">Müzik & Orkestra</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Alt Kategori</label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1">Kamusal Detay Açıklaması</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
              />
            </div>

            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span className="font-semibold">⭐ Öne Çıkarılan İlan Rozeti Ekle</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span className="font-semibold">👑 Premium Lüks Vitrinde Göster</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Kaydediliyor..." : "İlanı Canlı Vitrinde Yayınla ✨"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
