'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, RotateCcw } from 'lucide-react';

interface AiSearchHeroProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onSearch: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const AiSearchHero: React.FC<AiSearchHeroProps> = ({
  prompt,
  onPromptChange,
  onSearch,
  onReset,
  isProcessing
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <section className="relative pt-28 pb-10 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-6">
      {/* Glow Sheen Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-pink-300/30 via-purple-200/20 to-amber-200/20 blur-[120px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white text-[12px] font-bold text-[#E6007E] shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Natural Language Search Engine</span>
        </div>

        <h1 className="text-[32px] sm:text-[50px] font-serif font-normal text-[#1D1D1F] leading-tight tracking-tight">
          Aradığınız Düğün Hizmetini <br className="hidden sm:block" />
          <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#E6007E] to-[#D4AF37]">
            Kendi Cümlelerinizle Yazın.
          </span>
        </h1>

        <p className="text-[14px] sm:text-[16px] text-[#6E6E73] max-w-xl mx-auto font-light">
          Karmaşık filtreler arasında kaybolmayın. Bütçenizi, kişi sayınızı ve hayalinizdeki konsepti anlatın, WedyAI anında eşleştirsin.
        </p>
      </motion.div>

      {/* AI Search Bar Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white/60 backdrop-blur-3xl p-3 sm:p-4 rounded-[32px] border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 flex-1 w-full px-4 py-1">
            <Sparkles className={`w-5 h-5 text-[#E6007E] shrink-0 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`} />
            <input
              type="text"
              placeholder="Örn: 'İstanbul'da 400 kişilik kır bahçesi ve fotoğrafçı dahil 300.000 ₺...'"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-[14px] sm:text-[15px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
            />
            {prompt && (
              <button
                onClick={onReset}
                title="Aramayı Temizle"
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onSearch}
            disabled={isProcessing}
            className="w-full sm:w-auto bg-[#1D1D1F] hover:bg-black text-white px-8 py-3.5 rounded-[22px] font-bold text-[13px] transition flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>{isProcessing ? 'WedyAI Düşünüyor...' : 'AI İle Bul'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};