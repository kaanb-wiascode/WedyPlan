export const CALENDAR_CONFIG = {
    DEFAULT_TIMEZONE: 'Europe/Istanbul',
    DEFAULT_SLOT_DURATION_MIN: 60,
    MAX_FUTURE_BOOKING_DAYS: 365,
    
    DEFAULT_WORKING_HOURS: [
      { day: 1, start: '09:00', end: '18:00' }, // Mon
      { day: 2, start: '09:00', end: '18:00' }, // Tue
      { day: 3, start: '09:00', end: '18:00' }, // Wed
      { day: 4, start: '09:00', end: '18:00' }, // Thu
      { day: 5, start: '09:00', end: '18:00' }, // Fri
      { day: 6, start: '10:00', end: '20:00' }, // Sat
      { day: 0, start: '10:00', end: '18:00' }  // Sun
    ]
  } as const;