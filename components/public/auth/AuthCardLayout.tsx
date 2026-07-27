'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck } from 'lucide-react';

interface AuthCardLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerLinkText?: string;
  footerLinkHref?: string;
  footerMessage?: string;
}

export const AuthCardLayout: React.FC<AuthCardLayoutProps> = ({
  title,
  subtitle,
  children,
  footerLinkText,
  footerLinkHref,
  footerMessage
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient Sheen Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-pink-300/20 via-purple-200/20 to-amber-200/20 blur-[140px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/60 backdrop-blur-3xl border border-white/90 p-8 sm:p-10 rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6 relative"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#E6007E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif font-bold text-[22px] text-[#1D1D1F] tracking-tight">
              WedyPlan
            </span>
          </Link>

          <h1 className="font-serif font-bold text-[26px] text-[#1D1D1F] pt-2">
            {title}
          </h1>

          <p className="text-[13px] text-[#6E6E73] font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Form Content */}
        <div>{children}</div>

        {/* Footer Redirect & Security Badge */}
        <div className="pt-4 border-t border-black/5 text-center space-y-3">
          {footerMessage && footerLinkHref && footerLinkText && (
            <p className="text-[12px] text-[#6E6E73]">
              {footerMessage}{' '}
              <Link href={footerLinkHref} className="font-bold text-[#E6007E] hover:underline">
                {footerLinkText}
              </Link>
            </p>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 w-fit mx-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Uçtan Uca Şifreli Güvenlik</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};