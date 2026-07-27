import { NextRequest, NextResponse } from 'next/server';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await UniversalCalendarService.createEvent({
      ownerId: body.ownerId || 'usr_couple_1',
      ownerType: body.ownerType || 'COUPLE',
      category: body.category || 'WEDDING_DAY',
      title: body.title,
      description: body.description,
      startTime: body.startTime,
      endTime: body.endTime,
      travelBufferBeforeMin: body.travelBufferBeforeMin || 0,
      travelBufferAfterMin: body.travelBufferAfterMin || 0
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Event creation failed' }, { status: 400 });
  }
}