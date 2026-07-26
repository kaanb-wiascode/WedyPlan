'use client';

import React from 'react';
import { MOCK_WEDDING_INFO, MOCK_COUPLE_VENDORS } from '@/lib/couple-constants';
import { Heart, Wallet, Users, CheckSquare, Store, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CoupleDashboardPage() {
  const info = MOCK_WEDDING_INFO;

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Üst Karşılama Kartı */}
      <div className="p-8 rounded-[32px] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-white/60 border border-white backdrop-blur-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-[11px] font-bold text-[#E6007E]">
            <Sparkles className="w-3.5 h-3.5" /> Hoş Geldiniz!
          </span>
          <h1 className="text-[28px] md:text-[36px] font-serif font-semibold text-[#1D1D1F]">
            {info.coupleNames} Düğün Özeti
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Düğün tarihinize <strong className="text-[#E6007E] font-bold">{info.daysLeft} gün</strong> kaldı. Hazırlıklarınız mükemmel ilerliyor!
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] border border-white text-center shadow-sm shrink-0">
          <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">Düğün Tarihi</span>
          <span className="text-[22px] font-serif font-bold text-[#1D1D1F]">15 Ağustos 2026</span>
          <span className="text-[11px] text-[#E6007E] font-semibold block mt-1">Cumartesi • Gece Düğünü</span>
        </div>
      </div>

      {/* Özet Metrik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Bütçe Kartı */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-6 rounded-[24px] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#6E6E73]">Harcanan Bütçe</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-[#E6007E]"><Wallet className="w-5 h-5" /></div>
          </div>
          <div>
            <div className="text-[22px] font-serif font-bold text-[#1D1D1F]">
              {info.spentBudget.toLocaleString('tr-TR')} ₺ / {info.totalBudget.toLocaleString('tr-TR')} ₺
            </div>
            <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full"
                style={{ width: `${(info.spentBudget / info.totalBudget) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Davetli Kartı */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-6 rounded-[24px] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#6E6E73]">Katılım Onayı (LAVS)</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600"><Users className="w-5 h-5" /></div>
          </div>
          <div>
            <div className="text-[22px] font-serif font-bold text-[#1D1D1F]">
              {info.confirmedGuests} Kişi Onayladı
            </div>
            <span className="text-[11px] text-[#86868B]">Toplam {info.totalGuests} Davetli Katılım Bekliyor</span>
          </div>
        </div>

        {/* Görevler Kartı */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-6 rounded-[24px] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#6E6E73]">Tamamlanan Görevler</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600"><CheckSquare className="w-5 h-5" /></div>
          </div>
          <div>
            <div className="text-[22px] font-serif font-bold text-[#1D1D1F]">
              {info.completedTasksCount} / {info.totalTasksCount} Tamamlandı
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">%75 Hazırlıklar Bitti</span>
          </div>
        </div>
      </div>

      {/* Anlaşmalı & Favori Firmalarım */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="font-serif text-[20px] font-semibold text-[#1D1D1F]">Anlaşmalı & Kaydedilen Firmalar</h3>
          <Link href="/cift/firmalarim" className="text-[12px] font-bold text-[#E6007E] hover:underline flex items-center gap-1">
            Tümünü Gör <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_COUPLE_VENDORS.map((vendor) => (
            <div key={vendor.id} className="bg-white/60 backdrop-blur-2xl border border-white/90 p-4 rounded-[20px] shadow-sm space-y-3">
              <div className="h-32 rounded-xl overflow-hidden bg-slate-100 relative">
                <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  vendor.status === 'AGREED'
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : vendor.status === 'WAITING_QUOTE'
                    ? 'bg-amber-500 text-white border-amber-400'
                    : 'bg-white text-[#1D1D1F] border-white'
                }`}>
                  {vendor.status === 'AGREED' ? '✓ Anlaşıldı' : vendor.status === 'WAITING_QUOTE' ? '⏳ Teklif Bekliyor' : '♡ Favori'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase">{vendor.category}</span>
                <h4 className="font-bold text-[14px] text-[#1D1D1F] mt-0.5">{vendor.name}</h4>
                {vendor.price && (
                  <span className="text-[12px] font-serif font-bold text-[#E6007E] block mt-1">
                    Anlaşma: {vendor.price.toLocaleString('tr-TR')} ₺
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}