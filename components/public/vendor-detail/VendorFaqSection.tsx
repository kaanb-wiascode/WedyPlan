'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface FaqItem {
  question: string;
  answer: string;
}

interface VendorFaqSectionProps {
  faq?: FaqItem[];
}

export const VendorFaqSection: React.FC<VendorFaqSectionProps> = ({ faq = [] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // İlk soru varsayılan olarak açık gelsin

  if (!faq.length) return null;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-6">
      {/* Bölüm Başlığı */}
      <div className="flex items-center gap-2 px-2">
        <HelpCircle className="w-6 h-6 text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sıkça Sorulan Sorular</h2>
      </div>

      <GlassCard className="p-2 md:p-4 border-white/40">
        <div className="flex flex-col gap-2">
          {faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`border border-transparent rounded-2xl transition-all duration-300 ${
                  isOpen ? 'bg-white/60 shadow-sm border-white/80' : 'hover:bg-white/30'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-[15px] pr-4 ${isOpen ? 'text-[#E6007E]' : 'text-gray-800'}`}>
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#E6007E]/10 rotate-180' : 'bg-gray-100'}`}>
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#E6007E]' : 'text-gray-500'}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-gray-600 font-light text-[14px] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
};