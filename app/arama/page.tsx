'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, SlidersHorizontal, ChevronRight, Star } from 'lucide-react';

// --- Mock Data ---
const VENDORS = [
  {
    id: '1',
    name: 'Bosphorus Palace',
    category: 'Kır Bahçesi',
    city: 'İstanbul',
    district: 'Beykoz',
    price: '150.000 TL',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Art & Motion Studios',
    category: 'Fotoğrafçı',
    city: 'İstanbul',
    district: 'Beşiktaş',
    price: '25.000 TL',
    rating: 4.8,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Galia Modaevi',
    category: 'Gelinlik',
    city: 'İzmir',
    district: 'Alsancak',
    price: '45.000 TL',
    rating: 5.0,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'The Grand Tarabya',
    category: 'Otel Düğünü',
    city: 'İstanbul',
    district: 'Sarıyer',
    price: '350.000 TL',
    rating: 4.7,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Symphony Orkestrası',
    category: 'Müzik & DJ',
    city: 'Ankara',
    district: 'Çankaya',
    price: '35.000 TL',
    rating: 4.9,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Kemer Country Club',
    category: 'Kır Bahçesi',
    city: 'İstanbul',
    district: 'Kemerburgaz',
    price: '280.000 TL',
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1545232979-fbf4d284f32d?auto=format&fit=crop&q=80&w=800'
  }
];

const CATEGORIES = ['Tümü', 'Kır Bahçesi', 'Otel Düğünü', 'Fotoğrafçı', 'Gelinlik', 'Müzik & DJ'];
const CITIES = ['Tümü', 'İstanbul', 'Ankara', 'İzmir', 'Antalya'];

export default function PremiumSearchPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [activeCity, setActiveCity] = useState('Tümü');

  // Basit Filtreleme Mantığı
  const filteredVendors = VENDORS.filter(v => {
    if (activeCategory !== 'Tümü' && v.category !== activeCategory) return false;
    if (activeCity !== 'Tümü' && v.city !== activeCity) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] text-[#111111] font-medium">
            <Link href="/arama" className="text-[#7C5CFF]">Keşfet</Link>
            <Link href="/kontrol-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Planlama</Link>
            <Link href="/hediye-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Kayıtlar</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/satici" className="text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors hidden sm:block">
              İş Ortağı Girişi
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left Sidebar (Filters) - Sticky */}
        <aside className="w-full md:w-[280px] shrink-0 md:sticky md:top-[104px] space-y-10">
          
          <div>
            <h1 className="text-[32px] font-medium tracking-tight leading-tight mb-2">
              Kusursuz <br/> mekanı bulun.
            </h1>
            <p className="text-[15px] text-[#666666]">
              Kriterlerinize en uygun profesyonelleri keşfedin.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input 
              type="text" 
              placeholder="İsim ile ara..."
              className="w-full bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] h-[48px] pl-11 pr-4 text-[15px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors placeholder:text-[#999999]"
            />
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-medium text-[#111111]">Kategori</h3>
              <SlidersHorizontal className="w-4 h-4 text-[#666666]" />
            </div>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-[10px] text-[14px] transition-colors ${
                    activeCategory === cat 
                      ? 'bg-[#111111] text-white font-medium' 
                      : 'text-[#666666] hover:bg-[#F8F8F7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-[14px] font-medium text-[#111111] mb-4">Şehir</h3>
            <div className="space-y-1">
              {CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`w-full text-left px-3 py-2 rounded-[10px] text-[14px] transition-colors ${
                    activeCity === city 
                      ? 'bg-[#111111] text-white font-medium' 
                      : 'text-[#666666] hover:bg-[#F8F8F7]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Content (Vendor Grid) */}
        <main className="flex-1 w-full">
          
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(0,0,0,0.06)]">
            <span className="text-[15px] text-[#666666]">
              <strong className="text-[#111111] font-medium">{filteredVendors.length}</strong> sonuç listeleniyor
            </span>
            <div className="flex items-center gap-2 text-[14px] text-[#666666] cursor-pointer hover:text-[#111111] transition-colors">
              <span>Önerilen Sıralama</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredVendors.map((vendor) => (
              <Link 
                href={`/firma/${vendor.id}`} 
                key={vendor.id}
                className="group flex flex-col gap-4 cursor-pointer"
              >
                {/* Image Container with Subtle Apple-like Hover */}
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)]">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[12px] font-medium text-[#111111] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    {vendor.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[18px] font-medium text-[#111111] tracking-tight truncate">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-[14px] h-[14px] text-[#111111] fill-[#111111]" />
                      <span className="text-[14px] font-medium text-[#111111]">{vendor.rating}</span>
                      <span className="text-[13px] text-[#999999]">({vendor.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[14px] text-[#666666]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{vendor.district}, {vendor.city}</span>
                  </div>

                  <div className="pt-2 text-[15px]">
                    <span className="text-[#666666]">Başlangıç: </span>
                    <span className="font-medium text-[#111111]">{vendor.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <Search className="w-12 h-12 text-[#E5E5E5] mb-4" strokeWidth={1} />
              <h3 className="text-[18px] font-medium text-[#111111]">Sonuç bulunamadı</h3>
              <p className="text-[15px] text-[#666666] mt-2">Seçtiğiniz kriterlere uygun firma bulunmuyor. Lütfen filtreleri esnetin.</p>
              <button 
                onClick={() => { setActiveCategory('Tümü'); setActiveCity('Tümü'); }}
                className="mt-6 text-[#7C5CFF] text-[15px] font-medium hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}