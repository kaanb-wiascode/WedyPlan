'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COUPLE_NAV_ITEMS } from '@/lib/navigation';

export default function CoupleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-r border-zinc-200 dark:border-zinc-800 min-h-screen p-4 space-y-6">
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
                  ? 'bg-zinc-900 text-white dark:bg-rose-500 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}