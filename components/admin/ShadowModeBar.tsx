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
    <div className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between bg-[#0071e3] px-6 py-2.5 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-black/20 p-1.5">
          <Ghost className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="rounded bg-black/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            Yönetici oturumu
          </span>
          <span>
            Şu an <strong className="underline underline-offset-2">{targetName}</strong> ({role}) portalındasınız.
            Düzenleme yetkisi açık.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1 text-[11px] opacity-90 sm:inline-flex">
          <ShieldAlert className="h-3.5 w-3.5" /> İşlemler denetim kaydına yazılır
        </span>
        <button
          onClick={onExit}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1 text-xs font-bold text-white hover:bg-zinc-800"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Admin panele dön</span>
        </button>
      </div>
    </div>
  );
}
