'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
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
  Trash2
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  coupleNames: string;
  date: string;
  time: string;
  type: 'WEDDING' | 'TASTING' | 'MEETING';
  status: 'CONFIRMED' | 'OPTION' | 'CANCELLED';
  guestCount?: number;
  note?: string;
}

export default function VendorCalendarPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: 'Selin & Caner Düğün Organizasyonu',
      coupleNames: 'Selin & Caner',
      date: '2026-08-15',
      time: '19:00 - 23:30',
      type: 'WEDDING',
      status: 'CONFIRMED',
      guestCount: 250,
      note: 'Yemekli düğün organizasyonu, canlı orkestra dahil.'
    },
    {
      id: '2',
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
      id: '3',
      title: 'Gizem & Burak Opsiyonlu Görüşme',
      coupleNames: 'Gizem & Burak',
      date: '2026-09-02',
      time: '11:00 - 12:30',
      type: 'MEETING',
      status: 'OPTION',
      guestCount: 300,
      note: 'Opsiyon süresi 10 Ağustos tarihinde doluyor.'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [coupleNames, setCoupleNames] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventType, setEventType] = useState<'WEDDING' | 'TASTING' | 'MEETING'>('WEDDING');
  const [eventStatus, setEventStatus] = useState<'CONFIRMED' | 'OPTION'>('CONFIRMED');
  const [guestCount, setGuestCount] = useState('');
  const [note, setNote] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNames || !eventDate || !eventTime) return;

    startTransition(() => {
      const newEvent: EventItem = {
        id: Date.now().toString(),
        title: `${coupleNames} ${eventType === 'WEDDING' ? 'Düğünü' : eventType === 'TASTING' ? 'Tadımı' : 'Görüşmesi'}`,
        coupleNames,
        date: eventDate,
        time: eventTime,
        type: eventType,
        status: eventStatus,
        guestCount: guestCount ? parseInt(guestCount) : undefined,
        note
      };

      setEvents(prev => [...prev, newEvent]);
      setIsModalOpen(false);
      setCoupleNames('');
      setEventDate('');
      setEventTime('');
      setGuestCount('');
      setNote('');
      showToast('Takvime yeni etkinlik kilitlendi.');
    });
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    const isConfirmed = await confirm({
      title: 'Etkinliği İptal Etmek İstediğinize Emin Misiniz?',
      message: `"${title}" takviminizden kaldırılacaktır.`,
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      setEvents(prev => prev.filter(e => e.id !== id));
      showToast('Etkinlik takvimden silindi.');
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => filterType === 'ALL' || e.type === filterType);
  }, [events, filterType]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span>Operasyonel Ajanda</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Takvim & Randevular
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Düğün günlerinizi, tadım provalarınızı ve opsiyonlu randevularınızı yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Randevu / Düğün Ekle
        </button>
      </div>

      {/* FİLTRE HAPLARI */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'ALL', label: 'Tüm Takvim' },
          { id: 'WEDDING', label: 'Düğün Günleri' },
          { id: 'TASTING', label: 'Tadım & Prova' },
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

      {/* DÜĞÜN KARTLARI LİSTESİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-4 flex flex-col justify-between"
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
                  {evt.status === 'CONFIRMED' ? 'Onaylandı' : 'Opsiyonlu'}
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

      {/* YENİ ETKİNLİK MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-500" /> Takvime Randevu Kilitle
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
                    <option value="WEDDING">Düğün Günü</option>
                    <option value="TASTING">Tadım & Prova</option>
                    <option value="MEETING">Görüşme</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Durum</label>
                  <select
                    value={eventStatus}
                    onChange={(e) => setEventStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  >
                    <option value="CONFIRMED">Onaylandı</option>
                    <option value="OPTION">Opsiyonlu</option>
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
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  Etkinliği Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}