import { NextRequest, NextResponse } from 'next/server';
import { WebhookProcessor } from '@/lib/payment/infrastructure/webhook-processor';
import { PaymentProvider } from '@/types/enterprise-payment';

const PAYMENT_PROVIDERS = new Set<PaymentProvider>([
  'IYZICO',
  'PAYTR',
  'STRIPE',
  'PAYPAL',
  'APPLE_PAY',
  'GOOGLE_PAY',
]);

function asPaymentProvider(value: string): PaymentProvider | null {
  const normalized = value.toUpperCase() as PaymentProvider;
  return PAYMENT_PROVIDERS.has(normalized) ? normalized : null;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  try {
    const resolvedParams = await params;
    const provider = asPaymentProvider(resolvedParams.provider);

    if (!provider) {
      return NextResponse.json({ error: 'Desteklenmeyen ödeme sağlayıcısı.' }, { status: 404 });
    }

    const body = (await req.json()) as Record<string, unknown>;
    const referenceCode = body.iyziReferenceCode;
    const eventId =
      typeof referenceCode === 'string' || typeof referenceCode === 'number'
        ? String(referenceCode)
        : '';

    if (!eventId) {
      return NextResponse.json({ error: 'Webhook event kimliği bulunamadı.' }, { status: 400 });
    }

    const signature = req.headers.get('x-iyz-signature-v3') || undefined;

    const result = await WebhookProcessor.processWebhook(
      provider,
      eventId,
      body,
      signature,
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook işlenemedi.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
