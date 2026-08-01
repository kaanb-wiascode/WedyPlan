'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { getVendors } from '@/lib/actions/vendor-discovery';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { FilterBar } from '@/components/public/vendor-listing/FilterBar';
import { VendorListingCard } from '@/components/public/vendor-listing/VendorListingCard';
import { VendorListingFilterState, VendorListingItem } from '@/types/vendor-listing';
import { Sparkles } from 'lucide-react';

export default function FirmalarPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [vendors, setVendors] = useState<VendorListingItem[]>([]);
  
  // UI State'leri
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [comparedVendors, setComparedVendors] = useState<string[]>([]);
  const [savedVendors, setSavedVendors] = useState<string[]>([]);

  // Merkezi Filtre State'i (TS Hatalarını çözen güncellemeler yapıldı)
  const [filters, setFilters] = useState<VendorListingFilterState & { search?: string }>({
    search: '',
    searchQuery: '', // Eksik özellik eklendi
    category: 'ALL',
    city: 'ALL',
    availabilityOnly: false,
    verifiedOnly: false,
    sortBy: 'RECOMMENDED',
    minPrice: 0,       // Eksik özellik eklendi
    maxPrice: 1000000, // Eksik özellik eklendi
    minRating: 0       // Eksik özellik eklendi
  });

  const fetchVendors = () => {
    startTransition(async () => {
      // getVendors fonksiyonunuza uygun şekilde parametreleri gönderiyoruz
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

  // Filtreler her değiştiğinde veriyi yeniden çek
  useEffect(() => {
    // Search için debounce eklenebilir, şimdilik doğrudan tetikliyoruz
    const delayDebounceFn = setTimeout(() => {
      fetchVendors();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const handleFilterChange = (updated: Partial<VendorListingFilterState & { search?: string }>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  // Filtre Sıfırlama (TS Hatalarını çözen güncellemeler yapıldı)
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

  // Etkileşim İşleyicileri
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Sayfa Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> WedyPlan Keşif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Mükemmel Düğün İçin En İyileri Bulun
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Yapay zeka destekli akıllı algoritmamızla hayalinizdeki mekanı, fotoğrafçıyı ve organizasyon firmasını saniyeler içinde keşfedin.
          </p>
        </div>

        {/* Akıllı Filtre Çubuğu */}
        <FilterBar 
          filters={filters}
          onChangeFilter={handleFilterChange}
          onResetFilters={resetFilters}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Liste veya Harita Görünümü */}
        {viewMode === 'MAP' ? (
          <div className="h-[600px] w-full bg-gray-200 rounded-3xl border border-white/60 flex items-center justify-center shadow-inner">
            <p className="text-gray-500 font-medium">Harita görünümü yakında aktif edilecek...</p>
          </div>
        ) : (
          <>
            {loading || isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white/50 h-[400px] rounded-[32px] border border-white/40" />
                ))}
              </div>
            ) : vendors.length === 0 ? (
              <div className="py-24 text-center bg-white/50 backdrop-blur-md rounded-[32px] border border-white/60 shadow-sm">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Arama kriterlerinize uygun bir firma bulamadık. Lütfen filtreleri esneterek tekrar deneyin.
                </p>
                <button 
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </PublicPageLayout>
  );
}