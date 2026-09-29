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
    const ownerType =
      session.role === 'VENDOR' ? 'VENDOR' : session.role === 'ADMIN' ? 'ADMIN' : 'COUPLE';

    const result = await UniversalCalendarService.createEvent({
      ownerId: session.userId,
      ownerType,
      category: body.category || 'MEETING',
      title: body.title,
      description: body.description,
      startTime: body.startTime,
      endTime: body.endTime,
      travelBufferBeforeMin: body.travelBufferBeforeMin || 0,
      travelBufferAfterMin: body.travelBufferAfterMin || 0,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Takvim etkinliği oluşturulamadı.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
