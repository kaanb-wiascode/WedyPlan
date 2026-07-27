import { describe, it } from 'node:test';
import assert from 'node:assert';
import { UniversalNotificationEngine } from '../lib/notifications/application/universal-notification.engine';
import { TemplateI18nEngine } from '../lib/notifications/infrastructure/template-i18n.engine';
import { QuietHoursEngine } from '../lib/notifications/infrastructure/quiet-hours.engine';

describe('Phase 03: Universal Notification Engine Test Suite', () => {
  it('should compile i18n notification templates correctly', () => {
    const compiled = TemplateI18nEngine.compile('OFFER_RECEIVED', 'tr', {
      fullName: 'Kaan Yılmaz',
      amount: 200000,
      vendorName: 'Botanical Park'
    });

    assert.ok(compiled.subject.includes('Yeni Teklif Belgesi'));
    assert.ok(compiled.body.includes('Kaan Yılmaz'));
    assert.ok(compiled.body.includes('200000'));
  });

  it('should bypass quiet hours for urgent security notifications', () => {
    const isQuiet = QuietHoursEngine.isQuietHoursActive('SECURITY', 'URGENT', '22:00', '08:00');
    assert.strictEqual(isQuiet, false);
  });

  it('should dispatch in-app notification and update status to READ', async () => {
    const results = await UniversalNotificationEngine.dispatch({
      userId: 'usr_test_99',
      templateCode: 'OFFER_RECEIVED',
      category: 'OFFERS',
      channels: ['IN_APP'],
      priority: 'HIGH',
      variables: { fullName: 'Test User', amount: 50000, vendorName: 'Vendor X' },
      recipients: {}
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].success, true);

    const userNotifs = await UniversalNotificationEngine.getUserInAppNotifications('usr_test_99');
    assert.ok(userNotifs.length > 0);

    const updated = await UniversalNotificationEngine.updateStatus(userNotifs[0].id, 'READ');
    assert.strictEqual(updated, true);
  });
});