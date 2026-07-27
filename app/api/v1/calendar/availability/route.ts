import { NextRequest, NextResponse } from 'next/server';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get('ownerId') || 'usr_vendor_1';
  const dateStr = req.nextUrl.searchParams.get('dateStr') || new Date().toISOString().split('T')[0];

  const slots = await UniversalCalendarService.getAvailability({
    ownerId,
    dateStr
  });

  return NextResponse.json({ ownerId, dateStr, slots });
}