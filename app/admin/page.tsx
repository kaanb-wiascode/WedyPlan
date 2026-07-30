'use client';

import React from 'react';
import { 
  Users, 
  Store, 
  Wallet, 
  Sparkles, 
  Activity, 
  ArrowUpRight,
  Bot,
  ShieldCheck,
  Server,
  Layers,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <main className="p-6 sm:p-8 lg:p-10 space-y-8 flex-1">
      {/* Soft Görsel Arka Plan Işığı */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Üst Karşılama Başlığı */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-amber-100/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Sistem Yönetim Kumanda Merkezi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
            Executive Kontrol Paneli
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            WedyPlan altyapısını, yapay zekâ servislerini, trafiği ve finansal hacmi izleyin.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Tüm Sistemler Çalışıyor
        </div>
      </div>

      {/* Metrik Kartları (Glass Bento Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Toplam Kayıtlı Çift</span>
            <Users className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">1,248</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              +14% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full w-[72%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Onaylı Tedarikçi</span>
            <Store className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">432</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              +8% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[58%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">AI Agent İşlemleri</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">142.8k</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              +24% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full w-[88%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Aylık İşlem Hacmi</span>
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">₺4.8M</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              +22% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[64%]" />
          </div>
        </div>
      </div>

      {/* Hızlı Yönetim Panelleri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/80 to-white/90 dark:from-zinc-900/80 dark:to-zinc-900/40 border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-white">
                Yapay Zekâ & Agent Mimarisi
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/60">
              Merkezi Yönetim
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Platform genelindeki yapay zekâ botlarını, otomasyon akışlarını, güvenlik guardrail kurallarını ve vektör arama indekslerini canlı ortamda yapılandırın.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/admin/ai-agents"
              className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium transition-all flex items-center gap-2 shadow-xs"
            >
              <span>Agent Kayıtları</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/ai-workflows"
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2"
            >
              <span>Otomasyon Akışları</span>
            </Link>
            <Link
              href="/admin/ai-guardrails"
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2"
            >
              <span>Güvenlik Duvarı</span>
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
          <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Sistem Aksiyonları
          </h3>
          <div className="space-y-2">
            <Link href="/admin/finance" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Finansal Raporları İncele</span>
              <BarChart3 className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
            </Link>
            <Link href="/admin/monitoring" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">SLA & Sunucu Durumları</span>
              <Server className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
            </Link>
            <Link href="/admin/system-config" className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Sistem Ayarlarını Yapılandır</span>
              <Layers className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}