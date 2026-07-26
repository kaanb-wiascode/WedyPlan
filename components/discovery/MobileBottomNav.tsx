'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Sparkles, MessageSquare, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-t border-white/80 px-6 py-2 flex items-center justify-between text-[10px] font-bold text-[#6E6E73] shadow-lg">
      <Link href="/firmalar" className="flex flex-col items-center gap-0.5 text-[#E6007E]">
        <Compass className="w-5 h-5" />
        <span>Keşfet</span>
      </Link>
      <Link href="/cift/firmalarim" className="flex flex-col items-center gap-0.5 hover:text-[#1D1D1F]">
        <Heart className="w-5 h-5" />
        <span>Favoriler</span>
      </Link>
      <Link href="/cift" className="flex flex-col items-center gap-0.5 hover:text-[#1D1D1F]">
        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        <span>AI Asistan</span>
      </Link>
      <Link href="/giris" className="flex flex-col items-center gap-0.5 hover:text-[#1D1D1F]">
        <User className="w-5 h-5" />
        <span>Hesabım</span>
      </Link>
    </div>
  );
};