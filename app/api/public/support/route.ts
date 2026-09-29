import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_SOURCES = new Set(['ANONYMOUS', 'PUBLIC_SITE']);
const ALLOWED_CHANNELS = new Set(['FORM', 'WEB']);
const ALLOWED_PRIORITIES = new Set(['LOW', 'MEDIUM', 'HIGH']);

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || 'Ziyaretçi').slice(0, 80);
  const email = String(body.email || '').slice(0, 120);
  const phone = String(body.phone || '').slice(0, 40);
  const subject = String(body.subject || 'Site üzerinden destek').slice(0, 140);
  const message = String(body.message || body.body || '').slice(0, 2000);

  if (!message.trim()) {
    return NextResponse.json(
      { success: false, error: 'Mesaj gerekli.' },
      { status: 400 },
    );
  }

  const requestedSource = String(body.source || 'ANONYMOUS').toUpperCase();
  const requestedChannel = String(body.channel || 'FORM').toUpperCase();
  const requestedPriority = String(body.priority || 'MEDIUM').toUpperCase();

  const source = ALLOWED_SOURCES.has(requestedSource)
    ? requestedSource
    : 'ANONYMOUS';
  const channel = ALLOWED_CHANNELS.has(requestedChannel)
    ? requestedChannel
    : 'FORM';
  const priority = ALLOWED_PRIORITIES.has(requestedPriority)
    ? requestedPriority
    : 'MEDIUM';

  try {
    const row = await prisma.supportCase.create({
      data: {
        source,
        channel,
        name,
        email: email || null,
        phone: phone || null,
        subject,
        body: message,
        priority,
      },
    });

    await prisma.opsPulseEvent
      .create({
        data: {
          desk: 'CRM',
          category: 'TICKET',
          title: subject,
          actor: name,
        },
      })
      .catch(() => null);

    return NextResponse.json({ success: true, id: row.id });
  } catch (error: unknown) {
    console.warn('Public support create failed:', error);
    return NextResponse.json(
      { success: false, error: 'Kayıt alınamadı.' },
      { status: 500 },
    );
  }
}
