import { describe, it } from 'node:test';
import assert from 'node:assert';
import { UniversalCalendarService } from '../lib/calendar/application/universal-calendar.service';
import { ConflictEngine } from '../lib/calendar/application/conflict-engine';
import { IcsParser } from '../lib/calendar/infrastructure/ics-parser';

describe('Phase 03: Universal Calendar & Scheduling Engine Test Suite', () => {
  it('should detect time overlap taking travel buffers into account', () => {
    const reqStart = new Date('2026-08-15T12:00:00Z');
    const reqEnd = new Date('2026-08-15T13:00:00Z');
    
    const existStart = new Date('2026-08-15T13:30:00Z');
    const existEnd = new Date('2026-08-15T15:00:00Z');

    // Without buffer: 12:00-13:00 vs 13:30-15:00 -> No Overlap
    const noBufferOverlap = ConflictEngine.hasTimeOverlap(
      reqStart, reqEnd, 0, 0, existStart, existEnd, 0, 0
    );
    assert.strictEqual(noBufferOverlap, false);

    // With 45 min buffer after req -> 12:00 to 13:45 -> Overlaps with 13:30!
    const bufferOverlap = ConflictEngine.hasTimeOverlap(
      reqStart, reqEnd, 0, 45, existStart, existEnd, 0, 0
    );
    assert.strictEqual(bufferOverlap, true);
  });

  it('should generate valid RFC 5545 .ics text string', () => {
    const icsText = IcsParser.generateIcsString([
      {
        ownerId: 'usr_test',
        ownerType: 'COUPLE',
        category: 'WEDDING_DAY',
        title: 'Selin & Kaan Düğün Günü',
        startTime: '2026-08-15T18:00:00Z',
        endTime: '2026-08-15T23:00:00Z'
      }
    ]);

    assert.ok(icsText.includes('BEGIN:VCALENDAR'));
    assert.ok(icsText.includes('SUMMARY:Selin & Kaan Düğün Günü'));
    assert.ok(icsText.includes('END:VCALENDAR'));
  });

  it('should create event successfully and reject conflicting second event', async () => {
    const res1 = await UniversalCalendarService.createEvent({
      ownerId: 'usr_vendor_99',
      ownerType: 'VENDOR',
      category: 'MEETING',
      title: 'Mekan Gezisi',
      startTime: '2026-09-01T10:00:00Z',
      endTime: '2026-09-01T11:00:00Z'
    });

    assert.strictEqual(res1.success, true);

    const res2 = await UniversalCalendarService.createEvent({
      ownerId: 'usr_vendor_99',
      ownerType: 'VENDOR',
      category: 'MEETING',
      title: 'İkinci Randevu Çakışması',
      startTime: '2026-09-01T10:30:00Z',
      endTime: '2026-09-01T11:30:00Z'
    });

    assert.strictEqual(res2.success, false);
    assert.ok(res2.error?.includes('Conflict detected'));
  });
});