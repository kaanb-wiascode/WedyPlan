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
  Clock, 
  XCircle, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Star, 
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  Bell,
  Check,
  X,
  Send,
  Loader2
} from 'lucide-react';

export default function VendorDashboardPage() {
  // Tedarikçi ve Teklif State'leri
  const [vendorData, setVendorData] = useState<any>({
    name: 'Grand Çamlıca Kır Bahçesi',
    category: 'Düğün Mekanı',
    city: 'İstanbul',
    isVerified: true,
    trustScore: 98,
    isAcceptingQuotes: true
  });

  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Metrikler
  const [monthlyViews, setMonthlyViews] = useState(14200);
  const [activeTab, setActiveTab] = useState<'quotes' | 'profile' | 'analytics'>('quotes');

  // Supabase'den Tedarikçinin Tekliflerini Çekme & Realtime Dinleme
  useEffect(() => {
    fetchQuotes();

    const channel = supabase
      .channel('vendor-quote-changes')
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

    if (data && !error) {
      setQuotes(data);
    }
    setLoading(false);
  };

  // Teklif Durumunu Güncelleme (Onayla / Reddet)
  const handleUpdateQuoteStatus = async (quoteId: string, status: 'ACCEPTED' | 'REJECTED') => {
    const { error } = await supabase
      .from('quote_requests')
      .update({ status })
      .eq('id', quoteId);

    if (!error) {
      fetchQuotes();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans p-4 sm:p-8 lg:p-12">
      
      {/* Soft Arka Plan Işıkları (WedyPlan Premium Glow) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ==================== 1. ÜST HEADER & TEDARİKÇİ KÜNYESİ ==================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Store className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-white">
                  {vendorData.name}
                </h1>
                {vendorData.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Onaylı Kurumsal Tedarikçi
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {vendorData.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {vendorData.city}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold"><Star className="w-3.5 h-3.5 fill-amber-500" /> %{vendorData.trustScore} Güven Skoru</span>
              </div>
            </div>
          </div>

          {/* Sağ Şalter Kontrolü */}
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/60 p-2 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold">
              <Radio className={`w-3.5 h-3.5 ${vendorData.isAcceptingQuotes ? 'text-emerald-500 animate-pulse' : 'text-zinc-400'}`} />
              <span>{vendorData.isAcceptingQuotes ? 'Teklif Alımına Açık' : 'Teklif Alımı Kapalı'}</span>
            </div>
            <button 
              onClick={() => setVendorData((prev: any) => ({ ...prev, isAcceptingQuotes: !prev.isAcceptingQuotes }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                vendorData.isAcceptingQuotes ? 'bg-emerald-500 text-white shadow-xs' : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {vendorData.isAcceptingQuotes ? 'Aktif' : 'Pasif Yap'}
            </button>
          </div>
        </div>

        {/* ==================== 2. CANLI İSTATİSTİK KARTLARI ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Gelen Teklif Talepleri</span>
              <FileText className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{quotes.length}</div>
            <span className="text-[10px] text-emerald-600 font-semibold block">Supabase Canlı Akış</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Aylık Profil Gösterimi</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{monthlyViews.toLocaleString('tr-TR')}</div>
            <span className="text-[10px] text-emerald-600 font-semibold block">+%24 Geçen Aya Göre Artış</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Onaylanan Düğün Anlaşması</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">
              {quotes.filter(q => q.status === 'ACCEPTED').length}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">Kapanış Oranı %68</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Toplam Teklif Hacmi</span>
              <Wallet className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">
              ₺{quotes.reduce((sum, q) => sum + (Number(q.budget_offered) || 0), 0).toLocaleString('tr-TR')}
            </div>
            <span className="text-[10px] text-purple-600 font-semibold block">Potansiyel Düğün Cirosu</span>
          </div>

        </div>

        {/* ==================== 3. TEKLİF YÖNETİMİ & SEKMELER ==================== */}
        <div className="space-y-6">
          
          {/* Sekme Seçici */}
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'quotes' 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Gelen Teklif Talepleri ({quotes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'profile' 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Firma Profili & Görseller</span>
            </button>
          </div>

          {/* TEKLİF LİSTESİ */}
          {activeTab === 'quotes' && (
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-serif font-bold text-zinc-900 dark:text-white">Çiftlerden Gelen Fiyat & Teklif Talepleri</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Çiftlerin sunduğu bütçeyi inceleyin, teklifi onaylayın veya mesaj gönderin.</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-200">
                  Canlı Supabase Akışı
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center p-12 text-zinc-400 gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                  <span className="text-xs font-medium">Teklifler yükleniyor...</span>
                </div>
              ) : quotes.length === 0 ? (
                <div className="p-12 text-center text-xs text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700">
                  Henüz gelen bir teklif talebi bulunmuyor.
                </div>
              ) : (
                <div className="space-y-3">
                  {quotes.map((q) => (
                    <div 
                      key={q.id} 
                      className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-amber-500/40"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{q.couple_name}</h4>
                          <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded">
                            Bütçe: ₺{(Number(q.budget_offered) || 0).toLocaleString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Düğün Tarihi: <span className="font-medium text-zinc-700 dark:text-zinc-300">{q.event_date || 'Belirtilmedi'}</span>
                        </p>
                        {q.message && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-white dark:bg-zinc-800 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 mt-2">
                            "{q.message}"
                          </p>
                        )}
                      </div>

                      {/* Aksiyon Butonları */}
                      <div className="flex items-center gap-2 shrink-0">
                        {q.status === 'PENDING' ? (
                          <>
                            <button
                              onClick={() => handleUpdateQuoteStatus(q.id, 'ACCEPTED')}
                              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" /> Teklifi Kabul Et
                            </button>
                            <button
                              onClick={() => handleUpdateQuoteStatus(q.id, 'REJECTED')}
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
          )}

          {/* FİRMA PROFİLİ DÜZENLEME */}
          {activeTab === 'profile' && (
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-6">
              <h2 className="text-lg font-serif font-bold text-zinc-900 dark:text-white">Firma Profil Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Firma Ticari Unvanı</label>
                  <input type="text" value={vendorData.name} onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Hizmet Kategorisi</label>
                  <input type="text" value={vendorData.category} readOnly className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl text-xs opacity-75 cursor-not-allowed" />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}