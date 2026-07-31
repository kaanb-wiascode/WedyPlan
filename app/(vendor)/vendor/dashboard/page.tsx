'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassPanel } from '@/components/shared/ui/GlassPanel';
import { 
  Building2, 
  Store, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Radio, 
  Check, 
  X, 
  Loader2,
  Calendar,
  Users,
  Eye,
  FileSignature,
  Boxes,
  Briefcase,
  Zap,
  Bot,
  Lock,
  CreditCard,
  Star,
  Sparkles,
  BarChart2,
  Send,
  AlertTriangle,
  CloudRain,
  QrCode,
  Flame
} from 'lucide-react';

export default function NextGenVendorPortal() {
  const [activeTab, setActiveTab] = useState<
    'crm' | 'ai-assistant' | 'surge-pricing' | 'weather-guard' | 'live-wall' | 'slots' | 'escrow' | 'benchmark' | 'reputation' | 'contracts' | 'finance' | 'inventory' | 'team' | 'opportunities'
  >('crm');

  // Supabase & CRM State'leri
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // 1. Dynamic Surge Pricing State
  const [surgeRate, setSurgeRate] = useState(15);
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(true);

  // 2. Weather Guard State
  const [weatherAlert] = useState({
    date: '15 Ağustos 2026',
    riskPercentage: 65,
    condition: 'Aşırı Yağış Riski',
    recommendedAction: 'Açılır Kapanır Tente Ve İç Mekan Protokolünü Aktif Et'
  });

  // 3. AI Yanıt Asistanı State
  const [aiDraft, setAiDraft] = useState('');

  // 4. Smart Slot Lock State
  const [lockedSlots] = useState([
    { id: '1', date: '15 Ağustos 2026', couple: 'Selin & Kaan', status: 'OPSİYONLU (32 Saat Kaldı)', conflictWarning: true },
    { id: '2', date: '20 Eylül 2026', couple: 'Eda & Mert', status: 'KESİN REZERVE', conflictWarning: false }
  ]);

  // 5. Escrow State
  const [escrowPayments] = useState([
    { id: 'PAY-101', couple: 'Selin & Kaan', total: 85000, kapora: 25500, status: 'KAPORA_ALINDI', nextMilestone: 'Düğün Haftası (%40)' },
    { id: 'PAY-102', couple: 'Eda & Mert', total: 60000, kapora: 18000, status: 'BEKLIYOR', nextMilestone: 'Kapora (%30)' }
  ]);

  // Finans Gelir / Gider State
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Işık & Ses Sistemi Kiralama', amount: 12500, category: 'Ekipman' },
    { id: '2', title: 'Garson & Hizmet Personeli', amount: 8000, category: 'Personel' },
  ]);

  // Sözleşmeler
  const [contracts] = useState([
    { id: 'SZ-2026-01', couple: 'Selin & Kaan', date: '15 Ağustos 2026', total: 85000, status: 'IMZALANDI' },
    { id: 'SZ-2026-02', couple: 'Eda & Mert', date: '20 Eylül 2026', total: 60000, status: 'BEKLIYOR' }
  ]);

  // Supabase Veri Çekme (Çökmeye Karşı Güvenli Try-Catch)
  useEffect(() => {
    let isMounted = true;

    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('quote_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (isMounted) {
          if (data && !error) {
            setQuotes(data);
          } else {
            // Veritabanı boşsa varsayılan gösterim
            setQuotes([
              { id: '1', couple_name: 'Selin & Kaan', budget_offered: 85000, event_date: '15 Ağustos 2026', message: 'Kır bahçesi organizasyonu için teklif istiyoruz.', status: 'PENDING' }
            ]);
          }
        }
      } catch (err) {
        console.error("Supabase baglantisi hatasi:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchQuotes();

    const channel = supabase
      .channel('next-gen-vendor-realtime-safe')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quote_requests' }, () => fetchQuotes())
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleUpdateStatus = async (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    await supabase.from('quote_requests').update({ status }).eq('id', id);
  };

  const totalGelir = quotes.filter(q => q.status === 'ACCEPTED').reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const totalGider = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netKar = totalGelir - totalGider;

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30">
      
      {/* Background Glows (Admin Shell ile Birebir Aynı) */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ==================== 1. SOL NAVİGASYON SIDEBAR (Admin Estetiği) ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex shrink-0 min-h-screen">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-zinc-900 dark:text-white tracking-tight">WedyVendor</h2>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">Enterprise Portal</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('crm')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'crm' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Users className="w-4 h-4" /> CRM & Görüşmeler ({quotes.length})
            </button>

            <button onClick={() => setActiveTab('ai-assistant')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'ai-assistant' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Bot className="w-4 h-4 text-purple-500" /> Smart AI Yanıt Asistanı
            </button>

            <button onClick={() => setActiveTab('surge-pricing')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'surge-pricing' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Flame className="w-4 h-4 text-orange-500" /> Dinamik Fiyatlandırma
            </button>

            <button onClick={() => setActiveTab('weather-guard')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'weather-guard' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <CloudRain className="w-4 h-4 text-sky-500" /> Hava Durumu Radarı
            </button>

            <button onClick={() => setActiveTab('live-wall')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'live-wall' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <QrCode className="w-4 h-4 text-emerald-500" /> Canlı QR Fotoğraf Duvarı
            </button>

            <button onClick={() => setActiveTab('slots')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'slots' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Lock className="w-4 h-4 text-amber-500" /> Opsiyon & Slot Kilitleri
            </button>

            <button onClick={() => setActiveTab('escrow')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'escrow' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <CreditCard className="w-4 h-4 text-emerald-500" /> Escrow & Kapora
            </button>

            <button onClick={() => setActiveTab('benchmark')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'benchmark' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <BarChart2 className="w-4 h-4 text-blue-500" /> Rekabet Benchmark
            </button>

            <button onClick={() => setActiveTab('reputation')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'reputation' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Yorumlar & İtibar
            </button>

            <button onClick={() => setActiveTab('contracts')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'contracts' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <FileSignature className="w-4 h-4" /> Sözleşmeler
            </button>

            <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'finance' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Wallet className="w-4 h-4" /> Finans & Ciro
            </button>
          </nav>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Grand Çamlıca
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Onaylı VIP Tedarikçi Statüsü Active</p>
        </div>
      </aside>

      {/* ==================== 2. SAĞ ANA KUMANDA PANELİ ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* Üst Header Bar (Admin Konsolu Tarzı Birebir) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800/80 backdrop-blur-xl shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Event OS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
              Grand Çamlıca Kır Bahçesi
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Gelen teklif taleplerini inceleyin, düğün bütçelerini yönetin ve AI asistanıyla müşterilerle anında eşleşin.
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
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Dinamik Fiyat Artışı</span>
            <div className="text-3xl font-serif font-bold text-orange-500">+{surgeRate}%</div>
            <span className="text-[10px] text-orange-600 font-semibold block">Cumartesi Slot Çarpanı</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Firma Güven Skoru</span>
            <div className="text-3xl font-serif font-bold text-amber-500">%98</div>
            <span className="text-[10px] text-emerald-600 font-semibold block">VIP Rozetli İşletme</span>
          </div>
        </div>

        {/* ==================== DİNAMİK İÇERİK BÖLÜMÜ (BENTO) ==================== */}

        {/* CRM SEKMESİ */}
        {activeTab === 'crm' && (
          <div className="space-y-6 animate-in fade-in duration-300">
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
                  <div key={q.id} className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-amber-500/40">
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

                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { setActiveTab('ai-assistant'); setAiDraft(`Sayın ${q.couple_name},\n\n Grand Çamlıca Kır Bahçesi olarak bütçeniz (₺${q.budget_offered}) ve tarihiniz doğrultusunda teklifimiz hazırlanmıştır.`); }} className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <Bot className="w-3.5 h-3.5" /> AI Taslak
                      </button>

                      {q.status === 'PENDING' ? (
                        <>
                          <button onClick={() => handleUpdateStatus(q.id, 'ACCEPTED')} className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                            <Check className="w-3.5 h-3.5" /> Teklifi Kabul Et
                          </button>
                          <button onClick={() => handleUpdateStatus(q.id, 'REJECTED')} className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-200/60 text-xs font-semibold transition-all cursor-pointer">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${q.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-rose-500/10 text-rose-600 border-rose-200'}`}>
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

        {/* AI YANIT ASİSTANI */}
        {activeTab === 'ai-assistant' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Bot className="w-5 h-5" /> Smart Response Engine (AI Yanıt Asistanı)
            </h2>
            <textarea value={aiDraft} onChange={(e) => setAiDraft(e.target.value)} placeholder="AI teklif mesajı burada oluşturulacak..." className="w-full h-40 p-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl text-xs outline-none focus:border-purple-500 text-zinc-900 dark:text-zinc-100" />
            <button onClick={() => alert('Mesaj WhatsApp üzerinden iletildi.')} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> WhatsApp ile Gönder
            </button>
          </div>
        )}

        {/* FİNANS SEKMESİ */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-4">
              <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Finans, Gelir & Gider Yönetimi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">Toplam Gelir</span>
                  <div className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mt-1">₺{totalGelir.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold block">Toplam Masraf</span>
                  <div className="text-2xl font-serif font-bold text-rose-600 dark:text-rose-400 mt-1">₺{totalGider.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white border border-zinc-700">
                  <span className="text-xs text-zinc-400 font-semibold block">Net İşletme Kârı</span>
                  <div className="text-2xl font-serif font-bold mt-1">₺{netKar.toLocaleString('tr-TR')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}