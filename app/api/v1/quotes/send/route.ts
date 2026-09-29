// app/api/v1/quotes/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { sendSSEEvent } from '@/lib/sse/server';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session || session.role !== 'VENDOR') {
      return NextResponse.json(
        { success: false, error: 'Sadece satıcılar teklif gönderebilir.' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const coupleId = String(body.coupleId || '').trim();
    const vendorId = String(body.vendorId || '').trim();
    const notes =
      typeof body.notes === 'string' && body.notes.trim()
        ? body.notes.trim().slice(0, 2000)
        : null;
    const price = Number(body.price);

    if (!coupleId || !vendorId || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Geçerli çift, satıcı ve fiyat bilgisi gereklidir.' },
        { status: 400 },
      );
    }

    const [vendor, couple] = await Promise.all([
      prisma.vendor.findUnique({
        where: { id: vendorId },
        select: { userId: true, businessName: true },
      }),
      prisma.couple.findUnique({
        where: { id: coupleId },
        select: { id: true, userId: true },
      }),
    ]);

    if (!vendor || vendor.userId !== session.userId) {
      return NextResponse.json(
        { success: false, error: 'Bu satıcıyı yönetme yetkiniz yok.' },
        { status: 403 },
      );
    }

    if (!couple) {
      return NextResponse.json(
        { success: false, error: 'Hedef çift bulunamadı.' },
        { status: 404 },
      );
    }

    const quote = await prisma.vendorQuote.upsert({
      where: {
        coupleId_vendorId: {
          coupleId,
          vendorId,
        },
      },
      update: {
        status: 'QUOTED',
        quotedPrice: price,
        notes,
      },
      create: {
        coupleId,
        vendorId,
        status: 'QUOTED',
        quotedPrice: price,
        notes,
      },
    });

    sendSSEEvent(couple.userId, 'vendor:quote:received', {
      quoteId: quote.id,
      vendorName: vendor.businessName,
      price: quote.quotedPrice,
      notes: quote.notes,
      timestamp: new Date().toISOString(),
    });

    await prisma.auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: 'CONTRACT',
        action: 'QUOTE_SENT',
        actorUserId: session.userId,
        actorRole: session.role,
        targetEntity: 'VendorQuote',
        targetEntityId: quote.id,
        severity: 'INFO',
        metadata: { coupleId, vendorId, price },
      },
    });

    return NextResponse.json({
      success: true,
      data: quote,
    });
  } catch (error: unknown) {
    console.error('Send quote error:', error);
    return NextResponse.json(
      { success: false, error: 'Teklif gönderilemedi.' },
      { status: 500 },
    );
  }
}
