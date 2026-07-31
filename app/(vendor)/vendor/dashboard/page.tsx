'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassPanel } from '@/components/shared/ui/GlassPanel';
import { StatCard } from '@/components/shared/enterprise/StatCard';
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
  Calendar,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

export default function VendorDashboardPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // Supabase Realtime Akışı
  useEffect(() => {
    fetchQuotes();

    const channel = supabase
      .channel('vendor-live-quotes-realtime')
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

  const totalCiro = quotes.reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const acceptedCount = quotes.filter(q => q.status === 'ACCEPTED').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. EXECUTIVE HEADER (Admin Header Birebir Aynısı) */}
      <GlassPanel className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-zinc-200/80 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Tedarikçi Yönetim Kumanda Merkezi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
            Grand Çamlıca Kır Bahçesi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Gelen teklif taleplerini, bütçe hacmini ve müşteri etkileşimlerini yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Supabase Realtime
          </div>

          <button 
            onClick={() => setIsAcceptingQuotes(!isAcceptingQuotes)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              isAcceptingQuotes ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isAcceptingQuotes ? 'text-emerald-500 animate-pulse' : ''}`} />
            <span>{isAcceptingQuotes ? 'Teklife Açık' : 'Teklife Kapalı'}</span>
          </button>
        </div>
      </GlassPanel>

      {/* 2. STATS GRID (Admin Dash Metrik Kartları) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <GlassPanel className="p-5 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Gelen Teklif Talepleri</span>
            <FileText className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{quotes.length}</div>
          <span className="text-[10px] text-zinc-500 font-medium block">Supabase Canlı Veri</span>
        </GlassPanel>

        <GlassPanel className="p-5 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Onaylanan Teklifler</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-600 dark:text-emerald-400">{acceptedCount}</div>
          <span className="text-[10px] text-emerald-600 font-medium block">%72 Kazanma Oranı</span>
        </GlassPanel>

        <GlassPanel className="p-5 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Toplam Bütçe Hacmi</span>
            <Wallet className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">
            ₺{totalCiro.toLocaleString('tr-TR')}
          </div>
          <span className="text-[10px] text-zinc-500 font-medium block">Potansiyel Düğün Cirosu</span>
        </GlassPanel>

        <GlassPanel className="p-5 space-y-2">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Firma Skoru</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">%98</div>
          <span className="text-[10px] text-emerald-600 font-medium block">VIP Doğrulanmış Firma</span>
        </GlassPanel>
      </div>

      {/* 3. BENTO GRID CONTAINER & TEKLİF YÖNETİMİ */}
      <GlassPanel className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Çiftlerden Gelen Canlı Teklif Talepleri</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Gelen düğün bütçelerini inceleyin ve tek tıkla aksiyon alın.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            {quotes.length} Aktif Teklif
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-zinc-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
            <span className="text-xs font-medium">Supabase teklif verileri yükleniyor...</span>
          </div>
        ) : quotes.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            Henüz gelen bir teklif talebi bulunmuyor.
          </div>
        ) : (
          <div className="space-y-3">
            {quotes.map((q) => (
              <GlassPanel 
                key={q.id} 
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-zinc-400 dark:hover:border-zinc-600"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{q.couple_name}</h4>
                    <span className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full">
                      Bütçe: ₺{(Number(q.budget_offered) || 0).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Düğün Tarihi: {q.event_date || 'Belirtilmedi'}</span>
                  </div>
                  {q.message && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-zinc-100/50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 mt-2">
                      "{q.message}"
                    </p>
                  )}
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex items-center gap-2 shrink-0">
                  {q.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(q.id, 'ACCEPTED')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> Teklifi Onayla
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
                      {q.status === 'ACCEPTED' ? 'Onaylandı' : 'Reddedildi'}
                    </span>
                  )}
                </div>
              </GlassPanel>
            ))}
          </div>
        )}
      </GlassPanel>

    </div>
  );
}