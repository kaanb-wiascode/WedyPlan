import { NextRequest, NextResponse } from 'next/server';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get('ownerId') || 'usr_couple_1';

  const icsContent = await UniversalCalendarService.exportToIcs(ownerId);

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="wedyplan_calendar_${ownerId}.ics"`
    }
  });
}