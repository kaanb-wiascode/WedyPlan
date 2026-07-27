import { AccessAction, PortalScope, SystemRoleCode } from '@/types/access-control';
import { AccessControlEngine } from '../application/access-control.engine';

export class AccessGuard {
  /**
   * Enforces permission check for API handlers
   */
  static async protectApi(params: {
    userId: string;
    roles: SystemRoleCode[];
    portal: PortalScope;
    resource: string;
    action: AccessAction;
    organizationId?: string;
  }): Promise<void> {
    const result = await AccessControlEngine.evaluateAccess({
      userId: params.userId,
      roles: params.roles,
      portalContext: params.portal,
      resource: params.resource,
      action: params.action,
      organizationId: params.organizationId
    });

    if (!result.isAllowed) {
      throw new Error(`Access Denied: ${result.reason}`);
    }
  }
}