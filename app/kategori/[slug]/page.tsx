import React from 'react';
import { notFound } from 'next/navigation';
import { CATEGORY_DATABASE } from '@/lib/data/category-page-data';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { CategoryHero } from '@/components/public/category-page/CategoryHero';
import { CategoryFilters } from '@/components/public/category-page/CategoryFilters';
import { CategoryPopularSearches } from '@/components/public/category-page/CategoryPopularSearches';
import { CategoryFeaturedVendors } from '@/components/public/category-page/CategoryFeaturedVendors';
import { CategoryArticles } from '@/components/public/category-page/CategoryArticles';
import { CategoryAiRecommendation } from '@/components/public/category-page/CategoryAiRecommendation';

export function generateStaticParams() {
  return Object.keys(CATEGORY_DATABASE).map((slug) => ({
    slug: slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const data = CATEGORY_DATABASE[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white">
      <PublicNavbar />

      <main className="pb-16">
        {/* 1. Category Specific Hero */}
        <CategoryHero data={data} />

        {/* 2. Intelligent Filters */}
        <CategoryFilters />

        {/* 3. Popular Search Pills */}
        <CategoryPopularSearches searches={data.popularSearches} />

        {/* 4. Featured Vendors Grid */}
        <CategoryFeaturedVendors vendors={data.featuredVendors} />

        {/* 5. AI Push Banner */}
        <CategoryAiRecommendation />

        {/* 6. Editorial Articles */}
        <CategoryArticles articles={data.articles} />
      </main>

      <PublicFooter />
    </div>
  );
}