'use client';

import React, { useState, useRef, useEffect } from 'react';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { ModaFilterSidebar } from '@/components/public/moda-listing/ModaFilterSidebar';
import { Sparkles, Search, Grid, Map, Filter, ChevronDown, ArrowDownAZ, Heart, Eye } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';
import Image from 'next/image';
import Link from 'next/link';

export default function ModaKatalogPage() {
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const sortRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    category: 'ALL',
    style: 'ALL',
    fabric: 'ALL',
    rentalOption: false,
    customDesignOnly: false,
    search: '',
    sortBy: 'RECOMMENDED',
  });

  // Dışarı tıklanınca sıralama menüsünü kapat
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
      style: 'ALL',
      fabric: 'ALL',
      rentalOption: false,
      customDesignOnly: false,
      search: '',
      sortBy: 'RECOMMENDED',
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const sortOptions = [
    { id: 'RECOMMENDED', label: 'Önerilen Sıralama' },
    { id: 'NEWEST', label: 'En Yeni Sezon' },
    { id: 'PRICE_LOW', label: 'En Düşük Fiyat' },
    { id: 'PRICE_HIGH', label: 'En Yüksek Fiyat' }
  ];

  // Örnek Moda Ürünleri Datanız
  const mockProducts = [
    { id: '1', title: 'Helen Dantel Detaylı Gelinlik', designer: 'Aysira Modaevi', price: '45.000 ₺', image: '/assets/placeholder-vendor.jpg', category: 'Gelinlik' },
    { id: '2', title: 'Saten A Kesim Balo Gelinliği', designer: 'Pronovias İstanbul', price: '68.000 ₺', image: '/assets/placeholder-vendor.jpg', category: 'Gelinlik' },
    { id: '3', title: 'İtalyan Kesim Siyah Smoking', designer: 'Damat Tween', price: '28.000 ₺', image: '/assets/placeholder-vendor.jpg', category: 'Damatlık' },
    { id: '4', title: 'Işıltılı Balık Model Abiye', designer: 'Oleg Cassini', price: '18.500 ₺', image: '/assets/placeholder-vendor.jpg', category: 'Abiye' },
  ];

  return (
    <PublicPageLayout>
      {/* Sayfa Başlığı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-10">
        <h1 className="mb-4 text-center text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
          Düğün modası ve gelinlik koleksiyonları
        </h1>
        <p className="mx-auto max-w-2xl text-center text-[17px] text-[#86868b]">
          Yeni sezon gelinlik modellerini, damatlıkları ve özel tasarım modaevlerini tek bir platformda keşfedin ve randevu alın.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-8 items-start pb-24">
        
        {/* Sol Taraf: Detaylı Yan Filtre */}
        <div className={`w-full lg:w-[28%] lg:sticky lg:top-28 z-30 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <ModaFilterSidebar 
            filters={filters}
            onChangeFilter={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Sağ Taraf: Komuta Satırı (Arama + Sıralama) ve Ürün Izgarası */}
        <div className="w-full lg:w-[72%] space-y-6">
          
          {/* Tek Satır Komuta Merkezi (Action Bar) */}
          <GlassCard className="p-2 border-white/60 bg-white/80 shadow-md rounded-3xl lg:rounded-full flex flex-col lg:flex-row items-center justify-between gap-3 relative z-40">
            
            <div className="flex items-center w-full lg:w-auto flex-1 gap-2 px-2">
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors shrink-0"
              >
                <Filter className="w-4 h-4" />
              </button>

              {/* Geniş Arama Kutusu */}
              <div className="flex-1 flex items-center bg-transparent py-2">
                <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Model, kesim veya modaevi ara..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="bg-transparent text-[14px] font-medium text-gray-900 placeholder:text-gray-400 outline-none w-full min-w-0"
                />
              </div>
            </div>

            {/* Masaüstü Ayıraç */}
            <div className="hidden lg:block w-px h-8 bg-gray-200 shrink-0" />

            <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 pr-1 pb-1 lg:pb-0 shrink-0">
              
              {/* Sıralama Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-transparent rounded-full text-[13px] font-semibold text-gray-800 flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <ArrowDownAZ className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="hidden sm:inline-block">
                    {sortOptions.find(o => o.id === filters.sortBy)?.label}
                  </span>
                  <span className="sm:hidden">Sırala</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
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
              <div className="bg-gray-100 p-1 rounded-full flex items-center shrink-0">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'GRID' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('MAP')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'MAP' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Ürün Listesi Izgarası */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockProducts.map((product) => {
              const isSaved = savedItems.includes(product.id);
              return (
                <GlassCard key={product.id} hoverEffect className="group p-4 border-white/60 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleSave(product.id)}
                        className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-900 shadow-sm hover:scale-110 transition-all"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#0071e3] text-[#0071e3]' : ''}`} />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-medium">
                        {product.category}
                      </span>
                    </div>

                    <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-[#0071e3]">{product.designer}</p>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#1d1d1f]">{product.title}</h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Tahmini Fiyat</span>
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    </div>
                    <Link
                      href={`/gelinlik-modelleri/${product.id}`}
                      className="px-4 py-2 bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>İncele</span>
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>

        </div>
      </div>
    </PublicPageLayout>
  );
}