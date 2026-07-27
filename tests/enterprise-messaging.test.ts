import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SpamModerationEngine } from '../lib/messaging/infrastructure/spam-moderation.engine';
import { EnterpriseMessagingService } from '../lib/messaging/application/enterprise-messaging.service';

describe('Phase 03: Enterprise Messaging Platform Test Suite', () => {
  it('should detect off-platform communication and IBAN spam patterns', () => {
    const textWithIban = 'Ödemeyi TR12 0006 1000 0000 0000 0000 01 numaralı IBAN hesabına atabilirsiniz.';
    const spamEval = SpamModerationEngine.evaluateSpam(textWithIban);

    assert.strictEqual(spamEval.isFlagged, true);
    assert.ok(spamEval.reason?.includes('off-platform contact/payment'));
  });

  it('should create conversation and dispatch message with delivery updates', async () => {
    const conv = await EnterpriseMessagingService.createConversation({
      type: 'COUPLE_VENDOR',
      participantUserIds: ['usr_couple_99', 'usr_vendor_99'],
      title: 'Düğün Salonu Fiyat Görüşmesi'
    });

    assert.ok(conv.id.startsWith('conv_'));

    const msg = await EnterpriseMessagingService.sendMessage({
      conversationId: conv.id,
      senderUserId: 'usr_couple_99',
      bodyText: 'Merhaba, 15 Ağustos için teklif alabilir miyim?'
    });

    assert.strictEqual(msg.deliveryStatus, 'SENT');
    assert.strictEqual(msg.isSpamFlagged, false);

    const updated = await EnterpriseMessagingService.updateMessageStatus(msg.id, 'READ');
    assert.strictEqual(updated, true);
  });
});