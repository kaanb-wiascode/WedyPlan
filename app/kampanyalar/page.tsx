'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Percent, Sparkles, Clock, Tag, MapPin, Star, ChevronRight, PhoneCall, Filter, ShieldCheck
} from 'lucide-react';

export default function DealsAndCampaignsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const deals = [
    {
      id: '1',
      title: 'Erken Rezervasyonda %20 İndirim + Menü Tadımı',
      vendorName: 'Beykoz Secret Garden',
      category: 'Kır Düğünü',
      location: 'Beykoz, İstanbul',
      oldPrice: '1.500 TL',
      newPrice: '1.200 TL / Kişi',
      discountTag: '%20 İNDİRİM',
      expiresIn: '6 Gün Kaldı',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Boğaz Yalısında %15 Erken Yaz Fırsatı',
      vendorName: 'Bosphorus Palace Hotel',
      category: 'Lüks Otel & Yalı',
      location: 'Üsküdar, İstanbul',
      oldPrice: '3.000 TL',
      newPrice: '2.500 TL / Kişi',
      discountTag: '%15 İNDİRİM',
      expiresIn: '3 Gün Kaldı',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      title: 'Tüm Paketlerde Ücretsiz Drone Çekimi Hediye',
      vendorName: 'Serafina Fine Art',
      category: 'Düğün Fotoğrafçısı',
      location: 'Tüm Türkiye',
      oldPrice: '45.000 TL',
      newPrice: '35.000 TL Paket',
      discountTag: 'HEDİYE ÇEKİM',
      expiresIn: '12 Gün Kaldı',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '4',
      title: 'Özel Dikim Gelinliklerde %25 İndirim Paketi',
      vendorName: 'Nova Gelinlik Modaevi',
      category: 'Gelinlik & Tasarım',
      location: 'Nişantaşı, İstanbul',
      oldPrice: '60.000 TL',
      newPrice: '45.000 TL',
      discountTag: '%25 İNDİRİM',
      expiresIn: '5 Gün Kaldı',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1594992111196-857e504ce835?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/" className="hover:text-[#111] transition-colors">Ana Sayfa</Link>
            <Link href="/mekanlar" className="hover:text-[#111] transition-colors">Mekanlar</Link>
            <Link href="/kampanyalar" className="text-red-600 font-bold flex items-center gap-1"><Percent className="w-4 h-4" /> Fırsatlar</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] transition-all">
              Tüm Fırsatları Sor
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 Hero Banner */}
      <section className="bg-[#FFF5F5] border-b border-red-100 py-12">
        <div className="max-w-[1300px] mx-auto px-6 space-y-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-[600px]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" /> Sınırlı Süreli Kampanyalar
            </div>
            <h1 className="text-[36px] md:text-[46px] font-serif font-normal text-[#111] leading-tight">
              Erken Rezervasyon & Özel Düğün Fırsatları
            </h1>
            <p className="text-[14px] text-[#666] font-light">
              Onaylı VIP mekanlar ve profesyonel tedarikçilerden dönemsel indirimleri yakalayın.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-red-100 shadow-md text-center shrink-0">
            <span className="text-[12px] text-[#777] uppercase font-bold block mb-1">Ortalama Çift Tasarrufu</span>
            <span className="text-[32px] font-bold font-mono text-red-600">45.000 ₺</span>
          </div>
        </div>
      </section>

      {/* 🏰 Kampanya Grid */}
      <main className="max-w-[1300px] mx-auto px-6 pt-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((d) => (
            <div 
              key={d.id}
              className="bg-white border border-black/10 rounded-[32px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group flex flex-col sm:flex-row"
            >
              <div className="relative sm:w-[220px] h-[200px] sm:h-auto shrink-0 bg-black/10">
                <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {d.discountTag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#777] mb-1">
                    <span className="uppercase font-semibold text-[#111]">{d.category}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-600"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {d.rating}</span>
                  </div>
                  <h3 className="font-serif text-[18px] font-medium text-[#111] leading-snug group-hover:text-red-600 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-[12px] text-[#666] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" /> {d.vendorName} • {d.location}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#999] line-through block">{d.oldPrice}</span>
                    <span className="text-[16px] font-bold text-red-600">{d.newPrice}</span>
                  </div>

                  <Link href="/cift/ai-asistan">
                    <button className="px-4 py-2 bg-[#111] hover:bg-[#333] text-white rounded-full text-[12px] font-medium transition-all flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-[#D4AF37]" /> Fırsatı Yakala
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}