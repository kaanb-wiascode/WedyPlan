'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Palette } from 'lucide-react';
import { THEME_PALETTES } from '@/lib/constants';
import { GlassCard } from '@/components/atoms/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSelectorProps {
  activeTheme: keyof typeof THEME_PALETTES;
  onSelectTheme: (key: keyof typeof THEME_PALETTES) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ activeTheme, onSelectTheme }) => {
  const currentPalette = THEME_PALETTES[activeTheme];

  return (
    <GlassCard as="section" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8">
      <div className="md:col-span-5 space-y-4">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
          <Palette className="w-3.5 h-3.5" /> Konsept & Atmosfer
        </div>
        <h2 className="text-[28px] md:text-[32px] font-serif font-normal text-[#1D1D1F] leading-tight">
          Kendi Düğün İmzanızı Keşfedin
        </h2>
        <p className="text-[13px] md:text-[14px] text-[#6E6E73] font-light leading-relaxed">
          Sıradan temaları unutun. Düğününüzün ruhunu yansıtacak konsepti seçin ve WedyAI'ın sizin için mükemmel dekorasyon fikirlerini üretmesine izin verin.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {(Object.keys(THEME_PALETTES) as Array<keyof typeof THEME_PALETTES>).map((key) => {
            const isActive = activeTheme === key;
            return (
              <button
                key={key}
                onClick={() => onSelectTheme(key)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-[12px] md:text-[13px] font-medium transition-all duration-300 min-h-[44px] ${
                  isActive
                    ? 'bg-white/90 backdrop-blur-xl text-[#1D1D1F] shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-white'
                    : 'bg-white/20 hover:bg-white/40 text-[#6E6E73] backdrop-blur-md border border-white/40'
                }`}
              >
                {THEME_PALETTES[key].name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-7 bg-white/50 backdrop-blur-2xl border border-white/90 p-6 md:p-8 rounded-[28px] shadow-sm flex flex-col justify-between min-h-[220px]">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-serif text-[18px] font-semibold text-[#1D1D1F]">
              {currentPalette.name}
            </h3>
            <p className="text-[12px] text-[#6E6E73] max-w-[80%]">
              {currentPalette.description}
            </p>
          </div>
          <Link 
            href="/ilham" 
            aria-label="Tüm ilham panosunu gör"
            className="text-[12px] text-[#D4AF37] font-bold hover:underline flex items-center gap-1 shrink-0 bg-white/60 px-3 py-1.5 rounded-full"
          >
            Tamamını Gör <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex h-20 w-full rounded-2xl overflow-hidden shadow-inner border border-white/40 mt-6">
          <AnimatePresence mode="popLayout">
            {currentPalette.colors.map((color, idx) => (
              <motion.div
                key={`${activeTheme}-${color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4, ease: 'easeOut' }}
                className="flex-1 flex items-end justify-center pb-2 group relative cursor-pointer"
                style={{ backgroundColor: color }}
                title={`Renk Kodu: ${color}`}
              >
                <span className="text-white text-[11px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded-md backdrop-blur-md">
                  {color}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
};