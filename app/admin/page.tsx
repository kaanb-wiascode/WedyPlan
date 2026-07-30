'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { 
  Users, 
  Store, 
  Wallet, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Layers, 
  Server, 
  Bot, 
  BarChart3, 
  FileText, 
  ArrowUpRight,
  Database,
  Cpu,
  Lock,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Platform Uçtan Uca Yönetim Merkezi
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              WedyPlan ekosistemindeki tüm yapay zekâ modellerini, çiftleri, tedarikçileri, altyapıyı ve finansı yönetin.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tüm Sistemler Aktif
          </div>
        </div>

        {/* Global KPI Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-400 text-xs">
              <span>Toplam Kayıtlı Çift</span>
              <Users className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold text-white">1,248</div>
            <p className="text-[11px] text-emerald-400 font-medium">+14% bu ay</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-400 text-xs">
              <span>Tedarikçi Ağ Büyüklüğü</span>
              <Store className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">432</div>
            <p className="text-[11px] text-emerald-400 font-medium">+8% bu ay</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-400 text-xs">
              <span>AI Agent Çağrı Sayısı</span>
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">142.8k</div>
            <p className="text-[11px] text-emerald-400 font-medium">%99.4 başarı</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex justify-between text-zinc-400 text-xs">
              <span>Toplam İşlem Hacmi</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">₺4.8M</div>
            <p className="text-[11px] text-emerald-400 font-medium">+22% büyüme</p>
          </div>
        </div>

        {/* Bütün Alt Modüllere Hızlı Geçiş Matrisi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white text-sm">Yapay Zekâ & Agent Mimarisi</h3>
            </div>
            <div className="space-y-2">
              <Link href="/admin/ai-agents" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Agent Registry & Bus</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/ai-workflows" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Otomasyon & Workflows</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/ai-guardrails" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Guardrails & PII Masking</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-rose-400" />
              <h3 className="font-semibold text-white text-sm">Finans & Komisyon Yönetimi</h3>
            </div>
            <div className="space-y-2">
              <Link href="/admin/finance" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Finansal Genel Bakış</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/revenue" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Gelir Modelleri & Komisyon</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/subscriptions" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Abonelik Paketleri</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white text-sm">Altyapı & MLOps</h3>
            </div>
            <div className="space-y-2">
              <Link href="/admin/monitoring" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>SLA & Sistem İzleme</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/infrastructure" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>Resource Nodes & Backups</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/admin/ai-mlops" className="flex items-center justify-between text-xs text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800">
                <span>MLOps & Model Veri Akışı</span> <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}