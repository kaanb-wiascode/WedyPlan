'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Building2, 
  Store, 
  Wallet, 
  FileText, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Check, 
  X, 
  Loader2,
  Sparkles,
  Calendar
} from 'lucide-react';

export default function VendorDashboardPage() {
  const [activeSection, setActiveSection] = useState<'overview' | 'quotes' | 'profile'>('overview');
  
  // Supabase & Vendor State'leri
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // Supabase Realtime Aboneliği
  useEffect(() => {
    fetchQuotes();

    const channel = supabase
      .channel('vendor-live-quotes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quote_requests' }, () => fetchQuotes())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) setQuotes(data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (!error) fetchQuotes();
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30">
      
      {/* Dynamic Background Glows (Admin Shell ile Birebir Aynı) */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ==================== 1. SOL NAVİGASYON SIDEBAR (Admin Sidebar Dili) ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex">
        <div className="space-y-8">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-zinc-900 dark:text-white tracking-tight">WedyVendor</h2>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">Firma Portalı</span>
            </div>
          </div>

          {/* Menü Öğeleri */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeSection === 'overview'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Genel Bakış & Kumanda</span>
            </button>

            <button
              onClick={() => setActiveSection('quotes')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                activeSection === 'quotes'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Teklif Talepleri</span>
              </div>
              {quotes.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  {quotes.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Firma Kimliği Alt Kart */}
        <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Grand Çamlıca</span>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Onaylı Kurumsal Tedarikçi Rozeti Aktif</p>
        </div>
      </aside>

      {/* ==================== 2. ANA İÇERİK ALANI ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* Üst Header Bar (Admin Konsolu Tarzı) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800/80 backdrop-blur-xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise Tedarikçi Paneli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
              Grand Çamlıca Kır Bahçesi
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gelen teklif taleplerini inceleyin, düğün bütçelerini yönetin ve müşterilerle anında eşleşin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Supabase Realtime Bağlı
            </div>

            <button 
              onClick={() => setIsAcceptingQuotes(!isAcceptingQuotes)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isAcceptingQuotes ? 'bg-amber-500 text-white shadow-xs' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isAcceptingQuotes ? 'animate-pulse' : ''}`} />
              <span>{isAcceptingQuotes ? 'Teklife Açık' : 'Teklife Kapalı'}</span>
            </button>
          </div>
        </div>

        {/* Metrik Kartları Grid (Admin Dashboard Birebir Aynı) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Toplam Teklif Talebi</span>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{quotes.length}</div>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block">Supabase Canlı Akış</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kabul Edilen Teklifler</span>
            <div className="text-3xl font-serif font-bold text-emerald-600 dark:text-emerald-400">
              {quotes.filter(q => q.status === 'ACCEPTED').length}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">%72 Dönüşüm Oranı</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Toplam Teklif Hacmi</span>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">
              ₺{quotes.reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0).toLocaleString('tr-TR')}
            </div>
            <span className="text-[10px] text-purple-600 font-semibold block">Potansiyel Düğün Cirosu</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Firma Güven Skoru</span>
            <div className="text-3xl font-serif font-bold text-amber-500">%98</div>
            <span className="text-[10px] text-emerald-600 font-semibold block">VIP Rozetli İşletme</span>
          </div>
        </div>

        {/* ==================== 3. TEKLİF LİSTESİ KONSOLU ==================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
            <div>
              <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Çiftlerden Gelen Canlı Teklif Talepleri</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Düğün tarihlerini ve bütçeleri kontrol edip anında yanıt verin.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-200">
              {quotes.length} Aktif İstek
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 text-zinc-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
              <span className="text-xs font-medium">Supabase teklifleri yükleniyor...</span>
            </div>
          ) : quotes.length === 0 ? (
            <div className="p-12 text-center text-xs text-zinc-400 bg-white/80 dark:bg-zinc-900/60 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
              Henüz gelen bir teklif talebi bulunmuyor.
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div 
                  key={q.id} 
                  className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-amber-500/40"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{q.couple_name}</h4>
                      <span className="text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                        Bütçe: ₺{(Number(q.budget_offered) || 0).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Düğün Tarihi: {q.event_date || 'Belirtilmedi'}</span>
                    </div>
                    {q.message && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 mt-2">
                        "{q.message}"
                      </p>
                    )}
                  </div>

                  {/* Aksiyonlar */}
                  <div className="flex items-center gap-2 shrink-0">
                    {q.status === 'PENDING' ? (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(q.id, 'ACCEPTED')}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" /> Teklifi Kabul Et
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(q.id, 'REJECTED')}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-200/60 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                        q.status === 'ACCEPTED' 
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' 
                          : 'bg-rose-500/10 text-rose-600 border-rose-200'
                      }`}>
                        {q.status === 'ACCEPTED' ? 'Kabul Edildi' : 'Reddedildi'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}