'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, Camera, MapPin, Calendar, Sparkles, ChevronRight, Play, Eye, Share2
} from 'lucide-react';

export default function RealWeddingsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tüm Hikayeler' },
    { id: 'kir', label: 'Kır Düğünleri' },
    { id: 'otel', label: 'Otel & Salon' },
    { id: 'tarihi', label: 'Tarihi Mekan & Yalı' },
    { id: 'sahil', label: 'Kumsal & Sahil' }
  ];

  const stories = [
    {
      id: 'selin-kaan-beykoz',
      couple: 'Selin & Kaan',
      title: 'Beykoz Ormanlarında Rüya Gibi Bir Kır Düğünü',
      category: 'kir',
      date: 'Haziran 2026',
      location: 'Beykoz Secret Garden',
      photographer: 'Serafina Fine Art',
      views: 1240,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      description: 'Doğanın kalbinde, rustik detaylar ve pampas otlarıyla süslenmiş, samimi ve bol danslı bir yaz düğünü.'
    },
    {
      id: 'merve-berk-yali',
      couple: 'Merve & Berk',
      title: 'Boğazın İncisi: Bosphorus Palace’ta İhtişamlı Gece',
      category: 'tarihi',
      date: 'Temmuz 2026',
      location: 'Bosphorus Palace Hotel',
      photographer: 'Istanbul Wedding Story',
      views: 2150,
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
      description: 'Tarihi dokunun modern lüksle buluştuğu, 400 kişilik unutulmaz bir yalı düğünü.'
    },
    {
      id: 'ayse-can-kumsal',
      couple: 'Ayşe & Can',
      title: 'Gün Batımında Romantik Kumsal Nikahı',
      category: 'sahil',
      date: 'Ağustos 2026',
      location: 'Bodrum Palmarina Beach',
      photographer: 'Sunset Visuals',
      views: 1890,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: 'Deniz dalgalarının sesi eşliğinde, bohem tarzda tasarlanmış samimi bir sahil organizasyonu.'
    },
    {
      id: 'ceren-murat-otel',
      couple: 'Ceren & Murat',
      title: 'Şehrin Merkezinde Modern ve Lüks Bir Kutlama',
      category: 'otel',
      date: 'Eylül 2026',
      location: 'Raffles İstanbul',
      photographer: 'Serafina Fine Art',
      views: 3100,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      description: 'Kristal avizeler ve beyaz güllerle dekore edilmiş devasa balo salonunda kusursuz bir otel düğünü.'
    }
  ];

  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(s => s.category === activeCategory);

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
            <Link href="/ilham" className="hover:text-[#111] transition-colors">İlham & Blog</Link>
            <Link href="/gercek-dugunler" className="text-[#111] font-bold">Gerçek Düğünler</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold ml-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] transition-all">
              Düğününü Planla
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 Hero Section */}
      <section className="bg-[#F7F7F3] border-b border-black/[0.05] py-14">
        <div className="max-w-[1300px] mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 rounded-full text-[11px] font-medium text-[#111]">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> İlham Verici Hikayeler
          </div>
          <h1 className="text-[38px] md:text-[52px] font-serif font-normal text-[#111] leading-tight">
            Gerçek Çiftler, <br /> Gerçek Düğün Hikayeleri
          </h1>
          <p className="text-[15px] text-[#666] font-light max-w-[600px] mx-auto">
            Platformumuz üzerinden mekan ve tedarikçi seçen çiftlerimizin rüya gibi geçen düğün günlerine tanıklık edin ve kendi konseptiniz için ilham alın.
          </p>
        </div>
      </section>

      {/* 🏰 Hikayeler ve Kategori Filtresi */}
      <main className="max-w-[1300px] mx-auto px-6 pt-10 space-y-8">
        
        {/* Kategori Çipleri */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all shrink-0 ${
                activeCategory === c.id 
                  ? 'bg-[#111111] text-white shadow-md' 
                  : 'bg-white text-[#555] border border-black/10 hover:border-black/30 hover:text-[#111]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Hikayeler Grid (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-6">
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white border border-black/[0.08] rounded-[32px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group flex flex-col"
            >
              {/* Görsel Alanı */}
              <div className="relative h-[340px] w-full overflow-hidden bg-black/5">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#111] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {story.couple}
                </span>
                
                {/* Tedarikçi Etiketleri Hover Durumunda Görünür */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>

              {/* İçerik */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-[#777] font-mono uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {story.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {story.views} Okunma</span>
                  </div>
                  
                  <h3 className="font-serif text-[24px] font-medium text-[#111] leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {story.title}
                  </h3>
                  
                  <p className="text-[13px] text-[#666] leading-relaxed mt-2 line-clamp-2">
                    {story.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 space-y-2">
                  <div className="flex items-center gap-2 text-[12px] text-[#555]">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-semibold text-[#111]">Mekan:</span>
                    <span>{story.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] text-[#555]">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-semibold text-[#111]">Fotoğraf:</span>
                      <Link href="/firmalar" className="hover:underline">{story.photographer}</Link>
                    </div>

                    <Link href="/cift/ai-asistan" className="text-[#111] hover:text-[#D4AF37] transition-colors">
                      <Share2 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🤖 WEDYAI KONSEPT ÜRETİCİ BANNERI */}
        <div className="bg-[#111111] text-white p-8 rounded-[32px] my-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Kendi Hikayeni Yarat
            </div>
            <h3 className="text-[24px] font-serif">Beğendiğiniz bir düğün mü var?</h3>
            <p className="text-[13px] text-white/70 font-light max-w-[500px]">
              Tarzını beğendiğiniz düğünü WedyAI'a söyleyin, o konsepte ve sizin bütçenize uygun mekan/tedarikçi listesini anında çıkarsın.
            </p>
          </div>

          <Link href="/cift/ai-asistan" className="z-10 shrink-0">
            <button className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#b8952b] text-[#111111] font-medium text-[13px] rounded-full transition-all flex items-center gap-2 shadow-lg">
              <span>WedyAI ile Konsept Tasarla</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </main>

    </div>
  );
}