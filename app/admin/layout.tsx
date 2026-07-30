'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* 
        1. Menü Sol Tarafta Sabit Kalır (Sticky / Fixed)
        Sayfa değişse bile menü hiçbir şekilde kaybolmaz veya yenilenmez.
      */}
      <AdminSidebar />

      {/* 
        2. Sağ İçerik Alanı
        Menüde tıkladığın her alt sayfa (Çiftler, Finans, AI Agentlar vb.)
        menüyü etkilemeden bu dinamik alanın içinde yüklenir.
      */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}