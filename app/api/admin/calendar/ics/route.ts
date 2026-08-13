import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, unauthorized } from '@/lib/admin/require-admin';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return unauthorized();
  const id = request.nextUrl.searchParams.get('id');
  const event = await (prisma as any).opsCalendarEvent.findUnique({ where: { id } }).catch(() => null);
  if (!event) return NextResponse.json({ success: false }, { status: 404 });
  const dt = (value: Date) => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WedyPlan//TR',
    'BEGIN:VEVENT',
    `UID:${event.id}@wedyplan.com`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(event.startsAt)}`,
    `DTEND:${dt(event.endsAt)}`,
    `SUMMARY:${String(event.title).replace(/\n/g, ' ')}`,
    `DESCRIPTION:${String(event.details || event.meetUrl || '').replace(/\n/g, ' ')}`,
    `LOCATION:${String(event.location || event.meetUrl || '')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="wedyplan-${event.id}.ics"`,
    },
  });
}
