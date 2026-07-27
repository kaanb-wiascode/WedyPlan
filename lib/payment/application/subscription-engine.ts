import { SubscriptionStatus } from '@/types/enterprise-payment';

export class SubscriptionEngine {
  /**
   * Manages recurring billing cycles and retry limits
   */
  static handlePaymentFailure(currentFailCount: number): { nextStatus: SubscriptionStatus; retryInDays?: number } {
    const nextFailCount = currentFailCount + 1;

    if (nextFailCount >= 3) {
      return { nextStatus: 'CANCELED' };
    }

    const retryDays = [1, 3, 7][currentFailCount] || 1;
    return { nextStatus: 'PAST_DUE', retryInDays: retryDays };
  }
}