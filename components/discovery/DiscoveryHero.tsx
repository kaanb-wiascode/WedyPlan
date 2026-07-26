'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search } from 'lucide-react';
import { AI_NATURAL_PROMPTS } from '@/lib/vendor-discovery-constants';

interface DiscoveryHeroProps {
  promptValue: string;
  onPromptChange: (val: string) => void;
  onSearchSubmit: () => void;
}

export const DiscoveryHero: React.FC<DiscoveryHeroProps> = ({ promptValue, onPromptChange, onSearchSubmit }) => {
  return (
    <section className="relative pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
      {/* Background Sheen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#E6007E]/10 via-[#D4AF37]/15 to-purple-500/10 blur-[120px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white text-[12px] font-bold text-[#E6007E] shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Akıllı Danışman & Keşif Motoru</span>
        </div>

        <h1 className="text-[32px] sm:text-[52px] font-serif font-normal text-[#1D1D1F] leading-tight tracking-tight">
          Hayalinizdeki Düğünü Oluşturacak <br className="hidden sm:block" />
          <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37]">
            Kusursuz Ekipleri Keşfedin.
          </span>
        </h1>
      </motion.div>

      {/* AI Natural Language Input Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto space-y-3"
      >
        <div className="relative bg-white/50 backdrop-blur-3xl p-3 sm:p-4 rounded-[32px] border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 flex-1 w-full px-4">
            <Sparkles className="w-5 h-5 text-[#E6007E] shrink-0" />
            <input
              type="text"
              placeholder="WedyAI'a anlatın: 'İstanbul Anadolu yakasında 500 kişilik kır düğünü...'"
              value={promptValue}
              onChange={(e) => onPromptChange(e.target.value)}
              className="w-full text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
            />
          </div>

          <button
            onClick={onSearchSubmit}
            className="w-full sm:w-auto bg-[#1D1D1F] hover:bg-black text-white px-8 py-3.5 rounded-[22px] font-bold text-[13px] transition flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Akıllı Bul</span>
          </button>
        </div>

        {/* Quick Natural Language Pill Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mr-1">Örnekler:</span>
          {AI_NATURAL_PROMPTS.slice(0, 2).map((prompt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => onPromptChange(prompt)}
              className="text-[11px] font-semibold text-[#1D1D1F]/70 bg-white/60 hover:bg-white border border-white/80 px-3 py-1 rounded-full transition cursor-pointer shadow-2xs"
            >
              "{prompt.substring(0, 38)}..."
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};