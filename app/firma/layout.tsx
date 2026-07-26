import React from 'react';
import { VendorSidebar } from '@/components/vendor/organisms/VendorSidebar';
import { Command } from 'lucide-react';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] via-[#F1F3F6] to-[#E9ECF0] text-[#1D1D1F] font-sans flex">
      {/* Sol Sabit Menü */}
      <VendorSidebar />

      {/* Sağ Ana Alan */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Üst Bar Header */}
        <header className="h-20 bg-white/30 backdrop-blur-2xl border-b border-white/60 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/50 border border-white rounded-full text-[12px] text-[#6E6E73]">
            <Command className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hızlı Arama veya Komut Çalıştır (⌘K)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WedyAI Canlı Sync</span>
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