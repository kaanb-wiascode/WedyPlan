'use client';

import React from 'react';
import { HOW_IT_WORKS_STEPS } from '@/lib/data/homepage-data';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-widest block">Adım Adım Süreç</span>
        <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#1D1D1F]">Nasıl Çalışır?</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <div key={step.stepNumber} className="bg-white/50 backdrop-blur-2xl p-6 rounded-[28px] border border-white space-y-3">
            <span className="font-serif font-bold text-[36px] text-[#E6007E]/40 block">{step.stepNumber}</span>
            <h3 className="font-bold text-[16px] text-[#1D1D1F]">{step.title}</h3>
            <p className="text-[12px] text-[#6E6E73] font-light leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};