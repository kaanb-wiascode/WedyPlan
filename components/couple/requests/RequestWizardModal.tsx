"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rewriteRequestWithAIAction, createOfferRequestAction } from "@/lib/actions/offer-request";

export default function RequestWizardModal({
  userId,
  isOpen,
  onClose,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("Düğün Mekanı");
  const [title, setTitle] = useState("Bodrum Sunset Düğün Daveti Teklifi");
  const [weddingDate, setWeddingDate] = useState("2027-06-19");
  const [location, setLocation] = useState("Bodrum, Muğla");
  const [guestCount, setGuestCount] = useState(350);
  const [budgetRange, setBudgetRange] = useState("200.000 ₺ - 350.000 ₺");
  const [userNotes, setUserNotes] = useState("Açık hava gün batımı kokteyli ve yemekli resepsiyon istiyoruz.");
  const [aiNotes, setAiNotes] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);

  if (!isOpen) return null;

  const handlePolishWithAI = async () => {
    setIsPolishing(true);
    const res = await rewriteRequestWithAIAction(userNotes, category);
    setIsPolishing(false);
    if (res.success && res.polishedText) {
      setAiNotes(res.polishedText);
    }
  };

  const handleSubmit = async () => {
    const res = await createOfferRequestAction(userId, {
      category,
      title,
      weddingDate,
      location,
      guestCount,
      budgetRange,
      stylePreference: "Bohem Lüks",
      userNotes,
      aiEnhancedNotes: aiNotes || userNotes,
      selectedVendorIds: ["v1", "v2"],
    });

    if (res.success) {
      alert("✨ Teklif talebiniz akıllı eşleşen tedarikçilere iletildi!");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-rose-500">Adım {step} / 3</span>
              <h2 className="text-lg font-serif font-bold">Smart Offer Request Wizard</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Kategori</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800">
                  <option value="Düğün Mekanı">Düğün Mekanı</option>
                  <option value="Fotoğraf & Video">Fotoğraf & Video</option>
                  <option value="Catering">Catering</option>
                  <option value="Müzik & Orkestra">Müzik & Orkestra</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Tarih</label>
                  <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Davetli Sayısı</label>
                  <input type="number" value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Talebiniz & İstekleriniz</label>
                <textarea rows={4} value={userNotes} onChange={(e) => setUserNotes(e.target.value)} className="w-full p-3 rounded-xl border text-xs bg-slate-50 dark:bg-slate-800 resize-none" />
              </div>

              <button
                type="button"
                onClick={handlePolishWithAI}
                disabled={isPolishing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-90 transition"
              >
                {isPolishing ? "AI Metni Cilalıyor..." : "✦ AI ile Profesyonelleştir & Cilala"}
              </button>

              {aiNotes && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 block">✦ AI Cilalanmış Şartname:</span>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line text-[11px]">{aiNotes}</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Eşleşen Onaylı Tedarikçiler (2 Seçildi)</h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border flex justify-between items-center">
                <span>Bodrum Sunset Venue</span>
                <span className="text-emerald-600 font-bold">%98 AI Eşleşme</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border flex justify-between items-center">
                <span>Ege Bay Resort</span>
                <span className="text-emerald-600 font-bold">%92 AI Eşleşme</span>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 rounded-xl border text-xs font-semibold">Geri</button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold">İleri →</button>
            ) : (
              <button onClick={handleSubmit} className="px-5 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition">Teklifleri Dağıt ✨</button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
