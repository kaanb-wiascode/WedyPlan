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
        { status: 403 }
      );
    }

    const body = await request.json();
    const { coupleId, vendorId, price, notes } = body;

    // Validation
    if (!coupleId || !vendorId || !price) {
      return NextResponse.json(
        { success: false, error: 'Eksik bilgi.' },
        { status: 400 }
      );
    }

    // Vendor ownership check
    const vendor = await (prisma as any).vendor.findUnique({
      where: { id: vendorId },
      select: { userId: true, businessName: true },
    });

    if (vendor?.userId !== session.userId) {
      return NextResponse.json(
        { success: false, error: 'Bu satıcıyı yönetme yetkiniz yok.' },
        { status: 403 }
      );
    }

    // Create or update quote
    const quote = await (prisma as any).coupleVendorRelation.upsert({
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
        updatedAt: new Date(),
      },
      create: {
        coupleId,
        vendorId,
        status: 'QUOTED',
        quotedPrice: price,
        notes,
      },
    });

    // 🚀 Real-time notification via SSE
    sendSSEEvent(coupleId, 'vendor:quote:received', {
      quoteId: quote.id,
      vendorName: vendor.businessName,
      price: quote.quotedPrice,
      notes: quote.notes,
      timestamp: new Date(),
    });

    // Audit log
    await (prisma as any).auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: 'PAYMENT',
        action: 'QUOTE_SENT',
        actorUserId: session.userId,
        actorRole: session.role,
        targetEntity: 'Quote',
        targetEntityId: quote.id,
        severity: 'INFO',
        metadata: { coupleId, vendorId, price },
      },
    });

    return NextResponse.json({
      success: true,
      data: quote,
    });
  } catch (error) {
    console.error('Send quote error:', error);
    return NextResponse.json(
      { success: false, error: 'Teklif gönderilemedi.' },
      { status: 500 }
    );
  }
}
