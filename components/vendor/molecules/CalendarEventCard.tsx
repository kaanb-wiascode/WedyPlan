'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, AlertTriangle, Building2, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '@/types/vendor-calendar';
import { BOOKING_STATUS_MAP, TIME_SLOT_LABELS } from '@/lib/vendor-calendar-constants';

interface CalendarEventCardProps {
  event: CalendarEvent;
}

export const CalendarEventCard: React.FC<CalendarEventCardProps> = ({ event }) => {
  const statusInfo = BOOKING_STATUS_MAP[event.status as keyof typeof BOOKING_STATUS_MAP] || BOOKING_STATUS_MAP.BOOKED;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-white/60 backdrop-blur-3xl border p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all space-y-4 ${
        event.hasConflictWarning ? 'border-rose-300 bg-rose-50/20' : 'border-white/90'
      }`}
    >
      {/* Üst Başlık & Durum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-[#86868B] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#D4AF37]" /> {event.hallName}
            </span>
          </div>
          <h3 className="font-serif font-semibold text-[18px] text-[#1D1D1F] mt-0.5">{event.coupleNames}</h3>
        </div>

        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Çakışma Uyarısı (Var ise) */}
      {event.hasConflictWarning && event.conflictDetails && (
        <div className="p-3 bg-rose-500/10 border border-rose-200 rounded-2xl flex items-start gap-2 text-rose-700 text-[11px]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <strong className="font-bold">WedyAI Çakışma Riski: </strong>
            {event.conflictDetails}
          </div>
        </div>
      )}

      {/* Detay Bilgileri */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px] text-[#6E6E73]">
        <div className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.date}</div>
        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {TIME_SLOT_LABELS[event.timeSlot]}</div>
        {event.guestCount > 0 && (
          <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {event.guestCount} Davetli</div>
        )}
      </div>

      {/* Alt Fiyat ve Aksiyon */}
      <div className="pt-2 border-t border-black/5 flex items-center justify-between">
        <span className="font-serif font-bold text-[15px] text-[#1D1D1F]">
          {event.totalPrice ? `${event.totalPrice.toLocaleString('tr-TR')} ₺` : 'Fiyat Belirtilmedi'}
        </span>

        <button className="text-[11px] font-bold text-[#1D1D1F] hover:text-[#D4AF37] inline-flex items-center gap-1 cursor-pointer">
          Detay & Düzenle <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};