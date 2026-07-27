import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StructuredLogger } from '../lib/audit/infrastructure/structured-logger';
import { DiffEngine } from '../lib/audit/infrastructure/diff-engine';
import { EnterpriseAuditService } from '../lib/audit/application/audit-activity.service';

describe('Phase 03: Enterprise Audit, Activity & Monitoring Platform Test Suite', () => {
  it('should sanitize sensitive password and credit card payload fields', () => {
    const rawPayload = {
      username: 'selin_arslan',
      password: 'SuperSecretPassword123!',
      creditCard: '4543-0000-0000-1111',
      details: { cvv: '999' }
    };

    const sanitized = StructuredLogger.sanitizePayload(rawPayload);

    assert.strictEqual(sanitized.username, 'selin_arslan');
    assert.strictEqual(sanitized.password, '[REDACTED]');
    assert.strictEqual(sanitized.creditCard, '[REDACTED]');
    assert.strictEqual(sanitized.details.cvv, '[REDACTED]');
  });

  it('should accurately compute before and after state JSON diff', () => {
    const beforeState = { price: 100000, status: 'DRAFT', venue: 'Kır Bahçesi' };
    const afterState = { price: 120000, status: 'APPROVED', venue: 'Kır Bahçesi', isSigned: true };

    const diff = DiffEngine.computeDiff(beforeState, afterState);

    assert.strictEqual(diff.hasChanges, true);
    assert.ok(diff.addedKeys.includes('isSigned'));
    assert.strictEqual(diff.changedKeys.price.before, 100000);
    assert.strictEqual(diff.changedKeys.price.after, 120000);
  });

  it('should record audit log and user activity timeline item', async () => {
    const audit = await EnterpriseAuditService.recordAudit({
      category: 'CONTRACT',
      action: 'CONTRACT_APPROVED',
      actorUserId: 'usr_vendor_101',
      beforeState: { isApproved: false },
      afterState: { isApproved: true }
    });

    assert.ok(audit.id.startsWith('audit_'));
    assert.strictEqual(audit.diff?.hasChanges, true);

    const activity = await EnterpriseAuditService.recordActivity({
      userId: 'usr_vendor_101',
      portalContext: 'VENDOR',
      action: 'APPROVED_CONTRACT',
      summary: 'Düğün Salonu Hizmet Sözleşmesini Onayladı'
    });

    assert.ok(activity.id.startsWith('act_'));

    const timeline = await EnterpriseAuditService.getUserActivityTimeline('usr_vendor_101');
    assert.strictEqual(timeline.length, 1);
  });
});