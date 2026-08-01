import React from 'react';
import { VendorSidebar } from '@/components/vendor/organisms/VendorSidebar';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-zinc-900 dark:text-zinc-100 flex font-sans antialiased">
      {/* Sol Menü */}
      <VendorSidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}