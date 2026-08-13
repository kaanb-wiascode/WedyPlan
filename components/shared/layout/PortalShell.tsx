'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';

export function PortalShell({
  children,
  sidebar,
  logoVariant = 'main',
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  logoVariant?: 'main' | 'couple' | 'vendor' | 'admin';
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="apple-page flex min-h-dvh overflow-x-hidden">
      <header className="apple-glass-nav fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-3 px-4 lg:hidden">
        <BrandLogo variant={logoVariant} size="nav" />
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-black/5"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(18.5rem,88vw)] overflow-y-auto bg-[#fbfbfd] shadow-[8px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-200 lg:static lg:z-auto lg:w-auto lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebar}
      </div>

      <div className="min-w-0 flex-1 pt-16 lg:pt-0">{children}</div>
    </div>
  );
}

export default PortalShell;
