'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { MagazineArticle } from '@/types/wedding-magazine';

interface MagazineHeroFeaturedProps {
  article: MagazineArticle;
}

export const MagazineHeroFeatured: React.FC<MagazineHeroFeaturedProps> = ({ article }) => {
  return (
    <section className="pt-28 pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-[40px] overflow-hidden bg-[#1D1D1F] border border-white/80 shadow-2xl min-h-[500px] flex items-end p-6 sm:p-12"
      >
        {/* Background Editorial Cover */}
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-75 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-transparent" />

        {/* Floating Glass Editorial Content */}
        <div className="relative z-10 max-w-3xl space-y-4 bg-white/20 backdrop-blur-3xl p-6 sm:p-8 rounded-[32px] border border-white/30 text-white">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E6007E] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Editörün Seçimi
            </span>
            <span className="text-[11px] font-semibold text-white/80 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} Dk Okuma
            </span>
          </div>

          <h1 className="font-serif font-bold text-[28px] sm:text-[42px] leading-tight text-white">
            {article.title}
          </h1>

          <p className="text-[14px] sm:text-[16px] text-white/90 font-light line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-white/20">
            <div className="flex items-center gap-2 text-[12px]">
              <img src={article.author.avatarUrl} alt={article.author.name} className="w-8 h-8 rounded-full border border-white object-cover" />
              <span className="font-semibold">{article.author.name}</span>
            </div>

            <Link
              href={`/blog/${article.slug}`}
              className="bg-white text-[#1D1D1F] hover:bg-slate-100 px-6 py-2.5 rounded-full font-bold text-[12px] transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Makaleyi Okuyun</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6007E]" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};