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

    if (typeof body.transactionId !== 'string' || !body.transactionId.trim()) {
      return NextResponse.json({ error: 'Ödeme işlem kimliği gereklidir.' }, { status: 400 });
    }

    const refundAmount =
      body.refundAmount === undefined ? undefined : Number(body.refundAmount);

    if (
      refundAmount !== undefined &&
      (!Number.isFinite(refundAmount) || refundAmount <= 0)
    ) {
      return NextResponse.json({ error: 'Geçerli bir iade tutarı girilmelidir.' }, { status: 400 });
    }

    const success = await EnterprisePaymentService.processRefund({
      transactionId: body.transactionId.trim(),
      refundAmount,
      reason:
        typeof body.reason === 'string' && body.reason.trim()
          ? body.reason.trim()
          : 'Müşteri iade talebi',
      requestedByUserId: session.userId,
    });

    return NextResponse.json({ success, transactionId: body.transactionId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'İade işlemi başlatılamadı.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
