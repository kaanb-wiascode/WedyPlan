'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface VendorFaqSectionProps {
  faq: { question: string; answer: string }[];
}

export const VendorFaqSection: React.FC<VendorFaqSectionProps> = ({ faq }) => {
  if (faq.length === 0) return null;

  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] space-y-4">
      <div className="flex items-center gap-2 text-[#E6007E] font-bold text-[13px]">
        <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
        <span>Mekan Hakkında Sıkça Sorulan Sorular</span>
      </div>

      <div className="space-y-3">
        {faq.map((item: { question: string; answer: string }, idx: number) => (
          <div key={idx} className="p-4 bg-white/80 rounded-[22px] border border-white space-y-1">
            <h4 className="font-bold text-[14px] text-[#1D1D1F]">{item.question}</h4>
            <p className="text-[12px] text-[#6E6E73] leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};