import { CalendarEvent, BookingStatus, TimeSlot } from '@/types/vendor-calendar';

export const BOOKING_STATUS_MAP: Record<BookingStatus, { label: string; color: string }> = {
  BOOKED: { label: 'Kesin Rezerve (WON)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  OPTION: { label: 'Opsiyonlu (Teklif)', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  BLOCKED: { label: 'Tarih Kapalı / Bakım', color: 'bg-rose-50 text-rose-800 border-rose-200' },
};

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  DAY: 'Gündüz (12:00 - 16:00)',
  NIGHT: 'Gece (19:00 - 23:30)',
  FULL_DAY: 'Tüm Gün',
};

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-101',
    coupleNames: 'Merve & Alper Şahin',
    hallName: 'Kır Bahçesi A Salonu',
    date: '2026-06-12',
    timeSlot: 'NIGHT',
    status: 'BOOKED',
    guestCount: 300,
    totalPrice: 390000,
  },
  {
    id: 'evt-102',
    coupleNames: 'Selin & Kaan Yılmaz',
    hallName: 'Kır Bahçesi A Salonu',
    date: '2026-06-12',
    timeSlot: 'NIGHT',
    status: 'OPTION',
    guestCount: 400,
    totalPrice: 420000,
    hasConflictWarning: true,
    conflictDetails: 'Aynı tarih ve Gece vardiyasında Merve & Alper Şahin için kesin rezervasyon mevcut!',
  },
  {
    id: 'evt-103',
    coupleNames: 'Ece & Onur Kaya',
    hallName: 'Balo Salonu (Kapalı)',
    date: '2026-07-20',
    timeSlot: 'NIGHT',
    status: 'BOOKED',
    guestCount: 500,
    totalPrice: 520000,
  },
  {
    id: 'evt-104',
    coupleNames: 'Salon Genel Dezenfeksiyon & Bakım',
    hallName: 'Tüm Salonlar',
    date: '2026-06-15',
    timeSlot: 'FULL_DAY',
    status: 'BLOCKED',
    guestCount: 0,
  },
];