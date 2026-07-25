'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWeddingOS } from '@/store/useWeddingOS';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  Check, 
  Calendar, 
  Users, 
  Wallet, 
  Heart,
  Compass
} from 'lucide-react';

export default function PremiumCoupleOnboardingPage() {
  const router = useRouter();
  const { totalBudget } = useWeddingOS();

  // Onboarding Step State
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    partner1: 'Selin',
    partner2: 'Caner',
    weddingDate: '2026-08-15',
    city: 'İstanbul',
    guestCount: 300,
    budgetAmount: 350000,
    vibe: 'Sade & Lüks'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 2 | 3);
    } else {
      // OS Initialization Complete -> Redirect to Dashboard
      router.push('/cift/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col justify-between p-6 md:p-12">
      
      {/* Top Header */}
      <header className="max-w-[800px] mx-auto w-full flex justify-between items-center z-10">
        <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-[4px] rounded-full transition-all duration-500 ${
                s === step ? 'w-[32px] bg-[#111111]' : s < step ? 'w-[12px] bg-[#7C5CFF]' : 'w-[12px] bg-[rgba(0,0,0,0.1)]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Setup Canvas */}
      <main className="max-w-[640px] mx-auto w-full my-auto py-12 animate-in fade-in duration-500">
        
        {/* STEP 1: Names & Date */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(0,0,0,0.06)] text-[12px] font-medium text-[#666666] mb-4 shadow-sm">
                <Heart className="w-3.5 h-3.5 text-[#7C5CFF] fill-current" /> Adım 1 / 3
              </span>
              <h1 className="text-[36px] md:text-[44px] font-medium tracking-tight text-[#111111] leading-[1.1]">
                Düğün İşletim Sisteminize <br /> Hoş Geldiniz.
              </h1>
              <p className="text-[16px] text-[#666666] mt-3">
                Sizi ve müstakbel eşinizi tanıyalım.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Sizin Adınız</label>
                  <input 
                    type="text" 
                    value={formData.partner1}
                    onChange={(e) => setFormData({...formData, partner1: e.target.value})}
                    className="w-full h-[52px] px-4 bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] text-[15px] font-medium text-[#111111] outline-none focus:border-[#7C5CFF] focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Eşinizin Adı</label>
                  <input 
                    type="text" 
                    value={formData.partner2}
                    onChange={(e) => setFormData({...formData, partner2: e.target.value})}
                    className="w-full h-[52px] px-4 bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] text-[15px] font-medium text-[#111111] outline-none focus:border-[#7C5CFF] focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Tahmini Düğün Tarihi</label>
                  <input 
                    type="date" 
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
                    className="w-full h-[52px] px-4 bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] text-[15px] font-medium text-[#111111] outline-none focus:border-[#7C5CFF] focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Şehir</label>
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full h-[52px] px-4 bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] text-[15px] font-medium text-[#111111] outline-none focus:border-[#7C5CFF] focus:ring-4 focus:ring-[#7C5CFF]/10 transition-all shadow-sm"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Budget & Capacity */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(0,0,0,0.06)] text-[12px] font-medium text-[#666666] mb-4 shadow-sm">
                <Wallet className="w-3.5 h-3.5 text-[#7C5CFF]" /> Adım 2 / 3
              </span>
              <h1 className="text-[36px] md:text-[44px] font-medium tracking-tight text-[#111111] leading-[1.1]">
                Finansal Çerçeve & Kapasite
              </h1>
              <p className="text-[16px] text-[#666666] mt-3">
                WedyAI, bu rakamlara göre harcama dağılımınızı otomatik yapacak.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.08)] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] font-medium text-[#111111]">Hedef Bütçeniz</label>
                  <span className="text-[24px] font-medium text-[#7C5CFF]">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(formData.budgetAmount)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={100000} 
                  max={2000000} 
                  step={25000}
                  value={formData.budgetAmount}
                  onChange={(e) => setFormData({...formData, budgetAmount: Number(e.target.value)})}
                  className="w-full accent-[#7C5CFF] h-2 bg-[#F8F8F7] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[12px] text-[#999999]">
                  <span>100.000 ₺</span>
                  <span>2.000.000 ₺+</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.08)] shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] font-medium text-[#111111]">Tahmini Davetli Sayısı</label>
                  <span className="text-[24px] font-medium text-[#111111]">{formData.guestCount} Kişi</span>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={1000} 
                  step={25}
                  value={formData.guestCount}
                  onChange={(e) => setFormData({...formData, guestCount: Number(e.target.value)})}
                  className="w-full accent-[#111111] h-2 bg-[#F8F8F7] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Vibe & AI Allocation */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(0,0,0,0.06)] text-[12px] font-medium text-[#666666] mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" /> Adım 3 / 3
              </span>
              <h1 className="text-[36px] md:text-[44px] font-medium tracking-tight text-[#111111] leading-[1.1]">
                Hayalinizdeki Konsept
              </h1>
              <p className="text-[16px] text-[#666666] mt-3">
                WedyAI size en uygun mekan ve tedarikçileri filtrelesin.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Sade & Lüks', desc: 'Sessiz şıklık, minimalist detaylar', icon: '✨' },
                { title: 'Kır & Botanik', desc: 'Doğal dokular, açık hava', icon: '🌿' },
                { title: 'Balo Salonu', desc: 'Görkemli, klasik zarafet', icon: '🏰' },
                { title: 'Bohem & Modern', desc: 'Özgür ruhlu, samimi atmosfer', icon: '🌅' },
              ].map((vibe, i) => (
                <div 
                  key={i}
                  onClick={() => setFormData({...formData, vibe: vibe.title})}
                  className={`p-5 rounded-[24px] border cursor-pointer transition-all duration-300 ${
                    formData.vibe === vibe.title 
                      ? 'bg-white border-[#7C5CFF] shadow-[0_8px_24px_rgba(124,92,255,0.12)] ring-2 ring-[#7C5CFF]/20' 
                      : 'bg-white border-[rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.12)]'
                  }`}
                >
                  <span className="text-[28px] block mb-2">{vibe.icon}</span>
                  <h3 className="text-[16px] font-medium text-[#111111]">{vibe.title}</h3>
                  <p className="text-[12px] text-[#666666] mt-1">{vibe.desc}</p>
                </div>
              ))}
            </div>

            {/* AI Auto Allocation Card */}
            <div className="p-5 bg-[#111111] text-white rounded-[24px] space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#7C5CFF] text-[12px] font-medium uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> WedyAI Otomatik Hazırlık
              </div>
              <p className="text-[13px] text-white/80 leading-relaxed">
                Kurulum tamamlandığında Bütçe, Kontrol Listesi ve Davetli Paneli <strong>{formData.budgetAmount.toLocaleString('tr-TR')} ₺</strong> bütçenize göre otomatik dağıtılacak.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Footer Actions */}
      <footer className="max-w-[800px] mx-auto w-full flex justify-between items-center z-10 pt-6 border-t border-[rgba(0,0,0,0.06)]">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Geri
          </button>
        ) : <div />}

        <button 
          onClick={handleNext}
          className="h-[56px] px-8 bg-[#111111] hover:bg-[#333333] text-white font-medium text-[15px] rounded-[18px] transition-all shadow-sm flex items-center gap-2"
        >
          {step === 3 ? 'İşletim Sistemini Başlat' : 'Devam Et'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}