import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

const db = prisma as any;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const coupleNames = String(body.coupleNames || '').trim();
  const phone = String(body.phone || '').trim();
  const vendorName = String(body.vendorName || '').trim();

  if (!coupleNames || !phone || !vendorName) {
    return NextResponse.json({ success: false, error: 'İsim, telefon ve firma adı zorunlu.' }, { status: 400 });
  }

  const session = await getSession().catch(() => null);

  const lead = await db.marketplaceLead.create({
    data: {
      vendorId: body.vendorId ? String(body.vendorId) : null,
      vendorName,
      categorySlug: String(body.categorySlug || 'diger'),
      city: String(body.city || ''),
      district: String(body.district || ''),
      coupleNames,
      phone,
      email: body.email ? String(body.email) : null,
      weddingDate: body.weddingDate ? String(body.weddingDate) : null,
      guestCount: Number(body.guestCount || 0) || 0,
      note: String(body.note || ''),
      status: 'PENDING',
      coupleUserId: session?.role === 'COUPLE' ? session.userId : null,
    },
  });

  await db.opsPulseEvent.create({
    data: {
      desk: 'SALES',
      category: 'LEAD',
      title: `Yeni teklif talebi: ${vendorName}`,
      actor: coupleNames,
    },
  }).catch(() => null);

  return NextResponse.json({ success: true, id: lead.id });
}
