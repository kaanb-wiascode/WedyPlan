import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || 'Ziyaretçi').slice(0, 80);
  const email = String(body.email || '').slice(0, 120);
  const phone = String(body.phone || '').slice(0, 40);
  const subject = String(body.subject || 'Site üzerinden destek').slice(0, 140);
  const message = String(body.message || body.body || '').slice(0, 2000);
  if (!message) return NextResponse.json({ success: false, error: 'Mesaj gerekli.' }, { status: 400 });

  const row = await (prisma as any).supportCase.create({
    data: {
      source: body.source || 'ANONYMOUS',
      channel: body.channel || 'FORM',
      name,
      email: email || null,
      phone: phone || null,
      subject,
      body: message,
      priority: body.priority || 'MEDIUM',
    },
  }).catch((error: unknown) => {
    console.warn(error);
    return null;
  });

  if (!row) return NextResponse.json({ success: false, error: 'Kayıt alınamadı.' }, { status: 500 });
  await (prisma as any).opsPulseEvent.create({
    data: { desk: 'CRM', category: 'TICKET', title: subject, actor: name },
  }).catch(() => null);

  return NextResponse.json({ success: true, id: row.id });
}
