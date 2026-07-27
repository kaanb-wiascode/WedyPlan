'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/app-layout';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, homeHref = '/' }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] font-medium text-[#86868B] dark:text-zinc-400">
      <Link
        href={homeHref}
        className="hover:text-[#1D1D1F] dark:hover:text-white transition flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E] rounded-md px-1"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-bold text-[#1D1D1F] dark:text-white truncate max-w-[180px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#1D1D1F] dark:hover:text-white transition truncate max-w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E] rounded-md px-1"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};