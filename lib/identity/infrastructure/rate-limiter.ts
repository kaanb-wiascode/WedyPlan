const attemptTracker = new Map<string, { count: number; resetAt: number }>();

export class RateLimiter {
  /**
   * Implements sliding window rate limiting
   */
  static isRateLimited(key: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = attemptTracker.get(key);

    if (!record || now > record.resetAt) {
      attemptTracker.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }

    if (record.count >= limit) {
      return true;
    }

    record.count++;
    return false;
  }
}