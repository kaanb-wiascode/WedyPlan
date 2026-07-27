import { SystemRoleCode } from '@/types/access-control';

// Static Role Inheritance Fallback Matrix (Complemented by DB RoleInheritance)
const ROLE_HIERARCHY_MAP: Record<SystemRoleCode, SystemRoleCode[]> = {
  SYSTEM: ['SUPER_ADMINISTRATOR', 'DEVELOPER'],
  SUPER_ADMINISTRATOR: ['ADMINISTRATOR', 'FINANCE', 'CONTENT_MANAGER', 'MODERATOR', 'SUPPORT_AGENT'],
  DEVELOPER: ['ADMINISTRATOR'],
  ADMINISTRATOR: ['MODERATOR', 'SUPPORT_AGENT'],
  FINANCE: [],
  CONTENT_MANAGER: [],
  MODERATOR: ['SUPPORT_AGENT'],
  SUPPORT_AGENT: [],
  VENDOR_OWNER: ['VENDOR_MANAGER', 'VENDOR_EMPLOYEE'],
  VENDOR_MANAGER: ['VENDOR_EMPLOYEE'],
  VENDOR_EMPLOYEE: ['REGISTERED_USER'],
  COUPLE: ['REGISTERED_USER'],
  REGISTERED_USER: ['VISITOR'],
  VISITOR: []
};

export class RoleHierarchyEngine {
  /**
   * Resolves all inherited roles for a set of assigned roles using DAG traversal
   */
  static resolveInheritedRoles(assignedRoles: SystemRoleCode[]): SystemRoleCode[] {
    const resolvedRoles = new Set<SystemRoleCode>(assignedRoles);
    const queue = [...assignedRoles];

    while (queue.length > 0) {
      const currentRole = queue.shift()!;
      const parents = ROLE_HIERARCHY_MAP[currentRole] || [];

      parents.forEach((childRole) => {
        if (!resolvedRoles.has(childRole)) {
          resolvedRoles.add(childRole);
          queue.push(childRole);
        }
      });
    }

    return Array.from(resolvedRoles);
  }
}