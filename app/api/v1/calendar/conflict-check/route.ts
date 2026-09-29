import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const body = await req.json();

    const result = await UniversalCalendarService.checkConflict({
      ownerId: session.userId,
      startTime: body.startTime,
      endTime: body.endTime,
      travelBufferBeforeMin: body.travelBufferBeforeMin,
      travelBufferAfterMin: body.travelBufferAfterMin,
      excludeEventId: body.excludeEventId,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Takvim çakışması kontrol edilemedi.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
