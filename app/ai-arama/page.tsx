'use client';

import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { AiSearchHero } from '@/components/public/ai-search/AiSearchHero';
import { SuggestedPrompts } from '@/components/public/ai-search/SuggestedPrompts';
import { AiRecommendationCard } from '@/components/public/ai-search/AiRecommendationCard';
import { AiFilterPanel } from '@/components/public/ai-search/AiFilterPanel';
import { AiSearchResultCard } from '@/components/public/ai-search/AiSearchResultCard';
import { AiSearchLoadingSkeleton } from '@/components/public/ai-search/AiSearchLoadingSkeleton';
import { AiSearchEmptyState } from '@/components/public/ai-search/AiSearchEmptyState';
import { AiSearchFaq } from '@/components/public/ai-search/AiSearchFaq';
import type { AiSearchVendor, AiSearchFilterState } from '@/types/ai-search';

const EMPTY_FILTERS: AiSearchFilterState = {
  prompt: '',
  category: '',
  city: '',
  maxBudget: 0,
  minCapacity: 0,
  verifiedOnly: false,
  minRating: 0,
};

function AiSearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';

  const [prompt, setPrompt] = useState(initialQuery);
  const [isProcessing, setIsProcessing] = useState(true);
  const [vendors, setVendors] = useState<AiSearchVendor[]>([]);
  const [filters, setFilters] = useState<AiSearchFilterState>({
    ...EMPTY_FILTERS,
    prompt: initialQuery,
    category: initialCategory,
    city: initialCity,
  });

  const fetchVendors = useCallback(
    async (activePrompt: string, activeFilters: AiSearchFilterState) => {
      setIsProcessing(true);

      try {
        const params = new URLSearchParams();
        if (activePrompt.trim()) params.set('q', activePrompt.trim());
        if (activeFilters.category) params.set('category', activeFilters.category);
        if (activeFilters.city) params.set('city', activeFilters.city);
        if (activeFilters.maxBudget > 0) {
          params.set('maxBudget', String(activeFilters.maxBudget));
        }
        if (activeFilters.minCapacity > 0) {
          params.set('minCapacity', String(activeFilters.minCapacity));
        }
        if (activeFilters.minRating > 0) {
          params.set('minRating', String(activeFilters.minRating));
        }
        if (activeFilters.verifiedOnly) params.set('verifiedOnly', 'true');

        const response = await fetch(`/api/public/ai-search?${params.toString()}`, {
          cache: 'no-store',
        });
        const payload = (await response.json()) as {
          vendors?: AiSearchVendor[];
        };

        setVendors(response.ok && Array.isArray(payload.vendors) ? payload.vendors : []);
      } catch {
        setVendors([]);
      } finally {
        setIsProcessing(false);
      }
    },
    [],
  );

  useEffect(() => {
    const initialFilters = {
      ...EMPTY_FILTERS,
      prompt: initialQuery,
      category: initialCategory,
      city: initialCity,
    };
    void fetchVendors(initialQuery, initialFilters);
  }, [fetchVendors, initialCategory, initialCity, initialQuery]);

  const handleRunSearch = (queryOverride?: string) => {
    const activePrompt =
      queryOverride !== undefined ? queryOverride : prompt;
    const nextFilters = { ...filters, prompt: activePrompt };

    setPrompt(activePrompt);
    setFilters(nextFilters);
    void fetchVendors(activePrompt, nextFilters);
  };

  const handleFilterChange = (updated: Partial<AiSearchFilterState>) => {
    const nextFilters = { ...filters, ...updated };
    setFilters(nextFilters);
    void fetchVendors(nextFilters.prompt, nextFilters);
  };

  const handleResetFilters = () => {
    setPrompt('');
    setFilters(EMPTY_FILTERS);
    void fetchVendors('', EMPTY_FILTERS);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white pb-12 overflow-hidden relative">
      <PublicNavbar />

      <main className="space-y-10">
        <AiSearchHero
          prompt={prompt}
          onPromptChange={setPrompt}
          onSearch={() => handleRunSearch()}
          onReset={handleResetFilters}
          isProcessing={isProcessing}
        />

        <SuggestedPrompts
          onSelectPrompt={(selectedText) => handleRunSearch(selectedText)}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <AiFilterPanel
                filters={filters}
                onChangeFilter={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>

            <div className="lg:col-span-8 space-y-6">
              <AiRecommendationCard
                queryPrompt={filters.prompt}
                resultCount={vendors.length}
              />

              {isProcessing ? (
                <AiSearchLoadingSkeleton />
              ) : vendors.length === 0 ? (
                <AiSearchEmptyState onReset={handleResetFilters} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {vendors.map((vendor) => (
                    <AiSearchResultCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <AiSearchFaq />
      </main>

      <PublicFooter />
    </div>
  );
}

export default function AiSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">WedyAI Arama Motoru Yükleniyor...</div>}>
      <AiSearchContent />
    </Suspense>
  );
}
