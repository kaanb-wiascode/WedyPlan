import { UserPermissionContext } from '@/types/access-control';

// In-Memory Fast Cache (< 0.5ms Access) with Automatic TTL
const cacheStore = new Map<string, { context: UserPermissionContext; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 Minutes

export class PermissionCacheService {
  static get(userId: string, portalContext: string): UserPermissionContext | null {
    const key = `${userId}:${portalContext}`;
    const record = cacheStore.get(key);

    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      cacheStore.delete(key);
      return null;
    }

    return record.context;
  }

  static set(userId: string, portalContext: string, context: UserPermissionContext): void {
    const key = `${userId}:${portalContext}`;
    cacheStore.set(key, {
      context,
      expiresAt: Date.now() + CACHE_TTL_MS
    });
  }

  /**
   * Instantly purges cache when permissions/roles are updated
   */
  static invalidateUser(userId: string): void {
    for (const key of cacheStore.keys()) {
      if (key.startsWith(`${userId}:`)) {
        cacheStore.delete(key);
      }
    }
  }

  static clearAll(): void {
    cacheStore.clear();
  }
}