'use client';

import React, { useState } from 'react';
import { Bell, Check, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationItem } from '@/types/app-layout';

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Yeni Teklif Talebi',
    message: 'Selin & Kaan çifti 15 Ağustos düğünü için teklif bekliyor.',
    timestamp: '5 Dk Önce',
    isRead: false,
    type: 'ACTION_REQUIRED',
    linkHref: '/firma/talepler'
  },
  {
    id: 'n-2',
    title: 'Sözleşme E-İmzaladı',
    message: 'Luxe Kır Bahçesi rezervasyon sözleşmesi onaylandı.',
    timestamp: '1 Saat Önce',
    isRead: false,
    type: 'SUCCESS'
  }
];

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Bildirimler"
        className="p-2.5 rounded-full bg-white/60 dark:bg-zinc-800/60 hover:bg-white dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 text-[#1D1D1F] dark:text-white transition relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E]"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#E6007E] ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-3xl border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-5 z-50 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-black/5 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-[16px] text-[#1D1D1F] dark:text-white">Bildirimler</h4>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-[#E6007E] text-white px-2 py-0.5 rounded-full">
                    {unreadCount} Yeni
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-bold text-[#86868B] hover:text-[#E6007E] transition cursor-pointer"
                >
                  Tümünü Okundu İşaretle
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition space-y-1 ${
                    item.isRead
                      ? 'bg-slate-50/50 dark:bg-zinc-800/40 border-slate-100 dark:border-zinc-800 opacity-70'
                      : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#1D1D1F] dark:text-white">{item.title}</span>
                    <span className="text-[#86868B]">{item.timestamp}</span>
                  </div>
                  <p className="text-[12px] text-[#6E6E73] dark:text-zinc-300 leading-snug">{item.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};