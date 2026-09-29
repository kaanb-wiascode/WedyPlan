import { prisma } from '@/lib/db';
import {
    AccessEvaluationRequest,
    AccessEvaluationResult,
    UserPermissionContext,
    SystemRoleCode
  } from '@/types/access-control';
  import { RoleHierarchyEngine } from '../domain/role-hierarchy.engine';
  import { PermissionCacheService } from '../infrastructure/permission-cache';
  
  export class AccessControlEngine {
    /**
     * Evaluates complex multi-dimensional access requests
     */
    static async evaluateAccess(request: AccessEvaluationRequest): Promise<AccessEvaluationResult> {
      // 1. Super Admin / Developer / System Role Bypass
      if (
        request.roles.includes('SUPER_ADMINISTRATOR') ||
        request.roles.includes('DEVELOPER') ||
        request.roles.includes('SYSTEM')
      ) {
        return {
          isAllowed: true,
          reason: 'Super Administrator or System bypass',
          grantedBy: 'SUPER_ADMIN'
        };
      }
  
      // 2. Resolve or Fetch User Permission Context
      let context = PermissionCacheService.get(request.userId, request.portalContext);
  
      if (!context) {
        context = await this.buildUserPermissionContext(request);
        PermissionCacheService.set(request.userId, request.portalContext, context);
      }
  
      const permissionCode = `${request.portalContext.toLowerCase()}:${request.resource.toLowerCase()}:${request.action.toLowerCase()}`;
  
      // 3. Check Explicit Direct Deny Rules
      if (context.deniedPermissions.has(permissionCode)) {
        return {
          isAllowed: false,
          reason: 'Explicitly denied by custom security rule',
          grantedBy: 'DENIED',
          matchedPermissionCode: permissionCode
        };
      }
  
      // 4. Check Compiled Permissions
      const isGranted =
        context.compiledPermissions.has(permissionCode) ||
        context.compiledPermissions.has(`*:${request.resource.toLowerCase()}:*`) ||
        context.compiledPermissions.has(`*:*:*`);
  
      if (!isGranted) {
        return {
          isAllowed: false,
          reason: `Missing required permission: [${permissionCode}]`,
          grantedBy: 'DENIED',
          matchedPermissionCode: permissionCode
        };
      }
  
      // 5. Evaluate Field-Level Permissions if fieldNames provided
      let allowedFields = request.fieldNames;
      let maskedFields: string[] = [];
  
      if (request.fieldNames && request.fieldNames.length > 0) {
        // Strips fields ending with '_sensitive' or '_cost' for non-owners/non-admins
        const isVendorManagerOrAbove = context.inheritedRoles.some((r) =>
          ['VENDOR_OWNER', 'VENDOR_MANAGER', 'ADMINISTRATOR'].includes(r)
        );
  
        if (!isVendorManagerOrAbove) {
          maskedFields = request.fieldNames.filter(
            (f) => f.includes('cost') || f.includes('margin') || f.includes('ssn')
          );
          allowedFields = request.fieldNames.filter((f) => !maskedFields.includes(f));
        }
      }
  
      return {
        isAllowed: true,
        reason: 'Access granted via dynamic RBAC/PBAC evaluation',
        grantedBy: 'ROLE_HIERARCHY',
        allowedFields,
        maskedFields,
        matchedPermissionCode: permissionCode
      };
    }
  
    /**
     * Compiles user roles, inheritance, direct custom permissions and subscription limits
     */
    private static async buildUserPermissionContext(
      request: AccessEvaluationRequest
    ): Promise<UserPermissionContext> {
      const compiledPermissions = new Set<string>();
      const deniedPermissions = new Set<string>();
  
      const profile = await prisma.portalProfile.findUnique({
        where: {
          userId_portal: {
            userId: request.userId,
            portal: request.portalContext,
          },
        },
        include: {
          roles: {
            include: {
              permissions: {
                include: {
                  permission: { select: { code: true } },
                },
              },
            },
          },
        },
      });

      const dbRoles = (profile?.roles || [])
        .map((role) => role.code)
        .filter((role): role is SystemRoleCode =>
          ['VISITOR','REGISTERED_USER','COUPLE','VENDOR_EMPLOYEE','VENDOR_MANAGER','VENDOR_OWNER','SUPPORT_AGENT','MODERATOR','FINANCE','CONTENT_MANAGER','ADMINISTRATOR','SUPER_ADMINISTRATOR','DEVELOPER','SYSTEM'].includes(role as SystemRoleCode),
        );
      const assignedRoles = Array.from(new Set<SystemRoleCode>([...request.roles, ...dbRoles]));
      const inheritedRoles = RoleHierarchyEngine.resolveInheritedRoles(assignedRoles);

      for (const role of profile?.roles || []) {
        for (const rolePermission of role.permissions) {
          compiledPermissions.add(rolePermission.permission.code);
        }
      }

      const directPermissions = await prisma.userDirectPermission.findMany({
        where: {
          userId: request.userId,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        include: { permission: { select: { code: true } } },
      });

      for (const directPermission of directPermissions) {
        const code = directPermission.permission.code;
        if (directPermission.isGranted) {
          compiledPermissions.add(code);
          deniedPermissions.delete(code);
        } else {
          deniedPermissions.add(code);
          compiledPermissions.delete(code);
        }
      }

      const tierPermissions = await prisma.subscriptionTierPermission.findMany({
        where: { tier: request.subscriptionTier || 'FREE' },
        include: { permission: { select: { code: true } } },
      });

      for (const tierPermission of tierPermissions) {
        compiledPermissions.add(tierPermission.permission.code);
      }
  
      return {
        userId: request.userId,
        roles: assignedRoles,
        inheritedRoles,
        compiledPermissions,
        deniedPermissions,
        subscriptionTier: request.subscriptionTier || 'FREE',
        organizationIds: request.organizationId ? [request.organizationId] : []
      };
    }
  }