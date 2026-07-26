'use client';

import React, { useState } from 'react';
import { INITIAL_CALENDAR_EVENTS } from '@/lib/vendor-calendar-constants';
import { CalendarEvent } from '@/types/vendor-calendar';
import { CalendarEventCard } from '@/components/vendor/molecules/CalendarEventCard';
import { Sparkles, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const VendorCalendarView: React.FC = () => {
  const [events] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [filter, setFilter] = useState<'ALL' | 'CONFLICTS' | 'BOOKED' | 'OPTION'>('ALL');

  const filteredEvents = events.filter((e) => {
    if (filter === 'CONFLICTS') return e.hasConflictWarning;
    if (filter === 'BOOKED') return e.status === 'BOOKED';
    if (filter === 'OPTION') return e.status === 'OPTION';
    return true;
  });

  const conflictCount = events.filter((e) => e.hasConflictWarning).length;

  return (
    <div className="space-y-6">
      {/* WedyAI Takvim Durum Rozeti */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-white/80 to-white/40 border border-amber-300/40 rounded-[24px] backdrop-blur-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#D4AF37] text-white rounded-2xl shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[15px] text-[#1D1D1F]">WedyAI Akıllı Çakışma Denetleyicisi</h4>
            <p className="text-[12px] text-[#6E6E73]">
              {conflictCount > 0 ? (
                <span className="text-rose-700 font-semibold">
                  ⚠️ Dikkat! Takviminizde <strong>{conflictCount} adet tarih/vardiya çakışması</strong> tespit edildi.
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  ✓ Harika! Takviminizde herhangi bir tarih çakışması bulunmuyor.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Filtre Sekmeleri */}
      <div className="flex items-center gap-2 border-b border-black/5 pb-3 overflow-x-auto">
        {[
          { id: 'ALL', label: 'Tüm Etkinlikler' },
          { id: 'CONFLICTS', label: `⚠️ Çakışma Uyarısı (${conflictCount})` },
          { id: 'BOOKED', label: 'Kesin Rezerve' },
          { id: 'OPTION', label: 'Opsiyonlu Bekleyenler' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all shrink-0 cursor-pointer ${
              filter === tab.id
                ? 'bg-white/90 text-[#1D1D1F] shadow-sm border border-white'
                : 'text-[#6E6E73] hover:bg-white/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <CalendarEventCard key={event.id} event={event} />
        ))}

        {filteredEvents.length === 0 && (
          <div className="p-12 text-center bg-white/30 rounded-[28px] border border-white/60 text-[#86868B] text-[13px]">
            Seçilen filtreye uygun rezervasyon veya takvim kaydı bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};