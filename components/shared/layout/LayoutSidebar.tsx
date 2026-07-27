'use client';

import React from 'react';
import Link from 'next/link';
import { NavItem } from '@/types/app-layout';
import { PortalType } from '@/types/auth-core';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Icon } from '@/components/shared/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutSidebarProps {
  portalType: PortalType;
  navItems: NavItem[];
  currentRoute: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const LayoutSidebar: React.FC<LayoutSidebarProps> = ({
  portalType,
  navItems,
  currentRoute,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 space-y-6">
      {/* Brand Header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-[#E6007E] flex items-center justify-center text-white shrink-0 shadow-md">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="font-serif font-bold text-[18px] text-[#1D1D1F] dark:text-white block leading-none">
                WedyPlan
              </span>
              <span className="text-[9px] font-semibold text-[#D4AF37] uppercase tracking-widest block mt-0.5">
                {portalType} OS
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Sidebar Genişlet' : 'Sidebar Daralt'}
          className="hidden lg:flex p-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 text-slate-500 transition cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Items List */}
      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar pt-2">
        {navItems.map((item) => {
          const isActive = currentRoute === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[13px] font-bold transition group ${
                isActive
                  ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-[#1D1D1F] shadow-md'
                  : 'text-[#6E6E73] dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1D1D1F] dark:hover:text-white'
              }`}
            >
              <Icon name={item.iconName as any} size={18} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{item.title}</span>}
              {!isCollapsed && item.badge && (
                <span className="ml-auto text-[9px] font-mono font-bold bg-[#E6007E] text-white px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding Badge */}
      {!isCollapsed && (
        <div className="p-3 bg-white/60 dark:bg-zinc-800/60 rounded-2xl border border-white/80 dark:border-zinc-700 text-center text-[10px] text-[#86868B] font-mono">
          WedyPlan OS v2.0
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 border-r border-white/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl transition-all duration-300 z-40 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 z-50 shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-10">
                <button onClick={onCloseMobile} className="p-2 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};