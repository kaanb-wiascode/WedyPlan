'use client';

import React from 'react';
import { PLATFORM_FEATURES } from '@/lib/data/homepage-data';
import { Sparkles, CalendarCheck, ShieldCheck, Wallet } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Wallet
};

export const PlatformFeaturesBento: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block">Mimari Farkımız</span>
        <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#1D1D1F]">WedyPlan WOS Ekosistemi</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PLATFORM_FEATURES.map((feat) => {
          const IconComponent = iconMap[feat.icon] || Sparkles;
          return (
            <div
              key={feat.id}
              className={`bg-white/40 backdrop-blur-3xl border border-white/80 p-8 rounded-[36px] shadow-xs space-y-4 ${feat.colSpan || ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1D1D1F] flex items-center justify-center shadow-xs">
                  <IconComponent className="w-6 h-6 text-[#E6007E]" />
                </div>
                <span className="text-[10px] font-bold bg-[#E6007E]/10 text-[#E6007E] px-3 py-1 rounded-full border border-pink-200">
                  {feat.badge}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">{feat.subtitle}</span>
                <h3 className="font-serif font-bold text-[24px] text-[#1D1D1F]">{feat.title}</h3>
              </div>

              <p className="text-[14px] text-[#6E6E73] font-light leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};