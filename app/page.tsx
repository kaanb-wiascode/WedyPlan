'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Calendar, Users, SlidersHorizontal, Star, Building2, 
  Sparkles, ArrowRight, ShieldCheck, Camera, Music, Shirt, Heart, 
  CheckCircle2, ChevronRight, PhoneCall
} from 'lucide-react';

export default function WedyPlanMarketplaceHome() {
  // Arama Filtre State'leri
  const [selectedCity, setSelectedCity] = useState('istanbul');
  const [selectedCategory, setSelectedCategory] = useState('kir-dugunu');
  const [guestCount, setGuestCount] = useState('200-300');

  // Popüler Kategoriler
  const categories = [
    { id: 'kir-dugunu', label: 'Kır Düğünü', icon: Building2, count: '142 Mekan' },
    { id: 'otel', label: 'Lüks Oteller', icon: Building2, count: '86 Mekan' },
    { id: 'fotograf', label: 'Düğün Fotoğrafçısı', icon: Camera, count: '210 Firma' },
    { id: 'gelinlik', label: 'Gelinlik & Modaevi', icon: Shirt, count: '95 Mağaza' },
    { id: 'muzik', label: 'Müzik & Orkestra', icon: Music, count: '120 Sanatçı' },
    { id: 'organizasyon', label: 'Organizasyon', icon: Heart, count: '115 Firma' },
  ];

  // Öne Çıkan Örnek VIP Mekanlar & Tedarikçiler
  const featuredVendors = [
    {
      id: '1',
      name: 'Beykoz Kır Bahçesi & Event',
      category: 'Kır Düğünü',
      location: 'Beykoz, İstanbul',
      rating: 4.9,
      reviewsCount: 48,
      capacity: '200 - 750 Kişi',
      priceStarting: '1.200 TL / Kişi',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      isVip: true,
      tags: ['Doğa Manzaralı', 'Alkollü/Alkolsüz', 'Otopark Var']
    },
    {
      id: '2',
      name: 'Bosphorus Palace Hotel',
      category: 'Lüks Otel & Yalı',
      location: 'Üsküdar, İstanbul',
      rating: 5.0,
      reviewsCount: 62,
      capacity: '100 - 400 Kişi',
      priceStarting: '2.500 TL / Kişi',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80',
      isVip: true,
      tags: ['Deniz Sıfır', 'Tarihi Mekan', 'Valet Hizmeti']
    },
    {
      id: '3',
      name: 'Serafina Fine Art Weddings',
      category: 'Düğün Fotoğrafçısı',
      location: 'Karaköy, İstanbul',
      rating: 4.8,
      reviewsCount: 31,
      capacity: 'Tüm Türkiye',
      priceStarting: '35.000 TL Paket',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      isVip: false,
      tags: ['Drone Çekimi', 'Hikaye Klipi', 'Yurtdışı Çekim']
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
      
      {/* 📍 Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#111111]">WedyPlan<span className="text-[#D4AF37]">.</span></span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-black text-white px-2 py-0.5 rounded-full">Marketplace</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#444444]">
            <Link href="/mekanlar" className="hover:text-[#111111] transition-colors">Düğün Mekanları</Link>
            <Link href="/firmalar" className="hover:text-[#111111] transition-colors">Tedarikçiler</Link>
            <Link href="/ilham" className="hover:text-[#111111] transition-colors">İlham Panosu</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111111] font-semibold hover:opacity-80 transition-opacity">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>WedyAI Concierge</span>
            </Link>
          </nav>

          {/* User & Vendor Access CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/firma/ai-asistan" className="hidden sm:inline-flex text-[13px] font-medium px-4 py-2.5 rounded-full border border-black/10 hover:border-black transition-all">
              Firma Girişi / İlan Ver
            </Link>
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333333] transition-all shadow-sm">
              Planlamaya Başla
            </Link>
          </div>

        </div>
      </header>

      {/* 🚀 Hero Section & Smart Search Engine */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-[#F7F7F3] to-[#FDFDFD] border-b border-black/[0.04]">
        <div className="max-w-[1240px] mx-auto px-6 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-black/[0.08] rounded-full text-[12px] font-medium text-[#111111] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Türkiye'nin En Prestijli Düğün & Mekan Portalı</span>
          </div>

          <h1 className="text-[42px] sm:text-[56px] md:text-[64px] font-serif font-normal tracking-tight leading-[1.1] max-w-[900px] mx-auto">
            Hayalinizdeki Düğün Mekanını ve Tedarikçileri Saniyeler İçinde Keşfedin.
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#666666] max-w-[640px] mx-auto font-light leading-relaxed">
            Şeffaf fiyatlar, doğrulanmış VIP mekanlar ve yapay zeka destekli doğrudan teklif alma sistemi.
          </p>

          {/* 🔍 SMART SEARCH BAR WIDGET */}
          <div className="bg-white p-4 md:p-5 rounded-[28px] border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] max-w-[980px] mx-auto text-left">
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              
              {/* 1. Şehir Seçimi */}
              <div className="space-y-1 px-3 border-r border-black/10 last:border-0">
                <label className="text-[11px] font-medium uppercase tracking-wider text-[#888888] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Şehir / Bölge
                </label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[#111111] outline-none cursor-pointer"
                >
                  <option value="istanbul">İstanbul (Tümü)</option>
                  <option value="istanbul-avrupa">İstanbul (Avrupa)</option>
                  <option value="istanbul-anadolu">İstanbul (Anadolu)</option>
                  <option value="izmir">İzmir</option>
                  <option value="ankara">Ankara</option>
                  <option value="bodrum">Muğla / Bodrum</option>
                </select>
              </div>

              {/* 2. Kategori Seçimi */}
              <div className="space-y-1 px-3 border-r border-black/10 last:border-0">
                <label className="text-[11px] font-medium uppercase tracking-wider text-[#888888] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Hizmet Kriteri
                </label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[#111111] outline-none cursor-pointer"
                >
                  <option value="kir-dugunu">Kır Düğünü Mekanı</option>
                  <option value="otel">Lüks Düğün Oteli</option>
                  <option value="fotograf">Düğün Fotoğrafçısı</option>
                  <option value="gelinlik">Gelinlik & Modaevi</option>
                  <option value="organizasyon">Organizasyon Firması</option>
                </select>
              </div>

              {/* 3. Davetli / Kişi Sayısı */}
              <div className="space-y-1 px-3 border-r border-black/10 last:border-0">
                <label className="text-[11px] font-medium uppercase tracking-wider text-[#888888] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Davetli Sayısı
                </label>
                <select 
                  value={guestCount} 
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-transparent text-[14px] font-medium text-[#111111] outline-none cursor-pointer"
                >
                  <option value="0-100">50 - 100 Kişi (Butik)</option>
                  <option value="100-250">100 - 250 Kişi</option>
                  <option value="250-500">250 - 500 Kişi (Standart)</option>
                  <option value="500+">500+ Kişi (Görkemli)</option>
                </select>
              </div>

              {/* Arama Butonu */}
              <div>
                <Link href={`/mekanlar?sehir=${selectedCity}&kategori=${selectedCategory}`}>
                  <button className="w-full h-[52px] bg-[#111111] hover:bg-[#222222] text-white rounded-[20px] font-medium text-[14px] flex items-center justify-center gap-2 transition-all shadow-md">
                    <Search className="w-4 h-4 text-[#D4AF37]" />
                    <span>Mekanları Listele</span>
                  </button>
                </Link>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* 🏷️ Quick Category Chips Nav */}
      <section className="py-12 max-w-[1240px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[26px] font-serif font-normal text-[#111111]">Popüler Kategoriler</h2>
            <p className="text-[14px] text-[#777777] font-light">İhtiyacınız olan hizmet grubunu seçerek hemen filtreleyin.</p>
          </div>
          <Link href="/mekanlar" className="text-[13px] font-medium text-[#111111] flex items-center gap-1 hover:underline">
            Tüm Kategoriler <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link 
                key={c.id} 
                href={`/mekanlar?kategori=${c.id}`}
                className="p-5 bg-white border border-black/[0.08] rounded-[22px] hover:border-[#111111] hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] transition-all group text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-[#F7F7F3] text-[#111111] group-hover:bg-[#111111] group-hover:text-[#D4AF37] flex items-center justify-center mx-auto transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#111111] group-hover:text-black">{c.label}</h3>
                  <span className="text-[11px] text-[#999999]">{c.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 🏰 VIP & Öne Çıkan Onaylı Firmalar / Mekanlar */}
      <section className="py-12 bg-[#FBFBF9] border-y border-black/[0.04]">
        <div className="max-w-[1240px] mx-auto px-6 space-y-8">
          
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>Onaylı VIP Portföy</span>
              </div>
              <h2 className="text-[32px] font-serif font-normal text-[#111111]">Öne Çıkan Mekan & Tedarikçiler</h2>
            </div>
            <Link href="/mekanlar" className="text-[13px] font-medium text-[#111111] flex items-center gap-1 hover:underline">
              Tüm 450+ Mekanı İncele <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVendors.map((v) => (
              <div 
                key={v.id} 
                className="bg-white border border-black/[0.08] rounded-[28px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Görsel / Fotoğraf */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-black/10">
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {v.isVip && (
                      <span className="absolute top-4 left-4 bg-[#111111] text-[#D4AF37] text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                        VIP Partner
                      </span>
                    )}
                    <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#111111] text-[12px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {v.priceStarting}
                    </span>
                  </div>

                  {/* Detay Bilgileri */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[12px] text-[#777777] mb-1">
                        <span>{v.category}</span>
                        <span className="flex items-center gap-1 font-bold text-[#111111]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {v.rating} ({v.reviewsCount})
                        </span>
                      </div>
                      <h3 className="text-[18px] font-serif font-medium text-[#111111] group-hover:text-[#D4AF37] transition-colors">
                        {v.name}
                      </h3>
                      <p className="text-[13px] text-[#666666] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        {v.location} • <span className="font-medium text-[#111111]">{v.capacity}</span>
                      </p>
                    </div>

                    {/* Etiketler */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {v.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-[#F4F4F0] text-[#555555] px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alt Aksiyon Butonu */}
                <div className="p-6 pt-0 border-t border-black/[0.04] mt-2">
                  <Link href={`/mekanlar/${v.id}`}>
                    <button className="w-full h-[46px] mt-4 bg-[#FBFBF9] hover:bg-[#111111] hover:text-white text-[#111111] border border-black/10 rounded-[16px] text-[13px] font-medium transition-all flex items-center justify-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Fiyat Teklifi Al</span>
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🤖 WedyAI Concierge Banner */}
      <section className="py-16 max-w-[1240px] mx-auto px-6">
        <div className="bg-[#111111] text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-[600px] z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[11px] text-[#D4AF37] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yapay Zeka Destekli Düğün Asistanı</span>
            </div>
            <h2 className="text-[32px] md:text-[40px] font-serif font-normal leading-tight">
              Bütçenize Uygun Mekanı Yapay Zekamıza Sordunuz mu?
            </h2>
            <p className="text-[14px] text-white/70 font-light leading-relaxed">
              WedyAI sizin bütçenizi, davetli sayınızı ve hayalinizdeki konsepti analiz eder; saniyeler içinde size özel fiyat teklifleri ve mekan eşleştirmeleri sunar.
            </p>
            <div className="pt-2">
              <Link href="/cift/ai-asistan">
                <button className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#b8952b] text-[#111111] font-medium text-[14px] rounded-full transition-all inline-flex items-center gap-2 shadow-lg">
                  <span>WedyAI Concierge'i Başlat</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-[360px] bg-white/5 border border-white/10 rounded-[24px] p-6 z-10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
                AI
              </div>
              <div>
                <span className="text-[13px] font-medium block">Canlı Örnek Komut</span>
                <span className="text-[11px] text-white/50">WedyAI Concierge</span>
              </div>
            </div>
            <p className="text-[13px] italic text-white/90 bg-white/5 p-3.5 rounded-xl border border-white/5">
              "İstanbul Beykoz'da 350.000 TL bütçemize uygun kır düğünü mekanlarını listele ve teklif al."
            </p>
          </div>
        </div>
      </section>

      {/* 📜 Footer */}
      <footer className="bg-[#F7F7F3] border-t border-black/[0.06] py-12 text-[13px] text-[#666666]">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-xl font-bold text-[#111111]">WedyPlan.</span>
            <p className="text-[12px] text-[#888888] mt-1">© 2026 WedyPlan Inc. Tüm hakları saklıdır.</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/mekanlar" className="hover:text-[#111111]">Mekanlar</Link>
            <Link href="/firmalar" className="hover:text-[#111111]">Tedarikçiler</Link>
            <Link href="/cift/ai-asistan" className="hover:text-[#111111]">WedyAI</Link>
            <Link href="/firma/ai-asistan" className="hover:text-[#111111]">Kurumsal Portal</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}