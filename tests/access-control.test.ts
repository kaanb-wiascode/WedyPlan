import { describe, it } from 'node:test';
import assert from 'node:assert';
import { RoleHierarchyEngine } from '../lib/access-control/domain/role-hierarchy.engine';
import { AccessControlEngine } from '../lib/access-control/application/access-control.engine';
import { FeatureFlagEngine } from '../lib/access-control/application/feature-flag.engine';
import { FieldMasker } from '../lib/access-control/shared/field-masker';

describe('Phase 03: Enterprise Access Control Engine Test Suite', () => {
  it('should correctly resolve inherited roles through hierarchy tree', () => {
    const inherited = RoleHierarchyEngine.resolveInheritedRoles(['VENDOR_OWNER']);
    assert.ok(inherited.includes('VENDOR_OWNER'));
    assert.ok(inherited.includes('VENDOR_MANAGER'));
    assert.ok(inherited.includes('VENDOR_EMPLOYEE'));
    assert.ok(inherited.includes('REGISTERED_USER'));
  });

  it('should grant access for valid couple budget updates', async () => {
    const evaluation = await AccessControlEngine.evaluateAccess({
      userId: 'usr_couple_1',
      roles: ['COUPLE'],
      portalContext: 'COUPLE',
      resource: 'budget',
      action: 'UPDATE'
    });

    assert.strictEqual(evaluation.isAllowed, true);
    assert.strictEqual(evaluation.grantedBy, 'ROLE_HIERARCHY');
  });

  it('should deny unauthorized visitor access to admin settings', async () => {
    const evaluation = await AccessControlEngine.evaluateAccess({
      userId: 'usr_visitor_1',
      roles: ['VISITOR'],
      portalContext: 'ADMIN',
      resource: 'system_settings',
      action: 'UPDATE'
    });

    assert.strictEqual(evaluation.isAllowed, false);
    assert.strictEqual(evaluation.grantedBy, 'DENIED');
  });

  it('should evaluate feature flags based on subscription tier', () => {
    const isProAvailable = FeatureFlagEngine.isFeatureAvailable('ai_budget_optimizer', 'PROFESSIONAL');
    const isFreeAvailable = FeatureFlagEngine.isFeatureAvailable('ai_budget_optimizer', 'FREE');

    assert.strictEqual(isProAvailable, true);
    assert.strictEqual(isFreeAvailable, false);
  });

  it('should mask sensitive properties using FieldMasker', () => {
    const rawData = { name: 'Vendor A', costPrice: 50000, margin: 25 };
    const masked = FieldMasker.maskFields(rawData, ['costPrice', 'margin']);

    assert.strictEqual(masked.name, 'Vendor A');
    assert.strictEqual(masked.costPrice, '[REDACTED]');
    assert.strictEqual(masked.margin, '[REDACTED]');
  });
});