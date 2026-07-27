'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AiPromptInputProps {
  placeholder?: string;
  onSubmitPrompt: (promptText: string) => void;
  isLoading?: boolean;
}

export const AiPromptInput: React.FC<AiPromptInputProps> = ({
  placeholder = "WedyAI'a bir şey sorun veya komut verin...",
  onSubmitPrompt,
  isLoading = false
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmitPrompt(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-3xl w-full mx-auto">
      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 p-1 rounded-[32px] shadow-lg">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl rounded-[28px] p-2 flex items-center gap-3 px-4 border border-white/90 dark:border-zinc-800">
          <Sparkles className="w-5 h-5 text-[#E6007E] shrink-0 animate-pulse" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] dark:text-white bg-transparent outline-none placeholder:text-[#86868B]"
          />
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] p-3 rounded-2xl hover:bg-black transition cursor-pointer disabled:opacity-40 shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};