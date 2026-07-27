import { NextRequest, NextResponse } from 'next/server';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await UniversalCalendarService.checkConflict({
      ownerId: body.ownerId,
      startTime: body.startTime,
      endTime: body.endTime,
      travelBufferBeforeMin: body.travelBufferBeforeMin,
      travelBufferAfterMin: body.travelBufferAfterMin
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Conflict check failed' }, { status: 400 });
  }
}