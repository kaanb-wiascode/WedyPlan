'use client';

import React, { useState } from 'react';
import { HOMEPAGE_FAQS } from '@/lib/data/homepage-data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 text-[#0071e3] border border-pink-200 rounded-full text-[11px] font-bold">
          <HelpCircle className="w-3.5 h-3.5" /> Sıkça Sorulan Sorular
        </div>
        <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#1D1D1F]">
          Aklınıza Takılan Sorular
        </h2>
      </div>

      <div className="space-y-3">
        {HOMEPAGE_FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white/50 backdrop-blur-2xl border border-white rounded-[24px] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
              >
                <span className="font-bold text-[16px] text-[#1D1D1F]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0071e3] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-[14px] text-[#6E6E73] font-light leading-relaxed border-t border-black/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};