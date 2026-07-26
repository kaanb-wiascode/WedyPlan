'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { OnboardingStepper } from '@/components/onboarding/OnboardingStepper';
import { AiQualityAnalyzer } from '@/components/onboarding/AiQualityAnalyzer';
import { VendorOnboardingFormData, AiQualityScoreResult } from '@/types/vendor-onboarding';
import { PARTNER_PLANS } from '@/lib/vendor-onboarding-constants';
import { Building2, ArrowRight, Check, Sparkles } from 'lucide-react';

const STEPS = ['Temel Bilgiler', 'Hizmet Alanı', 'Lokasyon', 'Portföy', 'Ticari & Bütçe', 'WedyAI Analiz'];

export default function VendorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<VendorOnboardingFormData>({
    basic: { companyName: '', category: 'Düğün Salonu', authorizedPerson: '', phone: '', email: '' },
    services: { primaryCategory: 'Düğün Salonu', subServices: ['Kır Bahçesi', 'Balo Salonu'], maxGuestCapacity: 500 },
    location: { city: 'İstanbul', district: 'Beykoz', serviceRegions: ['Tüm Marmara'], fullAddress: '' },
    portfolio: { coverPhotoUrl: '', galleryUrls: [], awardsAndCertificates: [] },
    business: { startingPrice: 200000, minimumBudget: 150000, monthlyCapacity: 8 }
  });

  const mockAiAnalysis: AiQualityScoreResult = {
    score: 88,
    badge: 'PREMIUM_PARTNER',
    seoScore: 92,
    predictedMonthlyLeads: 24,
    recommendations: [
      { type: 'WARNING', title: 'Portföy Fotoğrafı', actionText: '3 adet daha yüksek çözünürlüklü mekan fotoğrafı ekleyin.', scoreImpact: 6 },
      { type: 'OPTIMIZATION', title: 'Hizmet Açıklaması', actionText: 'WedyAI editoryal metin optimizasyonunu onaylayın.', scoreImpact: 6 }
    ]
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleSelectPlanAndFinish = (planId: string) => {
    alert(`Tebrikler! ${planId.toUpperCase()} paketiniz seçildi. Firma Paneline yönlendiriliyorsunuz.`);
    router.push('/firma/talepler?setup=completed');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-20">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-32 space-y-8">
        <OnboardingStepper currentStep={currentStep} totalSteps={6} stepsLabels={STEPS} />

        {currentStep < 6 ? (
          <form onSubmit={handleNext} className="bg-white/60 backdrop-blur-3xl border border-white p-8 rounded-[36px] shadow-xl space-y-6">
            
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">1. Adım: Temel İşletme Bilgileri</h3>
                <input
                  type="text"
                  required
                  placeholder="Firma / İşletme Adı"
                  value={formData.basic.companyName}
                  onChange={(e) => setFormData({ ...formData, basic: { ...formData.basic, companyName: e.target.value } })}
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                />
                <input
                  type="text"
                  required
                  placeholder="Yetkili Adı Soyadı"
                  value={formData.basic.authorizedPerson}
                  onChange={(e) => setFormData({ ...formData, basic: { ...formData.basic, authorizedPerson: e.target.value } })}
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Telefon Numarası"
                    value={formData.basic.phone}
                    onChange={(e) => setFormData({ ...formData, basic: { ...formData.basic, phone: e.target.value } })}
                    className="p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="E-Posta Adresi"
                    value={formData.basic.email}
                    onChange={(e) => setFormData({ ...formData, basic: { ...formData.basic, email: e.target.value } })}
                    className="p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Service Detail */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">2. Adım: Hizmet Kategorisi</h3>
                <select
                  value={formData.basic.category}
                  onChange={(e) => setFormData({ ...formData, basic: { ...formData.basic, category: e.target.value } })}
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white font-bold"
                >
                  <option value="Düğün Salonu">Düğün Salonu & Kır Bahçesi</option>
                  <option value="Fotoğrafçı">Fotoğraf & Video Stüdyosu</option>
                  <option value="Organizasyon">Organizasyon & Dekorasyon</option>
                  <option value="Gelinlik">Gelinlik & Modaevi</option>
                </select>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">3. Adım: Lokasyon Bilgileri</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Şehir (Örn: İstanbul)"
                    value={formData.location.city}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                    className="p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="İlçe (Örn: Beykoz)"
                    value={formData.location.district}
                    onChange={(e) => setFormData({ ...formData, location: { ...formData.location, district: e.target.value } })}
                    className="p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Portfolio */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">4. Adım: Portföy & Görsel Linki</h3>
                <input
                  type="url"
                  required
                  placeholder="Kapak Görseli URL (Örn: Unsplash veya CDN linki)"
                  value={formData.portfolio.coverPhotoUrl}
                  onChange={(e) => setFormData({ ...formData, portfolio: { ...formData.portfolio, coverPhotoUrl: e.target.value } })}
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                />
              </div>
            )}

            {/* Step 5: Business */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">5. Adım: Ticari Detaylar & Başlangıç Fiyatı</h3>
                <input
                  type="number"
                  required
                  placeholder="Başlangıç Paket Fiyatı (₺)"
                  value={formData.business.startingPrice}
                  onChange={(e) => setFormData({ ...formData, business: { ...formData.business, startingPrice: Number(e.target.value) } })}
                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs outline-none bg-white focus:border-[#E6007E]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#1D1D1F] text-white text-xs font-bold py-4 rounded-full hover:bg-black transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{currentStep === 5 ? 'WedyAI Kalite Analizini Çalıştır' : 'Devam Et'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>
        ) : (
          /* Step 6: AI Analysis & Plan Selection */
          <div className="space-y-8">
            <AiQualityAnalyzer analysis={mockAiAnalysis} onProceedToCheckout={() => {}} />

            <div className="bg-white/60 backdrop-blur-3xl border border-white p-8 rounded-[36px] space-y-6">
              <h3 className="font-serif font-bold text-[24px] text-center text-[#1D1D1F]">
                Tamamlamak İçin Planınızı Seçin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PARTNER_PLANS.map((p) => (
                  <div key={p.id} className="p-5 bg-white/80 rounded-[24px] border border-white space-y-3 text-center">
                    <h4 className="font-bold text-[16px] text-[#1D1D1F]">{p.name}</h4>
                    <div className="font-serif font-bold text-[20px] text-[#E6007E]">
                      {p.monthlyPrice === 0 ? 'Ücretsiz' : `${p.monthlyPrice.toLocaleString('tr-TR')} ₺/ay`}
                    </div>
                    <button
                      onClick={() => handleSelectPlanAndFinish(p.id)}
                      className="w-full bg-[#1D1D1F] text-white text-[11px] font-bold py-2.5 rounded-full hover:bg-black transition cursor-pointer"
                    >
                      Aktivasyonu Tamamla
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}