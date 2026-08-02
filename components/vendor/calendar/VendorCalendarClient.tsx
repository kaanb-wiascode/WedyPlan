'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import GlassCard from '@/components/shared/ui/GlassCard';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Users,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import AIConflictWidget from './AIConflictWidget';
import ResourceSchedulerWidget from './ResourceSchedulerWidget';
import { CalendarEvent } from '@/lib/validations/vendor-calendar';
import { createVendorCalendarEventAction } from '@/lib/actions/vendor-calendar';

export default function VendorCalendarClient({ 
  initialEvents, 
  vendorId 
}: { 
  initialEvents: CalendarEvent[]; 
  vendorId: string;
}) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [viewMode, setViewMode] = useState<'MONTH' | 'WEEK' | 'DAY'>('WEEK');
  const [selectedSpace, setSelectedSpace] = useState<string>('all');
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<'WEDDING' | 'MEETING' | 'TASTING' | 'TOUR' | 'BLOCK'>('WEDDING');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');

  const filteredEvents = selectedSpace === 'all' 
    ? events 
    : events.filter(e => e.spaceId === selectedSpace || !e.spaceId);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createVendorCalendarEventAction({
      title,
      type: eventType,
      status: 'SCHEDULED',
      startDate: startDate || '2026-09-20T15:00:00',
      endDate: '2026-09-20T18:00:00',
      allDay: false,
      spaceId: selectedSpace === 'all' ? 'space_karina' : selectedSpace,
      color: eventType === 'WEDDING' ? 'bg-emerald-500' : 'bg-purple-500',
      notes
    });

    if (res.success) {
      alert(res.message);
      setIsNewEventModalOpen(false);
      setTitle('');
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* 1. AI Çatışma ve Optimizasyon Widget */}
      <AIConflictWidget />

      {/* 2. Alan (Space) Filtre Barı */}
      <ResourceSchedulerWidget 
        selectedSpace={selectedSpace} 
        onSelectSpace={setSelectedSpace} 
      />

      {/* 3. Takvim Kontrol Çubuğu (Görünüm ve Yeni Randevu) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500 text-white rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Eylül 2026 Takvimi</h2>
            <p className="text-[11px] text-gray-500">Etkinlikler ve rezervasyon akışı</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-xl">
            {(['MONTH', 'WEEK', 'DAY'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === mode
                    ? 'bg-white dark:bg-zinc-900 text-rose-600 shadow-2xs font-bold'
                    : 'text-gray-500'
                }`}
              >
                {mode === 'MONTH' ? 'Ay' : mode === 'WEEK' ? 'Hafta' : 'Gün'}
              </button>
            ))}
          </div>

          <Button 
            onClick={() => setIsNewEventModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Yeni Randevu / Etkinlik
          </Button>
        </div>
      </div>

      {/* 4. Etkinlik Listesi / Takvim Grid Görünümü */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredEvents.map((evt) => (
          <GlassCard key={evt.id} className="p-4 space-y-3 hover:border-rose-300 transition-all relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${evt.color || 'bg-rose-500'}`} />
            
            <div className="flex justify-between items-start pl-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {evt.type}
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">{evt.title}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                {evt.status}
              </span>
            </div>

            <div className="space-y-1.5 pl-2 text-[11px] text-gray-600 dark:text-gray-300 border-t border-slate-100 dark:border-zinc-800 pt-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{new Date(evt.startDate).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              {evt.notes && (
                <p className="text-[10px] text-gray-500 italic bg-slate-50 dark:bg-zinc-800/50 p-2 rounded-xl">
                  "{evt.notes}"
                </p>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* 5. Yeni Randevu Oluşturma Modalı */}
      {isNewEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Takvime Yeni Etkinlik Ekle</h3>
            
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Etkinlik Başlığı</label>
                <input 
                  type="text" 
                  placeholder="Örn: Ayşe & Mehmet Tadım" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Etkinlik Türü</label>
                <select 
                  value={eventType} 
                  onChange={e => setEventType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                >
                  <option value="WEDDING">Düğün / Rezervasyon</option>
                  <option value="TASTING">Menü Tadımı</option>
                  <option value="TOUR">Mekan Gezisi</option>
                  <option value="MEETING">Ön Görüşme</option>
                  <option value="BLOCK">Tadilat / Blokaj</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Tarih & Saat</label>
                <input 
                  type="datetime-local" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Notlar</label>
                <textarea 
                  rows={2}
                  placeholder="Örn: Vejetaryen menü tercih ediyorlar..." 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewEventModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                  Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}