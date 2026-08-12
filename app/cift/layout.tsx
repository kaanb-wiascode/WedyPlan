'use client';

import React from 'react';
import CoupleSidebar from '@/components/couple/layout/CoupleSidebar';

export default function CouplePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="apple-page flex min-h-screen">
      <CoupleSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="relative z-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
