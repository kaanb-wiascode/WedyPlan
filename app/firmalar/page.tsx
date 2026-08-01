'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { getVendors } from '@/lib/actions/vendor-discovery';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { FilterSidebar } from '@/components/public/vendor-listing/FilterSidebar'; // Yeni import
import { VendorListingCard } from '@/components/public/vendor-listing/VendorListingCard';
import { VendorListingFilterState, VendorListingItem } from '@/types/vendor-listing';
import { Sparkles, Search, Grid, Map, Filter } from 'lucide-react';
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

  // Merkezi Filtre State'i
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

  return (
    <PublicPageLayout>
      {/* Sayfa Başlığı */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 text-center">
          Mükemmel Düğün İçin En İyileri Bulun
        </h1>
        <p className="text-lg text-gray-600 font-light text-center max-w-2xl mx-auto">
          Yapay zeka destekli akıllı algoritmamızla hayalinizdeki mekanı, fotoğrafçıyı ve organizasyon firmasını saniyeler içinde keşfedin.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row gap-8 items-start pb-24">
        
        {/* Sol Taraf: Detaylı Yan Filtre (Desktop'ta Sticky) */}
        <div className={`w-full lg:w-1/4 lg:sticky lg:top-28 z-30 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <FilterSidebar 
            filters={filters}
            onChangeFilter={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Sağ Taraf: Arama, Aksiyonlar ve Liste */}
        <div className="w-full lg:w-3/4 space-y-6">
          
          {/* Üst Aksiyon Çubuğu (Sadece Arama ve Sıralama) */}
          <GlassCard className="p-3 border-white/60 bg-white/70 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Mobil Filtre Açma Butonu & Arama */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-1">
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden p-3 bg-white border border-gray-200 rounded-xl text-gray-700"
              >
                <Filter className="w-5 h-5" />
              </button>

              <div className="flex-1 md:w-80 flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#E6007E]/20 transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Firma veya hizmet ara..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="bg-transparent text-[13px] text-gray-900 placeholder:text-gray-500 outline-none w-full"
                />
              </div>
            </div>

            {/* Sıralama ve Görünüm (Sağ Kısım) */}
            <div className="flex items-center justify-end gap-3 w-full md:w-auto">
              <select
                value={filters.sortBy || 'RECOMMENDED'}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-700 outline-none cursor-pointer"
              >
                <option value="RECOMMENDED">Önerilen Sıralama</option>
                <option value="RATING">En Yüksek Puan</option>
                <option value="PRICE_LOW">En Düşük Fiyat</option>
              </select>

              <div className="bg-white p-1 rounded-xl border border-gray-200 flex items-center">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'GRID' ? 'bg-[#1D1D1F] text-white' : 'text-gray-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('MAP')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'MAP' ? 'bg-[#1D1D1F] text-white' : 'text-gray-500'}`}
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white/50 h-[420px] rounded-[32px] border border-white/40" />
                  ))}
                </div>
              ) : vendors.length === 0 ? (
                /* Şık ve Şiirsel Empty State */
                <GlassCard className="py-24 text-center border-white/60 flex flex-col items-center justify-center mt-8">
                  <div className="p-5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6 shadow-inner">
                    <Sparkles className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                    Bu Kriterlerde Bir Sihir Bulamadık
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-8 font-light leading-relaxed text-lg">
                    Belki de aradığınız o özel mekan veya kusursuz fotoğrafçı başka bir şehrin, farklı bir kategorinin ardında gizleniyordur.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="px-8 py-4 bg-[#1D1D1F] text-white font-semibold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Tüm İhtimalleri Yeniden Keşfet
                  </button>
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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