import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CommissionEngine } from '../lib/payment/application/commission-engine';
import { EnterprisePaymentService } from '../lib/payment/application/enterprise-payment.service';
import { WebhookProcessor } from '../lib/payment/infrastructure/webhook-processor';

describe('Phase 03: Enterprise Payment Platform Test Suite', () => {
  it('should accurately calculate category-based commission and net vendor payout', () => {
    // Venue category commission is 8%
    const breakdown = CommissionEngine.calculateBreakdown(100000, 'VENUE');

    assert.strictEqual(breakdown.grossAmount, 100000);
    assert.strictEqual(breakdown.commissionRatePercent, 8.0);
    assert.strictEqual(breakdown.platformCommissionAmount, 8000);
    assert.strictEqual(breakdown.vendorNetAmount, 92000);
  });

  it('should initialize payment idempotently without duplicating transactions', async () => {
    const ik = `ik_test_${Date.now()}`;

    const res1 = await EnterprisePaymentService.initializePayment({
      userId: 'usr_couple_test',
      type: 'MARKETPLACE_BOOKING',
      provider: 'IYZICO',
      amount: 50000,
      currency: 'TRY',
      idempotencyKey: ik,
      buyer: { id: 'usr_1', fullName: 'Test', email: 'test@wedyplan.com', ipAddress: '127.0.0.1', billingAddress: 'TR' },
      items: [{ id: 'i1', name: 'Mekan', price: 50000 }]
    });

    const res2 = await EnterprisePaymentService.initializePayment({
      userId: 'usr_couple_test',
      type: 'MARKETPLACE_BOOKING',
      provider: 'IYZICO',
      amount: 50000,
      currency: 'TRY',
      idempotencyKey: ik,
      buyer: { id: 'usr_1', fullName: 'Test', email: 'test@wedyplan.com', ipAddress: '127.0.0.1', billingAddress: 'TR' },
      items: [{ id: 'i1', name: 'Mekan', price: 50000 }]
    });

    assert.strictEqual(res1.transactionId, res2.transactionId);
  });

  it('should ignore duplicate webhooks with same eventId', async () => {
    const eventId = `evt_test_${Date.now()}`;

    const firstProc = await WebhookProcessor.processWebhook('IYZICO', eventId, { status: 'SUCCESS' });
    assert.strictEqual(firstProc.processed, true);

    const secondProc = await WebhookProcessor.processWebhook('IYZICO', eventId, { status: 'SUCCESS' });
    assert.strictEqual(secondProc.processed, false);
    assert.ok(secondProc.reason?.includes('Duplicate webhook'));
  });
});