import { createHmac } from 'node:crypto';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CommissionEngine } from '../lib/payment/application/commission-engine';
import { EnterprisePaymentService } from '../lib/payment/application/enterprise-payment.service';
import { WebhookProcessor } from '../lib/payment/infrastructure/webhook-processor';

const runPaymentIntegrationTests =
  process.env.RUN_PAYMENT_INTEGRATION_TESTS === '1' &&
  Boolean(
    process.env.DATABASE_URL &&
      process.env.IYZICO_API_KEY &&
      process.env.IYZICO_SECRET_KEY &&
      process.env.IYZICO_BASE_URL &&
      process.env.IYZICO_CALLBACK_URL,
  );

describe('Enterprise Payment Platform', () => {
  it('calculates category-based commission and net vendor payout', () => {
    const breakdown = CommissionEngine.calculateBreakdown(100000, 'VENUE');

    assert.strictEqual(breakdown.grossAmount, 100000);
    assert.strictEqual(breakdown.commissionRatePercent, 8.0);
    assert.strictEqual(breakdown.platformCommissionAmount, 8000);
    assert.strictEqual(breakdown.vendorNetAmount, 92000);
  });

  it(
    'persists idempotency without duplicating provider initialization',
    { skip: !runPaymentIntegrationTests },
    async () => {
      const ik = `ik_test_${Date.now()}`;

      const input = {
        userId: 'usr_couple_test',
        type: 'MARKETPLACE_BOOKING' as const,
        provider: 'IYZICO' as const,
        amount: 1,
        currency: 'TRY' as const,
        idempotencyKey: ik,
        buyer: {
          id: 'usr_1',
          fullName: 'Test User',
          email: 'test@wedyplan.com',
          identityNumber: '11111111111',
          ipAddress: '127.0.0.1',
          billingAddress: 'İstanbul, Türkiye',
        },
        items: [{ id: 'i1', name: 'Test Hizmeti', price: 1 }],
      };

      const res1 = await EnterprisePaymentService.initializePayment(input);
      const res2 = await EnterprisePaymentService.initializePayment(input);

      assert.strictEqual(res1.transactionId, res2.transactionId);
    },
  );

  it(
    'verifies Iyzico V3 signatures and ignores duplicate webhook deliveries',
    { skip: !runPaymentIntegrationTests },
    async () => {
      const eventId = `evt_test_${Date.now()}`;
      const payload = {
        iyziReferenceCode: eventId,
        iyziEventType: 'CHECKOUT_FORM_AUTH',
        iyziPaymentId: '123456',
        token: `token_${Date.now()}`,
        paymentConversationId: `conversation_${Date.now()}`,
        status: 'SUCCESS',
      };

      const secretKey = process.env.IYZICO_SECRET_KEY as string;
      const signedMessage =
        secretKey +
        payload.iyziEventType +
        payload.iyziPaymentId +
        payload.token +
        payload.paymentConversationId +
        payload.status;

      const signature = createHmac('sha256', secretKey)
        .update(signedMessage, 'utf8')
        .digest('hex');

      const first = await WebhookProcessor.processWebhook(
        'IYZICO',
        eventId,
        payload,
        signature,
      );
      assert.strictEqual(first.processed, true);

      const second = await WebhookProcessor.processWebhook(
        'IYZICO',
        eventId,
        payload,
        signature,
      );
      assert.strictEqual(second.processed, false);
      assert.ok(second.reason?.includes('Duplicate webhook'));
    },
  );
});
