'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { COUPLE_NAV_ITEMS } from '@/lib/navigation';
import { getCoupleSettings } from '@/lib/actions/settings';
import { LogOut, Calendar } from 'lucide-react';

export default function CoupleSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] = useState({
    partnerOneName: 'Sadi',
    partnerTwoName: 'Hamiyet',
    weddingDate: '2026-08-15',
  });

  useEffect(() => {
    const loadProfile = async () => {
      const res = await getCoupleSettings();
      if (res.success && res.data?.profile) {
        setProfile({
          partnerOneName: res.data.profile.partnerOneName || 'Sadi',
          partnerTwoName: res.data.profile.partnerTwoName || 'Hamiyet',
          weddingDate: res.data.profile.weddingDate || '2026-08-15',
        });
      }
    };
    loadProfile();
  }, [pathname]);

  const initials = `${(profile.partnerOneName[0] || 'S').toUpperCase()}&${(profile.partnerTwoName[0] || 'H').toUpperCase()}`;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tarih Belirtilmedi';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <aside className="w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-r border-zinc-200 dark:border-zinc-800 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center space-x-2 px-2">
          <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
            WedyPlan
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-md">
            Çift Paneli
          </span>
        </div>

        <nav className="space-y-1">
          {COUPLE_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {profile.partnerOneName} & {profile.partnerTwoName}
            </h4>
            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5 truncate">
              <Calendar className="w-3 h-3 shrink-0" /> {formatDate(profile.weddingDate)}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push('/giris')}
          className="w-full py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Oturumu Kapat
        </button>
      </div>
    </aside>
  );
}