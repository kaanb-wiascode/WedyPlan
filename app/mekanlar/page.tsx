'use client';

import React, { useState, useRef, useEffect } from 'react';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { MekanFilterSidebar } from '@/components/public/mekan-listing/MekanFilterSidebar';
import { Search, MapPin, Grid, Map, Filter, ChevronDown, ArrowDownAZ, Star, Users, Utensils, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MekanlarPage() {
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const sortRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    category: 'ALL',
    city: 'Tüm Şehirler',
    capacity: 'ALL',
    priceRange: 'ALL',
    features: [] as string[],
    search: '',
    sortBy: 'RECOMMENDED',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (updated: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'ALL',
      city: 'Tüm Şehirler',
      capacity: 'ALL',
      priceRange: 'ALL',
      features: [],
      search: '',
      sortBy: 'RECOMMENDED',
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const sortOptions = [
    { id: 'RECOMMENDED', label: 'Önerilen Sıralama' },
    { id: 'RATING', label: 'En Yüksek Puan' },
    { id: 'PRICE_LOW', label: 'Fiyat (Düşükten Yükseğe)' },
  ];

  // PARA KAZANDIRAN MOCK DATA: "isPremium" olanlar sponsorlu mekanlardır
  const mockVenues = [
    { 
      id: '1', title: 'Boğaziçi Tarihi Yalı', location: 'Sarıyer, İstanbul', rating: 4.9, reviews: 128,
      capacity: '500-750 Kişi', minPrice: '1.500 ₺', type: 'Tarihi Mekan', isPremium: true,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop'
    },
    { 
      id: '2', title: 'Saklı Orman Kır Bahçesi', location: 'Beykoz, İstanbul', rating: 4.7, reviews: 85,
      capacity: '1000+ Kişi', minPrice: '850 ₺', type: 'Kır Bahçesi', isPremium: true,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop'
    },
    { 
      id: '3', title: 'Wyndham Grand Balo Salonu', location: 'Şişli, İstanbul', rating: 4.8, reviews: 210,
      capacity: '300-500 Kişi', minPrice: '1.200 ₺', type: 'Otel', isPremium: false,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop'
    },
    { 
      id: '4', title: 'Alaçatı Masalı Wedding', location: 'Çeşme, İzmir', rating: 4.9, reviews: 64,
      capacity: '100-300 Kişi', minPrice: '1.800 ₺', type: 'Kır Bahçesi', isPremium: false,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <PublicPageLayout>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-8">
          <h1 className="mb-4 text-center text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
            Düğün mekanları ve davet alanları
          </h1>
          <p className="mx-auto max-w-2xl text-center text-[17px] leading-relaxed text-[#86868b]">
            Boğaz manzaralı yalılardan, doğayla iç içe kır bahçelerine kadar hayalinizdeki mekanı keşfedin ve anında ücretsiz teklif alın.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-8 items-start pb-24">
          
          {/* Sol Taraf: Detaylı Yan Filtre */}
          <div className={`w-full lg:w-[28%] lg:sticky lg:top-28 z-30 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <MekanFilterSidebar 
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Sağ Taraf: Arama/Sıralama ve Listeleme */}
          <div className="w-full lg:w-[72%] space-y-6">
            
            {/* Tek Satır Komuta Merkezi (Action Bar) */}
            <div className="p-2.5 bg-white border border-neutral-200/80 shadow-sm rounded-3xl lg:rounded-full flex flex-col lg:flex-row items-center justify-between gap-3 relative z-40">
              
              <div className="flex items-center w-full lg:w-auto flex-1 gap-2 px-2">
                <button 
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden p-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors shrink-0"
                >
                  <Filter className="w-4 h-4" />
                </button>

                {/* Geniş Arama Kutusu */}
                <div className="flex-1 flex items-center bg-transparent py-2">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Mekan adı veya ilçe ara..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange({ search: e.target.value })}
                    className="bg-transparent text-[14px] font-medium text-neutral-900 placeholder:text-neutral-400 outline-none w-full min-w-0"
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px h-8 bg-neutral-200 shrink-0" />

              <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 pr-1 pb-1 lg:pb-0 shrink-0">
                {/* Sıralama Dropdown */}
                <div className="relative" ref={sortRef}>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="px-4 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60 rounded-full text-[13px] font-semibold text-neutral-800 flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <ArrowDownAZ className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="hidden sm:inline-block">
                      {sortOptions.find(o => o.id === filters.sortBy)?.label}
                    </span>
                    <span className="sm:hidden">Sırala</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { handleFilterChange({ sortBy: opt.id }); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-[13px] font-medium transition-colors ${
                            filters.sortBy === opt.id ? 'bg-[#0071e3]/8 text-[#0071e3] font-semibold' : 'text-[#1d1d1f] hover:bg-black/4'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Görünüm Modu */}
                <div className="bg-neutral-100 p-1 rounded-full flex items-center shrink-0">
                  <button onClick={() => setViewMode('GRID')} className={`p-2 rounded-full transition-all ${viewMode === 'GRID' ? 'bg-white text-black shadow-sm' : 'text-neutral-500'}`}>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('MAP')} className={`p-2 rounded-full transition-all ${viewMode === 'MAP' ? 'bg-white text-black shadow-sm' : 'text-neutral-500'}`}>
                    <Map className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* MEKAN LİSTESİ (KARTLAR) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockVenues.map((venue) => {
                const isSaved = savedItems.includes(venue.id);
                return (
                  <div key={venue.id} className="group bg-white border border-neutral-200/80 rounded-[28px] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Görsel ve Badge Alanı */}
                      <div className="relative h-64 w-full bg-neutral-100 overflow-hidden">
                        <Image src={venue.image} alt={venue.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        {/* Premium (Sponsorlu) Rozeti */}
                        {venue.isPremium && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-900" /> Öne Çıkan
                          </div>
                        )}

                        <button onClick={() => toggleSave(venue.id)} className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 shadow-sm hover:scale-110 transition-transform">
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#0071e3] text-[#0071e3]' : ''}`} />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <span className="bg-white/95 backdrop-blur-md text-neutral-900 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {venue.rating} ({venue.reviews})
                          </span>
                          <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] font-medium tracking-wide">
                            {venue.type}
                          </span>
                        </div>
                      </div>

                      {/* İçerik */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="mb-1 line-clamp-1 text-2xl font-semibold tracking-tight text-[#1d1d1f]">{venue.title}</h3>
                          <div className="flex items-center text-xs text-neutral-500 font-medium">
                            <MapPin className="mr-1 h-3.5 w-3.5 text-[#0071e3]" /> {venue.location}
                          </div>
                        </div>

                        {/* Kapasite ve Özellik Tagleri */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-[11px] font-semibold">
                            <Users className="w-3.5 h-3.5" /> {venue.capacity}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-[11px] font-semibold">
                            <Utensils className="w-3.5 h-3.5" /> Yemekli / Kokteyl
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Alt Kısım - Dönüşüm Alanı (Pricing & CTA) */}
                    <div className="p-6 pt-0 mt-auto">
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div>
                          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block mb-0.5">Kişi Başı Başlangıç</span>
                          <span className="text-xl font-bold text-neutral-900">{venue.minPrice}</span>
                        </div>
                        <Link href={`/mekanlar/${venue.id}`} className="apple-btn apple-btn-inline !px-5 !py-3 !text-[13px]">
                          Ücretsiz Teklif Al
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </PublicPageLayout>
  );
}