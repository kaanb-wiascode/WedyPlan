export type CalendarOwnerType = 'COUPLE' | 'VENDOR' | 'ADMIN' | 'SYSTEM';

export type EventCategory =
  | 'WEDDING_DAY'
  | 'MEETING'
  | 'TASTING_SESSION'
  | 'PROVA'
  | 'INSTALLATION'
  | 'PAYMENT_DUE'
  | 'PERSONAL_BLOCKED';

export type EventStatus = 'CONFIRMED' | 'TENTATIVE' | 'CANCELLED';

export type RecurrenceFrequency = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface CreateCalendarEventDTO {
  ownerId: string;
  ownerType: CalendarOwnerType;
  category: EventCategory;
  title: string;
  description?: string;
  location?: string;
  timezone?: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  isAllDay?: boolean;
  travelBufferBeforeMin?: number;
  travelBufferAfterMin?: number;
  recurrenceFreq?: RecurrenceFrequency;
  relatedEntityId?: string;
  guests?: { email: string; fullName?: string }[];
}

export interface ConflictCheckRequest {
  ownerId: string;
  startTime: string;
  endTime: string;
  travelBufferBeforeMin?: number;
  travelBufferAfterMin?: number;
  excludeEventId?: string;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictingEventTitle?: string;
  conflictingEventId?: string;
  reason?: string;
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface GetAvailabilityRequest {
  ownerId: string;
  dateStr: string; // YYYY-MM-DD
  slotDurationMin?: number;
  timezone?: string;
}