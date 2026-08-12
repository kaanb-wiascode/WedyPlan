'use client';

import React from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/homepage/PublicFooter';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

export default function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <div className="apple-page flex min-h-screen flex-col">
      <PublicNavbar mode="public" />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
