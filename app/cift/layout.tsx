import React from 'react';
import { CoupleSidebar } from '@/components/couple/CoupleSidebar';
import { Heart, Sparkles } from 'lucide-react';

export default function CoupleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-[#F8F5FF] to-[#F1F5FE] text-[#1D1D1F] font-sans flex">
      <CoupleSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white/30 backdrop-blur-2xl border-b border-white/60 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1D1D1F]">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <span>Selin & Kaan'ın Düğün Planı</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-pink-500/15 to-purple-500/15 text-[#E6007E] border border-pink-200 rounded-full text-[12px] font-bold shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#E6007E]" />
            <span>Düğüne Son 20 Gün!</span>
          </div>
        </header>

        {/* Sayfa İçeriği */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}