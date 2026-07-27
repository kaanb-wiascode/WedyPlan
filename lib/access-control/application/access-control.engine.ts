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
      const inheritedRoles = RoleHierarchyEngine.resolveInheritedRoles(request.roles);
      const compiledPermissions = new Set<string>();
      const deniedPermissions = new Set<string>();
  
      // Mock permissions compiler simulation (In production, loaded via Prisma JOINs)
      inheritedRoles.forEach((role) => {
        if (role === 'VENDOR_OWNER') {
          compiledPermissions.add('vendor:leads:manage');
          compiledPermissions.add('vendor:offers:create');
          compiledPermissions.add('vendor:finance:view');
        }
        if (role === 'COUPLE') {
          compiledPermissions.add('couple:budget:view');
          compiledPermissions.add('couple:budget:update');
          compiledPermissions.add('couple:guests:manage');
        }
        if (role === 'VISITOR') {
          compiledPermissions.add('public:vendors:view');
        }
      });
  
      return {
        userId: request.userId,
        roles: request.roles,
        inheritedRoles,
        compiledPermissions,
        deniedPermissions,
        subscriptionTier: request.subscriptionTier || 'FREE',
        organizationIds: request.organizationId ? [request.organizationId] : []
      };
    }
  }