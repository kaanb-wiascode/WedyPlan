'use client';

import React, { useState } from 'react';
import { MOCK_COUPLE_VENDORS } from '@/lib/couple-constants';
import { Store, Phone, CheckCircle2, Clock, Heart } from 'lucide-react';

export default function CoupleVendorsPage() {
  const [vendors] = useState(MOCK_COUPLE_VENDORS);

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-8 font-sans antialiased">
      {/* Header Cam Kart */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <Store className="w-3.5 h-3.5 text-zinc-500" />
          <span>Düğün Ekibi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Firmalarım & Favoriler
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Anlaştığınız hizmet sağlayıcıları ve teklif beklediğiniz firmaları yönetin.
        </p>
      </div>

      {/* Firma Kartları Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-3xl apple-glass shadow-xs flex flex-col justify-between gap-5 transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={v.imageUrl}
                alt={v.name}
                className="w-20 h-20 rounded-2xl object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/60 dark:border-zinc-700/50"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  {v.category}
                </span>
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">{v.name}</h3>
                {v.phone && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                    <Phone className="w-3 h-3 text-zinc-400" /> {v.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                  v.status === 'AGREED'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : v.status === 'WAITING_QUOTE'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {v.status === 'AGREED' ? '✓ Anlaşıldı' : v.status === 'WAITING_QUOTE' ? '⏳ Teklif Bekliyor' : '♡ Favori'}
              </span>

              {v.price && (
                <span className="font-bold text-sm text-zinc-900 dark:text-white">
                  ₺{v.price.toLocaleString('tr-TR')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}