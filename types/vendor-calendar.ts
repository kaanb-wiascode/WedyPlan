export type BookingStatus = 'BOOKED' | 'OPTION' | 'BLOCKED';
export type TimeSlot = 'DAY' | 'NIGHT' | 'FULL_DAY';

export interface CalendarEvent {
  id: string;
  coupleNames: string;
  hallName: string;
  date: string;
  timeSlot: TimeSlot;
  status: BookingStatus;
  guestCount: number;
  totalPrice?: number;
  hasConflictWarning?: boolean;
  conflictDetails?: string;
}