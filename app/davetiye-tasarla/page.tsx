'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Type, 
  Share2, 
  ChevronLeft, 
  Check, 
  Sparkles,
  Download
} from 'lucide-react';

export default function PremiumInvitationStudioPage() {
  const [coupleNames, setCoupleNames] = useState('Selin & Caner');
  const [dateText, setDateText] = useState('15 AĞUSTOS 2026');
  const [venueText, setVenueText] = useState('Bosphorus Palace, İstanbul');
  const [selectedTheme, setSelectedTheme] = useState('classic');

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col">
      
      {/* Studio Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)] shrink-0">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Çıkış
          </Link>
          
          <span className="text-[16px] font-medium text-[#111111]">Davetiye Tasarım Stüdyosu</span>

          <div className="flex items-center gap-3">
            <button className="h-[40px] px-4 bg-[#F8F8F7] hover:bg-[#F0F0EF] text-[#111111] rounded-[12px] text-[13px] font-medium flex items-center gap-1.5 transition-colors">
              <Download className="w-4 h-4" /> İndir
            </button>
            <button className="h-[40px] px-5 bg-[#111111] hover:bg-[#333333] text-white rounded-[12px] text-[13px] font-medium flex items-center gap-1.5 transition-colors shadow-sm">
              <Share2 className="w-4 h-4" /> Yayınla
            </button>
          </div>
        </div>
      </nav>

      {/* Main Studio Grid */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            
            <div>
              <h2 className="text-[16px] font-medium text-[#111111] mb-4">Tema Seçimi</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'classic', label: 'Sade Minimal' },
                  { id: 'modern', label: 'Derin Siyah' },
                  { id: 'botanical', label: 'Lüks Lavanta' },
                ].map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-[14px] border text-[13px] font-medium text-center transition-all ${
                      selectedTheme === theme.id 
                        ? 'border-[#7C5CFF] bg-[#7C5CFF]/5 text-[#7C5CFF]' 
                        : 'border-[rgba(0,0,0,0.06)] bg-[#F8F8F7] text-[#666666]'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-[rgba(0,0,0,0.04)]">
              <h2 className="text-[16px] font-medium text-[#111111]">Metin Detayları</h2>
              
              <div>
                <label className="block text-[13px] font-medium text-[#666666] mb-1.5">Çift İsimleri</label>
                <input 
                  type="text" 
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#666666] mb-1.5">Tarih Metni</label>
                <input 
                  type="text" 
                  value={dateText}
                  onChange={(e) => setDateText(e.target.value)}
                  className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#666666] mb-1.5">Mekan Bilgisi</label>
                <input 
                  type="text" 
                  value={venueText}
                  onChange={(e) => setVenueText(e.target.value)}
                  className="w-full h-[48px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Canvas / Preview (7 Columns) */}
        <div className="lg:col-span-7 flex justify-center items-center p-8 bg-[#F8F8F7] rounded-[32px] border border-[rgba(0,0,0,0.04)] min-h-[500px]">
          
          {/* Card Preview */}
          <div className={`w-full max-w-[380px] aspect-[3/4] rounded-[28px] p-10 flex flex-col justify-between items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 ${
            selectedTheme === 'modern' ? 'bg-[#111111] text-white' : 
            selectedTheme === 'botanical' ? 'bg-[#FAF8FF] border border-[#7C5CFF]/20 text-[#111111]' : 
            'bg-white text-[#111111] border border-[rgba(0,0,0,0.06)]'
          }`}>
            <div className="space-y-2 pt-6">
              <span className="text-[12px] tracking-[0.2em] font-medium uppercase opacity-60">EVLENİYORUZ</span>
              <div className="w-8 h-[1px] bg-current opacity-20 mx-auto my-3"></div>
            </div>

            <div className="space-y-4 my-auto">
              <h1 className="text-[36px] font-serif font-normal tracking-tight leading-tight">
                {coupleNames}
              </h1>
              <p className="text-[13px] tracking-widest font-medium opacity-80 uppercase">
                {dateText}
              </p>
            </div>

            <div className="space-y-1 pb-6">
              <p className="text-[14px] font-medium opacity-90">{venueText}</p>
              <span className="text-[11px] opacity-50 block">Detaylar ve LCV için dokunun</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}