'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Heart, ArrowRight } from 'lucide-react';

export default function PremiumCoupleWebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white">
      
      {/* Editorial Hero */}
      <section className="min-h-screen flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        <div className="flex justify-between items-center z-10">
          <span className="text-[14px] font-medium tracking-widest uppercase text-[#666666]">WEDDING INVITATION</span>
          <span className="text-[14px] font-medium text-[#111111]">15.08.2026</span>
        </div>

        <div className="my-auto max-w-[900px] mx-auto text-center space-y-6 z-10 pt-12">
          <span className="text-[13px] tracking-[0.3em] uppercase text-[#666666] font-medium block">
            BİRLİKTE KUTLAMAYA DAVETLİSİNİZ
          </span>
          <h1 className="text-[64px] md:text-[96px] font-medium tracking-tight leading-[0.95] text-[#111111]">
            Selin & Caner
          </h1>
          <p className="text-[18px] md:text-[22px] text-[#666666] font-normal max-w-[500px] mx-auto pt-2">
            Hayatımızın en özel gününü sevdiklerimizle paylaşmak için sabırsızlanıyoruz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-[rgba(0,0,0,0.06)] z-10">
          <div className="flex items-center gap-2 text-[15px] text-[#666666]">
            <MapPin className="w-4 h-4 text-[#7C5CFF]" />
            <span>Bosphorus Palace, İstanbul</span>
          </div>

          <Link 
            href={`/lcv/1`}
            className="h-[52px] px-8 bg-[#111111] text-white rounded-[16px] text-[15px] font-medium flex items-center gap-2 hover:bg-[#333333] transition-colors"
          >
            Katılım Durumu (LCV) Bildir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Editorial Photo Showcase */}
      <section className="px-6 pb-24 max-w-[1200px] mx-auto">
        <div className="aspect-[16/9] rounded-[32px] overflow-hidden bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)]">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1600" 
            alt="Selin & Caner" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

    </div>
  );
}