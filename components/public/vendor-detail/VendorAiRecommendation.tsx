'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface VendorAiRecommendationProps {
  suggestedQuestions: string[];
}

export const VendorAiRecommendation: React.FC<VendorAiRecommendationProps> = ({ suggestedQuestions }) => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-6 rounded-[32px] space-y-3">
      <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-wider block">WedyAI Tavsiyesi</span>
      <h4 className="font-serif font-bold text-[16px] text-[#1D1D1F]">Firmaya Sorabileceğiniz Sorular</h4>
      <ul className="space-y-2 text-[12px] text-[#6E6E73]">
        {suggestedQuestions.map((q: string, idx: number) => (
          <li key={idx} className="p-2.5 bg-white/80 rounded-xl border border-white">💡 {q}</li>
        ))}
      </ul>
    </div>
  );
};