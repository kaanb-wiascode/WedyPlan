import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { EnterprisePaymentService } from '@/lib/payment/application/enterprise-payment.service';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
    }

    const body = await req.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Geçerli bir ödeme tutarı girilmelidir.' }, { status: 400 });
    }

    const buyer = body.buyer ?? {};
    const fullName =
      typeof buyer.fullName === 'string' && buyer.fullName.trim()
        ? buyer.fullName.trim()
        : session.email;

    const billingAddress =
      typeof buyer.billingAddress === 'string' && buyer.billingAddress.trim()
        ? buyer.billingAddress.trim()
        : 'Türkiye';

    const forwardedFor = req.headers.get('x-forwarded-for');
    const ipAddress =
      (forwardedFor ? forwardedFor.split(',')[0]?.trim() : null) ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const idempotencyKey =
      req.headers.get('idempotency-key') ||
      (typeof body.idempotencyKey === 'string' && body.idempotencyKey.trim()
        ? body.idempotencyKey.trim()
        : randomUUID());

    const response = await EnterprisePaymentService.initializePayment({
      userId: session.userId,
      type: body.type || 'MARKETPLACE_BOOKING',
      provider: body.provider || 'IYZICO',
      amount,
      currency: body.currency || 'TRY',
      vendorCategoryCode: body.vendorCategoryCode,
      couponCode: body.couponCode,
      idempotencyKey,
      buyer: {
        id: session.userId,
        fullName,
        email: session.email,
        identityNumber: buyer.identityNumber,
        ipAddress,
        billingAddress,
      },
      items:
        Array.isArray(body.items) && body.items.length > 0
          ? body.items
          : [{ id: 'marketplace_booking', name: 'WedyPlan Ödemesi', price: amount }],
    });

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Ödeme başlatılamadı.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
