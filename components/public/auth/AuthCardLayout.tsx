'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

interface AuthCardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerMessage?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  navRightLabel?: string;
  navRightHref?: string;
  logoVariant?: 'couple' | 'vendor' | 'main';
}

export function AuthCardLayout({
  children,
  title,
  subtitle,
  footerMessage,
  footerLinkText,
  footerLinkHref,
  navRightLabel = 'Firma Girişi',
  navRightHref = '/giris?role=VENDOR',
  logoVariant = 'couple',
}: AuthCardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#0071e3]/10 blur-[90px]" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[380px] w-[380px] rounded-full bg-[#af52de]/12 blur-[100px]" />
        <div className="absolute bottom-20 left-[-60px] h-[280px] w-[280px] rounded-full bg-[#ff375f]/8 blur-[80px]" />
      </div>

      <header className="apple-glass-nav sticky top-0 z-20">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:h-[72px] sm:px-5">
          <Link href="/" className="flex items-center opacity-90 transition-opacity hover:opacity-100">
            <BrandLogo variant={logoVariant} size="auth" />
          </Link>
          <Link
            href={navRightHref}
            className="text-[13px] font-medium text-[#1d1d1f]/80 transition-colors hover:text-[#0071e3] sm:text-[14px]"
          >
            {navRightLabel}
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[420px] flex-col justify-center px-4 py-8 sm:px-5 sm:py-12">
        <div className="apple-glass rounded-[28px] px-7 py-9 sm:px-9 sm:py-10">
          <div className="mb-8 text-center">
            <p className="mb-2 text-[12px] font-normal tracking-[0.04em] text-[#86868b]">
              WedyPlan
            </p>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f] sm:text-[40px]">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-[34ch] text-[15px] font-normal leading-relaxed text-[#86868b]">
              {subtitle}
            </p>
          </div>

          {children}

          {(footerMessage || footerLinkHref) && (
            <div className="mt-8 border-t border-black/5 pt-6 text-center">
              {footerMessage && footerLinkText && footerLinkHref && (
                <p className="text-[14px] text-[#86868b]">
                  {footerMessage}{' '}
                  <Link
                    href={footerLinkHref}
                    className="font-medium text-[#0071e3] hover:underline"
                  >
                    {footerLinkText}
                  </Link>
                </p>
              )}
              <Link
                href="/"
                className="mt-3 inline-block text-[12px] text-[#86868b] transition-colors hover:text-[#1d1d1f]"
              >
                Ana sayfaya dön
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AuthCardLayout;
