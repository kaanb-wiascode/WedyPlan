'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Search, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [promptInput, setPromptInput] = useState('');

  return (
    <section className="relative pt-32 sm:pt-44 pb-20 px-6 max-w-7xl mx-auto text-center space-y-10 overflow-hidden">
      {/* Background Soft Sheen */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-pink-200/40 via-purple-100/20 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Main Title & Value Sheen Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white text-[12px] font-bold text-[#E6007E] shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Supported Wedding Commerce Operating System</span>
        </div>

        <h1 className="text-[40px] sm:text-[64px] lg:text-[76px] font-serif font-normal leading-[1.08] tracking-tight text-[#1D1D1F]">
          Hayalinizdeki Düğünü <br className="hidden sm:block" />
          <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37]">
            Akıllı Zeka İle Yönlendirin.
          </span>
        </h1>

        <p className="text-[16px] sm:text-[20px] text-[#6E6E73] max-w-2xl mx-auto leading-relaxed font-light">
          Seçkin düğün mekanları ve onaylı profesyonellerle buluşun; çakışmasız takvimden e-imza sözleşmelere kadar her aşamayı tek ekrandan yönetin.
        </p>
      </motion.div>

      {/* Liquid Glass Natural Language Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white/50 backdrop-blur-2xl p-3 rounded-[32px] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 flex-1 w-full px-4 py-1">
            <Sparkles className="w-5 h-5 text-[#E6007E] shrink-0 animate-pulse" />
            <input
              type="text"
              placeholder="WedyAI'a anlatın: 'İstanbul Anadolu yakasında 500 kişilik kır bahçesi...'"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
            />
          </div>

          <Link
            href={`/firmalar?q=${encodeURIComponent(promptInput)}`}
            className="w-full sm:w-auto bg-[#1D1D1F] hover:bg-black text-white px-8 py-3.5 rounded-[22px] font-bold text-[13px] transition flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Akıllı Arama</span>
          </Link>
        </div>
      </motion.div>

      {/* Quick CTAs & Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[12px] font-semibold text-[#6E6E73]"
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>%100 Onaylı İşletmeler</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#E6007E]" />
          <span>Sıfır Komisyon Çift Modu</span>
        </div>
      </motion.div>
    </section>
  );
};