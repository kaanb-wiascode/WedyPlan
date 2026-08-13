'use client';

import React from 'react';
import CoupleSidebar from '@/components/couple/layout/CoupleSidebar';
import { ShadowModeHost } from '@/components/admin/ShadowModeHost';

export default function CouplePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="apple-page flex min-h-screen">
      <ShadowModeHost />
      <CoupleSidebar />
      <div className="flex min-w-0 flex-1 flex-col pt-0">
        <main className="relative z-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
