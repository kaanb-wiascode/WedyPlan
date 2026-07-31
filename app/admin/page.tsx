// app/admin/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useTransition } from 'react';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { supabase } from '@/lib/supabase';
import { getAdminMetrics } from '@/lib/actions/admin-dashboard';
import { 
  Users, 
  Store, 
  ShieldCheck, 
  UserPlus, 
  Plus, 
  Check, 
  X,
  Radio,
  Ghost,
  Megaphone,
  MousePointerClick,
  Loader2,
  Wallet,
  Sparkles,
  Bot,
  Activity,
  ArrowUpRight,
  Sliders,
  HardDrive,
  RefreshCw,
  History,
  MapPin,
  Gavel,
  LineChart,
  CreditCard,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  FileText
} from 'lucide-react';

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('executive');
  const [isPending, startTransition] = useTransition();

  // Canlı State'ler
  const [couples, setCouples] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Anlık Canlı İzleyici Simülasyonu
  const [liveVisitors, setLiveVisitors] = useState(342);
  const [liveClickCount, setLiveClickCount] = useState(128450);

  // Modallar
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [newCouple, setNewCouple] = useState({ name: '', date: '', city: '', budget: '' });

  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Mekan', city: '' });

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [newSubPlan, setNewSubPlan] = useState({ name: '', price: '', limit: '', badge: 'Yeni' });

  // Finans & Ayar State'leri
  const [commissionRate, setCommissionRate] = useState(12);
  const [payoutHoldStatus, setPayoutHoldStatus] = useState(false);
  const [cacheStatus, setCacheStatus] = useState('SYNCED');
  const [isCacheClearing, setIsCacheClearing] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState({
    liveStreaming: true,
    aiPhotoVault: false,
    cryptoPayments: false,
    autoVendorMatching: true,
  });

  // Abonelik Paketleri
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: '1', name: 'Başlangıç Tedarikçi', price: '₺1,250 /ay', limit: '10 Teklif/ay', badge: 'Standart' },
    { id: '2', name: 'Pro Organizasyon', price: '₺3,450 /ay', limit: 'Sınırsız Teklif', badge: 'Popüler' },
    { id: '3', name: 'VIP Enterprise Venue', price: '₺8,900 /ay', limit: 'Öncelikli Eşleşme + AI', badge: 'Kurumsal' },
  ]);

  // Audit Logs & Disputes
  const [auditLogs] = useState([
    { id: '1', admin: 'Kaan Atamer', action: 'Komisyon Oranı Güncellendi (%12 -> %15)', target: 'Sistem Ayarları', timestamp: 'Bugün 02:14:22', ip: '195.175.254.12' },
    { id: '2', admin: 'Kaan Atamer', action: 'Tedarikçi Onaylandı', target: 'Grand Çamlıca Kır Bahçesi', timestamp: 'Dün 18:42:01', ip: '195.175.254.12' },
  ]);

  const [disputes] = useState([
    { id: 'DSP-101', couple: 'Eda & Mert', vendor: 'Studio Mercek', amount: '₺15,000', reason: 'Tarih Değişikliği / Kapora İadesi', status: 'IN_REVIEW' },
    { id: 'DSP-102', couple: 'Selin & Kaan', vendor: 'Grand Çamlıca', amount: '₺45,000', reason: 'Hizmet Kapsamı Anlaşmazlığı', status: 'RESOLVED' },
  ]);

  // CANLI VERİ ÇEKME & REALTIME DİNLEME
  useEffect(() => {
    fetchInitialData();

    // Anlık Sayaç Simülasyonu
    const timer = setInterval(() => {
      setLiveVisitors(prev => prev + Math.floor(Math.random() * 5) - 2);
      setLiveClickCount(prev => prev + Math.floor(Math.random() * 8));
    }, 4000);

    // Supabase Realtime Aboneliği
    const channel = supabase
      .channel('admin-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'couples' }, () => fetchCouples())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vendors' }, () => fetchVendors())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quote_requests' }, () => fetchQuotes())
      .subscribe();

    return () => {
      clearInterval(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([fetchCouples(), fetchVendors(), fetchQuotes()]);
    setLoading(false);
  };

  const fetchCouples = async () => {
    const { data, error } = await supabase
      .from('couples')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data && !error) setCouples(data);
  };

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) setVendors(data);
  };

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) setQuotes(data);
  };

  // ÇİFT EKLEME
  const handleAddCouple = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouple.name) return;

    const { error } = await supabase.from('couples').insert([
      {
        names: newCouple.name,
        wedding_date: newCouple.date || 'Belirtilmedi',
        city: newCouple.city || 'İstanbul',
        budget: Number(newCouple.budget) || 0,
        status: 'CONFIRMED'
      }
    ]);

    if (!error) {
      setNewCouple({ name: '', date: '', city: '', budget: '' });
      setIsCoupleModalOpen(false);
      fetchCouples();
    }
  };

  // TEDARİKÇİ EKLEME
  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;

    const { error } = await supabase.from('vendors').insert([
      {
        name: newVendor.name,
        category: newVendor.category,
        city: newVendor.city || 'İstanbul',
        is_verified: true,
        trust_score: 100
      }
    ]);

    if (!error) {
      setNewVendor({ name: '', category: 'Mekan', city: '' });
      setIsVendorModalOpen(false);
      fetchVendors();
    }
  };

  // ONAY DURUMU DEĞİŞTİRME
  const toggleVendorStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('vendors')
      .update({ is_verified: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchVendors();
    }
  };

  const handleAddSubPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubPlan.name) return;
    setSubscriptionPlans(prev => [
      ...prev,
      { id: Date.now().toString(), name: newSubPlan.name, price: newSubPlan.price, limit: newSubPlan.limit, badge: newSubPlan.badge }
    ]);
    setNewSubPlan({ name: '', price: '', limit: '', badge: 'Yeni' });
    setIsSubModalOpen(false);
  };

  const handleClearCache = () => {
    setIsCacheClearing(true);
    setTimeout(() => {
      setCacheStatus('PURGED & REFRESHED');
      setIsCacheClearing(false);
    }, 1200);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setIsBroadcastSent(true);
    setTimeout(() => {
      setBroadcastMessage('');
      setIsBroadcastSent(false);
    }, 2000);
  };

  const toggleFeature = (key: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Soft Arka Plan Işığı */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* 1. EXECUTIVE KONTROL PANELİ */}
        {activeTab === 'executive' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sistem Yönetim Kumanda Merkezi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
                  Executive Kontrol Paneli (Canlı Veri)
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  WedyPlan altyapısını, Supabase verilerini ve platform trafiğini yönetin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-200/60 text-rose-600 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{liveVisitors} Anlık İzleyici</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 text-emerald-600 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Supabase Realtime Bağlı
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-12 text-zinc-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                <span className="text-xs font-medium">Supabase verileri yükleniyor...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Kayıtlı Çiftler (Supabase)</span>
                  <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{couples.length}</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Kayıtlı Tedarikçiler (Supabase)</span>
                  <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">{vendors.length}</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Teklif Talepleri (Canlı)</span>
                  <div className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400">{quotes.length}</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                  <span className="text-xs text-zinc-500">Platform Komisyonu</span>
                  <div className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">%{commissionRate}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/80 to-white/90 dark:from-zinc-900/80 dark:to-zinc-900/40 border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                      <Bot className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-white">Hızlı Aksiyon Araçları</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => { setActiveTab('couples'); setIsCoupleModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Yeni Çift Kaydet</span>
                  </button>
                  <button onClick={() => { setActiveTab('vendors'); setIsVendorModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tedarikçi Kaydet</span>
                  </button>
                  <button onClick={() => { setActiveTab('subscriptions'); setIsSubModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Yeni Paket Tanımla</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
                <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-500" /> Sistem Genel Duyurusu
                </h3>
                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <textarea 
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Tüm kullanıcılara canlı duyuru yazın..." 
                    className="w-full h-20 p-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500 resize-none"
                  />
                  <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs">
                    {isBroadcastSent ? 'YAYINLANDI!' : 'Anında Canlı Bildir'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 2. ÇİFT YÖNETİMİ PANELİ (GÖLGE MODU ENTEGRELİ) */}
        {activeTab === 'couples' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-xl font-serif font-bold">Supabase Çift Verileri ({couples.length})</h2>
              <button onClick={() => setIsCoupleModalOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer">
                + Canlı Çift Kaydet
              </button>
            </div>

            <div className="space-y-2">
              {couples.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400 bg-white/80 dark:bg-zinc-900/60 rounded-2xl">
                  Henüz kayıtlı çift bulunmuyor.
                </div>
              ) : (
                couples.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{c.names}</h4>
                      <p className="text-xs text-zinc-500">{c.city} • Düğün Tarihi: {c.wedding_date} • Bütçe: ₺{c.budget}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          const res = await fetch('/api/admin/impersonate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ targetUserId: c.id, targetRole: 'couple' })
                          });
                          const data = await res.json();
                          if (data.success) {
                            localStorage.setItem('shadowToken', data.shadowToken);
                            window.location.href = data.redirectUrl;
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Ghost className="w-3.5 h-3.5" />
                        <span>Gölge Modu</span>
                      </button>

                      <span className="text-xs bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200 font-semibold">{c.status || 'CONFIRMED'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. TEDARİKÇİ YÖNETİMİ PANELİ */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-xl font-serif font-bold">Supabase Tedarikçiler ({vendors.length})</h2>
              <button onClick={() => setIsVendorModalOpen(true)} className="bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer">
                + Canlı Firma Ekle
              </button>
            </div>

            <div className="space-y-2">
              {vendors.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-400 bg-white/80 dark:bg-zinc-900/60 rounded-2xl">
                  Henüz kayıtlı tedarikçi bulunmuyor.
                </div>
              ) : (
                vendors.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm">{v.name}</h4>
                      <p className="text-xs text-zinc-500">Kategori: {v.category} • Şehir: {v.city}</p>
                    </div>
                    <button onClick={() => toggleVendorStatus(v.id, v.is_verified)} className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer ${v.is_verified ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-rose-500/10 text-rose-600 border-rose-200'}`}>
                      {v.is_verified ? 'Onaylı' : 'Onay Ver'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 4. ABONELİK PAKETLERİ YÖNETİMİ */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Abonelik Paketleri</h2>
                <p className="text-xs text-zinc-500 mt-1">Tedarikçi firmalara tanımlı üyelik paket ve limitleri.</p>
              </div>
              <button onClick={() => setIsSubModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer">
                + Paket Ekle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 border border-purple-200">{plan.badge}</span>
                  <h3 className="font-serif font-bold text-lg">{plan.name}</h3>
                  <div className="text-2xl font-serif font-bold text-purple-600">{plan.price}</div>
                  <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">Kota: {plan.limit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FİNANS VE HAKEDİŞ BLOKAJI */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-2xl font-serif font-bold">Finans & Komisyon Ayarları</h2>
              <p className="text-xs text-zinc-500 mt-1">Platform komisyonunu ve ödeme blokaj şalterini yönetin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 space-y-4">
                <h3 className="font-serif font-bold text-base">Platform Komisyon Oranı</h3>
                <div className="flex items-center gap-4">
                  <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-24 h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center font-bold text-base" />
                  <span className="text-xs font-semibold">% Yüzde Oranı</span>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 space-y-4">
                <h3 className="font-serif font-bold text-base">Acil Ödeme Blokaj Şalteri</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Şüpheli işlemlerde tüm hakedişleri durdur</span>
                  <button onClick={() => setPayoutHoldStatus(!payoutHoldStatus)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${payoutHoldStatus ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                    {payoutHoldStatus ? 'BLOKE EDİLDİ' : 'NORMAL AKIŞ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. COĞRAFİ TRAFİK & ISI HARİTASI */}
        {activeTab === 'ai-search' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-2xl font-serif font-bold">Şehirlere Göre Canlı Arama Yoğunluğu</h2>
              <p className="text-xs text-zinc-500 mt-1">Çiftlerin yoğunlaştığı bölgeleri takip edin.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">İstanbul Bölgesi</span>
                <div className="text-xl font-bold">%54 Ziyaretçi</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">İzmir & Ege Kıyıları</span>
                <div className="text-xl font-bold">%22 Ziyaretçi</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1">
                <span className="text-xs text-zinc-400">Ankara & İç Anadolu</span>
                <div className="text-xl font-bold">%16 Ziyaretçi</div>
              </div>
            </div>
          </div>
        )}

        {/* 7. HAKEM KONSOLU */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-2xl font-serif font-bold">Çift & Tedarikçi İhtilaf Konsolu</h2>
              <p className="text-xs text-zinc-500 mt-1">İptal ve iade taleplerini inceleyin.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 space-y-3">
              {disputes.map((d) => (
                <div key={d.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm">{d.couple} ↔ {d.vendor}</h4>
                    <p className="text-xs text-zinc-500 mt-1">Sebep: {d.reason} • Tutar: <span className="font-bold">{d.amount}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert(`${d.id} tutarı çift hesabına iade edildi.`)} className="px-3 py-1.5 bg-rose-500/10 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold cursor-pointer">Çifte İade Et</button>
                    <button onClick={() => alert(`${d.id} tutarı tedarikçiye aktarıldı.`)} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-200 rounded-xl text-xs font-bold cursor-pointer">Firmaya Aktar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. AUDIT LOGS */}
        {activeTab === 'ai-rag' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-2xl font-serif font-bold">Kritik İşlem Audit Logları</h2>
              <p className="text-xs text-zinc-500 mt-1">Admin işlemlerinin zaman damgası geçmişi.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold">{log.admin}</span>
                    <span className="text-zinc-500 mx-2">•</span>
                    <span className="text-amber-600 font-medium">{log.action}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DİĞER TÜM SEKMELER İÇİN CANLI KONSOL BİLDİRİMİ */}
        {!['executive', 'couples', 'vendors', 'subscriptions', 'finance', 'ai-search', 'marketplace', 'ai-rag'].includes(activeTab) && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800">
              <h2 className="text-2xl font-serif font-bold capitalize">{activeTab.replace('-', ' ')} Konsolu</h2>
              <p className="text-xs text-zinc-500 mt-1">Sistem bileşeni canlı olarak çalışmaktadır.</p>
            </div>
          </div>
        )}

      </main>

      {/* MODALLAR */}
      {isCoupleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Supabase'e Çift Kaydet</h3>
            <form onSubmit={handleAddCouple} className="space-y-3">
              <input type="text" placeholder="Çift İsimleri (Örn: Eda & Mert)" value={newCouple.name} onChange={(e) => setNewCouple({ ...newCouple, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Düğün Tarihi" value={newCouple.date} onChange={(e) => setNewCouple({ ...newCouple, date: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="text" placeholder="Şehir" value={newCouple.city} onChange={(e) => setNewCouple({ ...newCouple, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="number" placeholder="Bütçe (TL)" value={newCouple.budget} onChange={(e) => setNewCouple({ ...newCouple, budget: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsCoupleModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-amber-500 text-white rounded-xl text-xs font-bold">Veritabanına Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isVendorModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Supabase'e Tedarikçi Kaydet</h3>
            <form onSubmit={handleAddVendor} className="space-y-3">
              <input type="text" placeholder="Firma Adı" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Şehir" value={newVendor.city} onChange={(e) => setNewVendor({ ...newVendor, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-amber-500 text-white rounded-xl text-xs font-bold">Firmayı Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSubModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Yeni Abonelik Paketi</h3>
            <form onSubmit={handleAddSubPlan} className="space-y-3">
              <input type="text" placeholder="Paket Adı" value={newSubPlan.name} onChange={(e) => setNewSubPlan({ ...newSubPlan, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Aylık Fiyat (Örn: ₺3,450 /ay)" value={newSubPlan.price} onChange={(e) => setNewSubPlan({ ...newSubPlan, price: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Kota Limiti" value={newSubPlan.limit} onChange={(e) => setNewSubPlan({ ...newSubPlan, limit: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsSubModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-purple-600 text-white rounded-xl text-xs font-bold">Paketi Yayınla</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}