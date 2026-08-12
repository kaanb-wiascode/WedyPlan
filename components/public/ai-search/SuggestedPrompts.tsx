'use client';

import React from 'react';
import { SUGGESTED_PROMPTS } from '@/lib/data/ai-search-data';
import { Sparkles } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (text: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-2 text-center">
      <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
        Örnek Arama Cümleleri
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SUGGESTED_PROMPTS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.text)}
            className="text-[12px] font-medium text-[#1D1D1F] bg-white/60 hover:bg-white border border-white/80 px-3.5 py-1.5 rounded-full transition shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#0071e3]" />
            <span>"{item.text}"</span>
          </button>
        ))}
      </div>
    </div>
  );
};