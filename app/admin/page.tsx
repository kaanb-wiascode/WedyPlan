'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { 
  Users, 
  Store, 
  Wallet, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Activity,
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sol Menü */}
      <AdminSidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Üst Karşılama Başlığı */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Sistem Yönetim Kumanda Merkezi
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              WedyPlan altyapısını, yapay zekâ servislerini ve kullanıcı trafiğini tek noktadan izleyin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Tüm Sistemler Çalışıyor
            </span>
          </div>
        </div>

        {/* Metrik Kartları (KPI Bento) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Toplam Çift</span>
              <Users className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">1,248</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                +12% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Onaylı Tedarikçi</span>
              <Store className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">432</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                +8% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">AI Agent İşlemleri</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">89.4k</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                +24% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-medium">Aylık Hacim</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">₺3.2M</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                +18% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Hızlı Erişim Panelleri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" /> AI Copilot & Agent Yönetimi
            </h3>
            <p className="text-xs text-zinc-400">
              Platform genelinde çalışan yapay zekâ modellerini, guardrail güvenlik duvarlarını ve bilgi tabanı indekslerini yapılandırın.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/admin/ai-agents" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                Agent Kayıtları
              </Link>
              <Link href="/admin/ai-guardrails" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                Güvenlik Duvarı
              </Link>
              <Link href="/admin/ai-workflows" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                Otomasyon Akışları
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" /> Sistem & Altyapı Sağlığı
            </h3>
            <p className="text-xs text-zinc-400">
              Veritabanı sürücüleri, API ağ geçitleri, CDN düğümleri ve sunucu kaynak kullanımını anlık izleyin.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="/admin/monitoring" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                SLA & Metrikler
              </Link>
              <Link href="/admin/infrastructure" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                Node Durumları
              </Link>
              <Link href="/admin/system-config" className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium transition-colors">
                Sistem Yapılandırması
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}