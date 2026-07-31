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
  BarChart2,
  Send,
  AlertTriangle,
  CloudRain,
  QrCode,
  Flame,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function VendorEnterprisePortal() {
  const [activeTab, setActiveTab] = useState<
    'crm' | 'ai-assistant' | 'surge-pricing' | 'weather-guard' | 'live-wall' | 'slots' | 'escrow' | 'benchmark' | 'reputation' | 'contracts' | 'finance' | 'inventory' | 'team' | 'opportunities'
  >('crm');

  // Supabase & CRM State'leri
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // Dynamic Surge Pricing State
  const [surgeRate, setSurgeRate] = useState(15);
  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(true);

  // Weather Guard State
  const [weatherAlert] = useState({
    date: '15 Ağustos 2026',
    riskPercentage: 65,
    condition: 'Aşırı Yağış Riski',
    recommendedAction: 'Açılır Kapanır Tente Ve İç Mekan Protokolünü Aktif Et'
  });

  // AI Yanıt Asistanı State
  const [aiDraft, setAiDraft] = useState('');

  // Smart Slot Lock State
  const [lockedSlots] = useState([
    { id: '1', date: '15 Ağustos 2026', couple: 'Selin & Kaan', status: 'OPSİYONLU (32 Saat Kaldı)', conflictWarning: true },
    { id: '2', date: '20 Eylül 2026', couple: 'Eda & Mert', status: 'KESİN REZERVE', conflictWarning: false }
  ]);

  // Escrow State
  const [escrowPayments] = useState([
    { id: 'PAY-101', couple: 'Selin & Kaan', total: 85000, kapora: 25500, status: 'KAPORA_ALINDI', nextMilestone: 'Düğün Haftası (%40)' },
    { id: 'PAY-102', couple: 'Eda & Mert', total: 60000, kapora: 18000, status: 'BEKLIYOR', nextMilestone: 'Kapora (%30)' }
  ]);

  // Finans Gelir / Gider State
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Işık & Ses Sistemi Kiralama', amount: 12500, category: 'Ekipman' },
    { id: '2', title: 'Garson & Hizmet Personeli', amount: 8000, category: 'Personel' },
  ]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'Genel' });

  // Sözleşmeler
  const [contracts] = useState([
    { id: 'SZ-2026-01', couple: 'Selin & Kaan', date: '15 Ağustos 2026', total: 85000, status: 'IMZALANDI' },
    { id: 'SZ-2026-02', couple: 'Eda & Mert', date: '20 Eylül 2026', total: 60000, status: 'BEKLIYOR' }
  ]);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [newContract, setNewContract] = useState({ couple: '', date: '', amount: '' });

  // Realtime Akışı
  useEffect(() => {
    fetchQuotes();
    const channel = supabase
      .channel('next-gen-vendor-realtime-admin-style')
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

  const handleGenerateAiResponse = (coupleName: string, budget: number) => {
    setAiDraft(`Sayın ${coupleName},\n\nGrand Çamlıca Kır Bahçesi olarak bütçeniz (₺${budget.toLocaleString('tr-TR')}) ve düğün tarihiniz doğrultusunda AI analiz raporumuz oluşturulmuştur. Paketlerimiz %85 kabul edilebilirlik skoru sunmaktadır.`);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses(prev => [
      ...prev,
      { id: Date.now().toString(), title: newExpense.title, amount: Number(newExpense.amount), category: newExpense.category }
    ]);
    setNewExpense({ title: '', amount: '', category: 'Genel' });
  };

  const totalGelir = quotes.filter(q => q.status === 'ACCEPTED').reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const totalGider = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netKar = totalGelir - totalGider;

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-amber-500/30">
      
      {/* Dynamic Background Glows (Admin Shell ile Birebir Aynı) */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ==================== 1. SOL NAVİGASYON SIDEBAR (Admin Sidebar Dili) ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex shrink-0 min-h-screen">
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

            <button onClick={() => setActiveTab('live-wall')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'live-wall' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
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

            <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'inventory' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Boxes className="w-4 h-4" /> Stok & Envanter
            </button>

            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'team' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <Briefcase className="w-4 h-4" /> Ekip & Mesai
            </button>

            <button onClick={() => setActiveTab('opportunities')} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'opportunities' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" /> İhale Havuzu
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">Canlı</span>
            </button>
          </nav>
        </div>

        {/* Firma Kimliği Alt Kart (Admin ile Aynı) */}
        <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Grand Çamlıca</span>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Onaylı Kurumsal Tedarikçi Rozeti Aktif</p>
        </div>
      </aside>

      {/* ==================== 2. SAĞ ANA KUMANDA PANELİ ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* Üst Header Bar (Admin Konsolu Tarzı Birebir) */}
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

        {/* ==================== DİNAMİK İÇERİK BÖLÜMÜ (BENTO DÜZENİ) ==================== */}
        
        {/* 1. MÜŞTERİ GÖRÜŞMELERİ & CRM */}
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
                      <button onClick={() => { setActiveTab('ai-assistant'); handleGenerateAiResponse(q.couple_name, Number(q.budget_offered) || 50000); }} className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <Bot className="w-3.5 h-3.5" /> AI Taslak Hazırla
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

        {/* 2. AI YANIT ASİSTANI */}
        {activeTab === 'ai-assistant' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <Bot className="w-5 h-5" /> Smart Response Engine (AI Yanıt Asistanı)
            </h2>
            <textarea value={aiDraft} onChange={(e) => setAiDraft(e.target.value)} placeholder="AI teklif mesajı burada oluşturulacak..." className="w-full h-44 p-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-2xl text-xs outline-none focus:border-purple-500 font-mono" />
            <div className="flex gap-2">
              <button onClick={() => alert('Teklif mesajı WhatsApp ve E-posta üzerinden çifte iletildi.')} className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2">
                <Send className="w-3.5 h-3.5" /> WhatsApp ile Gönder
              </button>
            </div>
          </div>
        )}

        {/* 3. DİNAMİK FİYATLANDIRMA */}
        {activeTab === 'surge-pricing' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-orange-500 flex items-center gap-2">
              <Flame className="w-5 h-5" /> Dynamic Surge Pricing (Dinamik Fiyatlandırma)
            </h2>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold">Yoğun Yaz Sezonu Cumartesi Fiyat Çarpanı</span>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="40" value={surgeRate} onChange={(e) => setSurgeRate(Number(e.target.value))} className="accent-orange-500" />
                <span className="font-bold text-sm text-orange-500">+{surgeRate}%</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. HAVA DURUMU RADARI */}
        {activeTab === 'weather-guard' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-sky-500 flex items-center gap-2">
              <CloudRain className="w-5 h-5" /> Weather Guard & Kriz Radarı
            </h2>
            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-sky-600 dark:text-sky-400">{weatherAlert.date} - {weatherAlert.condition}</span>
                <span className="text-xs font-bold text-sky-600 bg-sky-500/20 px-3 py-1 rounded-full">Risk: %{weatherAlert.riskPercentage}</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300"><strong>Tavsiye Edilen Aksiyon:</strong> {weatherAlert.recommendedAction}</p>
            </div>
          </div>
        )}

        {/* 5. CANLI QR FOTOĞRAF DUVARI */}
        {activeTab === 'live-wall' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-emerald-500 flex items-center gap-2">
              <QrCode className="w-5 h-5" /> Canlı QR Fotoğraf Duvarı & Branding Hub
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-32 h-32 bg-white p-2 rounded-2xl flex items-center justify-center border shadow-xs">
                <QrCode className="w-24 h-24 text-zinc-900" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-bold text-sm">Etkinlik İçi Canlı QR Kodunuz Hazır</h4>
                <button onClick={() => alert('Canlı ekran sunum modu yeni sekmede başlatıldı.')} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Canlı Duvar Sunumunu Başlat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. SLOT KİLİTLERİ */}
        {activeTab === 'slots' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Smart Slot Lock (Opsiyon & Randevu Kilitleri)
            </h2>
            <div className="space-y-3">
              {lockedSlots.map((slot) => (
                <div key={slot.id} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{slot.date}</h4>
                    <p className="text-xs text-zinc-500">Müşteri: {slot.couple} • Durum: <strong className="text-zinc-900 dark:text-white">{slot.status}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. ESCROW KAPORA */}
        {activeTab === 'escrow' && (
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Taksitli Kapora & Güvenli Ödeme (Escrow)
            </h2>
            <div className="space-y-3">
              {escrowPayments.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{p.couple}</h4>
                    <p className="text-xs text-zinc-500">Toplam: ₺{p.total.toLocaleString('tr-TR')} • Tahsil Edilen Kapora: <strong className="text-emerald-600">₺{p.kapora.toLocaleString('tr-TR')}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. FİNANS GELİR & GİDER */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-4">
              <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-white">Finans, Gelir & Gider Yönetimi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xs text-emerald-600 font-semibold block">Toplam Düğün Geliri</span>
                  <div className="text-2xl font-serif font-bold text-emerald-600 mt-1">₺{totalGelir.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <span className="text-xs text-rose-600 font-semibold block">Toplam Etkinlik Masrafı</span>
                  <div className="text-2xl font-serif font-bold text-rose-600 mt-1">₺{totalGider.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white border border-zinc-700">
                  <span className="text-xs text-zinc-400 font-semibold block">Net İşletme Kârı</span>
                  <div className="text-2xl font-serif font-bold mt-1">₺{netKar.toLocaleString('tr-TR')}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold">Etkinlik Masrafı / Gider Kaydı Ekle</h3>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input type="text" placeholder="Gider Açıklaması" value={newExpense.title} onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <input type="number" placeholder="Tutar (TL)" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none">
                  <option value="Ekipman">Ekipman</option>
                  <option value="Personel">Personel</option>
                  <option value="Genel">Genel</option>
                </select>
                <button type="submit" className="h-10 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                  + Gider Kaydet
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}