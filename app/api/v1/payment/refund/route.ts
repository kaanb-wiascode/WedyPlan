import { NextRequest, NextResponse } from 'next/server';
import { EnterprisePaymentService } from '@/lib/payment/application/enterprise-payment.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const success = await EnterprisePaymentService.processRefund({
      transactionId: body.transactionId,
      refundAmount: body.refundAmount,
      reason: body.reason || 'Müşteri Talebi İptal',
      requestedByUserId: body.userId || 'usr_admin_1'
    });

    return NextResponse.json({ success, transactionId: body.transactionId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Refund processing failed' }, { status: 400 });
  }
}