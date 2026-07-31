'use client';

import React from 'react';
import { Ghost, ShieldAlert, LogOut } from 'lucide-react';

interface ShadowModeBarProps {
  targetName: string;
  role: string;
  onExit: () => void;
}

export function ShadowModeBar({ targetName, role, onExit }: ShadowModeBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white px-6 py-2.5 z-50 flex items-center justify-between shadow-xl backdrop-blur-md font-sans border-b border-amber-400/30 animate-in slide-in-from-top duration-300">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-black/20 text-white animate-pulse">
          <Ghost className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">GÖLGE MODU AKTİF</span>
          <span>Şu an <strong className="underline underline-offset-2">{targetName}</strong> ({role}) olarak oturum izliyorsunuz.</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] opacity-90 hidden sm:inline-flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5" /> Salt-Okunur Güvenli İzleme
        </span>
        <button
          onClick={onExit}
          className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Gölge Modundan Çık</span>
        </button>
      </div>
    </div>
  );
}