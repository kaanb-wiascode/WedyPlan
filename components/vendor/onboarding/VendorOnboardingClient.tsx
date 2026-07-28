"use client";

import React, { useState } from "react";
import OnboardingHeader from "./OnboardingHeader";
import AIBioEnhancerWidget from "./AIBioEnhancerWidget";
import ProfileQualityScoreWidget from "./ProfileQualityScoreWidget";
import { enhanceVendorBioWithAIAction, saveVendorOnboardingAction } from "@/lib/actions/vendor-onboarding";

export default function VendorOnboardingClient({ vendorId }: { vendorId: string }) {
  const [step, setStep] = useState(1);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: "Bodrum Sunset Venue & Events",
    category: "Düğün Mekanı",
    subCategories: ["Açık Hava Mekanı", "Kır Düğünü", "Deniz Kenarı"],
    companyType: "LIMITED" as const,
    taxOffice: "Bodrum Vergi Dairesi",
    taxNumber: "9876543210",
    authorizedPerson: "Mehmet Yılmaz",
    city: "Muğla",
    district: "Bodrum",
    address: "Yalıkavak Mah. Sahil Cad. No: 42",
    phone: "+90 532 999 8877",
    email: "contact@bodrumsunsetvenue.com",
    website: "https://bodrumsunsetvenue.com",
    instagram: "@bodrumsunsetvenue",
    whatsapp: "+90 532 999 8877",
    priceRange: "200.000 ₺ - 400.000 ₺",
    capacity: 400,
    yearsOfExperience: 12,
    description: "Bodrum'un en güzel gün batımı manzarasına sahip deniz sıfır lüks düğün mekanı.",
    aiEnhancedDescription: "",
  });

  const [aiResult, setAiResult] = useState<any>(null);

  const handleEnhanceBio = async () => {
    setIsEnhancing(true);
    const res = await enhanceVendorBioWithAIAction(formData.description, formData.category, formData.city);
    setIsEnhancing(false);

    if (res.success) {
      setAiResult(res);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const res = await saveVendorOnboardingAction(vendorId, {
      ...formData,
      aiEnhancedDescription: formData.aiEnhancedDescription || formData.description,
    });
    setIsSaving(false);

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <OnboardingHeader
        currentStep={step}
        totalSteps={4}
        qualityScore={98}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sol Taraf: Adım Form İçerikleri (8 Sütun) */}
        <div className="lg:col-span-8 p-6 md:p-8 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/60 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Adım 1 / Kurumsal Kimlik</span>
                <h2 className="text-xl font-serif font-bold">İşletme & Vergi Bilgileri</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">İşletme / Marka Adı</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Ana Hizmet Kategorisi</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Düğün Mekanı">Düğün Mekanı</option>
                    <option value="Fotoğraf & Video">Fotoğraf & Video</option>
                    <option value="Catering">Catering</option>
                    <option value="Müzik & Orkestra">Müzik & Orkestra</option>
                    <option value="Gelinlik & Moda">Gelinlik & Moda</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Şirket Türü</label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value as any })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="LIMITED">Limited Şirket</option>
                    <option value="ANONIM">Anonim Şirket</option>
                    <option value="SOLE_PROPRIETORSHIP">Şahıs Şirketi</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Vergi Dairesi & Numarası</label>
                  <input
                    type="text"
                    value={formData.taxOffice + " - " + formData.taxNumber}
                    onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Adım 2 / Operasyon & Kapasite</span>
                <h2 className="text-xl font-serif font-bold">Hizmet Alanı & Bütçe Skalası</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Şehir / İlçe</label>
                  <input
                    type="text"
                    value={formData.city + " / " + formData.district}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Fiyat Aralığı</label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="100.000 ₺ - 200.000 ₺">100.000 ₺ - 200.000 ₺</option>
                    <option value="200.000 ₺ - 400.000 ₺">200.000 ₺ - 400.000 ₺ (Lüks)</option>
                    <option value="400.000 ₺ +">400.000 ₺ + (Ultra Lüks)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Aynı Anda Kişi Kapasitesi</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Sektörel Deneyim (Yıl)</label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Adım 3 / İletişim & Sosyal Medya</span>
                <h2 className="text-xl font-serif font-bold">Online Varlık & Bağlantılar</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Telefon / WhatsApp Line</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Instagram Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Adım 4 / AI Biyografi & Onay</span>
                <h2 className="text-xl font-serif font-bold">Kurumsal Açıklama & AI Cilalama</h2>
              </div>

              <div className="space-y-3 text-xs">
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 resize-none"
                />

                <button
                  type="button"
                  onClick={handleEnhanceBio}
                  disabled={isEnhancing}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90 transition disabled:opacity-50"
                >
                  {isEnhancing ? "AI Cilalıyor..." : "✦ AI İle Açıklamayı Lüks Segmente Uyarla"}
                </button>

                {aiResult && (
                  <AIBioEnhancerWidget
                    enhancedBio={aiResult.enhancedBio}
                    keywords={aiResult.keywords}
                    isEnhancing={isEnhancing}
                    onApplyBio={(text) => setFormData({ ...formData, aiEnhancedDescription: text })}
                  />
                )}
              </div>
            </div>
          )}

          {/* İlerleme Butonları */}
          <div className="flex justify-between pt-6 border-t border-slate-200/60 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-2xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ← Geri
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition"
              >
                İleri →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {isSaving ? "Kaydediliyor..." : "İşletme Profilini Yayınla ✨"}
              </button>
            )}
          </div>
        </div>

        {/* Sağ Taraf: AI Profil Skoru & Özet Kartı (4 Sütun) */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileQualityScoreWidget score={98} />

          <div className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">📋 Kayıt Özeti</h4>
            <div className="space-y-1 text-slate-500">
              <p><strong>Marka:</strong> {formData.businessName}</p>
              <p><strong>Kategori:</strong> {formData.category}</p>
              <p><strong>Konum:</strong> {formData.city} / {formData.district}</p>
              <p><strong>Fiyat Aralığı:</strong> {formData.priceRange}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
