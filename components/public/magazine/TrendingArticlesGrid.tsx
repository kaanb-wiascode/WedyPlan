'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { MagazineArticle } from '@/types/wedding-magazine';

interface TrendingArticlesGridProps {
  articles: MagazineArticle[];
}

export const TrendingArticlesGrid: React.FC<TrendingArticlesGridProps> = ({ articles }) => {
  return (
    <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-[#0071e3]">
        <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="font-serif font-bold text-[26px] text-[#1D1D1F]">Haftanın En Çok Okunan Trendleri</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art: MagazineArticle) => (
          <div key={art.id} className="group bg-white/50 backdrop-blur-2xl border border-white/90 rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl transition flex flex-col justify-between">
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <span className="absolute top-4 left-4 text-[10px] font-bold bg-white/90 backdrop-blur-md text-[#1D1D1F] px-3 py-1 rounded-full border border-white">
                  {art.category}
                </span>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#86868B]">
                  <Clock className="w-3.5 h-3.5" /> {art.readTimeMinutes} Dk Okuma • {art.publishedAt}
                </div>
                <Link href={`/blog/${art.slug}`}>
                  <h3 className="font-serif font-bold text-[18px] text-[#1D1D1F] group-hover:text-[#0071e3] transition line-clamp-2">
                    {art.title}
                  </h3>
                </Link>
                <p className="text-[12px] text-[#6E6E73] font-light line-clamp-2">{art.excerpt}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-black/5 mt-2 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1D1D1F]">
                <img src={art.author.avatarUrl} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{art.author.name}</span>
              </div>
              <Link href={`/blog/${art.slug}`} className="p-2 bg-slate-100 rounded-full text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition">
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};