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
  CheckCircle2, 
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
  Bot,
  Zap,
  Layers,
  Sparkles,
  QrCode
} from 'lucide-react';

export default function VendorEnterprisePortal() {
  const [activeTab, setActiveTab] = useState<'crm' | 'contracts' | 'finance' | 'inventory' | 'team' | 'opportunities' | 'analytics' | 'storefront'>('crm');

  // Supabase State'leri
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // Finans Gelir / Gider State'leri
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Işık & Ses Sistemi Kiralama', amount: 12500, category: 'Ekipman', date: '2026-07-28' },
    { id: '2', title: 'Garson & Hizmet Personeli', amount: 8000, category: 'Personel', date: '2026-07-29' },
  ]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'Genel' });

  // Sözleşme State'leri
  const [contracts, setContracts] = useState([
    { id: 'SZ-2026-01', couple: 'Selin & Kaan', date: '15 Ağustos 2026', total: 85000, status: 'IMZALANDI' },
    { id: 'SZ-2026-02', couple: 'Eda & Mert', date: '20 Eylül 2026', total: 60000, status: 'BEKLIYOR' }
  ]);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [newContract, setNewContract] = useState({ couple: '', date: '', amount: '' });

  // Envanter & Stok State'leri
  const [inventory, setInventory] = useState([
    { id: '1', name: 'Tiffany Sandalye (Beyaz)', total: 600, reserved: 450, unit: 'Adet' },
    { id: '2', name: 'Yuvarlak Masalar (10 Kişilik)', total: 60, reserved: 45, unit: 'Adet' },
    { id: '3', name: 'LED Sahne Robot Işık', total: 12, reserved: 12, unit: 'Takım' }
  ]);

  // Ekip Üyeleri State'leri
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Ahmet Yılmaz', role: 'Baş Fotoğrafçı & Şef', phone: '+90 532 000 0000', status: 'MESAIDE' },
    { id: '2', name: 'Canan Kaya', role: 'Organizasyon Sorumlusu', phone: '+90 533 000 0000', status: 'IZINLI' }
  ]);

  // Fırsat & İhale Havuzu
  const [opportunities, setOpportunities] = useState([
    { id: 'OP-101', title: 'Son Dakika Düğün Salonu Arayışı', couple: 'Burcu & Tolga', date: '12 Ağustos 2026', budget: '₺75,000', city: 'İstanbul' },
    { id: 'OP-102', title: 'Açık Hava Kır Bahçesi Arayışı', couple: 'Zeynep & Ali', date: '05 Eylül 2026', budget: '₺90,000', city: 'İstanbul' }
  ]);

  // Realtime Akışı
  useEffect(() => {
    fetchQuotes();

    const channel = supabase
      .channel('vendor-portal-realtime-v2')
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

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses(prev => [
      ...prev,
      { id: Date.now().toString(), title: newExpense.title, amount: Number(newExpense.amount), category: newExpense.category, date: new Date().toISOString().split('T')[0] }
    ]);
    setNewExpense({ title: '', amount: '', category: 'Genel' });
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContract.couple || !newContract.amount) return;
    setContracts(prev => [
      ...prev,
      { id: `SZ-2026-0${prev.length + 1}`, couple: newContract.couple, date: newContract.date || 'Belirtilmedi', total: Number(newContract.amount), status: 'BEKLIYOR' }
    ]);
    setNewContract({ couple: '', date: '', amount: '' });
    setIsContractModalOpen(false);
  };

  // Finansal Hesaplamalar
  const totalGelir = quotes.filter(q => q.status === 'ACCEPTED').reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const totalGider = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netKar = totalGelir - totalGider;

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* ==================== SOL SABİT SEKMELİ MENÜ ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex shrink-0 min-h-screen">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base tracking-tight">WedyVendor</h2>
              <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">ERP & İşletme Portalı</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button onClick={() => setActiveTab('crm')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'crm' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Users className="w-4 h-4" /> Müşteri & CRM ({quotes.length})
            </button>

            <button onClick={() => setActiveTab('contracts')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'contracts' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <FileSignature className="w-4 h-4" /> Sözleşmeler ({contracts.length})
            </button>

            <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'finance' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Wallet className="w-4 h-4" /> Finans, Gelir & Gider
            </button>

            <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'inventory' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Boxes className="w-4 h-4" /> Stok & Envanter
            </button>

            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'team' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Briefcase className="w-4 h-4" /> Ekip & Görevler
            </button>

            <button onClick={() => setActiveTab('opportunities')} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'opportunities' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" /> VIP İhale Havuzu
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[10px] font-bold">Yeni</span>
            </button>

            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Eye className="w-4 h-4" /> Ziyaretçi & Analitik
            </button>

            <button onClick={() => setActiveTab('storefront')} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'storefront' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Store className="w-4 h-4" /> Vitrin & Paketler
            </button>
          </nav>
        </div>

        <GlassPanel className="p-4 space-y-2 border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Grand Çamlıca
          </div>
          <p className="text-[10px] text-zinc-500">Doğrulanmış VIP Kurumsal İşletme</p>
        </GlassPanel>
      </aside>

      {/* ==================== SAĞ ANA KUMANDA PANELİ ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* HEADER BAR */}
        <GlassPanel className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-500" /> İşletme Portalı
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Grand Çamlıca Kır Bahçesi</h1>
            <p className="text-xs text-zinc-500">Müşterileri yönetin, stok takibi yapın, sözleşme oluşturun ve finans süreçlerinizi yürütün.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Supabase Realtime Bağlı
            </div>

            <button onClick={() => setIsAcceptingQuotes(!isAcceptingQuotes)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${isAcceptingQuotes ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
              <Radio className={`w-3.5 h-3.5 ${isAcceptingQuotes ? 'text-emerald-500 animate-pulse' : ''}`} />
              <span>{isAcceptingQuotes ? 'Teklife Açık' : 'Teklife Kapalı'}</span>
            </button>
          </div>
        </GlassPanel>

        {/* METRİK KARTLARI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Toplam Görüşme / Teklif</span>
            <div className="text-3xl font-serif font-bold">{quotes.length}</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Müşteri İstekleri</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Onaylanan Sözleşmeler</span>
            <div className="text-3xl font-serif font-bold text-emerald-600">{contracts.filter(c => c.status === 'IMZALANDI').length}</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Resmi Anlaşma</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Net Kâr / Zarar</span>
            <div className={`text-3xl font-serif font-bold ${netKar >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ₺{netKar.toLocaleString('tr-TR')}
            </div>
            <span className="text-[10px] text-zinc-500 font-medium block">Gelir - Gider Dengesi</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Aylık Profil Gösterimi</span>
            <div className="text-3xl font-serif font-bold">14,250</div>
            <span className="text-[10px] text-emerald-600 font-medium block">%24 Trafik Artışı</span>
          </GlassPanel>
        </div>

        {/* 1. MÜŞTERİ GÖRÜŞMELERİ & CRM */}
        {activeTab === 'crm' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Müşteri Görüşmeleri & Canlı Teklif Talepleri</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün tarihlerini ve bütçeleri kontrol edip onaylayın veya reddedin.</p>
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

        {/* 2. SÖZLEŞMELER */}
        {activeTab === 'contracts' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Sözleşme Studio & Doküman Yönetimi</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün sözleşmeleri hazırlayın, PDF olarak indirin veya dijital imza toplayın.</p>
              </div>
              <button onClick={() => setIsContractModalOpen(true)} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl cursor-pointer">
                + Yeni Sözleşme Hazırla
              </button>
            </div>

            <div className="space-y-3">
              {contracts.map((c) => (
                <GlassPanel key={c.id} className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-400">{c.id}</span>
                      <h4 className="font-bold text-sm">{c.couple}</h4>
                    </div>
                    <p className="text-xs text-zinc-500">Tarih: {c.date} • Toplam Tutar: ₺{c.total.toLocaleString('tr-TR')}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.status === 'IMZALANDI' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200' : 'bg-amber-500/10 text-amber-600 border border-amber-200'}`}>
                      {c.status}
                    </span>
                    <button onClick={() => alert(`${c.id} numaralı sözleşme PDF olarak indiriliyor...`)} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      PDF İndir
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* 3. FİNANS GELİR & GİDER */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <GlassPanel className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold">Finans, Gelir & Gider Yönetimi</h2>
              <p className="text-xs text-zinc-500">İşletmenizin etkinlik masraflarını girin, net kârlılık oranınızı hesaplayın.</p>
              
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
            </GlassPanel>

            <GlassPanel className="p-6 space-y-4">
              <h3 className="text-sm font-bold">Etkinlik Masrafı / Gider Kaydı Ekle</h3>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input type="text" placeholder="Gider Açıklaması" value={newExpense.title} onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <input type="number" placeholder="Tutar (TL)" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none">
                  <option value="Ekipman">Ekipman</option>
                  <option value="Personel">Personel</option>
                  <option value="Yiyecek/İçecek">Yiyecek/İçecek</option>
                  <option value="Pazarlama">Pazarlama</option>
                  <option value="Genel">Genel</option>
                </select>
                <button type="submit" className="h-10 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                  + Gider Kaydet
                </button>
              </form>

              <div className="space-y-2 pt-3">
                {expenses.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold">{exp.title}</span>
                      <span className="text-zinc-400 mx-2">•</span>
                      <span className="text-zinc-500">{exp.category}</span>
                    </div>
                    <span className="font-bold text-rose-600">-₺{exp.amount.toLocaleString('tr-TR')}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        )}

        {/* 4. ENVANTER & STOK TAKİBİ */}
        {activeTab === 'inventory' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Stok & Envanter Yönetimi</h2>
                <p className="text-xs text-zinc-500 mt-1">Masa, sandalye, ses/ışık sistemleri ve zimmetli ekipman stokları.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <GlassPanel key={item.id} className="p-5 space-y-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{item.unit} Stoku</span>
                  <h4 className="font-bold text-base">{item.name}</h4>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
                    <span className="text-zinc-500">Mevcut: <strong className="text-zinc-900 dark:text-white">{item.total}</strong></span>
                    <span className="text-amber-600 font-semibold">Rezerve: {item.reserved}</span>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* 5. EKİP & GÖREV YÖNETİMİ */}
        {activeTab === 'team' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Ekip Üyeleri & Görev Dağılımı</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün günü görevli personel listesi ve mesai durumları.</p>
              </div>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <GlassPanel key={member.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{member.name}</h4>
                    <p className="text-xs text-zinc-500">{member.role} • {member.phone}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${member.status === 'MESAIDE' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200' : 'bg-zinc-100 text-zinc-500'}`}>
                    {member.status}
                  </span>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* 6. VIP İHALE HAVUZU */}
        {activeTab === 'opportunities' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-600 dark:text-amber-400">Canlı İhale & Acil Düğün Havuzu</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün mekanı/hizmet arayan çiftlerin açtığı canlı ilanlara teklif verin.</p>
              </div>
            </div>

            <div className="space-y-3">
              {opportunities.map((op) => (
                <GlassPanel key={op.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-amber-200/60 dark:border-amber-900/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-600">{op.id}</span>
                      <h4 className="font-bold text-sm">{op.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-500">{op.couple} • {op.city} • Tarih: {op.date} • Bütçe: <strong className="text-zinc-900 dark:text-white">{op.budget}</strong></p>
                  </div>
                  <button onClick={() => alert(`${op.couple} çiftine hızlı özel teklifiniz iletildi.`)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                    Hızlı Teklif Ver
                  </button>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* 7. ZİYARETÇİ ANALİTİĞİ */}
        {activeTab === 'analytics' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold">Ziyaretçi & Trafik Analitiği</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="text-xs text-zinc-400">Son 30 Gün Gösterim</span>
                <div className="text-2xl font-bold">14,250 Kişi</div>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="text-xs text-zinc-400">Telefon Tıklanması</span>
                <div className="text-2xl font-bold text-emerald-600">320 Tık</div>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="text-xs text-zinc-400">Dönüşüm Oranı</span>
                <div className="text-2xl font-bold text-amber-600">%4.8</div>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* 8. VİTRİN DÜZENLEME */}
        {activeTab === 'storefront' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold">Vitrin & Paket Düzenleme</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
                <h4 className="font-bold text-sm">Standart Kır Düğünü Paketi</h4>
                <p className="text-xs text-zinc-500">500 Kişilik Menü + Işık Ses Düzeni</p>
                <div className="text-lg font-serif font-bold text-emerald-600">₺65,000</div>
              </div>
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
                <h4 className="font-bold text-sm">VIP Her Şey Dahil Düğün Paketi</h4>
                <p className="text-xs text-zinc-500">750 Kişilik Menü + Fotoğraf + Orkestra</p>
                <div className="text-lg font-serif font-bold text-emerald-600">₺120,000</div>
              </div>
            </div>
          </GlassPanel>
        )}

      </main>

      {/* SÖZLEŞME OLUŞTURMA MODALI */}
      {isContractModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Düğün Sözleşmesi Taslağı Oluştur</h3>
            <form onSubmit={handleCreateContract} className="space-y-3">
              <input type="text" placeholder="Çift İsimleri (Örn: Selin & Kaan)" value={newContract.couple} onChange={(e) => setNewContract({ ...newContract, couple: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Düğün Tarihi" value={newContract.date} onChange={(e) => setNewContract({ ...newContract, date: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="number" placeholder="Anlaşılan Toplam Tutar (TL)" value={newContract.amount} onChange={(e) => setNewContract({ ...newContract, amount: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsContractModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold">Sözleşmeyi Oluştur</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}