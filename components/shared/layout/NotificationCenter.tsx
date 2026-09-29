'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NotificationItem } from '@/types/app-layout';

type NotificationApiItem = {
  id: string;
  title: string;
  body: string;
  actionUrl?: string;
  status: 'UNSEEN' | 'SEEN' | 'READ' | 'DISMISSED' | 'ARCHIVED';
  priority: string;
  category: string;
  createdAt: string;
};

function relativeTimestamp(value: string) {
  const createdAt = new Date(value).getTime();
  const deltaMinutes = Math.max(0, Math.floor((Date.now() - createdAt) / 60000));

  if (deltaMinutes < 1) return 'Şimdi';
  if (deltaMinutes < 60) return `${deltaMinutes} dk önce`;

  const hours = Math.floor(deltaMinutes / 60);
  if (hours < 24) return `${hours} sa önce`;

  const days = Math.floor(hours / 24);
  return `${days} gün önce`;
}

function mapNotification(item: NotificationApiItem): NotificationItem {
  const isActionRequired =
    item.priority === 'CRITICAL' ||
    item.priority === 'HIGH' ||
    item.category === 'PAYMENT' ||
    item.category === 'CONTRACT';

  return {
    id: item.id,
    title: item.title,
    message: item.body,
    timestamp: relativeTimestamp(item.createdAt),
    isRead: item.status === 'READ' || item.status === 'ARCHIVED',
    type: isActionRequired ? 'ACTION_REQUIRED' : 'INFO',
    linkHref: item.actionUrl,
  };
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/v1/notifications/in-app', {
        cache: 'no-store',
      });

      if (!response.ok) {
        setNotifications([]);
        return;
      }

      const payload = (await response.json()) as {
        notifications?: NotificationApiItem[];
      };

      setNotifications(
        Array.isArray(payload.notifications)
          ? payload.notifications.map(mapNotification)
          : [],
      );
    } catch {
      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const markAllAsRead = async () => {
    const unread = notifications.filter((notification) => !notification.isRead);

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true })),
    );

    await Promise.all(
      unread.map((notification) =>
        fetch(`/api/v1/notifications/${notification.id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'READ' }),
        }).catch(() => null),
      ),
    );

    void loadNotifications();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((current) => !current)}
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
                <h4 className="font-serif font-bold text-[16px] text-[#1D1D1F] dark:text-white">
                  Bildirimler
                </h4>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold bg-[#E6007E] text-white px-2 py-0.5 rounded-full">
                    {unreadCount} Yeni
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={() => void markAllAsRead()}
                    className="text-[11px] font-bold text-[#86868B] hover:text-[#E6007E] transition cursor-pointer"
                  >
                    Tümünü Okundu İşaretle
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="p-4 text-center text-[12px] text-[#86868B]">
                  Yeni bildiriminiz yok.
                </p>
              ) : (
                notifications.map((item) => {
                  const card = (
                    <div
                      className={`p-3.5 rounded-2xl border transition space-y-1 ${
                        item.isRead
                          ? 'bg-slate-50/50 dark:bg-zinc-800/40 border-slate-100 dark:border-zinc-800 opacity-70'
                          : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#1D1D1F] dark:text-white">
                          {item.title}
                        </span>
                        <span className="text-[#86868B]">{item.timestamp}</span>
                      </div>
                      <p className="text-[12px] text-[#6E6E73] dark:text-zinc-300 leading-snug">
                        {item.message}
                      </p>
                    </div>
                  );

                  return item.linkHref ? (
                    <Link key={item.id} href={item.linkHref} onClick={() => setIsOpen(false)}>
                      {card}
                    </Link>
                  ) : (
                    <div key={item.id}>{card}</div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
