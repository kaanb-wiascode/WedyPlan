import { prisma } from '@/lib/db';
import {
  CreateCalendarEventDTO,
  ConflictCheckRequest,
  ConflictCheckResult,
  GetAvailabilityRequest,
  AvailabilitySlot,
} from '@/types/enterprise-calendar';
import { ConflictEngine } from './conflict-engine';
import { AvailabilityEngine } from './availability-engine';
import { IcsParser } from '../infrastructure/ics-parser';

export class UniversalCalendarService {
  static async createEvent(
    dto: CreateCalendarEventDTO,
  ): Promise<{ success: boolean; eventId?: string; error?: string }> {
    const conflictCheck = await this.checkConflict({
      ownerId: dto.ownerId,
      startTime: dto.startTime,
      endTime: dto.endTime,
      travelBufferBeforeMin: dto.travelBufferBeforeMin,
      travelBufferAfterMin: dto.travelBufferAfterMin,
    });

    if (conflictCheck.hasConflict) {
      return {
        success: false,
        error: `Mevcut etkinlikle zaman çakışması var: "${conflictCheck.conflictingEventTitle}"`,
      };
    }

    const event = await prisma.calendarEvent.create({
      data: {
        ownerId: dto.ownerId,
        ownerType: dto.ownerType,
        category: dto.category,
        status: 'CONFIRMED',
        title: dto.title,
        description: dto.description,
        location: dto.location,
        timezone: dto.timezone || 'Europe/Istanbul',
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        isAllDay: dto.isAllDay || false,
        travelBufferBeforeMin: dto.travelBufferBeforeMin || 0,
        travelBufferAfterMin: dto.travelBufferAfterMin || 0,
        recurrenceFreq: dto.recurrenceFreq || 'NONE',
        relatedEntityId: dto.relatedEntityId,
        guests: dto.guests?.length
          ? {
              create: dto.guests.map((guest) => ({
                email: guest.email,
                fullName: guest.fullName,
              })),
            }
          : undefined,
      },
      select: { id: true },
    });

    return { success: true, eventId: event.id };
  }

  static async checkConflict(
    req: ConflictCheckRequest,
  ): Promise<ConflictCheckResult> {
    const reqStart = new Date(req.startTime);
    const reqEnd = new Date(req.endTime);

    if (
      Number.isNaN(reqStart.getTime()) ||
      Number.isNaN(reqEnd.getTime()) ||
      reqEnd <= reqStart
    ) {
      throw new Error('Geçerli bir başlangıç ve bitiş zamanı gereklidir.');
    }

    const events = await prisma.calendarEvent.findMany({
      where: {
        ownerId: req.ownerId,
        status: { not: 'CANCELLED' },
        ...(req.excludeEventId ? { id: { not: req.excludeEventId } } : {}),
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        travelBufferBeforeMin: true,
        travelBufferAfterMin: true,
      },
      orderBy: { startTime: 'asc' },
    });

    for (const evt of events) {
      const hasOverlap = ConflictEngine.hasTimeOverlap(
        reqStart,
        reqEnd,
        req.travelBufferBeforeMin || 0,
        req.travelBufferAfterMin || 0,
        evt.startTime,
        evt.endTime,
        evt.travelBufferBeforeMin,
        evt.travelBufferAfterMin,
      );

      if (hasOverlap) {
        return {
          hasConflict: true,
          conflictingEventId: evt.id,
          conflictingEventTitle: evt.title,
          reason: 'Etkinlik veya seyahat tampon süresi mevcut kayıtla çakışıyor.',
        };
      }
    }

    return { hasConflict: false };
  }

  static async getAvailability(
    req: GetAvailabilityRequest,
  ): Promise<AvailabilitySlot[]> {
    const dayStart = new Date(`${req.dateStr}T00:00:00.000Z`);
    const dayEnd = new Date(`${req.dateStr}T23:59:59.999Z`);

    if (Number.isNaN(dayStart.getTime()) || Number.isNaN(dayEnd.getTime())) {
      throw new Error('Geçerli bir tarih gereklidir.');
    }

    const events = await prisma.calendarEvent.findMany({
      where: {
        ownerId: req.ownerId,
        status: { not: 'CANCELLED' },
        startTime: { lte: dayEnd },
        endTime: { gte: dayStart },
      },
      select: {
        startTime: true,
        endTime: true,
      },
      orderBy: { startTime: 'asc' },
    });

    const existingBookings = events.map((event) => ({
      startTime: event.startTime,
      endTime: event.endTime,
    }));

    return AvailabilityEngine.generateDaySlots(req, existingBookings);
  }

  static async exportToIcs(ownerId: string): Promise<string> {
    const events = await prisma.calendarEvent.findMany({
      where: {
        ownerId,
        status: { not: 'CANCELLED' },
      },
      orderBy: { startTime: 'asc' },
    });

    return IcsParser.generateIcsString(
      events.map((event) => ({
        id: event.id,
        ownerId: event.ownerId,
        ownerType: event.ownerType,
        category: event.category,
        status: event.status,
        title: event.title,
        description: event.description || undefined,
        location: event.location || undefined,
        timezone: event.timezone,
        startTime: event.startTime.toISOString(),
        endTime: event.endTime.toISOString(),
        isAllDay: event.isAllDay,
        travelBufferBeforeMin: event.travelBufferBeforeMin,
        travelBufferAfterMin: event.travelBufferAfterMin,
        recurrenceFreq: event.recurrenceFreq,
        relatedEntityId: event.relatedEntityId || undefined,
      })),
    );
  }
}
