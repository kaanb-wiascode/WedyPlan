import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Argon2Hasher } from '../lib/identity/infrastructure/argon2-hasher';
import { JwtTokenProvider } from '../lib/identity/infrastructure/jwt-token-provider';
import { AuthorizationEngine } from '../lib/identity/shared/authorization-engine';

describe('Phase 03: Identity & Authentication Core Test Suite', () => {
  it('should correctly hash and verify passwords using Argon2id', async () => {
    const rawPassword = 'StrongWedyPassword2026!';
    const hash = await Argon2Hasher.hash(rawPassword);

    assert.ok(hash.includes('$argon2id$'));
    const isValid = await Argon2Hasher.verify(hash, rawPassword);
    assert.strictEqual(isValid, true);
  });

  it('should sign and verify JWT access token claims', async () => {
    const token = await JwtTokenProvider.signAccessToken({
      sub: 'user_test_1',
      email: 'test@wedyplan.com',
      fullName: 'Test User',
      activePortal: 'VENDOR',
      roles: ['VENDOR_MANAGER'],
      permissions: ['vendor:offers:create'],
      sessionId: 'sess_123',
    });

    const verified = await JwtTokenProvider.verifyAccessToken(token);
    assert.notStrictEqual(verified, null);
    assert.strictEqual(verified?.sub, 'user_test_1');
    assert.ok(verified?.roles.includes('VENDOR_MANAGER'));
  });

  it('should accurately enforce database-driven RBAC permissions', () => {
    const mockClaims: any = {
      sub: 'usr_1',
      roles: ['COUPLE'],
      permissions: ['wedding:budget:read', 'wedding:budget:write'],
    };

    assert.strictEqual(AuthorizationEngine.hasPermission(mockClaims, 'wedding:budget:write'), true);
    assert.strictEqual(AuthorizationEngine.hasPermission(mockClaims, 'admin:system:config'), false);
  });
});