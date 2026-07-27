'use client';

import React, { useState, useEffect } from 'react';
import { Command, Search, ArrowRight, Sparkles, X, FileText, Calendar, DollarSign, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-slate-200 dark:border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-black/5 dark:border-zinc-800">
          <Search className="w-5 h-5 text-[#E6007E] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Bir komut veya sayfa arayın... (Örn: 'Bütçe', 'Masa Düzeni', 'Teklifler')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-[14px] font-medium text-[#1D1D1F] dark:text-white bg-transparent outline-none placeholder:text-[#86868B]"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-bold bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-md border border-slate-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Quick Command Suggestions */}
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
            Hızlı Kısayollar
          </span>

          <div className="space-y-1 text-[13px] font-medium text-[#1D1D1F] dark:text-white">
            <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Budget OS & Bütçe Kalemleri</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#E6007E]" />
                <span>Davetli Listesi & LCV Yönetimi</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>WOS Çakışmasız Takvim Takibi</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 border-t border-black/5 dark:border-zinc-800 flex items-center justify-between text-[11px] text-[#86868B]">
          <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyAI Akıllı Navigasyon</span>
          <span>Seçmek için ENTER'a basın</span>
        </div>
      </motion.div>
    </div>
  );
};