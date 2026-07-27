import {
    CreateCalendarEventDTO,
    ConflictCheckRequest,
    ConflictCheckResult,
    GetAvailabilityRequest,
    AvailabilitySlot
  } from '@/types/enterprise-calendar';
  import { ConflictEngine } from './conflict-engine';
  import { AvailabilityEngine } from './availability-engine';
  import { IcsParser } from '../infrastructure/ics-parser';
  
  // In-Memory Calendar Event Store Mock
  const calendarEventsStore: any[] = [];
  
  export class UniversalCalendarService {
    /**
     * Creates a calendar event with automatic conflict checking
     */
    static async createEvent(dto: CreateCalendarEventDTO): Promise<{ success: boolean; eventId?: string; error?: string }> {
      const conflictCheck = await this.checkConflict({
        ownerId: dto.ownerId,
        startTime: dto.startTime,
        endTime: dto.endTime,
        travelBufferBeforeMin: dto.travelBufferBeforeMin,
        travelBufferAfterMin: dto.travelBufferAfterMin
      });
  
      if (conflictCheck.hasConflict) {
        return {
          success: false,
          error: `Conflict detected with existing event: "${conflictCheck.conflictingEventTitle}"`
        };
      }
  
      const eventId = `evt_${Date.now()}`;
      const newEvent = {
        id: eventId,
        ...dto,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };
  
      calendarEventsStore.push(newEvent);
      return { success: true, eventId };
    }
  
    /**
     * Checks real-time conflict against existing events
     */
    static async checkConflict(req: ConflictCheckRequest): Promise<ConflictCheckResult> {
      const reqStart = new Date(req.startTime);
      const reqEnd = new Date(req.endTime);
  
      const userEvents = calendarEventsStore.filter((e) => e.ownerId === req.ownerId && e.id !== req.excludeEventId);
  
      for (const evt of userEvents) {
        const hasOverlap = ConflictEngine.hasTimeOverlap(
          reqStart,
          reqEnd,
          req.travelBufferBeforeMin || 0,
          req.travelBufferAfterMin || 0,
          new Date(evt.startTime),
          new Date(evt.endTime),
          evt.travelBufferBeforeMin || 0,
          evt.travelBufferAfterMin || 0
        );
  
        if (hasOverlap) {
          return {
            hasConflict: true,
            conflictingEventId: evt.id,
            conflictingEventTitle: evt.title,
            reason: 'Time slot overlaps with an existing appointment or travel buffer.'
          };
        }
      }
  
      return { hasConflict: false };
    }
  
    /**
     * Calculates availability for booking
     */
    static async getAvailability(req: GetAvailabilityRequest): Promise<AvailabilitySlot[]> {
      const userEvents = calendarEventsStore.filter((e) => e.ownerId === req.ownerId);
  
      const existingBookings = userEvents.map((e) => ({
        startTime: new Date(e.startTime),
        endTime: new Date(e.endTime)
      }));
  
      return AvailabilityEngine.generateDaySlots(req, existingBookings);
    }
  
    /**
     * Generates .ics file content for export
     */
    static async exportToIcs(ownerId: string): Promise<string> {
      const userEvents = calendarEventsStore.filter((e) => e.ownerId === ownerId);
      return IcsParser.generateIcsString(userEvents);
    }
  }