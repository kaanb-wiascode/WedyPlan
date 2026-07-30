'use client';

import React, { useState, useEffect } from 'react';
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
  UserPlus,
  Plus,
  Check,
  X,
  Search,
  SlidersHorizontal,
  RefreshCw,
  Lock,
  Zap,
  Building2,
  FileCheck,
  Database,
  Cpu,
  Settings,
  ShieldAlert,
  Coins,
  Radio,
  ToggleLeft,
  ToggleRight,
  Gauge,
  Terminal,
  AlertTriangle,
  HardDrive,
  Eye,
  Sliders,
  BellRing,
  Tag,
  CreditCard,
  MousePointerClick,
  Globe2,
  ArrowDownRight,
  TrendingUp,
  Megaphone
} from 'lucide-react';

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('executive');

  // ==================== CANLI METRİKLER (SIMULATED REAL-TIME) ====================
  const [liveVisitors, setLiveVisitors] = useState(342);
  const [liveClickCount, setLiveClickCount] = useState(128450);

  // Anlık izleyici simülasyonu
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + Math.floor(Math.random() * 7) - 3);
      setLiveClickCount(prev => prev + Math.floor(Math.random() * 12));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ==================== STATE'LER & FORM DÜZENLERİ ====================
  
  // 1. Çiftler State
  const [couples, setCouples] = useState([
    { id: '1', name: 'Eda & Mert', date: '15 Eylül 2026', city: 'İstanbul', budget: '₺350,000', status: 'CONFIRMED', riskScore: 'Low' },
    { id: '2', name: 'Selin & Kaan', date: '20 Ekim 2026', city: 'İzmir', budget: '₺500,000', status: 'PENDING', riskScore: 'Medium' },
    { id: '3', name: 'Zeynep & Can', date: '12 Haziran 2027', city: 'Ankara', budget: '₺250,000', status: 'CONFIRMED', riskScore: 'Low' },
  ]);
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [newCouple, setNewCouple] = useState({ name: '', date: '', city: '', budget: '' });

  // 2. Tedarikçiler State
  const [vendors, setVendors] = useState([
    { id: '1', name: 'Grand Çamlıca Kır Bahçesi', category: 'Mekan', city: 'İstanbul', verified: true, trustScore: 98 },
    { id: '2', name: 'Studio Mercek Fotoğrafçılık', category: 'Fotoğraf', city: 'İzmir', verified: false, trustScore: 62 },
    { id: '3', name: 'Harmony Müzik & Orkestra', category: 'Müzik', city: 'Ankara', verified: true, trustScore: 94 },
  ]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Mekan', city: '' });

  // 3. Abonelik Paketleri State
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: '1', name: 'Başlangıç Tedarikçi', price: '₺1,250 /ay', limit: '10 Teklif/ay', badge: 'Standart' },
    { id: '2', name: 'Pro Organizasyon', price: '₺3,450 /ay', limit: 'Sınırsız Teklif', badge: 'Popüler' },
    { id: '3', name: 'VIP Enterprise Venue', price: '₺8,900 /ay', limit: 'Öncelikli Eşleşme + AI', badge: 'Kurumsal' },
  ]);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [newSubPlan, setNewSubPlan] = useState({ name: '', price: '', limit: '', badge: 'Yeni' });

  // 4. Finans & Komisyon
  const [commissionRate, setCommissionRate] = useState(12);
  const [payoutHoldStatus, setPayoutHoldStatus] = useState(false);

  // 5. Feature Flags (A/B Test)
  const [featureFlags, setFeatureFlags] = useState({
    liveStreaming: true,
    aiPhotoVault: false,
    cryptoPayments: false,
    autoVendorMatching: true,
  });

  // 6. Altyapı & Önbellek
  const [cacheStatus, setCacheStatus] = useState('SYNCED');
  const [isCacheClearing, setIsCacheClearing] = useState(false);

  // 7. Sistem Bildirim Yayını State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  // ==================== HANDLERS ====================
  const handleAddCouple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouple.name) return;
    setCouples(prev => [
      { id: Date.now().toString(), name: newCouple.name, date: newCouple.date || 'Belirtilmedi', city: newCouple.city || 'İstanbul', budget: `₺${newCouple.budget || '0'}`, status: 'CONFIRMED', riskScore: 'Low' },
      ...prev
    ]);
    setNewCouple({ name: '', date: '', city: '', budget: '' });
    setIsCoupleModalOpen(false);
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;
    setVendors(prev => [
      { id: Date.now().toString(), name: newVendor.name, category: newVendor.category, city: newVendor.city || 'İstanbul', verified: true, trustScore: 100 },
      ...prev
    ]);
    setNewVendor({ name: '', category: 'Mekan', city: '' });
    setIsVendorModalOpen(false);
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

  const toggleVendorStatus = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, verified: !v.verified } : v));
  };

  const toggleFeature = (key: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [key]: !prev[key] }));
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
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Sol Menü */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sağ Dinamik Konsol Alanı */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Soft Arka Plan Işığı */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* ==================== 1. EXECUTIVE EXECUTIVE KONTROL & ANLIK CANLI METRİKLER ==================== */}
        {activeTab === 'executive' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Üst Karşılama Başlığı */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sistem Yönetim Kumanda Merkezi</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
                  Executive Kontrol Paneli
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  WedyPlan altyapısını, canlı kullanıcı akışını, trafiği ve finansal hacmi buradan yönetin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* ANLIK CANLI İZLEYİCİ BİLDİRİMİ */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-200/60 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{liveVisitors} Anlık İzleyici</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Tüm Sistemler Operasyonel
                </div>
              </div>
            </div>

            {/* Metrik Kartları (Anlık Tıklanmalar & Üyeler Entegre) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Anlık Aktifler */}
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Anlık Canlı Trafik</span>
                  <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                </div>
                <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{liveVisitors}</div>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold block">Şu An Sitede Aktivitede</span>
              </div>

              {/* Tıklanmalar */}
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Günlük Tıklanma</span>
                  <MousePointerClick className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{liveClickCount.toLocaleString('tr-TR')}</div>
                <span className="text-[10px] text-emerald-600 font-semibold block">%18 Sayfa Gösterimi Artışı</span>
              </div>

              {/* Çiftler */}
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Kayıtlı Çiftler</span>
                  <Users className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{couples.length + 1245}</div>
                <span className="text-[10px] text-emerald-600 font-semibold block">+14% Yeni Katılım</span>
              </div>

              {/* Tedarikçiler */}
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Onaylı Tedarikçi</span>
                  <Store className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{vendors.length + 429}</div>
                <span className="text-[10px] text-emerald-600 font-semibold block">42 Onay Bekliyor</span>
              </div>

              {/* Komisyon */}
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Platform Oranı</span>
                  <Wallet className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">%{commissionRate}</div>
                <span className="text-[10px] text-amber-600 font-semibold block">Dinamik Komisyon</span>
              </div>

            </div>

            {/* Hızlı Yönetim Aksiyonları */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/80 to-white/90 dark:from-zinc-900/80 dark:to-zinc-900/40 border border-amber-200/60 dark:border-zinc-800 backdrop-blur-xl space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
                      <Bot className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-zinc-900 dark:text-white">
                      Hızlı Yönetim Araçları
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/60">
                    Sistem Konsolu
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Çift Ekleme, Tedarikçi Onaylama, Abonelik Paketi Tanımlama veya Duyuru Yayınlamak için konsol kestirmelerini kullanın.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => { setActiveTab('couples'); setIsCoupleModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Yeni Çift Kaydet</span>
                  </button>
                  <button onClick={() => { setActiveTab('vendors'); setIsVendorModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tedarikçi Ekle</span>
                  </button>
                  <button onClick={() => { setActiveTab('subscriptions'); setIsSubModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Yeni Paket Tanımla</span>
                  </button>
                </div>
              </div>

              {/* CANLI SİSTEM ANONS YAYINI */}
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
                <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-500" />
                  Sistem Genel Duyurusu
                </h3>

                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <textarea 
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Tüm kullanıcılara canlı pop-up duyurusu yazın..." 
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

        {/* ==================== 2. ÇİFT YÖNETİMİ VE ÇİFT EKLEME ==================== */}
        {activeTab === 'couples' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-rose-500 text-xs font-semibold mb-1">
                  <Users className="w-4 h-4" /> Çift İdare Paneli
                </div>
                <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Çift Yönetimi & Kayıt</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sistemdeki çiftleri denetleyin veya manuel olarak sisteme yeni çift ekleyin.</p>
              </div>

              <button onClick={() => setIsCoupleModalOpen(true)} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs shrink-0">
                <UserPlus className="w-4 h-4" />
                <span>Yeni Çift Kaydet</span>
              </button>
            </div>

            {/* Çift Tablosu */}
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Kayıtlı Çift Listesi ({couples.length})</h3>
              <div className="space-y-2">
                {couples.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{c.name}</h4>
                        <span className="text-[10px] font-mono bg-zinc-200/60 dark:bg-zinc-700 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">{c.city}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Risk: {c.riskScore}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">Düğün Tarihi: {c.date} • Bütçe: {c.budget}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/50">
                      {c.status === 'CONFIRMED' ? 'Aktif Düğün Hesabı' : 'Onay Bekliyor'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. TEDARİKÇİ YÖNETİMİ VE ONAYLAMA ==================== */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
                  <Store className="w-4 h-4" /> Tedarikçi Denetim Merkezi
                </div>
                <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Tedarikçi Yönetimi & Fraud Denetimi</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Düğün mekanları ve hizmet veren firmaların onay ve güven skorlarını kontrol edin.</p>
              </div>

              <button onClick={() => setIsVendorModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs shrink-0">
                <Plus className="w-4 h-4" />
                <span>Yeni Firma Ekle</span>
              </button>
            </div>

            {/* Tedarikçi Listesi */}
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Platform Tedarikçileri ({vendors.length})</h3>
              <div className="space-y-2">
                {vendors.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{v.name}</h4>
                        <span className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold px-2 py-0.5 rounded">{v.category}</span>
                        <span className="text-[10px] font-mono text-zinc-400">Güven Skoru: %{v.trustScore}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">Şehir: {v.city}</p>
                    </div>

                    <button onClick={() => toggleVendorStatus(v.id)} className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                      v.verified ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-rose-500/10 text-rose-600 border-rose-200'
                    }`}>
                      {v.verified ? <><Check className="w-3.5 h-3.5" /> Onaylı</> : <><X className="w-3.5 h-3.5" /> Onay Ver</>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. ABONELİK PAKETLERİ YÖNETİMİ ==================== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold mb-1">
                  <CreditCard className="w-4 h-4" /> SaaS Paket Mimarisi
                </div>
                <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Abonelik Paketleri & Fiyatlandırma</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Tedarikçi firmalara satılan üyelik paketlerini ve kota limitlerini tanımlayın.</p>
              </div>

              <button onClick={() => setIsSubModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs shrink-0">
                <Plus className="w-4 h-4" />
                <span>Yeni Paket Oluştur</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4 relative">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 border border-purple-200/50 uppercase tracking-wider">
                    {plan.badge}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">{plan.name}</h3>
                  <div className="text-2xl font-serif font-bold text-purple-600">{plan.price}</div>
                  <p className="text-xs text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 pt-3">
                    Kota: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{plan.limit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 5. FİNANS VE HAKEDİŞ BLOKAJI ==================== */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <Wallet className="w-4 h-4" /> Finansal Yapılandırma
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Finans, Komisyon & Hakediş Güvenliği</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Platform komisyon oranını ve acil durumlarda ödeme blokaj şalterini yönetin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Platform Komisyon Oranı</h3>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    value={commissionRate} 
                    onChange={(e) => setCommissionRate(Number(e.target.value))} 
                    className="w-24 h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center font-bold text-base"
                  />
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">% Yüzde Oranı</span>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Acil Ödeme Blokaj Şalteri</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Şüpheli işlemlerde tüm hakedişleri durdur</span>
                  <button onClick={() => setPayoutHoldStatus(!payoutHoldStatus)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    payoutHoldStatus ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}>
                    {payoutHoldStatus ? 'BLOKE EDİLDİ' : 'NORMAL AKIŞ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 6. FEATURE FLAGS (A/B TEST ŞALTERLERİ) ==================== */}
        {activeTab === 'system-config' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold mb-1">
                <Sliders className="w-4 h-4" /> Feature Flags & A/B Testing
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Canlı Özellik Şalterleri</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Uygulamadaki yeni özellikleri kod derlemeden anlık olarak yayına alın veya kapatın.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
              {[
                { key: 'liveStreaming', title: 'Canlı Düğün Yayını Modülü', desc: 'Çiftlerin canlı yayın yapmasını sağlayan modül' },
                { key: 'aiPhotoVault', title: 'Yapay Zekâ Fotoğraf Yüz Tanıma', desc: 'Davetlilerin kendi fotoğraflarını bulmasını sağlayan servis' },
                { key: 'cryptoPayments', title: 'Kripto Para Ödeme Altyapısı', desc: 'Yurtdışı çiftleri için USDT/BTC ödeme sistemi' },
                { key: 'autoVendorMatching', title: 'Otomatik Tedarikçi Eşleştirme', desc: 'AI ile bütçeye en uygun mekan eşleme' },
              ].map((flag) => (
                <div key={flag.key} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white">{flag.title}</h4>
                    <p className="text-[11px] text-zinc-500">{flag.desc}</p>
                  </div>
                  <button onClick={() => toggleFeature(flag.key as any)} className="cursor-pointer">
                    {featureFlags[flag.key as keyof typeof featureFlags] ? (
                      <ToggleRight className="w-8 h-8 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-zinc-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 7. SUNUCU & ÖNBELLEK (CACHE REFRESH) ==================== */}
        {activeTab === 'infrastructure' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <HardDrive className="w-4 h-4" /> Altyapı & Önbellek Konsolu
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Sunucu & Redis Önbellek Yönetimi</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Veritabanı yükünü hafifletmek için CDN ve Redis önbelleğini tek tıkla yenileyin.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold block text-zinc-900 dark:text-white">CDN & Redis Cache Durumu</span>
                <span className="text-xs text-zinc-400 font-mono mt-0.5 block">{cacheStatus}</span>
              </div>

              <button onClick={handleClearCache} disabled={isCacheClearing} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50">
                <RefreshCw className={`w-3.5 h-3.5 ${isCacheClearing ? 'animate-spin' : ''}`} />
                <span>Önbelleği Temizle</span>
              </button>
            </div>
          </div>
        )}

        {/* DİĞER TÜM SEKMELER İÇİN CANLI KONSOL BİLDİRİMİ */}
        {!['executive', 'couples', 'vendors', 'subscriptions', 'finance', 'system-config', 'infrastructure'].includes(activeTab) && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" /> Yönetim Modülü
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white capitalize">{activeTab.replace('-', ' ')} Konsolu</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sistem bileşenleri canlı olarak bu panel üzerinden denetlenmektedir.</p>
            </div>

            <div className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs flex flex-col items-center justify-center text-center space-y-3">
              <Zap className="w-8 h-8 text-amber-500" />
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">{activeTab.toUpperCase()} Modülü Bağlandı</h3>
              <p className="text-xs text-zinc-500 max-w-md">Seçilen altyapı bileşeni gerçek zamanlı olarak çalışmaktadır.</p>
            </div>
          </div>
        )}

      </main>

      {/* ==================== MODALLAR ==================== */}
      
      {/* 1. ÇİFT EKLEME MODALI */}
      {isCoupleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Yeni Çift Kaydı</h3>
              <button onClick={() => setIsCoupleModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddCouple} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Çift İsimleri</label>
                <input type="text" placeholder="Örn: Ayşe & Burak" value={newCouple.name} onChange={(e) => setNewCouple({ ...newCouple, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Düğün Tarihi</label>
                <input type="text" placeholder="Örn: 10 Ağustos 2026" value={newCouple.date} onChange={(e) => setNewCouple({ ...newCouple, date: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Şehir</label>
                  <input type="text" placeholder="İstanbul" value={newCouple.city} onChange={(e) => setNewCouple({ ...newCouple, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Bütçe (TL)</label>
                  <input type="text" placeholder="300000" value={newCouple.budget} onChange={(e) => setNewCouple({ ...newCouple, budget: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsCoupleModalOpen(false)} className="flex-1 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">İptal</button>
                <button type="submit" className="flex-1 h-11 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-semibold hover:bg-zinc-800 cursor-pointer">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. TEDARİKÇİ EKLEME MODALI */}
      {isVendorModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Yeni Tedarikçi Kaydı</h3>
              <button onClick={() => setIsVendorModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Firma Adı</label>
                <input type="text" placeholder="Örn: Boğaz Wedding Event" value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Kategori</label>
                <select value={newVendor.category} onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500">
                  <option value="Mekan">Düğün Mekanı</option>
                  <option value="Fotoğraf">Fotoğraf & Video</option>
                  <option value="Müzik">Müzik & DJ</option>
                  <option value="Organizasyon">Organizasyon</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Şehir</label>
                <input type="text" placeholder="İstanbul" value={newVendor.city} onChange={(e) => setNewVendor({ ...newVendor, city: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-amber-500" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="flex-1 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">İptal</button>
                <button type="submit" className="flex-1 h-11 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600 cursor-pointer">Firmayı Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. PAKET EKLEME MODALI */}
      {isSubModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Yeni Abonelik Paketi</h3>
              <button onClick={() => setIsSubModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddSubPlan} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Paket Adı</label>
                <input type="text" placeholder="Örn: Diamond Premium Venue" value={newSubPlan.name} onChange={(e) => setNewSubPlan({ ...newSubPlan, name: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-purple-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Aylık Fiyat</label>
                <input type="text" placeholder="Örn: ₺4,500 /ay" value={newSubPlan.price} onChange={(e) => setNewSubPlan({ ...newSubPlan, price: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-purple-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block mb-1">Kota / Özellik Limiti</label>
                <input type="text" placeholder="Örn: Sınırsız Teklif + AI Banner" value={newSubPlan.limit} onChange={(e) => setNewSubPlan({ ...newSubPlan, limit: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none focus:border-purple-500" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsSubModalOpen(false)} className="flex-1 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">İptal</button>
                <button type="submit" className="flex-1 h-11 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-700 cursor-pointer">Paketi Yayınla</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}