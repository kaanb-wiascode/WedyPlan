'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { CategoryArticle } from '@/types/category-page';

export const CategoryArticles: React.FC<{ articles: CategoryArticle[] }> = ({ articles }) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-[#E6007E]" />
        <h2 className="font-serif font-bold text-[28px] text-[#1D1D1F]">Rehber & İlham</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="group flex flex-col sm:flex-row gap-4 bg-white/40 backdrop-blur-2xl p-4 rounded-[28px] border border-white cursor-pointer hover:shadow-md transition">
            <img src={article.imageUrl} alt={article.title} className="w-full sm:w-32 h-32 rounded-[20px] object-cover shrink-0" />
            <div className="space-y-2 flex-1 pt-1">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{article.readTime}</span>
              <h4 className="font-bold text-[16px] text-[#1D1D1F] group-hover:text-[#E6007E] transition line-clamp-2">{article.title}</h4>
              <p className="text-[12px] text-[#6E6E73] line-clamp-2">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};