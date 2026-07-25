'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Wallet, 
  CheckSquare, 
  Users, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  Calendar, 
  LayoutDashboard, 
  Plus, 
  X,
  Compass,
  CreditCard,
  Building2,
  Sliders
} from 'lucide-react';

export default function GlobalCommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  // Cmd + K or Ctrl + K Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuickActionOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const ACTIONS = [
    // B2C Shortcuts
    { id: 'c-dash', name: 'Çift Kontrol Merkezi (Dashboard)', icon: LayoutDashboard, path: '/cift/dashboard', category: 'Çift Paneli' },
    { id: 'c-budget', name: 'Bütçe & Harcama Ekle', icon: Wallet, path: '/butce-hesaplayici', category: 'Çift Paneli' },
    { id: 'c-checklist', name: 'Planlama & Görev Listesi', icon: CheckSquare, path: '/kontrol-listesi', category: 'Çift Paneli' },
    { id: 'c-guests', name: 'Davetli Listesi & LCV', icon: Users, path: '/davetli-listesi', category: 'Çift Paneli' },
    { id: 'c-search', name: 'Firma Keşfet & Arama', icon: Compass, path: '/arama', category: 'Keşif' },
    { id: 'c-[#111]', name: 'WedyAI Akıllı Asistan', icon: Sparkles, path: '/ai-asistan', category: 'Yapay Zeka' },

    // B2B Shortcuts
    { id: 'v-dash', name: 'Satıcı CRM Paneli', icon: Building2, path: '/satici', category: 'Firma Paneli' },
    { id: 'v-quote', name: 'Hızlı Teklif & Sözleşme Hazırla', icon: FileText, path: '/satici/teklif-hazirla', category: 'Firma Paneli' },
    { id: 'v-fin', name: 'Finans & Alacak Takibi', icon: CreditCard, path: '/satici/finans', category: 'Firma Paneli' },
    { id: 'v-crm', name: 'Müşteri Talepleri & Mesajlar', icon: MessageCircle, path: '/satici/talepler', category: 'Firma Paneli' },
  ];

  const filteredActions = ACTIONS.filter((action) =>
    action.name.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* 1. APPLE FLOATING DOCK (Ekranın Altında Sabit Yüzen Bar) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#111111]/90 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02]">
        
        {/* Cmd + K Trigger Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors border border-white/5"
          title="Komut Paleti (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#7C5CFF]" />
          <span className="hidden sm:inline">Ara...</span>
          <kbd className="hidden sm:inline-block bg-white/20 text-[10px] font-mono px-1.5 py-0.5 rounded text-white/80">⌘K</kbd>
        </button>

        <div className="w-[1px] h-4 bg-white/10 mx-1"></div>

        {/* Essential Navigation Icons */}
        <button onClick={() => router.push('/cift/dashboard')} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Kontrol Merkezi">
          <LayoutDashboard className="w-4 h-4" />
        </button>

        <button onClick={() => router.push('/butce-hesaplayici')} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Bütçe">
          <Wallet className="w-4 h-4" />
        </button>

        {/* Central QUICK ACTION '+' Button */}
        <button 
          onClick={() => setQuickActionOpen(!quickActionOpen)} 
          className="w-9 h-9 bg-[#7C5CFF] hover:bg-[#6A4FE0] text-white rounded-full flex items-center justify-center transition-transform hover:rotate-90 duration-300 shadow-md"
          title="Hızlı Eylem"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button onClick={() => router.push('/kontrol-listesi')} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Planlama">
          <CheckSquare className="w-4 h-4" />
        </button>

        <button onClick={() => router.push('/ai-asistan')} className="p-2 text-[#7C5CFF] hover:bg-[#7C5CFF]/20 rounded-full transition-colors" title="WedyAI">
          <Sparkles className="w-4 h-4" />
        </button>

      </div>

      {/* 2. UNIVERSAL QUICK ACTION MENU (Hızlı Eylem Popover) */}
      {quickActionOpen && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-white border border-[rgba(0,0,0,0.08)] rounded-[24px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-[280px] animate-in slide-in-from-bottom-4 duration-200">
          <div className="text-[11px] font-bold text-[#999999] uppercase tracking-wider px-3 py-1 mb-1">Hızlı İşlemler</div>
          <div className="space-y-1">
            <button 
              onClick={() => { router.push('/satici/teklif-hazirla'); setQuickActionOpen(false); }}
              className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#111111] hover:bg-[#F8F8F7] rounded-[12px] flex items-center gap-2.5 transition-colors"
            >
              <FileText className="w-4 h-4 text-[#7C5CFF]" /> Hızlı Teklif Oluştur (B2B)
            </button>
            <button 
              onClick={() => { router.push('/butce-hesaplayici'); setQuickActionOpen(false); }}
              className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#111111] hover:bg-[#F8F8F7] rounded-[12px] flex items-center gap-2.5 transition-colors"
            >
              <Wallet className="w-4 h-4 text-[#1DB954]" /> Yeni Harcama Gir
            </button>
            <button 
              onClick={() => { router.push('/davetli-listesi'); setQuickActionOpen(false); }}
              className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#111111] hover:bg-[#F8F8F7] rounded-[12px] flex items-center gap-2.5 transition-colors"
            >
              <Users className="w-4 h-4 text-[#111111]" /> Davetli Ekle
            </button>
          </div>
        </div>
      )}

      {/* 3. SPOTLIGHT COMMAND PALETTE MODAL (`Cmd + K`) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-[640px] rounded-[28px] border border-[rgba(0,0,0,0.08)] shadow-[0_25px_70px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[rgba(0,0,0,0.06)] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#7C5CFF] shrink-0" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ne yapmak istiyorsunuz? (Örn: Teklif, Bütce, Davetli, Masa)"
                className="w-full bg-transparent text-[16px] text-[#111111] outline-none placeholder:text-[#999999]"
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-[#999999] hover:text-[#111111]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-[14px] text-[#999999]">
                  Eşleşen araç veya komut bulunamadı.
                </div>
              ) : (
                filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSelect(action.path)}
                    className="w-full p-3.5 rounded-[16px] flex items-center justify-between hover:bg-[#F8F8F7] text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F8F8F7] group-hover:bg-white flex items-center justify-center text-[#111111] transition-colors border border-[rgba(0,0,0,0.04)]">
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[14px] font-medium text-[#111111] block">{action.name}</span>
                        <span className="text-[11px] text-[#999999]">{action.category}</span>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-[#7C5CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                      Aç &rarr;
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#F8F8F7] border-t border-[rgba(0,0,0,0.04)] flex justify-between items-center text-[12px] text-[#999999]">
              <span>Gezinmek için <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">↵ Enter</kbd> basabilirsiniz.</span>
              <span>WedyPlan OS</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}