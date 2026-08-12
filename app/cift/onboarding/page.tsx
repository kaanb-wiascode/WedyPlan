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
      router.push('/cift/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans antialiased flex flex-col justify-between p-6 md:p-12">
      
      {/* Top Header */}
      <header className="max-w-[800px] mx-auto w-full flex justify-between items-center z-10">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">WedyPlan.</Link>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-[4px] rounded-full transition-all duration-500 ${
                s === step ? 'w-[32px] bg-zinc-900 dark:bg-white' : s < step ? 'w-[12px] bg-zinc-500' : 'w-[12px] bg-zinc-200 dark:bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Setup Canvas (Frosted Glass) */}
      <main className="max-w-[640px] mx-auto w-full my-auto py-12 animate-in fade-in duration-500">
        
        {/* STEP 1: Names & Date */}
        {step === 1 && (
          <div className="p-8 sm:p-10 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200/60 dark:bg-zinc-800/80 rounded-full border border-zinc-300/40 dark:border-zinc-700/50 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                <Heart className="w-3.5 h-3.5 text-zinc-500 fill-zinc-500" /> Adım 1 / 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Düğün İşletim Sisteminize <br /> Hoş Geldiniz.
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Sizi ve müstakbel eşinizi tanıyalım.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Sizin Adınız</label>
                  <input 
                    type="text" 
                    value={formData.partner1}
                    onChange={(e) => setFormData({...formData, partner1: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Eşinizin Adı</label>
                  <input 
                    type="text" 
                    value={formData.partner2}
                    onChange={(e) => setFormData({...formData, partner2: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tahmini Düğün Tarihi</label>
                  <input 
                    type="date" 
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({...formData, weddingDate: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Şehir</label>
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium cursor-pointer"
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
          <div className="p-8 sm:p-10 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200/60 dark:bg-zinc-800/80 rounded-full border border-zinc-300/40 dark:border-zinc-700/50 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                <Wallet className="w-3.5 h-3.5 text-zinc-500" /> Adım 2 / 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Finansal Çerçeve & Kapasite
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                WedyAI, bu rakamlara göre harcama dağılımınızı otomatik yapacak.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Hedef Bütçeniz</label>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">
                    ₺{formData.budgetAmount.toLocaleString('tr-TR')}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={100000} 
                  max={2000000} 
                  step={25000}
                  value={formData.budgetAmount}
                  onChange={(e) => setFormData({...formData, budgetAmount: Number(e.target.value)})}
                  className="w-full accent-zinc-900 dark:accent-white h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                  <span>₺100.000</span>
                  <span>₺2.000.000+</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tahmini Davetli Sayısı</label>
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">{formData.guestCount} Kişi</span>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={1000} 
                  step={25}
                  value={formData.guestCount}
                  onChange={(e) => setFormData({...formData, guestCount: Number(e.target.value)})}
                  className="w-full accent-zinc-900 dark:accent-white h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Vibe & AI Allocation */}
        {step === 3 && (
          <div className="p-8 sm:p-10 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200/60 dark:bg-zinc-800/80 rounded-full border border-zinc-300/40 dark:border-zinc-700/50 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Adım 3 / 3
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                Hayalinizdeki Konsept
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
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
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    formData.vibe === vibe.title 
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-xs' 
                      : 'bg-zinc-50/80 dark:bg-zinc-800/40 border-zinc-200/80 dark:border-zinc-700/60 hover:bg-zinc-100/80'
                  }`}
                >
                  <span className="text-2xl block mb-2">{vibe.icon}</span>
                  <h3 className="text-sm font-bold">{vibe.title}</h3>
                  <p className={`text-[11px] mt-1 ${formData.vibe === vibe.title ? 'opacity-80' : 'text-zinc-500 dark:text-zinc-400'}`}>{vibe.desc}</p>
                </div>
              ))}
            </div>

            {/* AI Auto Allocation Card */}
            <div className="p-5 bg-zinc-900 text-white dark:bg-zinc-800 rounded-2xl space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-zinc-400" /> WedyAI Otomatik Hazırlık
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                Kurulum tamamlandığında Bütçe, Kontrol Listesi ve Davetli Paneli <strong>₺{formData.budgetAmount.toLocaleString('tr-TR')}</strong> bütçenize göre otomatik dağıtılacak.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Footer Actions */}
      <footer className="max-w-[800px] mx-auto w-full flex justify-between items-center z-10 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Geri
          </button>
        ) : <div />}

        <button 
          onClick={handleNext}
          className="h-12 px-6 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs rounded-xl hover:bg-black dark:hover:bg-zinc-200 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <span>{step === 3 ? 'İşletim Sistemini Başlat' : 'Devam Et'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}