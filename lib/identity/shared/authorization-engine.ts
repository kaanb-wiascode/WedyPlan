import { JwtAccessTokenPayload, PortalScope, SystemRoleCode } from '../domain/enums';

// In-Memory Permissions Cache for High Performance (< 1ms access)
const permissionCache = new Map<string, string[]>();

export class AuthorizationEngine {
  /**
   * Sets cached permissions for user-portal context
   */
  static cacheUserPermissions(userId: string, portal: PortalScope, permissions: string[]): void {
    permissionCache.set(`${userId}:${portal}`, permissions);
  }

  /**
   * Validates if user claims possess required atomic permission code
   */
  static hasPermission(userClaims: JwtAccessTokenPayload | null, permissionCode: string): boolean {
    if (!userClaims) return false;

    // DEVELOPER & SUPER_ADMIN bypass checks
    if (userClaims.roles.includes('SUPER_ADMIN') || userClaims.roles.includes('DEVELOPER')) {
      return true;
    }

    return userClaims.permissions.includes(permissionCode);
  }

  /**
   * Validates if user claims match required role
   */
  static hasRole(userClaims: JwtAccessTokenPayload | null, role: SystemRoleCode): boolean {
    if (!userClaims) return false;
    return userClaims.roles.includes(role);
  }
}