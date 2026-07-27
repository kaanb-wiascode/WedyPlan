import { JwtAccessTokenPayload, PortalType } from '@/types/auth-core';

export class PermissionEngine {
  /**
   * Evaluates if the authenticated user context has permission for a specific action
   */
  static hasPermission(
    userClaims: JwtAccessTokenPayload | null,
    requiredPermission: string
  ): boolean {
    if (!userClaims) return false;

    // Super Admin Bypass
    if (userClaims.roles.includes('ADMIN_SUPER')) {
      return true;
    }

    return userClaims.permissions.includes(requiredPermission);
  }

  /**
   * Evaluates if the user has access to a specific portal
   */
  static canAccessPortal(
    userClaims: JwtAccessTokenPayload | null,
    targetPortal: PortalType
  ): boolean {
    if (!userClaims) return false;
    
    // Public portal is universally accessible
    if (targetPortal === 'PUBLIC') return true;

    return userClaims.activePortal === targetPortal;
  }

  /**
   * Flattens and dedupes permissions from multiple roles
   */
  static compilePermissions(rolesWithPermissions: { permissions: { code: string }[] }[]): string[] {
    const permissionSet = new Set<string>();

    rolesWithPermissions.forEach((role) => {
      role.permissions.forEach((perm) => {
        permissionSet.add(perm.code);
      });
    });

    return Array.from(permissionSet);
  }
}