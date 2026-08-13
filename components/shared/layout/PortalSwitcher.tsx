'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PortalType } from '@/types/auth-core';
import { Heart, Store, ShieldCheck, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortalSwitcherProps {
  activePortal: PortalType;
  allowedPortals: PortalType[];
}

const PORTAL_METADATA: Record<PortalType, { name: string; icon: React.ElementType; color: string; href: string }> = {
  PUBLIC: { name: 'Public Website', icon: Globe, color: 'text-blue-500', href: '/' },
  COUPLE: { name: 'Çift paneli', icon: Heart, color: 'text-[#E6007E]', href: '/cift/dashboard' },
  VENDOR: { name: 'Firma paneli', icon: Store, color: 'text-[#D4AF37]', href: '/firma/dashboard' },
  ADMIN: { name: 'Admin paneli', icon: ShieldCheck, color: 'text-purple-600', href: '/admin' },
};

export const PortalSwitcher: React.FC<PortalSwitcherProps> = ({ activePortal, allowedPortals }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const currentInfo = PORTAL_METADATA[activePortal] || PORTAL_METADATA.PUBLIC;
  const ActiveIcon = currentInfo.icon;

  const handleSwitch = async (targetPortal: PortalType) => {
    setIsOpen(false);
    if (targetPortal === 'PUBLIC') {
      router.push('/');
      return;
    }

    try {
      const response = await fetch('/api/v1/auth/switch-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portal: targetPortal }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        return;
      }
      window.location.assign(data.redirectUrl || PORTAL_METADATA[targetPortal].href);
    } catch {
      window.location.assign(PORTAL_METADATA[targetPortal].href);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Portal Değiştir"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-zinc-800/60 hover:bg-white dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 text-[12px] font-bold text-[#1D1D1F] dark:text-white transition shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E]"
      >
        <ActiveIcon className={`w-3.5 h-3.5 ${currentInfo.color}`} />
        <span className="hidden sm:inline-block">{currentInfo.name}</span>
        <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute top-full left-0 mt-2 w-56 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 z-50 space-y-1"
          >
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider px-3 py-1 block">
              Geçiş Yapılabilecek Portallar
            </span>

            {allowedPortals.map((portal) => {
              const meta = PORTAL_METADATA[portal];
              const IconComp = meta.icon;
              const isCurrent = portal === activePortal;

              return (
                <button
                  key={portal}
                  onClick={() => handleSwitch(portal)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-semibold transition cursor-pointer ${
                    isCurrent
                      ? 'bg-black/5 dark:bg-white/10 text-[#1D1D1F] dark:text-white font-bold'
                      : 'text-[#6E6E73] dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1D1D1F] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${meta.color}`} />
                    <span>{meta.name}</span>
                  </div>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#E6007E]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};