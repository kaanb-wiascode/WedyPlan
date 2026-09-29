import { createHmac, timingSafeEqual } from 'node:crypto';
import { prisma } from '@/lib/db';
import { PaymentProvider } from '@/types/enterprise-payment';

type WebhookPayload = Record<string, unknown>;

function stringField(payload: WebhookPayload, field: string): string {
  const value = payload[field];
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function secureHexEqual(expected: string, actual: string): boolean {
  if (!/^[a-f0-9]+$/i.test(actual) || expected.length !== actual.length) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(actual, 'hex');

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

function verifyIyzicoSignature(payload: WebhookPayload, signature: string): boolean {
  const secretKey = process.env.IYZICO_SECRET_KEY?.trim();
  if (!secretKey) {
    throw new Error('IYZICO_SECRET_KEY webhook doğrulaması için zorunludur.');
  }

  const eventType = stringField(payload, 'iyziEventType');
  const paymentConversationId = stringField(payload, 'paymentConversationId');
  const status = stringField(payload, 'status');

  let signedMessage: string;

  const token = stringField(payload, 'token');
  const iyziPaymentId = stringField(payload, 'iyziPaymentId');

  if (token && iyziPaymentId) {
    signedMessage =
      secretKey +
      eventType +
      iyziPaymentId +
      token +
      paymentConversationId +
      status;
  } else {
    const paymentId = stringField(payload, 'paymentId');
    if (!paymentId) return false;

    signedMessage =
      secretKey +
      eventType +
      paymentId +
      paymentConversationId +
      status;
  }

  if (!eventType || !paymentConversationId || !status) return false;

  const expected = createHmac('sha256', secretKey)
    .update(signedMessage, 'utf8')
    .digest('hex');

  return secureHexEqual(expected, signature.trim());
}

function normalizedPaymentStatus(status: string) {
  if (status === 'SUCCESS') return 'SUCCESS' as const;
  if (status === 'FAILURE') return 'FAILED' as const;
  return null;
}

export class WebhookProcessor {
  static async processWebhook(
    provider: PaymentProvider,
    eventId: string,
    payload: WebhookPayload,
    signatureHeader?: string,
  ): Promise<{ processed: boolean; reason?: string }> {
    if (provider !== 'IYZICO') {
      throw new Error(`${provider} webhook doğrulaması henüz aktif değil.`);
    }

    if (!signatureHeader) {
      throw new Error('Webhook imzası bulunamadı.');
    }

    if (!verifyIyzicoSignature(payload, signatureHeader)) {
      throw new Error('Geçersiz Iyzico webhook imzası.');
    }

    const uniqueEventId = `${provider}:${eventId}`;
    const existing = await prisma.webhookLog.findUnique({
      where: { eventId: uniqueEventId },
    });

    if (existing) {
      return { processed: false, reason: 'Duplicate webhook event ignored (Idempotent)' };
    }

    const log = await prisma.webhookLog.create({
      data: {
        provider,
        eventId: uniqueEventId,
        eventType: stringField(payload, 'iyziEventType') || 'UNKNOWN',
        payloadJson: payload,
        isProcessed: false,
      },
    });

    try {
      const status = normalizedPaymentStatus(stringField(payload, 'status'));
      const token = stringField(payload, 'token');

      if (status && token) {
        await prisma.paymentTransaction.updateMany({
          where: {
            provider,
            providerTransactionId: token,
          },
          data: {
            status,
            failureReason:
              status === 'FAILED' ? 'Iyzico ödeme bildirimi başarısız.' : null,
          },
        });
      }

      await prisma.webhookLog.update({
        where: { id: log.id },
        data: {
          isProcessed: true,
          processedAt: new Date(),
        },
      });

      return { processed: true };
    } catch (error) {
      // Keep isProcessed=false so operators can inspect/replay safely after remediation.
      throw error;
    }
  }
}
