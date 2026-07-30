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
  Settings
} from 'lucide-react';

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('executive');

  // --- STATE'LER & FORM MOCKLARI ---
  // Çiftler State
  const [couples, setCouples] = useState([
    { id: '1', name: 'Eda & Mert', date: '15 Eylül 2026', city: 'İstanbul', budget: '₺350,000', status: 'CONFIRMED' },
    { id: '2', name: 'Selin & Kaan', date: '20 Ekim 2026', city: 'İzmir', budget: '₺500,000', status: 'PENDING' },
    { id: '3', name: 'Zeynep & Can', date: '12 Haziran 2027', city: 'Ankara', budget: '₺250,000', status: 'CONFIRMED' },
  ]);
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [newCouple, setNewCouple] = useState({ name: '', date: '', city: '', budget: '' });

  // Tedarikçiler State
  const [vendors, setVendors] = useState([
    { id: '1', name: 'Grand Çamlıca Kır Bahçesi', category: 'Mekan', city: 'İstanbul', verified: true },
    { id: '2', name: 'Studio Mercek Fotoğrafçılık', category: 'Fotoğraf', city: 'İzmir', verified: false },
    { id: '3', name: 'Harmony Müzik & Orkestra', category: 'Müzik', city: 'Ankara', verified: true },
  ]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Mekan', city: '' });

  // Komisyon & Finans State
  const [commissionRate, setCommissionCommissionRate] = useState(12);
  const [isCommissionSaved, setIsCommissionSaved] = useState(false);

  // AI Agent Ayarları State
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [agentTemperature, setAgentTemperature] = useState(0.7);

  // --- HANDLERS ---
  const handleAddCouple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouple.name) return;
    setCouples(prev => [
      { id: Date.now().toString(), name: newCouple.name, date: newCouple.date || 'Belirtilmedi', city: newCouple.city || 'İstanbul', budget: `₺${newCouple.budget || '0'}`, status: 'CONFIRMED' },
      ...prev
    ]);
    setNewCouple({ name: '', date: '', city: '', budget: '' });
    setIsCoupleModalOpen(false);
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name) return;
    setVendors(prev => [
      { id: Date.now().toString(), name: newVendor.name, category: newVendor.category, city: newVendor.city || 'İstanbul', verified: true },
      ...prev
    ]);
    setNewVendor({ name: '', category: 'Mekan', city: '' });
    setIsVendorModalOpen(false);
  };

  const toggleVendorStatus = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, verified: !v.verified } : v));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Sol Menü */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sağ Ana Alan - Sayfa Yenilenmeden Değişir */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
        
        {/* Soft Arka Plan Işığı */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* ==================== 1. EXECUTIVE PANELDEN KONTROL ==================== */}
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
                  WedyPlan altyapısını, yapay zekâ servislerini, trafiği ve finansal hacmi buradan yönetin.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Tüm Sistemler Operasyonel
              </div>
            </div>

            {/* Metrik Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                  <span className="text-xs font-medium">Kayıtlı Çiftler</span>
                  <Users className="w-4 h-4 text-rose-500" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{couples.length + 1245}</span>
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
                  <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">{vendors.length + 429}</span>
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
                  <span className="text-xs font-medium">Platform Komisyonu</span>
                  <Wallet className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">%{commissionRate}</span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center">
                    Sabit Oran
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[64%]" />
                </div>
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
                  Çift Ekleme, Tedarikçi Onaylama veya Komisyon Ayarlarını değiştirmek için aşağıdaki konsol adımlarını kullanabilirsiniz.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => { setActiveTab('couples'); setIsCoupleModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Yeni Çift Ekle</span>
                  </button>
                  <button onClick={() => { setActiveTab('vendors'); setIsVendorModalOpen(true); }} className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tedarikçi Kaydet</span>
                  </button>
                  <button onClick={() => setActiveTab('finance')} className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer">
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Komisyon Oranı Değiştir</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl space-y-4 shadow-xs">
                <h3 className="text-sm font-serif font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Kestirme Modüller
                </h3>
                <div className="space-y-2">
                  <button onClick={() => setActiveTab('couples')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Çift Listesi ve Ayrıntılar</span>
                    <Users className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                  <button onClick={() => setActiveTab('vendors')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">Tedarikçi Onay Kuyruğu</span>
                    <Store className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                  <button onClick={() => setActiveTab('ai-agents')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 hover:bg-amber-50/50 transition-colors group cursor-pointer text-left">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600">AI Prompt & Model Yapılandırması</span>
                    <Bot className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                  </button>
                </div>
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
                <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Tedarikçi Yönetimi & Onay</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Düğün mekanları ve hizmet veren firmaların onay süreçlerini kontrol edin.</p>
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

        {/* ==================== 4. FİNANS VE KOMİSYON AYARLARI ==================== */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <Wallet className="w-4 h-4" /> Finansal Yapılandırma
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">Finans & Komisyon Kuralları</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Platform komisyon oranını ve ödeme şartlarını dinamik olarak belirleyin.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-5">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">Platform Komisyon Oranı</h3>
              <div className="flex items-center gap-4 max-w-md">
                <input 
                  type="number" 
                  value={commissionRate} 
                  onChange={(e) => setCommissionCommissionRate(Number(e.target.value))} 
                  className="w-24 h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-center font-bold text-base"
                />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">% Yüzde Oranı</span>
                <button 
                  onClick={() => { setIsCommissionSaved(true); setTimeout(() => setIsCommissionSaved(false), 2000); }} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer"
                >
                  {isCommissionSaved ? 'GÜNCELLENDİ' : 'Kaydet'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 5. AI AGENT YAPILANDIRMASI ==================== */}
        {activeTab === 'ai-agents' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs">
              <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold mb-1">
                <Bot className="w-4 h-4" /> Yapay Zekâ Tünelleme
              </div>
              <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">AI Agent Yapılandırma Konsolu</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">WedyPlan asistanlarının kullandığı LLM modellerini ve hassasiyet seviyesini ayarlayın.</p>
            </div>

            <div className="bg-white/80 dark:bg-zinc-900/60 p-6 rounded-3xl border border-zinc-200/70 dark:border-zinc-800 backdrop-blur-xl shadow-xs space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">Varsayılan Model Seçimi</label>
                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="h-11 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs font-medium w-full max-w-xs">
                  <option value="gpt-4o">OpenAI GPT-4o (Ultra Hassas)</option>
                  <option value="claude-3-5">Anthropic Claude 3.5 Sonnet</option>
                  <option value="gemini-1-5">Google Gemini 1.5 Pro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">Sıcaklık / Yaratıcılık Seviyesi ({agentTemperature})</label>
                <input type="range" min="0" max="1" step="0.1" value={agentTemperature} onChange={(e) => setAgentTemperature(Number(e.target.value))} className="w-full max-w-xs accent-amber-500" />
              </div>
            </div>
          </div>
        )}

        {/* DİĞER MODÜLLER İÇİN CANLI KONSOL BİLDİRİMİ */}
        {!['executive', 'couples', 'vendors', 'finance', 'ai-agents'].includes(activeTab) && (
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
              <button onClick={() => setIsCoupleModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="w-5 h-5" /></button>
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
                <button type="button" onClick={() => setIsCoupleModalOpen(false)} className="flex-1 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800">İptal</button>
                <button type="submit" className="flex-1 h-11 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-semibold hover:bg-zinc-800">Kaydet</button>
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
              <button onClick={() => setIsVendorModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="w-5 h-5" /></button>
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
                <button type="button" onClick={() => setIsVendorModalOpen(false)} className="flex-1 h-11 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800">İptal</button>
                <button type="submit" className="flex-1 h-11 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600">Firmayı Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}