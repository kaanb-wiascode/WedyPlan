'use client';

import React from 'react';
import { CoupleSidebar } from '@/components/couple/layout/CoupleSidebar';
import { 
  Sparkles, 
  Wallet, 
  CheckSquare, 
  Users, 
  Calendar, 
  ArrowUpRight,
  Clock,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import Link from 'next/link';

export default function CoupleDashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Sol Menü */}
      <CoupleSidebar />

      {/* Ana İçerik */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Soft Görsel Arka Plan Işığı */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Üst Karşılama Başlığı */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-rose-100/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-500 font-medium text-xs">
              <HeartHandshake className="w-4 h-4" />
              <span>Düğün Planlama Yolculuğu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
              Hoş Geldiniz, Eda & Mert
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Büyük gününüze adım adım yaklaşırken tüm hazırlıklarınızı tek bir şık panelden yönetin.
            </p>
          </div>

          {/* Geri Sayım Kartı */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20">
            <Clock className="w-5 h-5 text-rose-100" />
            <div className="flex flex-col">
              <span className="text-xl font-bold font-serif leading-none">46 Gün</span>
              <span className="text-[10px] text-rose-100 font-medium mt-0.5">Kalan Süre</span>
            </div>
          </div>
        </div>

        {/* Bütçe ve Durum Metrikleri (Glass Bento Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Toplam Bütçe</span>
              <Wallet className="w-4 h-4 text-rose-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">₺250,000</div>
              <p className="text-[11px] text-zinc-500">Harcama: ₺165,000 (%66)</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full w-[66%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Tamamlanan Görevler</span>
              <CheckSquare className="w-4 h-4 text-rose-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">28 / 42</div>
              <p className="text-[11px] text-zinc-500">Sıradaki: Fotoğrafçı Seçimi</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[66%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Davetli & LCV</span>
              <Users className="w-4 h-4 text-rose-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">180 Kişi</div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">142 Kişi Onayladı</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full w-[78%]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Anlaşmalı Firmalar</span>
              <Calendar className="w-4 h-4 text-rose-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">6 Firma</div>
              <p className="text-[11px] text-zinc-500">Mekan, Müzik, Catering...</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[50%]" />
            </div>
          </div>

        </div>

        {/* AI Asistan Önerileri & Hızlı Aksiyonlar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 via-white/80 to-white/90 dark:from-zinc-900/80 dark:to-zinc-900/40 border border-rose-200/60 dark:border-zinc-800 backdrop-blur-xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-white">
                  Wedy AI Asistan Önerisi
                </h3>
              </div>
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-200/50">
                Canlı Öneri
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Düğün gününüze 46 gün kaldı. LCV yanıtları neredeyse tamamlandı. Masa düzeni planlamasını başlatmak ve catering menü detaylarını netleştirmek için AI planlayıcınızı başlatabilirsiniz.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/cift/ai-asistan"
                className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium transition-all flex items-center gap-2 shadow-sm"
              >
                <span>AI Asistanla Sohbet Et</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/cift/davetliler"
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2"
              >
                <span>Masa Düzenini Aç</span>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
            <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white">
              Hızlı Adımlar
            </h3>
            <div className="space-y-2">
              <Link href="/cift/butce" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-rose-50/50 transition-colors group">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600">Ödemeleri Düzenle</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500" />
              </Link>
              <Link href="/cift/dijital-davetiye" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-rose-50/50 transition-colors group">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600">Davetiye Tasarımını Önizle</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500" />
              </Link>
              <Link href="/cift/gorevler" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-rose-50/50 transition-colors group">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-rose-600">Tamamlanan Adımları İşaretle</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}