'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  saveVendorCalendarEventAction,
  deleteVendorCalendarEventAction,
  CalendarEventInput
} from '@/lib/actions/vendor-calendar-sync';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trash2,
  RefreshCw,
  Lock,
  Filter,
  Grid,
  List,
  CalendarDays
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  coupleNames: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: 'WEDDING' | 'TASTING' | 'MEETING';
  status: 'CONFIRMED' | 'OPTION' | 'PENDING';
  guestCount?: number;
  note?: string;
}

export default function VendorCalendarPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  // Takvim Görünüm Modu (Aylık Matris vs Ajanda Liste)
  const [viewMode, setViewMode] = useState<'MONTH_GRID' | 'AGENDA'>('MONTH_GRID');

  // Örnek Canlı Takvim Verileri
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 'evt_1',
      title: 'Selin & Caner Düğün Organizasyonu',
      coupleNames: 'Selin & Caner',
      date: '2026-08-15',
      time: '19:00 - 23:30',
      type: 'WEDDING',
      status: 'CONFIRMED',
      guestCount: 250,
      note: 'Yemekli düğün organizasyonu, canlı orkestra dahil. Tarih kilitlendi.'
    },
    {
      id: 'evt_2',
      title: 'Merve & Kaan Yemek Tadım Provası',
      coupleNames: 'Merve & Kaan',
      date: '2026-08-22',
      time: '14:00 - 16:00',
      type: 'TASTING',
      status: 'CONFIRMED',
      guestCount: 4,
      note: 'Vejetaryen ve standart menü tadımı yapılacak.'
    },
    {
      id: 'evt_3',
      title: 'Gizem & Burak Opsiyonlu Görüşme',
      coupleNames: 'Gizem & Burak',
      date: '2026-08-28',
      time: '11:00 - 12:30',
      type: 'MEETING',
      status: 'OPTION',
      guestCount: 300,
      note: 'Opsiyon süresi 10 Ağustos tarihinde doluyor.'
    },
    {
      id: 'evt_4',
      title: 'Elif & Tolga Düğün Organizasyonu',
      coupleNames: 'Elif & Tolga',
      date: '2026-09-05',
      time: '18:30 - 23:00',
      type: 'WEDDING',
      status: 'CONFIRMED',
      guestCount: 350,
      note: 'Kır düğünü konseptli bütçe onaylandı.'
    }
  ]);

  // Filtreler & Arama
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal & Form State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupleNames, setCoupleNames] = useState('');
  const [eventDate, setEventDate] = useState('2026-08-20');
  const [eventTime, setEventTime] = useState('19:00 - 23:00');
  const [eventType, setEventType] = useState<'WEDDING' | 'TASTING' | 'MEETING'>('WEDDING');
  const [eventStatus, setEventStatus] = useState<'CONFIRMED' | 'OPTION' | 'PENDING'>('CONFIRMED');
  const [guestCount, setGuestCount] = useState('');
  const [note, setNote] = useState('');

  // Toast Bildirim State'i
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrik Hesaplamaları
  const confirmedWeddingsCount = useMemo(
    () => events.filter(e => e.type === 'WEDDING' && e.status === 'CONFIRMED').length,
    [events]
  );

  const pendingAppointmentsCount = useMemo(
    () => events.filter(e => e.status === 'OPTION' || e.status === 'PENDING').length,
    [events]
  );

  // Filtrelenmiş Etkinlikler
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.coupleNames.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || evt.type === filterType;
      const matchesStatus = filterStatus === 'ALL' || evt.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, filterType, filterStatus, searchQuery]);

  // 🍏 SİSTEMİK YENİ ETKİNLİK EKLEME (SERVER ACTION)
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNames || !eventDate || !eventTime) return;

    startTransition(async () => {
      const newEvtInput: CalendarEventInput = {
        title: `${coupleNames} ${eventType === 'WEDDING' ? 'Düğünü' : eventType === 'TASTING' ? 'Tadımı' : 'Görüşmesi'}`,
        coupleNames,
        date: eventDate,
        time: eventTime,
        type: eventType,
        status: eventStatus,
        guestCount: guestCount ? parseInt(guestCount) : undefined,
        note
      };

      const res = await saveVendorCalendarEventAction(newEvtInput);

      if (res.success) {
        setEvents(prev => [
          ...prev,
          { id: Date.now().toString(), ...newEvtInput }
        ]);
        setIsModalOpen(false);
        setCoupleNames('');
        setGuestCount('');
        setNote('');
        showToast(res.message);
      }
    });
  };

  // 🍏 SİSTEMİK ETKİNLİK İPTALİ (APPLE MODALLI)
  const handleDeleteEvent = async (id: string, title: string) => {
    const isConfirmed = await confirm({
      title: 'Etkinliği Takvimden Silmek İstediğinize Emin Misiniz?',
      message: `"${title}" kaydı takviminizden kaldırılacak ve ilgili çiftin panelinde tarih tekrar boş duruma gelecektir.`,
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      startTransition(async () => {
        const res = await deleteVendorCalendarEventAction(id, title);
        if (res.success) {
          setEvents(prev => prev.filter(e => e.id !== id));
          showToast(res.message);
        }
      });
    }
  };

  // Ağustos 2026 Günleri Matrisi (Simülasyon - 31 Gün)
  const monthDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const dayEvents = filteredEvents.filter(e => e.date === dateStr);
    return { dayNum, dateStr, dayEvents };
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
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span>Operasyonel Ajanda</span>
            </div>
            {/* Google Sync Rozeti */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Google Calendar Canlı Senkronize</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Takvim & Randevu Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Düğün günlerinizi kilitleyin, tadım ve keşif randevularını çift paneliyle eşzamanlı yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Randevu / Düğün Kilitle
        </button>
      </div>

      {/* 1. ÖZET METRİK KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Kilitli Düğün Günleri
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{confirmedWeddingsCount} Düğün</div>
          <div className="text-[11px] text-zinc-400">Tarihler Diğer Çiftlere Kapatıldı</div>
        </div>

        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Opsiyon & Randevular
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{pendingAppointmentsCount} Görüşme</div>
          <div className="text-[11px] text-zinc-400">Onay veya Prova Bekliyor</div>
        </div>

        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Ağustos Doluluk Oranı</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">%85 Dolu</div>
          <div className="text-[11px] text-zinc-400">Sezon Yüksek Talepli</div>
        </div>
      </div>

      {/* 2. GÖRÜNÜM MODU & FİLTRELER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Arama Kutusu */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Çift veya randevu ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        {/* Tür Filtre Hapları */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'Tüm Etkinlikler' },
            { id: 'WEDDING', label: 'Düğün Günleri' },
            { id: 'TASTING', label: 'Tadımlar' },
            { id: 'MEETING', label: 'Görüşmeler' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === item.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Görünüm Değiştirici (Görsel Matris vs Ajanda Liste) */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 shrink-0">
          <button
            onClick={() => setViewMode('MONTH_GRID')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'MONTH_GRID'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Aylık Matris
          </button>
          <button
            onClick={() => setViewMode('AGENDA')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'AGENDA'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" /> Ajanda Akışı
          </button>
        </div>
      </div>

      {/* GÖRÜNÜM 1: AYLIK MATRİS (MONTH GRID VIEW) */}
      {viewMode === 'MONTH_GRID' && (
        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-zinc-500" /> Ağustos 2026 Takvimi
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white" /> Düğün</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Tadım</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Opsiyon</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-zinc-400 pb-2">
            <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthDays.map(({ dayNum, dateStr, dayEvents }) => (
              <div
                key={dayNum}
                onClick={() => {
                  setEventDate(dateStr);
                  setIsModalOpen(true);
                }}
                className={`min-h-[90px] p-2 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  dayEvents.length > 0
                    ? 'bg-zinc-50/90 dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white'
                    : 'bg-white/40 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-100/50'
                }`}
              >
                <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">{dayNum}</span>

                <div className="space-y-1">
                  {dayEvents.map(evt => (
                    <div
                      key={evt.id}
                      className={`p-1.5 rounded-lg text-[9px] font-bold truncate ${
                        evt.type === 'WEDDING' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' :
                        evt.type === 'TASTING' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' :
                        'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}
                      title={`${evt.coupleNames} - ${evt.time}`}
                    >
                      {evt.coupleNames}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GÖRÜNÜM 2: AJANDA LİSTE AKIŞI (AGENDA VIEW) */}
      {viewMode === 'AGENDA' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-6 rounded-3xl apple-glass shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                    evt.type === 'WEDDING' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' :
                    evt.type === 'TASTING' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}>
                    {evt.type === 'WEDDING' ? '🎉 Düğün Günü' : evt.type === 'TASTING' ? '🍽️ Tadım & Prova' : '🤝 Görüşme'}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    evt.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}>
                    {evt.status === 'CONFIRMED' ? 'Onaylandı & Kilitlendi' : 'Opsiyonlu'}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{evt.title}</h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">{evt.coupleNames}</p>
                </div>

                {evt.note && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50/80 dark:bg-zinc-800/40 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
                    {evt.note}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-zinc-400" /> {new Date(evt.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-400" /> {evt.time}</span>
                </div>

                <button
                  onClick={() => handleDeleteEvent(evt.id, evt.title)}
                  disabled={isPending}
                  className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="İptal Et / Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* YENİ ETKİNLİK EKLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-500" /> Takvime Randevu / Tarih Kilitle
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Çift İsimleri</label>
                <input
                  type="text"
                  placeholder="örn. Selin & Caner"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Etkinlik Tarihi</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Saat Aralığı</label>
                  <input
                    type="text"
                    placeholder="19:00 - 23:30"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Etkinlik Türü</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  >
                    <option value="WEDDING">Düğün Günü (Tarihi Kilitle)</option>
                    <option value="TASTING">Tadım & Prova Randevusu</option>
                    <option value="MEETING">Mekan / Hizmet Keşfi</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Durum</label>
                  <select
                    value={eventStatus}
                    onChange={(e) => setEventStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  >
                    <option value="CONFIRMED">Onaylandı & Kilitlendi</option>
                    <option value="OPTION">Opsiyonlu</option>
                    <option value="PENDING">Randevu Bekliyor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Notlar</label>
                <textarea
                  rows={2}
                  placeholder="Opsiyon şartları, özel detaylar..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Kaydediliyor...' : 'Etkinliği Çift Paneline Eşitle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}