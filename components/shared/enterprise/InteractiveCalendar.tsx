'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '@/types/enterprise-components';

interface InteractiveCalendarProps {
  events?: CalendarEvent[];
  onSelectDate?: (dateStr: string) => void;
}

export const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({ events = [], onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80 p-6 rounded-[32px] shadow-xs space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-[18px] text-[#1D1D1F] dark:text-white">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={handlePrevMonth} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNextMonth} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#86868B] uppercase">
        <span>Pz</span><span>Pt</span><span>Sa</span><span>Ça</span><span>Pe</span><span>Cu</span><span>Ct</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-semibold">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="p-2" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          const hasEvent = events.some((e) => e.date === formattedDate);

          return (
            <button
              key={dayNum}
              onClick={() => onSelectDate?.(formattedDate)}
              className="p-2.5 rounded-2xl hover:bg-[#E6007E] hover:text-white transition flex flex-col items-center justify-center relative cursor-pointer group"
            >
              <span>{dayNum}</span>
              {hasEvent && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6007E] group-hover:bg-white mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};