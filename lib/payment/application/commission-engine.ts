import { CommissionBreakdown } from '@/types/enterprise-payment';
import { PAYMENT_CONFIG } from '../domain/payment.constants';

export class CommissionEngine {
  /**
   * Calculates gross, platform commission, vendor net and VAT
   */
  static calculateBreakdown(grossAmount: number, categoryCode?: string): CommissionBreakdown {
    const commissionRatePercent =
      (categoryCode && PAYMENT_CONFIG.CATEGORY_COMMISSION_RATES[categoryCode]) ||
      PAYMENT_CONFIG.DEFAULT_PLATFORM_COMMISSION_PERCENT;

    const platformCommissionAmount = Number(((grossAmount * commissionRatePercent) / 100).toFixed(2));
    const taxAmount = Number(((grossAmount * PAYMENT_CONFIG.DEFAULT_VAT_PERCENT) / 100).toFixed(2));
    const vendorNetAmount = Number((grossAmount - platformCommissionAmount).toFixed(2));

    return {
      grossAmount,
      commissionRatePercent,
      platformCommissionAmount,
      taxAmount,
      vendorNetAmount
    };
  }
}