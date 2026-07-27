'use client';

import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { PortalSwitcher } from './PortalSwitcher';
import { NotificationCenter } from './NotificationCenter';
import { UserMenu } from './UserMenu';
import { CommandPalette } from './CommandPalette';
import { BreadcrumbItem, LayoutUser } from '@/types/app-layout';
import { PortalType } from '@/types/auth-core';
import { Search, Command, Menu } from 'lucide-react';

interface LayoutHeaderProps {
  activePortal: PortalType;
  user: LayoutUser;
  breadcrumbs: BreadcrumbItem[];
  onToggleMobileSidebar: () => void;
  onLogout: () => void;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  activePortal,
  user,
  breadcrumbs,
  onToggleMobileSidebar,
  onLogout
}) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-white/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        {/* Left: Mobile Trigger & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            aria-label="Menüyü Aç"
            className="lg:hidden p-2 rounded-xl bg-white/60 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 text-[#1D1D1F] dark:text-white cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Breadcrumb items={breadcrumbs} />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Cmd+K Search Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700 text-[12px] text-[#86868B] dark:text-zinc-400 hover:text-[#1D1D1F] dark:hover:text-white transition cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-[#E6007E]" />
            <span>Arama yapın...</span>
            <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-100 dark:bg-zinc-700 rounded border border-slate-200 dark:border-zinc-600 ml-2">
              ⌘K
            </kbd>
          </button>

          {/* Portal Switcher */}
          <PortalSwitcher activePortal={activePortal} allowedPortals={user.allowedPortals} />

          {/* Notifications */}
          <NotificationCenter />

          {/* User Profile */}
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};