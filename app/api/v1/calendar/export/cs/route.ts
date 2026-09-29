import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { UniversalCalendarService } from '@/lib/calendar/application/universal-calendar.service';

export async function GET(_req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  }

  const icsContent = await UniversalCalendarService.exportToIcs(session.userId);

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="wedyplan-calendar.ics"',
    },
  });
}
