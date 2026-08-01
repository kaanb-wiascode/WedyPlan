'use client';

import React, { useState, useRef, useEffect } from 'react';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { CeyizFilterSidebar } from '@/components/public/ceyiz-listing/CeyizFilterSidebar';
import { Search, Grid, Map, Filter, ChevronDown, ArrowDownAZ, Heart, ShoppingBag, Gift, Sparkles, Truck, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CeyizMarketplacePage() {
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [registryItems, setRegistryItems] = useState<string[]>([]);
  const sortRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    category: 'ALL',
    brand: 'ALL',
    priceRange: 'ALL',
    inStockOnly: false,
    isBundleOnly: false,
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
      brand: 'ALL',
      priceRange: 'ALL',
      inStockOnly: false,
      isBundleOnly: false,
      search: '',
      sortBy: 'RECOMMENDED',
    });
  };

  const toggleRegistry = (id: string) => {
    setRegistryItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const sortOptions = [
    { id: 'RECOMMENDED', label: 'Önerilen Sıralama' },
    { id: 'POPULAR', label: 'En Çok Çeyize Eklenenler' },
    { id: 'PRICE_LOW', label: 'Fiyat (Düşükten Yükseğe)' },
    { id: 'PRICE_HIGH', label: 'Fiyat (Yüksekten Düşüğe)' },
  ];

  // ÖRNEK ÜRÜN DATASI
  const mockProducts = [
    {
      id: '1', title: '84 Parça 12 Kişilik Porselen Yemek Takımı', brand: 'Karaca', vendor: 'Karaca Züccaciye',
      price: '18.500 ₺', oldPrice: '22.000 ₺', rating: 4.9, reviews: 340, isBundle: true,
      image: 'https://images.unsplash.com/photo-1615865417236-d67f58e17e66?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '2', title: 'Full Otomatik Çeyiz Çay & Kahve Makinesi Seti', brand: 'Philips', vendor: 'TeknoEv Mağazası',
      price: '12.400 ₺', oldPrice: '14.000 ₺', rating: 4.8, reviews: 180, isBundle: true,
      image: 'https://images.unsplash.com/photo-1517668808822-9da028a3f890?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '3', title: ' %100 Pamuk Saten Çift Kişilik Nevresim Takımı', brand: 'Taç', vendor: 'Taç Ev Tekstili',
      price: '3.850 ₺', oldPrice: '4.500 ₺', rating: 4.9, reviews: 520, isBundle: false,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '4', title: 'Satin Gold 31 Parça Standlı Bıçak & Tencere Seti', brand: 'Korkmaz', vendor: 'Korkmaz Mutfak',
      price: '15.900 ₺', oldPrice: '19.000 ₺', rating: 4.7, reviews: 95, isBundle: true,
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans">
      <PublicPageLayout>
        
        {/* Banner / Çeyiz Listesi Çağrısı */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6">
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-[32px] p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 max-w-xl text-center md:text-left z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5" /> WedyPlan Registry
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                Kendi Çeyiz Listeni Oluştur
              </h1>
              <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                Beğendiğin tüm ev eşyalarını çeyiz listene ekle, düğün davetlilerin sana hayalindeki hediyeleri kolayca alsın!
              </p>
            </div>
            
            <Link
              href="/cift/ceyiz-listem"
              className="px-8 py-4 bg-[#E6007E] hover:bg-[#c5006b] text-white text-sm font-bold rounded-2xl transition-all shadow-lg shrink-0 z-10 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Çeyiz Listemi Yönet</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-8 items-start pb-24 pt-4">
          
          {/* Sol Filtre Menüsü */}
          <div className={`w-full lg:w-[28%] lg:sticky lg:top-28 z-30 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <CeyizFilterSidebar 
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Sağ Arama & Ürün Izgarası */}
          <div className="w-full lg:w-[72%] space-y-6">
            
            {/* Action Bar */}
            <div className="p-2.5 bg-white border border-neutral-200/80 shadow-sm rounded-3xl lg:rounded-full flex flex-col lg:flex-row items-center justify-between gap-3 relative z-40">
              
              <div className="flex items-center w-full lg:w-auto flex-1 gap-2 px-2">
                <button 
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden p-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-700 transition-colors shrink-0"
                >
                  <Filter className="w-4 h-4" />
                </button>

                <div className="flex-1 flex items-center bg-transparent py-2">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Yemek takımı, tencere, süpürge ara..."
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
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-neutral-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { handleFilterChange({ sortBy: opt.id }); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-[13px] font-medium transition-colors ${
                            filters.sortBy === opt.id ? 'bg-pink-50 text-[#E6007E] font-bold' : 'text-neutral-700 hover:bg-neutral-50'
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
                </div>
              </div>
            </div>

            {/* Ürün Listesi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockProducts.map((product) => {
                const isInRegistry = registryItems.includes(product.id);
                return (
                  <div key={product.id} className="group bg-white border border-neutral-200/80 rounded-[28px] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                    <div>
                      {/* Görsel Alanı */}
                      <div className="relative h-64 w-full bg-neutral-100 overflow-hidden">
                        <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        
                        {/* Rozetler */}
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                          {product.isBundle && (
                            <span className="bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Gift className="w-3 h-3" /> Çeyiz Seti
                            </span>
                          )}
                          <span className="bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                            <Truck className="w-3 h-3 text-emerald-600" /> Ücretsiz Kargo
                          </span>
                        </div>

                        {/* Çeyiz Listeme Ekle Kalp/Rozet Butonu */}
                        <button
                          onClick={() => toggleRegistry(product.id)}
                          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all ${
                            isInRegistry ? 'bg-[#E6007E] text-white scale-110' : 'bg-white/90 text-neutral-700 hover:scale-110'
                          }`}
                          title="Çeyiz Listeme Ekle"
                        >
                          <Gift className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-4 left-4">
                          <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[11px] font-medium">
                            {product.brand}
                          </span>
                        </div>
                      </div>

                      {/* İçerik */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span>Satıcı: <strong className="text-neutral-700">{product.vendor}</strong></span>
                          <span className="flex items-center gap-1 font-bold text-neutral-800">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#E6007E] transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                      </div>
                    </div>

                    {/* Alt Kısım - Fiyat & İkili Butonlar */}
                    <div className="p-5 pt-0 mt-auto">
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div>
                          {product.oldPrice && (
                            <span className="text-xs text-neutral-400 line-through block">{product.oldPrice}</span>
                          )}
                          <span className="text-xl font-bold text-neutral-900">{product.price}</span>
                        </div>

                        {/* Çift Aksiyon Butonları */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRegistry(product.id)}
                            className={`px-3 py-2.5 rounded-xl text-[12px] font-bold border transition-all flex items-center gap-1 ${
                              isInRegistry 
                                ? 'bg-pink-50 border-pink-200 text-[#E6007E]' 
                                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                            }`}
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{isInRegistry ? 'Listemde' : 'Çeyize Ekle'}</span>
                          </button>

                          <button className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-[12px] font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Satın Al</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </PublicPageLayout>
    </div>
  );
}