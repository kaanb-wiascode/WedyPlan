'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Building2, Users, Calculator, Sparkles } from 'lucide-react';
import { SEARCH_DEFAULTS, CITIES, CATEGORIES, APP_CONFIG } from '@/lib/constants';
import { GlassButton } from '@/components/atoms/GlassButton';
import { motion } from 'framer-motion';

export const HeroSearchGlass: React.FC = () => {
  const [filters, setFilters] = useState({
    city: SEARCH_DEFAULTS.CITY,
    category: SEARCH_DEFAULTS.CATEGORY,
    guestCount: SEARCH_DEFAULTS.GUEST_COUNT,
  });
  const [budget, setBudget] = useState<number>(SEARCH_DEFAULTS.BUDGET);

  const matchedVenuesCount = Math.max(12, Math.floor((budget / 1000) * (filters.guestCount / 100) / 12));

  const handleFilterChange = (key: keyof typeof filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-12 bg-white/35 backdrop-blur-3xl border border-white/80 rounded-[40px] p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.04)] max-w-[950px] mx-auto text-left space-y-6 relative z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-black/[0.05]">
        {[
          { id: 'city', icon: MapPin, label: 'Bölge Seçin', options: CITIES },
          { id: 'category', icon: Building2, label: 'Mekan Tarzı', options: CATEGORIES },
          { id: 'guestCount', icon: Users, label: 'Tahmini Davetli', options: [
            { value: 100, label: '100 Kişi (Butik)' },
            { value: 250, label: '250 Kişi (Standart)' },
            { value: 500, label: '500 Kişi (Görkemli)' },
            { value: 750, label: '750+ Kişi (Mega)' },
          ]},
        ].map((field) => (
          <div key={field.id} className="space-y-2 px-2">
            <label htmlFor={field.id} className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1.5">
              <field.icon className="w-3.5 h-3.5 text-[#D4AF37]" /> {field.label}
            </label>
            <select
              id={field.id}
              value={filters[field.id as keyof typeof filters]}
              onChange={(e) => handleFilterChange(field.id as keyof typeof filters, e.target.value)}
              className="w-full h-[46px] px-3 bg-white/40 focus:bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl font-medium text-[14px] text-[#1D1D1F] outline-none cursor-pointer transition-colors shadow-inner"
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2 px-2">
        <div className="w-full md:w-3/5 space-y-4">
          <div className="flex justify-between items-center text-[12px] md:text-[13px]">
            <span className="font-medium text-[#6E6E73] flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#D4AF37]" /> Toplam Düğün Bütçeniz:
            </span>
            <motion.span 
              key={budget}
              initial={{ scale: 1.1, color: '#D4AF37' }}
              animate={{ scale: 1, color: '#1D1D1F' }}
              className="font-mono font-bold text-[15px] md:text-[16px] bg-white/70 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/90 shadow-sm"
            >
              {budget.toLocaleString('tr-TR')} {APP_CONFIG.CURRENCY}
            </motion.span>
          </div>
          <div className="relative w-full flex items-center h-4">
            <input
              type="range"
              aria-label="Bütçe belirle"
              min={SEARCH_DEFAULTS.MIN_BUDGET}
              max={SEARCH_DEFAULTS.MAX_BUDGET}
              step={SEARCH_DEFAULTS.BUDGET_STEP}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-black/10 rounded-full appearance-none cursor-pointer accent-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            />
          </div>
        </div>

        <div className="w-full md:w-2/5 shrink-0">
          <Link href={`/mekanlar?kategori=${filters.category}&sehir=${filters.city}&butce=${budget}`} passHref>
            <GlassButton 
              variant="primary" 
              leftIcon={<Sparkles className="w-4 h-4 text-[#D4AF37]" />}
              className="w-full h-[54px] shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
            >
              Yapay Zeka ile {matchedVenuesCount} Mekan Bul
            </GlassButton>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};