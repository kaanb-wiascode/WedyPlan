'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Check, Heart } from 'lucide-react';

export default function PremiumRSVPPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex items-center justify-center p-6">
      
      <div className="w-full max-w-[480px] bg-white rounded-[32px] border border-[rgba(0,0,0,0.06)] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center space-y-8">
        
        <div>
          <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#666666] block mb-2">KATILIM DURUMU (LCV)</span>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">Selin & Caner</h1>
          <p className="text-[14px] text-[#666666] mt-2">15 Ağustos 2026 • Bosphorus Palace, İstanbul</p>
        </div>

        {submitted ? (
          <div className="py-8 space-y-3">
            <div className="w-12 h-12 bg-[#1DB954]/10 text-[#1DB954] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-[20px] font-medium text-[#111111]">Yanıtınız Kaydedildi</h3>
            <p className="text-[14px] text-[#666666]">Katılım bilginiz çiftimize başarıyla iletildi. Teşekkür ederiz!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Adınız Soyadınız</label>
              <input 
                type="text" 
                required
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1.5">Katılım Durumunuz</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`h-[48px] rounded-[14px] text-[14px] font-medium border transition-all ${
                    attending === 'yes' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[rgba(0,0,0,0.06)] bg-[#F8F8F7] text-[#666666]'
                  }`}
                >
                  Katılıyorum
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`h-[48px] rounded-[14px] text-[14px] font-medium border transition-all ${
                    attending === 'no' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[rgba(0,0,0,0.06)] bg-[#F8F8F7] text-[#666666]'
                  }`}
                >
                  Katılamıyorum
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-[52px] bg-[#7C5CFF] hover:bg-[#6A4FE0] text-white font-medium text-[15px] rounded-[16px] transition-colors shadow-sm pt-0.5"
            >
              Yanıtı Gönder
            </button>
          </form>
        )}

      </div>

    </div>
  );
}