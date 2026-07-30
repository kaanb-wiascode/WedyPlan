'use client';

import React, { useState } from 'react';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
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
  BarChart3,
  Sliders,
  Search,
  FileText,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Network
} from 'lucide-react';

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('executive');

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Sol Menü - Tıklamada State Değiştirir */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sağ Ana Alan - Sayfa Yenilenmeden Değişir */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Soft Görsel Arka Plan Işığı */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* Dynamic Content Renderer */}
        {activeTab === 'executive' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Üst Karşılama Başlığı */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
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

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Tüm Sistemler Çalışıyor
              </div>
            </div>

            {/* Metrik Kartları */}
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

            {/* Hızlı Aksiyonlar */}
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
                  <button onClick={() => setActiveTab('ai-agents')} className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer">
                    <span>Agent Kayıtları</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setActiveTab('ai-workflows')} className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer">
                    <span>Otomasyon Akışları</span>
                  </button>
                  <button onClick={() => setActiveTab('ai-guardrails')} className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-medium border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer">
                    <span>Güvenlik Duvarı</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
                <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Sistem Aksiyonları
                </h3>
                <div className="space-y-2">
                  <button onClick={() => setActiveTab('finance')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Finansal Raporları İncele</span>
                    <BarChart3 className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                  <button onClick={() => setActiveTab('monitoring')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">SLA & Sunucu Durumları</span>
                    <Server className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                  <button onClick={() => setActiveTab('system-config')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Sistem Ayarlarını Yapılandır</span>
                    <Layers className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ÇİFT YÖNETİMİ PANELİ */}
        {activeTab === 'couples' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold mb-1">
                <Users className="w-4 h-4" /> Çift Portalı İdare Merkezi
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Çift Yönetim Paneli</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Kayıtlı çiftlerin düğün süreçlerini, davetli durumlarını ve planlama metriklerini denetleyin.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Son Kaydolan Çiftler</h3>
              <div className="space-y-2">
                {[
                  { name: 'Eda & Mert', date: '15 Eylül 2026', city: 'İstanbul', status: 'Aktif Planlama' },
                  { name: 'Selin & Kaan', date: '20 Ekim 2026', city: 'İzmir', status: 'Bütçe Hazırlığında' },
                  { name: 'Zeynep & Can', date: '12 Haziran 2027', city: 'Ankara', status: 'Mekan Seçimi' },
                ].map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{c.name}</h4>
                      <p className="text-xs text-zinc-500">{c.city} • Düğün Tarihi: {c.date}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/50">{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TEDARİKCİ YÖNETİMİ PANELİ */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
                <Store className="w-4 h-4" /> Tedarikçi & İş Ortağı Ağı
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Tedarikçi Yönetimi</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Platformdaki düğün mekanları, fotoğrafçılar ve organizasyon firmalarının onay ve profil durumları.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 block">Onay Bekleyenler</span>
                <span className="text-2xl font-serif font-bold text-amber-600">12 Firma</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 block">Aktif İlanlar</span>
                <span className="text-2xl font-serif font-bold text-emerald-600">420 İlan</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 block">Öne Çıkan Paketler</span>
                <span className="text-2xl font-serif font-bold text-purple-600">85 Paket</span>
              </div>
            </div>
          </div>
        )}

        {/* FİNANS PANELİ */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <Wallet className="w-4 h-4" /> Finansal Denetim & Kasalar
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Finansal Genel Bakış</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Platform üzerinden gerçekleşen ödemeler, komisyon gelirleri ve hakediş dağılımları.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-3">
              <h3 className="font-serif font-bold text-sm text-zinc-900 dark:text-white">Gelir Tablosu</h3>
              <div className="h-40 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center text-xs text-zinc-400">
                Finans Akışı Grafiği (Canlı Veri)
              </div>
            </div>
          </div>
        )}

        {/* AI AGENTLAR PANELİ */}
        {activeTab === 'ai-agents' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold mb-1">
                <Bot className="w-4 h-4" /> Yapay Zekâ Bot Yönetimi
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">AI Agent Kayıtları</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">WedyPlan ekosisteminde çalışan tüm yapay zekâ asistanlarının model ayarları ve sürüm geçmişi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-2">
                <div className="flex justify-between items-center"><h4 className="font-bold text-sm">Wedding Planner Agent</h4><span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-bold">V3.2 Active</span></div>
                <p className="text-xs text-zinc-500">Çiftlerin düğün adımlarını ve konsept önerilerini yöneten ana danışman.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-2">
                <div className="flex justify-between items-center"><h4 className="font-bold text-sm">Vendor Growth Agent</h4><span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-bold">V2.1 Active</span></div>
                <p className="text-xs text-zinc-500">Tedarikçilere profil optimizasyonu ve teklif ipuçları veren asistan.</p>
              </div>
            </div>
          </div>
        )}

        {/* ALTYAPI & MONITORING PANELİ */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <Activity className="w-4 h-4" /> Altyapı & SLA İzleme
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Sistem Durumu & SLA</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Vercel, Supabase ve AI API servislerinin tepki süreleri ve çalışma oranları.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Ortalama Tepki Süresi</span>
                <div className="text-xl font-bold text-zinc-900 dark:text-white">42 ms</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Sistem Çalışma Oranı (Uptime)</span>
                <div className="text-xl font-bold text-emerald-600">%99.98</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Aktif WebSocket Bağlantıları</span>
                <div className="text-xl font-bold text-purple-600">1,840 Canlı</div>
              </div>
            </div>
          </div>
        )}

        {/* DİĞER TÜM SEKMELER İÇİN GENEL KURUMSAL PANEL */}
        {!['executive', 'couples', 'vendors', 'finance', 'ai-agents', 'monitoring'].includes(activeTab) && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" /> Kurumsal Denetim Modülü
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white capitalize">{activeTab.replace('-', ' ')} Yönetimi</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Bu modül üzerinden canlı konfigürasyon ve veri izleme süreçlerinizi yönetebilirsiniz.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-amber-500" />
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">{activeTab.toUpperCase()} Veri Akışı Bağlandı</h3>
              <p className="text-xs text-zinc-500 max-w-md">Seçilen yönetim paneli konsolu aktiftir. Veriler ve otomasyon parametreleri canlı ortamla senkronize edilmektedir.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}