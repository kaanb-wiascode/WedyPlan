import { NextRequest, NextResponse } from 'next/server';
import { WebhookProcessor } from '@/lib/payment/infrastructure/webhook-processor';
import { PaymentProvider } from '@/types/enterprise-payment';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const eventId = req.headers.get('x-webhook-event-id') || `evt_${Date.now()}`;
    const signature = req.headers.get('x-signature') || undefined;

    const providerUpper = resolvedParams.provider.toUpperCase() as PaymentProvider;

    const result = await WebhookProcessor.processWebhook(
      providerUpper,
      eventId,
      body,
      signature
    );

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 400 });
  }
}