import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function cleanText(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength);
}

function cleanPhone(value: unknown) {
  return cleanText(value, 32).replace(/[^0-9+()\s-]/g, '');
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  const coupleNames = cleanText(body.coupleNames, 120);
  const phone = cleanPhone(body.phone);
  const email = cleanText(body.email, 160);
  const vendorId = cleanText(body.vendorId, 80) || null;
  const note = cleanText(body.note, 2000);
  const weddingDate = cleanText(body.weddingDate, 32) || null;
  const guestCountRaw = Number(body.guestCount || 0);
  const guestCount = Number.isFinite(guestCountRaw)
    ? Math.min(10000, Math.max(0, Math.floor(guestCountRaw)))
    : 0;

  if (!coupleNames || phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json(
      { success: false, error: 'Geçerli isim ve telefon bilgisi zorunludur.' },
      { status: 400 },
    );
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Geçerli bir e-posta adresi girin.' },
      { status: 400 },
    );
  }

  let vendorName = cleanText(body.vendorName, 160);
  let categorySlug = cleanText(body.categorySlug, 100) || 'diger';
  let city = cleanText(body.city, 100);
  let district = cleanText(body.district, 100);

  if (vendorId) {
    const showcase = await prisma.vendorShowcase.findFirst({
      where: {
        vendorId,
        published: true,
        moderationStatus: 'APPROVED',
      },
    });

    const vendor = showcase
      ? await prisma.vendor.findUnique({
          where: { id: vendorId },
          select: {
            businessName: true,
            status: true,
          },
        })
      : null;

    if (!showcase || !vendor || vendor.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: 'Firma şu anda teklif kabul etmiyor.' },
        { status: 404 },
      );
    }

    vendorName = vendor.businessName;
    categorySlug = showcase.categorySlug;
    city = showcase.city;
    district = showcase.district;
  } else if (!vendorName) {
    return NextResponse.json(
      { success: false, error: 'Teklif kategorisi gereklidir.' },
      { status: 400 },
    );
  }

  const session = await getSession().catch(() => null);

  try {
    const lead = await prisma.marketplaceLead.create({
      data: {
        vendorId,
        vendorName,
        categorySlug,
        city,
        district,
        coupleNames,
        phone,
        email: email || null,
        weddingDate,
        guestCount,
        note,
        status: 'PENDING',
        coupleUserId: session?.role === 'COUPLE' ? session.userId : null,
      },
    });

    await prisma.opsPulseEvent
      .create({
        data: {
          desk: 'SALES',
          category: 'LEAD',
          title: `Yeni teklif talebi: ${vendorName}`,
          actor: coupleNames,
        },
      })
      .catch(() => null);

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        vendorId: lead.vendorId,
        vendorName: lead.vendorName,
        categorySlug: lead.categorySlug,
        city: lead.city,
        district: lead.district,
        coupleNames: lead.coupleNames,
        phone: lead.phone,
        email: lead.email,
        weddingDate: lead.weddingDate,
        guestCount: lead.guestCount,
        note: lead.note,
        createdAt: lead.createdAt.toISOString(),
        status: lead.status,
      },
    });
  } catch (error: unknown) {
    console.error('Public lead create failed:', error);
    return NextResponse.json(
      { success: false, error: 'Teklif talebi kaydedilemedi.' },
      { status: 500 },
    );
  }
}
