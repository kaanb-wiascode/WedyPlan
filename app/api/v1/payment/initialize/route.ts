import { NextRequest, NextResponse } from 'next/server';
import { EnterprisePaymentService } from '@/lib/payment/application/enterprise-payment.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await EnterprisePaymentService.initializePayment({
      userId: body.userId || 'usr_couple_1',
      type: body.type || 'MARKETPLACE_BOOKING',
      provider: body.provider || 'IYZICO',
      amount: body.amount,
      currency: body.currency || 'TRY',
      vendorCategoryCode: body.vendorCategoryCode,
      idempotencyKey: body.idempotencyKey || `ik_${Date.now()}_${Math.random()}`,
      buyer: body.buyer || {
        id: 'usr_couple_1',
        fullName: 'Selin Arslan',
        email: 'selin@wedyplan.com',
        ipAddress: '127.0.0.1',
        billingAddress: 'İstanbul, Türkiye'
      },
      items: body.items || [{ id: 'item_1', name: 'Düğün Salonu Kapora', price: body.amount }]
    });

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Payment initialization failed' }, { status: 400 });
  }
}