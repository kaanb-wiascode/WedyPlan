'use client';

import React, { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { useConfirm } from '@/context/ConfirmContext';
import {
  Inbox,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Sparkles,
  Send,
  Calendar,
  Users,
  DollarSign,
  Building2,
  X,
  ChevronDown,
  Check,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Trash2,
  FileText
} from 'lucide-react';

interface LeadItem {
  id: string;
  coupleNames: string;
  weddingDate: string;
  guestCount: number;
  budgetGoal: number;
  location: string;
  status: 'PENDING' | 'OFFER_SENT' | 'AGREED' | 'REJECTED';
  requestNote: string;
  createdAt: string;
  phone: string;
  email: string;
}

export default function VendorLeadsPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  // Örnek Gelen Talepler
  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: '1',
      coupleNames: 'Selin & Caner',
      weddingDate: '15 Ağustos 2026',
      guestCount: 250,
      budgetGoal: 150000,
      location: 'Beykoz / İstanbul',
      status: 'PENDING',
      requestNote: 'Kır düğünü konseptinde yemekli düğün organizasyonu için teklifinizi rica ediyoruz. Vejetaryen menü seçeneğiniz var mı?',
      createdAt: '12 dakika önce',
      phone: '+90 532 111 22 33',
      email: 'selin@example.com'
    },
    {
      id: '2',
      coupleNames: 'Gizem & Burak',
      weddingDate: '02 Eylül 2026',
      guestCount: 300,
      budgetGoal: 180000,
      location: 'Sarıyer / İstanbul',
      status: 'OFFER_SENT',
      requestNote: 'Açık hava kokteyl projesi için detaylı fiyat bilgisi almak istiyoruz.',
      createdAt: '2 saat önce',
      phone: '+90 533 444 55 66',
      email: 'gizem@example.com'
    },
    {
      id: '3',
      coupleNames: 'Merve & Kaan',
      weddingDate: '20 Eylül 2026',
      guestCount: 200,
      budgetGoal: 120000,
      location: 'Polonezköy / İstanbul',
      status: 'AGREED',
      requestNote: 'Düğün salonu kiralama ve süsleme dahil paket fiyatı talep ediyoruz.',
      createdAt: '1 gün önce',
      phone: '+90 535 777 88 99',
      email: 'merve@example.com'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Detay & Teklif Modal State'leri
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteNote, setQuoteNote] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrik Hesaplamaları
  const pendingCount = useMemo(() => leads.filter(l => l.status === 'PENDING').length, [leads]);
  const offerSentCount = useMemo(() => leads.filter(l => l.status === 'OFFER_SENT').length, [leads]);
  const agreedCount = useMemo(() => leads.filter(l => l.status === 'AGREED').length, [leads]);

  // Teklif Gönderme İşlemi
  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !quoteAmount) return;

    startTransition(() => {
      setLeads(prev =>
        prev.map(l => (l.id === selectedLead.id ? { ...l, status: 'OFFER_SENT' } : l))
      );
      setIsQuoteModalOpen(false);
      setQuoteAmount('');
      setQuoteNote('');
      showToast(`${selectedLead.coupleNames} çiftine ₺${Number(quoteAmount).toLocaleString('tr-TR')} tutarındaki teklif iletildi.`);
    });
  };

  // WedyAI ile Otomatik Teklif Metni / Yanıt Üretme
  const handleAiGenerateQuoteNote = () => {
    if (!selectedLead) return;
    setQuoteNote(
      `Merhaba ${selectedLead.coupleNames},\n\n${selectedLead.weddingDate} tarihindeki ${selectedLead.guestCount} kişilik düğün organizasyonunuz için talebinizi büyük bir heyecanla inceledik. İsteğinize özel hazırladığımız kapsayıcı hizmet paketimiz ve menü detaylarımız ekte sunulmuştur.`
    );
    showToast('WedyAI tarafından özel teklif mektubu oluşturuldu.');
  };

  // Apple Onay Modallı Talep İptali
  const handleDeleteLead = async (id: string, coupleNames: string) => {
    const isConfirmed = await confirm({
      title: 'Talebi İptal Etmek İstediğinize Emin Misiniz?',
      message: `"${coupleNames}" çiftine ait teklif isteği listeden kaldırılacaktır. Bu işlem geri alınamaz.`,
      confirmText: 'Evet, İptal Et',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      setLeads(prev => prev.filter(l => l.id !== id));
      showToast('Talep listeden kaldırıldı.');
    }
  };

  // Filtrelenmiş Liste
  const filteredLeads = leads.filter(item => {
    const matchesSearch =
      item.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
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

      {/* HEADER (Frosted Glass) */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Inbox className="w-3.5 h-3.5 text-zinc-500" />
            <span>Müşteri İlişkileri & CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Gelen Talepler & Teklif Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Evlenecek çiftlerin ilettiği teklif isteklerini yönetin, anında fiyat ve sözleşme iletin.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAiGenerateQuoteNote}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-zinc-500" /> WedyAI Teklif Taslağı
          </button>
        </div>
      </div>

      {/* 1. ÖZET DURUM KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Yanıt Bekleyen Talepler
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{pendingCount} Çift</div>
          <div className="text-[11px] text-zinc-400">Hızlı Yanıt Dönüşümü Artırır</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Gönderilen Teklifler</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{offerSentCount} Teklif</div>
          <div className="text-[11px] text-zinc-400">Çift Onayı Bekliyor</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Anlaşılan Düğünler
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{agreedCount} Rezervasyon</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Takvime Otomatik İşlendi</div>
        </div>
      </div>

      {/* 2. ARAMA VE FİLTRE HAPLARI */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Çift ismi veya şehir ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Tüm Talepler
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'PENDING'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Yanıt Bekleyenler
          </button>
          <button
            onClick={() => setStatusFilter('OFFER_SENT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'OFFER_SENT'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Teklif Gönderilenler
          </button>
          <button
            onClick={() => setStatusFilter('AGREED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'AGREED'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Anlaşılanlar
          </button>
        </div>
      </div>

      {/* 3. TALEP LİSTESİ KARTLARI (Frosted Glass) */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-400 text-xs font-medium">
            Kriterlere uygun talep bulunamadı.
          </div>
        ) : (
          filteredLeads.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
                    {item.coupleNames[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{item.coupleNames}</h3>
                    <span className="text-[11px] text-zinc-400 font-medium">{item.location} • {item.createdAt}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal bg-zinc-50/80 dark:bg-zinc-800/40 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
                  &quot;{item.requestNote}&quot;
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-400" /> {item.weddingDate}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-zinc-400" /> {item.guestCount} Davetli</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Bütçe: ₺{item.budgetGoal.toLocaleString('tr-TR')}</span>
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteLead(item.id, item.coupleNames)}
                    disabled={isPending}
                    className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Talebi Sil / İptal Et"
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
                    <span>{item.status === 'OFFER_SENT' ? 'Teklifi Güncelle' : 'Teklif Gönder'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. TEKLİF HAZIRLAMA MODALI (Frosted Glass) */}
      {isQuoteModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-500" /> Teklif Hazırla: {selectedLead.coupleNames}
                </h2>
                <span className="text-[10px] text-zinc-400">{selectedLead.weddingDate} • {selectedLead.guestCount} Kişi</span>
              </div>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-4">
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Teklif Tutarı (₺)</label>
                  <span className="text-[10px] text-zinc-400">Çiftin Hedef Bütçesi: ₺{selectedLead.budgetGoal.toLocaleString('tr-TR')}</span>
                </div>
                <input
                  type="number"
                  placeholder="145000"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Özel Teklif Mektubu / Not</label>
                  <button
                    type="button"
                    onClick={handleAiGenerateQuoteNote}
                    className="text-[10px] font-bold text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-zinc-400" /> AI İle Mektup Yaz
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Çifte özel mesajınız, pakete dahil hizmetler ve opsiyonel detaylar..."
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
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Gönderiliyor...' : 'Teklifi Çifte Gönder'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}