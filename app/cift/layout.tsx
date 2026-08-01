'use client';

import React from 'react';
import CoupleSidebar from '@/components/couple/layout/CoupleSidebar'; // veya '@/components/couple/CoupleSidebar'

export default function CouplePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex font-sans">
      {/* Şık Glass Sidebar */}
      <CoupleSidebar />

      {/* İçerik Alanı */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}