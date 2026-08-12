'use client';

import React, { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { useConfirm } from '@/context/ConfirmContext';
import { sendVendorQuoteAction, cancelVendorLeadAction } from '../../../lib/actions/vendor-crm-sync';
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  Send,
  Calendar,
  Users,
  X,
  Trash2,
  FileText,
  Kanban,
  List,
  Flame,
  ChevronRight
} from 'lucide-react';

interface QuoteItem {
  id: string;
  title: string;
  price: number;
}

interface LeadItem {
  id: string;
  coupleNames: string;
  weddingDate: string;
  guestCount: number;
  budgetGoal: number;
  location: string;
  vibe: string;
  matchScore: number;
  status: 'PENDING' | 'OFFER_SENT' | 'AGREED' | 'REJECTED';
  requestNote: string;
  createdAt: string;
  quoteAmount?: number;
  quoteItems?: QuoteItem[];
}

export default function VendorLeadsPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  const [viewMode, setViewMode] = useState<'LIST' | 'KANBAN'>('LIST');

  // Canlı Lead Verileri
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: 'lead_1',
      coupleNames: 'Selin & Caner',
      weddingDate: '15 Ağustos 2026',
      guestCount: 250,
      budgetGoal: 150000,
      location: 'Beykoz / İstanbul',
      vibe: 'Sade & Lüks',
      matchScore: 96,
      status: 'PENDING',
      requestNote: 'Kır düğünü konseptinde yemekli düğün organizasyonu için teklifinizi rica ediyoruz.',
      createdAt: '12 dakika önce'
    },
    {
      id: 'lead_2',
      coupleNames: 'Gizem & Burak',
      weddingDate: '02 Eylül 2026',
      guestCount: 300,
      budgetGoal: 180000,
      location: 'Sarıyer / İstanbul',
      vibe: 'Bohem & Modern',
      matchScore: 88,
      status: 'OFFER_SENT',
      requestNote: 'Açık hava kokteyl projesi için detaylı fiyat bilgisi almak istiyoruz.',
      createdAt: '2 saat önce',
      quoteAmount: 175000
    },
    {
      id: 'lead_3',
      coupleNames: 'Merve & Kaan',
      weddingDate: '20 Eylül 2026',
      guestCount: 200,
      budgetGoal: 120000,
      location: 'Polonezköy / İstanbul',
      vibe: 'Kır & Botanik',
      matchScore: 92,
      status: 'AGREED',
      requestNote: 'Düğün salonu kiralama ve süsleme dahil paket fiyatı talep ediyoruz.',
      createdAt: '1 gün önce',
      quoteAmount: 120000
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal State'leri
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // İnteraktif Teklif Kalemleri
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', title: 'Mekan Kiralama & Alan Kullanımı', price: 80000 },
    { id: '2', title: 'Kişi Başı Yemekli Menü (250 Kişi)', price: 50000 },
    { id: '3', title: 'Ses, Işık & Orkestra Sahneleri', price: 20000 },
  ]);
  const [newCustomItemTitle, setNewCustomItemTitle] = useState('');
  const [newCustomItemPrice, setNewCustomItemPrice] = useState('');
  const [quoteNote, setQuoteNote] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const calculatedTotalQuote = useMemo(() => {
    return quoteItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  }, [quoteItems]);

  const handleAddQuoteItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomItemTitle || !newCustomItemPrice) return;
    setQuoteItems(prev => [
      ...prev,
      { id: Date.now().toString(), title: newCustomItemTitle, price: parseFloat(newCustomItemPrice) }
    ]);
    setNewCustomItemTitle('');
    setNewCustomItemPrice('');
  };

  const handleRemoveQuoteItem = (id: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAiGenerateQuoteNote = () => {
    if (!selectedLead) return;
    setQuoteNote(
      `Merhaba ${selectedLead.coupleNames},\n\n${selectedLead.weddingDate} tarihindeki ${selectedLead.guestCount} kişilik "${selectedLead.vibe}" konseptli düğün organizasyonunuz için özel teklifimiz hazırlanmıştır.`
    );
    showToast('WedyAI kişiselleştirilmiş teklif metni oluşturdu.');
  };

  // 🍏 SİSTEMİK TEKLİF GÖNDERME (ÇİFT PANELİ İLE SENKRONİZE)
  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || calculatedTotalQuote <= 0) return;

    startTransition(async () => {
      const res = await sendVendorQuoteAction({
        leadId: selectedLead.id,
        coupleNames: selectedLead.coupleNames,
        totalAmount: calculatedTotalQuote,
        quoteItems: quoteItems,
        note: quoteNote,
        weddingDate: selectedLead.weddingDate,
      });

      if (res.success) {
        setLeads(prev =>
          prev.map(l =>
            l.id === selectedLead.id
              ? { ...l, status: 'OFFER_SENT', quoteAmount: calculatedTotalQuote, quoteItems }
              : l
          )
        );
        setIsQuoteModalOpen(false);
        showToast(res.message);
      }
    });
  };

  // 🍏 SİSTEMİK TALEP İPTALİ (APPLE MODALLI)
  const handleDeleteLead = async (id: string, coupleNames: string) => {
    const isConfirmed = await confirm({
      title: 'Talebi İptal Etmek İstediğinize Emin Misiniz?',
      message: `"${coupleNames}" çiftine ait teklif isteği her iki tarafta da iptal edilecektir.`,
      confirmText: 'Evet, İptal Et',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      startTransition(async () => {
        const res = await cancelVendorLeadAction(id, coupleNames);
        if (res.success) {
          setLeads(prev => prev.filter(l => l.id !== id));
          showToast(res.message);
        }
      });
    }
  };

  const filteredLeads = leads.filter(item => {
    const matchesSearch =
      item.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vibe.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Inbox className="w-3.5 h-3.5 text-zinc-500" />
            <span>Müşteri İlişkileri & CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Gelen Talepler & Teklif Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Çiftlerin ilettiği teklif isteklerini yönetin. Teklifleriniz çift paneline anında senkronize olur.
          </p>
        </div>

        {/* Görünüm Modu Butonları */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 shrink-0">
          <button
            onClick={() => setViewMode('LIST')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'LIST'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" /> Liste
          </button>
          <button
            onClick={() => setViewMode('KANBAN')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'KANBAN'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" /> Kanban Pano
          </button>
        </div>
      </div>

      {/* ARAMA VE FİLTRE HAPLARI */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Çift ismi, şehir veya konsept ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'Tüm Talepler' },
            { id: 'PENDING', label: 'Yanıt Bekleyenler' },
            { id: 'OFFER_SENT', label: 'Teklif Gönderilenler' },
            { id: 'AGREED', label: 'Anlaşılanlar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* LİSTE GÖRÜNÜMÜ */}
      {viewMode === 'LIST' && (
        <div className="space-y-4">
          {filteredLeads.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl apple-glass shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
                    {item.coupleNames[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{item.coupleNames}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold inline-flex items-center gap-1">
                        <Flame className="w-3 h-3" /> %{item.matchScore} Uyum
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-medium">{item.location} • {item.createdAt}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50/80 dark:bg-zinc-800/40 p-3.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
                  &quot;{item.requestNote}&quot;
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-400" /> {item.weddingDate}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-zinc-400" /> {item.guestCount} Davetli</span>
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-zinc-400" /> {item.vibe}</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Hedef: ₺{item.budgetGoal.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  item.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                  item.status === 'OFFER_SENT' ? 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' :
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {item.status === 'PENDING' ? 'Yanıt Bekliyor' : item.status === 'OFFER_SENT' ? 'Teklif İletildi' : 'Anlaşıldı'}
                </span>

                {item.quoteAmount && (
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-medium">İletilen Teklif</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">₺{item.quoteAmount.toLocaleString('tr-TR')}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteLead(item.id, item.coupleNames)}
                    disabled={isPending}
                    className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLead(item);
                      setIsQuoteModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.status === 'OFFER_SENT' ? 'Teklifi Düzenle' : 'Teklif Gönder'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TEKLİF HAZIRLAMA MODALI */}
      {isQuoteModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto scrollbar-thin">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" /> Detaylı Teklif Oluştur: {selectedLead.coupleNames}
                </h2>
                <span className="text-[10px] text-zinc-400">{selectedLead.weddingDate} • {selectedLead.guestCount} Davetli</span>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Hizmet Kalemleri</label>
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  Toplam: ₺{calculatedTotalQuote.toLocaleString('tr-TR')}
                </span>
              </div>

              <div className="space-y-2">
                {quoteItems.map((qItem) => (
                  <div key={qItem.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 text-xs">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{qItem.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-zinc-900 dark:text-white">₺{qItem.price.toLocaleString('tr-TR')}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuoteItem(qItem.id)}
                        className="text-zinc-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddQuoteItem} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Ek Hizmet / Kalem Adı"
                  value={newCustomItemTitle}
                  onChange={(e) => setNewCustomItemTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white font-medium"
                />
                <input
                  type="number"
                  placeholder="Tutar (₺)"
                  value={newCustomItemPrice}
                  onChange={(e) => setNewCustomItemPrice(e.target.value)}
                  className="w-28 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white font-medium"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 text-zinc-900 dark:text-white text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Çifte Özel Mektup / Açıklama</label>
                <button
                  type="button"
                  onClick={handleAiGenerateQuoteNote}
                  className="text-[10px] font-bold text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-zinc-400" /> WedyAI Mektup Oluştur
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Çifte iletmek istediğiniz özel mesajınız..."
                value={quoteNote}
                onChange={(e) => setQuoteNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
              ⓘ Bu teklif gönderildiğinde çiftin Mesajlar & Teklifler ekranına onaylanabilir akıllı kart olarak işlenir.
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleSendQuote}
                disabled={isPending || calculatedTotalQuote <= 0}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
              >
                {isPending ? 'Gönderiliyor...' : `₺${calculatedTotalQuote.toLocaleString('tr-TR')} Teklifi Çifte Gönder`}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}