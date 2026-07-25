'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Heart, Palette, Camera, Eye, Share2, Bookmark, ChevronRight, Compass
} from 'lucide-react';

export default function InspirationAndTrendsPage() {
  const [selectedTag, setSelectedTag] = useState('all');

  const inspirationBoards = [
    {
      id: '1',
      title: 'Bohem & Rustik Orman Düğün Konsepti',
      category: 'Konsept & Süsleme',
      colors: ['#8B4513', '#D2B48C', '#F5DEB3', '#556B2F'],
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      likes: 1420
    },
    {
      id: '2',
      title: '2026 Minimalist Gelin Saçı & Makyaj Trendleri',
      category: 'Güzellik & Saç',
      colors: ['#FFF0F5', '#FFE4E1', '#E6E6FA', '#111111'],
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      likes: 980
    },
    {
      id: '3',
      title: 'Boğaz Yalısında Gece Işıkları ve Kristal Masa Düzeni',
      category: 'Masa & Dekor',
      colors: ['#000080', '#C0C0C0', '#FFFFFF', '#D4AF37'],
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      likes: 2150
    },
    {
      id: '4',
      title: 'Dış Çekim İçin Doğal Işık & Gün Batımı Fotoğrafları',
      category: 'Fotoğrafçılık',
      colors: ['#FF7F50', '#FFD700', '#4682B4', '#2F4F4F'],
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      likes: 1840
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
            <Link href="/ilham" className="text-[#111] font-bold">İlham Panosu</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] transition-all">
              Bize Özel Konsept Tasarla
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 Hero Header */}
      <section className="bg-[#F7F7F3] border-b border-black/[0.05] py-12">
        <div className="max-w-[1300px] mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 rounded-full text-[11px] font-medium text-[#111]">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" /> 2026 Düğün Trendleri & Görsel İlham Panoları
          </div>
          <h1 className="text-[38px] md:text-[52px] font-serif font-normal text-[#111]">
            Hayalinizdeki Düğün İçin İlham Alın
          </h1>
          <p className="text-[15px] text-[#666] font-light max-w-[600px] mx-auto">
            Renk paletleri, masa düzeni fikirleri ve gelinlik trendleri arasından tarzınızı keşfedin.
          </p>
        </div>
      </section>

      {/* 🎨 Pinterest-Style Visual Board Grid */}
      <main className="max-w-[1300px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inspirationBoards.map((b) => (
            <div 
              key={b.id}
              className="bg-white border border-black/10 rounded-[32px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group"
            >
              <div className="relative h-[320px] w-full overflow-hidden bg-black/10">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#111] hover:bg-white transition-colors shadow-md">
                  <Bookmark className="w-4 h-4" />
                </button>
                <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  {b.category}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-serif text-[22px] font-medium text-[#111] leading-tight group-hover:text-[#D4AF37] transition-colors">
                  {b.title}
                </h3>

                {/* Renk Paleti Önizleme */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888] flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-[#D4AF37]" /> Konsept Renk Paleti
                  </span>
                  <div className="flex h-8 w-full rounded-xl overflow-hidden shadow-inner">
                    {b.colors.map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[12px] text-[#666]">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-red-500 fill-red-500" /> {b.likes} Kaydetme</span>
                  
                  <Link href="/cift/ai-asistan" className="text-[#111] font-bold flex items-center gap-1 hover:underline">
                    <span>WedyAI ile Bu Temayı Tasarla</span>
                    <ChevronRight className="w-4 h-4" />
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