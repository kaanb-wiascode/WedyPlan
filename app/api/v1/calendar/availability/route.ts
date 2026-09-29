import { NextRequest, NextResponse } from 'next/server';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get('ownerId')?.trim();
  const dateStr =
    req.nextUrl.searchParams.get('dateStr') ||
    new Date().toISOString().split('T')[0];

  if (!ownerId) {
    return NextResponse.json(
      { error: 'Müsaitlik sorgusu için ownerId gereklidir.' },
      { status: 400 },
    );
  }

  try {
    const slots = await UniversalCalendarService.getAvailability({
      ownerId,
      dateStr,
    });

    return NextResponse.json({ ownerId, dateStr, slots });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Müsaitlik sorgulanamadı.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
