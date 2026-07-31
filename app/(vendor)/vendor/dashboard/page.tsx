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
  TrendingUp,
  MessageSquare,
  Star,
  Sparkles,
  BarChart2,
  Send,
  AlertTriangle,
  CloudRain,
  Sliders,
  QrCode,
  Share2,
  Layers,
  Flame,
  CheckCircle2
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

  useEffect(() => {
    fetchQuotes();
    const channel = supabase
      .channel('next-gen-vendor-realtime')
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

  const totalGelir = quotes.filter(q => q.status === 'ACCEPTED').reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const totalGider = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netKar = totalGelir - totalGider;

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* ==================== SOL SABİT NAVİGASYON ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex shrink-0 min-h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base tracking-tight">WedyVendor</h2>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">Next-Gen Event OS</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('crm')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'crm' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Users className="w-4 h-4" /> CRM & Görüşmeler ({quotes.length})
            </button>

            <button onClick={() => setActiveTab('ai-assistant')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'ai-assistant' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Bot className="w-4 h-4 text-purple-500" /> AI Yanıt Asistanı
            </button>

            <button onClick={() => setActiveTab('surge-pricing')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'surge-pricing' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Flame className="w-4 h-4 text-orange-500" /> Dinamik Fiyatlandırma
            </button>

            <button onClick={() => setActiveTab('weather-guard')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'weather-guard' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <CloudRain className="w-4 h-4 text-sky-500" /> Hava Durumu Kriz Radarı
            </button>

            <button onClick={() => setActiveTab('live-wall')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'live-wall' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <QrCode className="w-4 h-4 text-emerald-500" /> Canlı QR Fotoğraf Duvarı
            </button>

            <button onClick={() => setActiveTab('slots')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'slots' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Lock className="w-4 h-4 text-amber-500" /> Opsiyon & Slot Kilitleri
            </button>

            <button onClick={() => setActiveTab('escrow')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'escrow' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <CreditCard className="w-4 h-4 text-emerald-500" /> Escrow & Kapora
            </button>

            <button onClick={() => setActiveTab('benchmark')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'benchmark' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <BarChart2 className="w-4 h-4 text-blue-500" /> Rekabet Benchmark
            </button>

            <button onClick={() => setActiveTab('reputation')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'reputation' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Yorumlar & İtibar
            </button>

            <button onClick={() => setActiveTab('contracts')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'contracts' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <FileSignature className="w-4 h-4" /> Sözleşmeler
            </button>

            <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'finance' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Wallet className="w-4 h-4" /> Finans & Ciro
            </button>

            <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'inventory' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Boxes className="w-4 h-4" /> Stok & Envanter
            </button>

            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'team' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Briefcase className="w-4 h-4" /> Ekip & Mesai
            </button>

            <button onClick={() => setActiveTab('opportunities')} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'opportunities' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" /> İhale Havuzu
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[9px] font-bold">Canlı</span>
            </button>
          </nav>
        </div>

        <GlassPanel className="p-4 space-y-2 border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Grand Çamlıca
          </div>
          <p className="text-[10px] text-zinc-500">Next-Gen Enterprise Sertifikalı</p>
        </GlassPanel>
      </aside>

      {/* ==================== SAĞ ANA KONSOL ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* HEADER BAR */}
        <GlassPanel className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-500" /> Next-Gen Event Operating System
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Grand Çamlıca Kır Bahçesi</h1>
            <p className="text-xs text-zinc-500">Dinamik fiyatlandırma, meteoroloji radarı ve canlı fotoğraf duvarı aktif.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Otonom Sistem Bağlı
            </div>

            <button onClick={() => setIsAcceptingQuotes(!isAcceptingQuotes)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${isAcceptingQuotes ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
              <Radio className={`w-3.5 h-3.5 ${isAcceptingQuotes ? 'text-emerald-500 animate-pulse' : ''}`} />
              <span>{isAcceptingQuotes ? 'Teklife Açık' : 'Teklife Kapalı'}</span>
            </button>
          </div>
        </GlassPanel>

        {/* KONTROL METRİKLERİ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Toplam Görüşme / Teklif</span>
            <div className="text-3xl font-serif font-bold">{quotes.length}</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Kabul İhtimali %85</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Dinamik Fiyat Artışı</span>
            <div className="text-3xl font-serif font-bold text-orange-500">+{surgeRate}%</div>
            <span className="text-[10px] text-orange-600 font-medium block">Hafta Sonu Cumartesi Slotu</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Escrow Kapora Havuzu</span>
            <div className="text-3xl font-serif font-bold text-emerald-600">₺43,500</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Akıllı Kademeli Ödeme</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Yağmur / Kriz Riski</span>
            <div className="text-3xl font-serif font-bold text-sky-500">%{weatherAlert.riskPercentage}</div>
            <span className="text-[10px] text-sky-600 font-medium block">{weatherAlert.date} İçin İkaz</span>
          </GlassPanel>
        </div>

        {/* ==================== YENİ MODÜL 1: DİNAMİK ESNEK FİYATLANDIRMA ==================== */}
        {activeTab === 'surge-pricing' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-orange-500 flex items-center gap-2">
                  <Flame className="w-5 h-5" /> Dynamic Surge Pricing (Esnek Fiyatlandırma)
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Yoğun tarihler için fiyatı otomatik artıran, boş hafta içi günlerde indirim sunan AI motoru.</p>
              </div>

              <button onClick={() => setIsDynamicPricingActive(!isDynamicPricingActive)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isDynamicPricingActive ? 'bg-orange-500 text-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                {isDynamicPricingActive ? 'Otomatik Mod Aktif' : 'Manuel Mod'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-semibold">Yoğun Yaz Sezonu Cumartesi Fiyat Çarpanı</span>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="40" value={surgeRate} onChange={(e) => setSurgeRate(Number(e.target.value))} className="accent-orange-500" />
                  <span className="font-bold text-sm text-orange-500">+{surgeRate}%</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* ==================== YENİ MODÜL 2: HAVA DURUMU & KRİZ RADARI ==================== */}
        {activeTab === 'weather-guard' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-sky-500 flex items-center gap-2">
                  <CloudRain className="w-5 h-5" /> Weather Guard & Kriz Radarı
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Açık hava düğünleri için yağmur ve fırtına riskini izleyip otomatik B planı hazırlar.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-sky-600 dark:text-sky-400">{weatherAlert.date} - {weatherAlert.condition}</span>
                <span className="text-xs font-bold text-sky-600 bg-sky-500/20 px-3 py-1 rounded-full">Risk: %{weatherAlert.riskPercentage}</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300"><strong>Tavsiye Edilen Aksiyon:</strong> {weatherAlert.recommendedAction}</p>
              <button onClick={() => alert('İç mekan otomatik havalandırma ve tente sistemine onay gönderildi.')} className="px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                B Planı Protokolünü Onayla
              </button>
            </div>
          </GlassPanel>
        )}

        {/* ==================== YENİ MODÜL 3: CANLI QR FOTOĞRAF DUVARI ==================== */}
        {activeTab === 'live-wall' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-emerald-500 flex items-center gap-2">
                  <QrCode className="w-5 h-5" /> Canlı QR Fotoğraf Duvarı & Branding Hub
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün gecesi davetlilerin QR kod ile yüklediği fotoğrafları salondaki ekrana yansıtın.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-32 h-32 bg-white p-2 rounded-2xl flex items-center justify-center border shadow-xs">
                <QrCode className="w-24 h-24 text-zinc-900" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-bold text-sm">Etkinlik İçi Canlı QR Kodunuz Hazır</h4>
                <p className="text-xs text-zinc-500">Davetliler bu kodu taratarak çektikleri fotoğrafları ekrana gönderebilir. Fotoğrafların altında firmanızın logosu yer alır.</p>
                <button onClick={() => alert('Canlı ekran sunum modu yeni sekmede başlatıldı.')} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Canlı Duvar Sunumunu Başlat
                </button>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* ==================== MÜŞTERİ GÖRÜŞMELERİ & CRM ==================== */}
        {activeTab === 'crm' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Müşteri Görüşmeleri & Canlı Teklif Talepleri</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün tarihlerini ve bütçeleri kontrol edip onaylayın veya AI şablonuyla yanıtlayın.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{quotes.length} Aktif Müşteri</span>
            </div>

            {loading ? (
              <div className="flex justify-center p-12 text-zinc-400 gap-2 items-center">
                <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                <span className="text-xs font-medium">Müşteri talepleri yükleniyor...</span>
              </div>
            ) : quotes.length === 0 ? (
              <div className="p-12 text-center text-xs text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                Henüz gelen bir müşteri talebi bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.map((q) => (
                  <GlassPanel key={q.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{q.couple_name}</h4>
                        <span className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                          Bütçe: ₺{(Number(q.budget_offered) || 0).toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">Düğün Tarihi: {q.event_date || 'Belirtilmedi'}</p>
                      {q.message && <p className="text-xs italic bg-zinc-100/50 dark:bg-zinc-800/50 p-3 rounded-xl mt-2">"{q.message}"</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {q.status === 'PENDING' ? (
                        <>
                          <button onClick={() => handleUpdateStatus(q.id, 'ACCEPTED')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer">
                            <Check className="w-3.5 h-3.5 inline mr-1" /> Onayla
                          </button>
                          <button onClick={() => handleUpdateStatus(q.id, 'REJECTED')} className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-200/60 text-xs font-semibold cursor-pointer">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-200">
                          {q.status === 'ACCEPTED' ? 'Onaylandı' : 'Reddedildi'}
                        </span>
                      )}
                    </div>
                  </GlassPanel>
                ))}
              </div>
            )}
          </GlassPanel>
        )}

      </main>
    </div>
  );
}