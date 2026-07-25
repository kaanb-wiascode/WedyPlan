'use client';

import React from 'react';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

export default function PremiumB2BPackagesPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      
      <header className="text-center max-w-[600px] mx-auto mt-8">
        <h1 className="text-[36px] md:text-[48px] font-medium tracking-tight text-[#111111] leading-[1.1]">
          İşinizi bir sonraki <br/> seviyeye taşıyın.
        </h1>
        <p className="text-[16px] text-[#666666] mt-4">
          Gelen talepleri katlamak ve şehrin lider markası olmak için doğru planı seçin.
        </p>
      </header>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
        
        {/* Basic */}
        <div className="bg-[#F8F8F7] p-8 rounded-[32px] border border-[rgba(0,0,0,0.04)] flex flex-col">
          <h3 className="text-[18px] font-medium text-[#111111]">Standart</h3>
          <div className="mt-4 mb-8">
            <span className="text-[36px] font-medium tracking-tight text-[#111111]">0 TL</span>
            <span className="text-[14px] text-[#999999]"> / ay</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {['Temel Firma Profili', 'Aylık 5 Ücretsiz Teklif', 'Standart Sıralama'].map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666]">
                <Check className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full h-[48px] rounded-[14px] text-[14px] font-medium bg-white border border-[rgba(0,0,0,0.08)] text-[#111111] hover:bg-[#F0F0EF] transition-colors">
            Mevcut Plan
          </button>
        </div>

        {/* Pro / Gold (Dark Apple Style) */}
        <div className="bg-[#111111] p-8 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex flex-col relative overflow-hidden transform md:-translate-y-4">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#7C5CFF] opacity-30 blur-[80px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-medium text-white">Gold Ortak</h3>
              <span className="px-2.5 py-1 bg-[#7C5CFF]/20 text-[#7C5CFF] text-[11px] font-medium rounded-full uppercase tracking-wider">
                Popüler
              </span>
            </div>
            <div className="mb-8">
              <span className="text-[36px] font-medium tracking-tight text-white">1.490 TL</span>
              <span className="text-[14px] text-white/50"> / ay</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Sınırsız Fotoğraf Galerisi', 'Sınırsız Randevu Alımı', 'WhatsApp İletişim Butonu', 'Rekabet Analitiği'].map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-white/80">
                  <Check className="w-4 h-4 text-[#7C5CFF] shrink-0 mt-0.5" /> {feat}
                </li>
              ))}
            </ul>
            <button className="w-full h-[48px] rounded-[14px] text-[14px] font-medium bg-[#7C5CFF] hover:bg-[#6A4FE0] text-white transition-colors shadow-[0_4px_20px_rgba(124,92,255,0.3)]">
              Gold'a Yükselt
            </button>
          </div>
        </div>

        {/* Platinum */}
        <div className="bg-[#F8F8F7] p-8 rounded-[32px] border border-[rgba(0,0,0,0.04)] flex flex-col">
          <h3 className="text-[18px] font-medium text-[#111111]">Platinum</h3>
          <div className="mt-4 mb-8">
            <span className="text-[36px] font-medium tracking-tight text-[#111111]">2.990 TL</span>
            <span className="text-[14px] text-[#999999]"> / ay</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {['Gold Paketteki Tüm Özellikler', 'İlk 3 Sıra Garantisi', 'Sponsorlu İlan Rozeti', 'Özel Müşteri Temsilcisi'].map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-[#666666]">
                <Check className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full h-[48px] rounded-[14px] text-[14px] font-medium bg-white border border-[rgba(0,0,0,0.08)] text-[#111111] hover:bg-[#F0F0EF] transition-colors">
            İletişime Geç
          </button>
        </div>

      </div>
    </div>
  );
}