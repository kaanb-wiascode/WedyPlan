'use client';

import React, { useState } from 'react';
import { AI_SEARCH_FAQS } from '@/lib/data/ai-search-data';
import { ChevronDown, Bot } from 'lucide-react';

export const AiSearchFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-ai-1');

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 text-[#0071e3] border border-pink-200 rounded-full text-[11px] font-bold">
          <Bot className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyAI Arama Rehberi
        </div>
        <h2 className="font-serif font-bold text-[26px] text-[#1D1D1F]">
          Yapay Zeka Araması Hakkında
        </h2>
      </div>

      <div className="space-y-3">
        {AI_SEARCH_FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white/50 backdrop-blur-2xl border border-white rounded-[24px] overflow-hidden transition shadow-2xs"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
              >
                <span className="font-bold text-[15px] text-[#1D1D1F]">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-[#0071e3] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-[13px] text-[#6E6E73] font-light leading-relaxed border-t border-black/5 pt-3">
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