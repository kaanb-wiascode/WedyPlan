'use client';

import React, { useState } from 'react';
import { useWedyTheme } from '@/providers/WedyThemeProvider';
import { LayoutUser } from '@/types/app-layout';
import { User, LogOut, Settings, Sun, Moon, Monitor, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserMenuProps {
  user: LayoutUser;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useWedyTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/60 dark:bg-zinc-800/60 hover:bg-white dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E]"
      >
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
          alt={user.fullName}
          className="w-7 h-7 rounded-full object-cover border border-white"
        />
        <span className="text-[12px] font-bold text-[#1D1D1F] dark:text-white hidden md:inline-block max-w-[100px] truncate">
          {user.fullName}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3"
          >
            {/* Profile Brief */}
            <div className="border-b border-black/5 dark:border-zinc-800 pb-3">
              <h4 className="font-bold text-[14px] text-[#1D1D1F] dark:text-white">{user.fullName}</h4>
              <span className="text-[11px] text-[#86868B] block truncate">{user.email}</span>
              <span className="text-[10px] font-bold bg-[#E6007E]/10 text-[#E6007E] px-2 py-0.5 rounded-md inline-block mt-1">
                {user.activeRoleTitle}
              </span>
            </div>

            {/* Theme Switcher Pill */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">Tema Tercihi</span>
              <div className="p-1 bg-black/5 dark:bg-zinc-800 rounded-xl grid grid-cols-3 gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setTheme('light')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer ${
                    theme === 'light' ? 'bg-white dark:bg-zinc-700 text-[#1D1D1F] dark:text-white shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <Sun className="w-3 h-3" /> Açık
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer ${
                    theme === 'dark' ? 'bg-white dark:bg-zinc-700 text-[#1D1D1F] dark:text-white shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <Moon className="w-3 h-3" /> Koyu
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer ${
                    theme === 'system' ? 'bg-white dark:bg-zinc-700 text-[#1D1D1F] dark:text-white shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <Monitor className="w-3 h-3" /> Oto
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-1 border-t border-black/5 dark:border-zinc-800 space-y-1 text-[12px] font-medium text-[#1D1D1F] dark:text-white">
              <button className="w-full flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition cursor-pointer">
                <Settings className="w-4 h-4 text-slate-400" /> Hesap Ayarları
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-xl transition cursor-pointer font-bold"
              >
                <LogOut className="w-4 h-4" /> Oturumu Kapat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};