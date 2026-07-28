"use client";

import React, { useState } from "react";
import { Sparkles, X, Search, Mic, ArrowRight } from "lucide-react";

interface AiQuickSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPrompt?: (prompt: string) => void;
}

export const AiQuickActionSheet: React.FC<AiQuickSheetProps> = ({
  isOpen,
  onClose,
  onSubmitPrompt,
}) => {
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (onSubmitPrompt) onSubmitPrompt(prompt);
    setPrompt("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-[#F5F4F0] rounded-t-[36px] border-t border-white/80 p-6 shadow-2xl space-y-6 animate-in slide-in-from-bottom duration-300">
        {/* Gestures Handle */}
        <div className="w-12 h-1.5 bg-black/20 rounded-full mx-auto" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#111111]" />
            <h3 className="font-serif-editorial text-xl font-semibold text-[#111111]">
              WedyAI Mobil Asistan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örn: Kadıköy'de 300 kişilik kır düğünü mekanı bul..."
              className="w-full h-14 pl-12 pr-12 bg-white/80 backdrop-blur-md border border-black/10 rounded-2xl text-sm text-[#111111] placeholder:text-[#86868B] outline-none focus:border-[#111111] transition-all"
            />
            <Search className="w-5 h-5 text-[#86868B] absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#111111]"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#F5F4F0] text-xs font-semibold rounded-xl shadow-md hover:bg-[#222222] transition-all"
            >
              <span>Aramayı Başlat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};