'use client';

import React, { useEffect, useState, useTransition, useRef } from 'react';
import { getVendors } from '@/lib/actions/vendor-discovery';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { FilterSidebar } from '@/components/public/vendor-listing/FilterSidebar';
import { VendorListingCard } from '@/components/public/vendor-listing/VendorListingCard';
import { VendorListingFilterState, VendorListingItem } from '@/types/vendor-listing';
import { Sparkles, Search, Grid, Map, Filter, ChevronDown, ArrowDownAZ } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

export default function FirmalarPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [vendors, setVendors] = useState<VendorListingItem[]>([]);
  
  // UI State'leri
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [comparedVendors, setComparedVendors] = useState<string[]>([]);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const sortRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<VendorListingFilterState & { search?: string }>({
    search: '',
    searchQuery: '',
    category: 'ALL',
    city: 'ALL',
    availabilityOnly: false,
    verifiedOnly: false,
    sortBy: 'RECOMMENDED',
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 0
  });

  // Dışarı tıklayınca Sıralama menüsünü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchVendors = () => {
    startTransition(async () => {
      const res = await getVendors({
        search: filters.search || filters.searchQuery,
        category: filters.category === 'ALL' ? '' : filters.category,
        city: filters.city === 'ALL' ? '' : filters.city,
      });

      if (res.success && res.data) {
        setVendors(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVendors();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const handleFilterChange = (updated: Partial<VendorListingFilterState & { search?: string }>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      searchQuery: '',
      category: 'ALL',
      city: 'ALL',
      availabilityOnly: false,
      verifiedOnly: false,
      sortBy: 'RECOMMENDED',
      minPrice: 0,
      maxPrice: 1000000,
      minRating: 0
    });
  };

  const toggleCompare = (vendor: VendorListingItem) => {
    setComparedVendors(prev => 
      prev.includes(vendor.id) ? prev.filter(id => id !== vendor.id) : [...prev, vendor.id]
    );
  };

  const toggleSave = (vendorId: string) => {
    setSavedVendors(prev => 
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    );
  };

  const sortOptions = [
    { id: 'RECOMMENDED', label: 'Önerilen Sıralama' },
    { id: 'RATING', label: 'En Yüksek Puan' },
    { id: 'PRICE_LOW', label: 'En Düşük Fiyat' },
    { id: 'PRICE_HIGH', label: 'En Yüksek Fiyat' }
  ];

  return (
    <PublicPageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 text-center">
          Mükemmel Düğün İçin En İyileri Bulun
        </h1>
        <p className="text-lg text-gray-600 font-light text-center max-w-2xl mx-auto">
          Yapay zeka destekli akıllı algoritmamızla hayalinizdeki mekanı, fotoğrafçıyı ve organizasyon firmasını saniyeler içinde keşfedin.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-8 items-start pb-24">
        
        {/* Sol Taraf: Detaylı Yan Filtre */}
        <div className={`w-full lg:w-[28%] lg:sticky lg:top-28 z-30 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar 
            filters={filters}
            onChangeFilter={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Sağ Taraf: Komuta Merkezi ve Liste */}
        <div className="w-full lg:w-[72%] space-y-6">
          
          {/* Tek Satır Komuta Merkezi (Action Bar) - GÜNCELLENDİ */}
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
                  placeholder="Firma veya hizmet ara..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="bg-transparent text-[14px] font-medium text-gray-900 placeholder:text-gray-400 outline-none w-full min-w-0" 
                />
              </div>
            </div>

            {/* Masaüstünde görünen dikey ayıraç */}
            <div className="hidden lg:block w-px h-8 bg-gray-200 shrink-0" />

            <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 pr-1 pb-1 lg:pb-0 shrink-0">
              
              {/* Özel Sıralama Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-transparent rounded-full text-[13px] font-semibold text-gray-800 flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <ArrowDownAZ className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="hidden sm:inline-block">
                    {sortOptions.find(o => o.id === (filters.sortBy || 'RECOMMENDED'))?.label}
                  </span>
                  <span className="sm:hidden">Sırala</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { handleFilterChange({ sortBy: opt.id as any }); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-[13px] font-medium transition-colors ${
                          filters.sortBy === opt.id ? 'bg-[#E6007E]/5 text-[#E6007E] font-bold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Görünüm Modu Geçişi */}
              <div className="bg-gray-100 p-1 rounded-full flex items-center shrink-0">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'GRID' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  title="Liste Görünümü"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('MAP')}
                  className={`p-2 rounded-full transition-all ${viewMode === 'MAP' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  title="Harita Görünümü"
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Listeleme İçeriği */}
          {viewMode === 'MAP' ? (
            <div className="h-[700px] w-full bg-gray-200 rounded-3xl border border-white/60 flex items-center justify-center shadow-inner">
              <p className="text-gray-500 font-medium">Harita görünümü yükleniyor...</p>
            </div>
          ) : (
            <>
              {loading || isPending ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white/50 h-[420px] rounded-[32px] border border-white/40" />
                  ))}
                </div>
              ) : vendors.length === 0 ? (
                <GlassCard className="py-28 text-center border-white/60 flex flex-col items-center justify-center mt-6">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-indigo-200 blur-xl rounded-full opacity-50" />
                    <Sparkles className="w-14 h-14 text-indigo-500 relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                    Bu Kriterlerde Bir Sihir Bulamadık
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8 font-light leading-relaxed text-lg">
                    Belki de aradığınız o özel mekan veya kusursuz fotoğrafçı başka bir şehrin, farklı bir kategorinin ardında gizleniyordur.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="px-8 py-4 bg-[#1D1D1F] text-white font-semibold rounded-2xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Tüm İhtimalleri Yeniden Keşfet
                  </button>
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vendors.map((vendor) => (
                    <VendorListingCard
                      key={vendor.id}
                      vendor={vendor}
                      isCompared={comparedVendors.includes(vendor.id)}
                      onToggleCompare={toggleCompare}
                      isSaved={savedVendors.includes(vendor.id)}
                      onToggleSave={toggleSave}
                    />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </PublicPageLayout>
  );
}