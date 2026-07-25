'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Star, Sparkles, Camera, Music, Shirt, Heart, 
  ChevronRight, PhoneCall, ShieldCheck, Scissors, Utensils, SlidersHorizontal, CheckCircle2, Building2
} from 'lucide-react';

export default function VendorsListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('istanbul');

  // Tedarikçi Kategorileri
  const vendorCategories = [
    { id: 'all', label: 'Tüm Kategoriler', icon: Sparkles },
    { id: 'fotograf', label: 'Düğün Fotoğrafçısı', icon: Camera, count: '1.240 Firma' },
    { id: 'gelinlik', label: 'Gelinlik & Modaevi', icon: Shirt, count: '850 Mağaza' },
    { id: 'muzik', label: 'Müzik & Orkestra', icon: Music, count: '620 Sanatçı' },
    { id: 'organizasyon', label: 'Organizasyon & Süsleme', icon: Heart, count: '410 Firma' },
    { id: 'kuafor', label: 'Gelin Saçı & Makyaj', icon: Scissors, count: '530 Salon' },
    { id: 'catering', label: 'Catering & İkram', icon: Utensils, count: '280 Firma' },
  ];

  // Örnek Tedarikçi Veritabanı
  const mockVendors = [
    {
      id: '1',
      name: 'Serafina Fine Art Weddings',
      category: 'fotograf',
      categoryLabel: 'Düğün Fotoğrafçısı',
      location: 'Karaköy, İstanbul',
      rating: 4.9,
      reviewsCount: 312,
      priceStarting: '35.000 TL',
      priceUnit: 'Paket Başlangıç',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      isVip: true,
      badge: 'Drone & Düğün Hikayesi Dahil',
      tags: ['Dış Çekim', 'Drone', 'Düğün Hikayesi', 'Yurtdışı Çekim']
    },
    {
      id: '2',
      name: 'Nova Gelinlik & Haute Couture',
      category: 'gelinlik',
      categoryLabel: 'Gelinlik & Modaevi',
      location: 'Nişantaşı, İstanbul',
      rating: 4.8,
      reviewsCount: 184,
      priceStarting: '45.000 TL',
      priceUnit: 'Özel Dikim Başlangıç',
      image: 'https://images.unsplash.com/photo-1594992111196-857e504ce835?auto=format&fit=crop&w=800&q=80',
      isVip: true,
      badge: 'Provalarda VIP İkram',
      tags: ['Özel Dikim', 'Kiralama Seçeneği', 'Duvak Hediye']
    },
    {
      id: '3',
      name: 'İstanbul Metropolitan Symphonic Band',
      category: 'muzik',
      categoryLabel: 'Müzik & Orkestra',
      location: 'Beşiktaş, İstanbul',
      rating: 5.0,
      reviewsCount: 96,
      priceStarting: '60.000 TL',
      priceUnit: 'Sahne Performansı',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      isVip: true,
      badge: '%10 Erken Rezervasyon',
      tags: ['Karşılama Müzikleri', 'Geniş Repertuar', 'Ses/Işık Sistemi']
    },
    {
      id: '4',
      name: 'Atelier Bloom & Event Design',
      category: 'organizasyon',
      categoryLabel: 'Organizasyon & Süsleme',
      location: 'Kuruçeşme, İstanbul',
      rating: 4.7,
      reviewsCount: 142,
      priceStarting: '50.000 TL',
      priceUnit: 'Konsept Başlangıç',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      isVip: false,
      badge: 'Özel Masa Tasarımı',
      tags: ['Masa Süsleme', 'Ses & Işık', 'Giriş Takı', 'Çiçek Tasarımı']
    },
    {
      id: '5',
      name: 'Studio Glamour Makeup & Hair',
      category: 'kuafor',
      categoryLabel: 'Gelin Saçı & Makyaj',
      location: 'Etiler, İstanbul',
      rating: 4.9,
      reviewsCount: 210,
      priceStarting: '18.000 TL',
      priceUnit: 'Gelin Paketi',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
      isVip: false,
      badge: 'Mekanda Hizmet İmkanı',
      tags: ['Porselen Makyaj', 'Prova Dahil', 'Nedime Paketi']
    }
  ];

  const filteredVendors = mockVendors.filter(vendor => {
    if (selectedCategory !== 'all' && vendor.category !== selectedCategory) return false;
    return true;
  });

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
            <Link href="/firmalar" className="text-[#111] font-bold">Tedarikçiler</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/firma/ai-asistan" className="text-[13px] font-medium px-4 py-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block">
              Firma Paneli
            </Link>
            <Link href="/cift/ai-asistan" className="text-[13px] font-medium px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] transition-all">
              Hızlı Teklif Al
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 Hero & Kategori Çipleri Barı */}
      <section className="bg-[#F7F7F3] border-b border-black/[0.05] py-10">
        <div className="max-w-[1300px] mx-auto px-6 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-[11px] font-medium text-[#111] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Onaylı Düğün Profesyonelleri</span>
              </div>
              <h1 className="text-[32px] md:text-[42px] font-serif font-normal text-[#111]">
                Düğün Tedarikçileri & Firmaları
              </h1>
              <p className="text-[14px] text-[#666] font-light max-w-[600px] mt-1">
                Fotoğrafçıdan gelinlikçiye, orkestradan organizasyona kadar en iyi profesyonelleri karşılaştırın.
              </p>
            </div>

            {/* Arama Kutusu */}
            <div className="bg-white border border-black/10 rounded-full p-1.5 flex items-center gap-2 max-w-[360px] w-full shadow-sm">
              <Search className="w-4 h-4 text-[#888] ml-3" />
              <input 
                type="text" 
                placeholder="Firma veya hizmet ara..."
                className="w-full text-[13px] bg-transparent outline-none text-[#111]"
              />
              <button className="px-4 py-2 bg-[#111] text-white rounded-full text-[12px] font-medium hover:bg-[#333] transition-all shrink-0">
                Ara
              </button>
            </div>
          </div>

          {/* Kategori Seçim Çipleri (Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            {vendorCategories.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-2 shrink-0 ${
                    isSelected 
                      ? 'bg-[#111111] text-white shadow-md' 
                      : 'bg-white text-[#555] border border-black/10 hover:border-black/30 hover:text-[#111]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#777]'}`} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🏰 Tedarikçi Gridi */}
      <main className="max-w-[1300px] mx-auto px-6 pt-10 space-y-8">
        
        <div className="flex justify-between items-center text-[13px] text-[#666]">
          <span>Toplam <strong className="text-[#111] font-bold">{filteredVendors.length}</strong> onaylı firma gösteriliyor</span>
          <div className="flex items-center gap-2">
            <span>Şehir:</span>
            <select 
              value={selectedCity} 
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-white border border-black/10 rounded-lg px-3 py-1.5 font-medium text-[#111] outline-none"
            >
              <option value="istanbul">İstanbul (Tümü)</option>
              <option value="izmir">İzmir</option>
              <option value="ankara">Ankara</option>
            </select>
          </div>
        </div>

        {/* Firmalar Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((v) => (
            <div 
              key={v.id}
              className="bg-white border border-black/[0.08] rounded-[28px] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Görsel ve Rozetler */}
                <div className="relative h-[220px] w-full overflow-hidden bg-black/10">
                  <img 
                    src={v.image} 
                    alt={v.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {v.isVip && (
                    <span className="absolute top-3 left-3 bg-[#111111] text-[#D4AF37] text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-md">
                      VIP Partner
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#111] text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {v.badge}
                  </span>
                </div>

                {/* Detaylar */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#777] mb-1">
                      <span className="uppercase tracking-wider font-semibold">{v.categoryLabel}</span>
                      <span className="flex items-center gap-1 font-bold text-[#111]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {v.rating} ({v.reviewsCount})
                      </span>
                    </div>

                    <h3 className="text-[18px] font-serif font-medium text-[#111] group-hover:text-[#D4AF37] transition-colors">
                      {v.name}
                    </h3>

                    <p className="text-[12px] text-[#666] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      {v.location}
                    </p>
                  </div>

                  {/* Etiketler */}
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-[#F4F4F0] text-[#555] px-2.5 py-1 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fiyat ve Buton */}
              <div className="p-6 pt-0 border-t border-black/5 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#888] uppercase block">{v.priceUnit}</span>
                  <span className="text-[16px] font-bold text-[#111]">{v.priceStarting}</span>
                </div>

                <Link href="/cift/ai-asistan">
                  <button className="h-[42px] px-5 bg-[#111111] hover:bg-[#333] text-white rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5 shadow-sm">
                    <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Teklif İste</span>
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* 🤖 WEDYAI TEDARİKÇİ BULMA BANNERI */}
        <div className="bg-[#111111] text-white p-8 rounded-[32px] my-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> WedyAI Partner Match
            </div>
            <h3 className="text-[24px] font-serif">Arama yapmakla vakit kaybetmeyin.</h3>
            <p className="text-[13px] text-white/70 font-light max-w-[500px]">
              Tarzınızı ve ayırdığınız bütçeyi WedyAI Asistanı'na söyleyin, kriterlerinize uyan 3 onaylı firmadan doğrudan teklif getirsin.
            </p>
          </div>

          <Link href="/cift/ai-asistan" className="z-10 shrink-0">
            <button className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#b8952b] text-[#111111] font-medium text-[13px] rounded-full transition-all flex items-center gap-2 shadow-lg">
              <span>WedyAI ile Firma Bul</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </main>

    </div>
  );
}