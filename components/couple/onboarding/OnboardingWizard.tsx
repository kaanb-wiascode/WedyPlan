"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveOnboardingDraft, completeOnboarding } from "@/lib/actions/onboarding";
import { OnboardingFormData } from "@/lib/validations/onboarding";

const INITIAL_DATA: OnboardingFormData = {
  relationshipStatus: "ENGAGED",
  partnerName: "",
  partnerEmail: "",
  weddingDate: "",
  weddingCity: "",
  languages: ["TR"],
  estimatedGuestCount: 150,
  estimatedBudget: 250000,
  currency: "TRY",
  planningExperience: "BEGINNER",
  weddingStyle: "MODERN_ELEGANCE",
  weddingTheme: "BOTANICAL_GARDEN",
  locationType: "HYBRID",
  ceremonyType: "BOTH",
  preferredVendors: ["VENUE", "PHOTOGRAPHY", "CATERING"],
};

export default function OnboardingWizard({ userId }: { userId: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Otomatik Kaydetme Debounce Etkisi
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      saveOnboardingDraft(userId, step, formData).finally(() => setIsSaving(false));
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData, step, userId]);

  const updateFields = (fields: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (step < 5) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await completeOnboarding(userId, formData);
    setIsSubmitting(false);

    if (result.success) {
      alert("✨ Onboarding Başarıyla Tamamlandı! AI Asistanınız Hazırlanıyor...");
    } else {
      alert("Lütfen tüm bilgileri eksiksiz doldurduğunuzdan emin olun.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-stone-950 flex flex-col justify-center items-center p-4 md:p-8">
      {/* İlerleme ve Durum Göstergesi */}
      <div className="w-full max-w-2xl mb-8 flex justify-between items-center text-sm font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{isSaving ? "Kaydediliyor..." : "Otomatik Kaydedildi"}</span>
        </div>
        <span>Adım {step} / 5</span>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="w-full max-w-2xl bg-slate-200/60 dark:bg-slate-800 rounded-full h-1.5 mb-8 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Glassmorphic Ana Kart */}
      <div className="w-full max-w-2xl backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-slate-800 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {step === 1 && (
              <div>
                <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                  Hikayenize Başlayalım ✨
                </h2>
                <p className="text-slate-500 mb-6">Partnerinizi ve planlama durumunuzu belirtin.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Partnerinizin Adı
                    </label>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(e) => updateFields({ partnerName: e.target.value })}
                      placeholder="Örn: Merve Kaya"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-rose-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                  Zaman ve Mekan 📍
                </h2>
                <p className="text-slate-500 mb-6">Düğün gününüzü ve şehrinizi seçin.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Düğün Tarihi
                    </label>
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) => updateFields({ weddingDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-rose-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Şehir
                    </label>
                    <input
                      type="text"
                      value={formData.weddingCity}
                      onChange={(e) => updateFields({ weddingCity: e.target.value })}
                      placeholder="Örn: İstanbul"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-rose-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                  Ölçek & Bütçe 📊
                </h2>
                <p className="text-slate-500 mb-6">Yapay zekanın doğru öneriler sunması için bütçenizi belirleyin.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Tahmini Davetli Sayısı: <span className="font-bold text-rose-600">{formData.estimatedGuestCount}</span> Kişi
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="1000"
                      step="10"
                      value={formData.estimatedGuestCount}
                      onChange={(e) => updateFields({ estimatedGuestCount: Number(e.target.value) })}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                  Stil & Konsept 🌿
                </h2>
                <p className="text-slate-500 mb-6">Hayalinizdeki atmosferi tanımlayın.</p>
                <div className="grid grid-cols-3 gap-3">
                  {["INDOOR", "OUTDOOR", "HYBRID"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateFields({ locationType: type as any })}
                      className={`p-4 rounded-xl border text-center font-medium transition ${
                        formData.locationType === type
                          ? "border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {type === "INDOOR" ? "Kapalı Alan" : type === "OUTDOOR" ? "Açık Hava" : "Karma / Hibrit"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-3xl font-serif font-light text-slate-800 dark:text-slate-100 mb-2">
                  Yapay Zeka Hazırlığı 🤖
                </h2>
                <p className="text-slate-500 mb-6">Kişiselleştirilmiş planınız ve zaman çizelgeniz oluşturuluyor.</p>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Tamamla butonuna bastığınızda yapay zeka asistanınız bütçenize özel görev listesi ve zaman çizelgesi üretecektir.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Eylem Butonları */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-medium disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Geri
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium hover:opacity-90 shadow-lg transition"
            >
              Devam Et →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium hover:shadow-rose-500/25 shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Hazırlanıyor..." : "Onboarding'i Tamamla ✨"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}