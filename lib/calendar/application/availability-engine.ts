import { AvailabilitySlot, GetAvailabilityRequest } from '@/types/enterprise-calendar';
import { CALENDAR_CONFIG } from '../domain/calendar.constants';

export class AvailabilityEngine {
  /**
   * Generates available booking time slots for a given vendor and date
   */
  static generateDaySlots(
    request: GetAvailabilityRequest,
    existingBookings: { startTime: Date; endTime: Date }[]
  ): AvailabilitySlot[] {
    const duration = request.slotDurationMin || CALENDAR_CONFIG.DEFAULT_SLOT_DURATION_MIN;
    const slots: AvailabilitySlot[] = [];

    // Mock 09:00 to 18:00 Working Day Slots Generation
    const baseDateStr = request.dateStr;
    const startHour = 9;
    const endHour = 18;

    for (let h = startHour; h < endHour; h++) {
      const slotStart = new Date(`${baseDateStr}T${String(h).padStart(2, '0')}:00:00Z`);
      const slotEnd = new Date(slotStart.getTime() + duration * 60000);

      const isBooked = existingBookings.some((b) => slotStart < b.endTime && slotEnd > b.startTime);

      slots.push({
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable: !isBooked
      });
    }

    return slots;
  }
}