export type PaymentProvider =
  | 'IYZICO'
  | 'PAYTR'
  | 'STRIPE'
  | 'PAYPAL'
  | 'APPLE_PAY'
  | 'GOOGLE_PAY';

export type PaymentStatus =
  | 'PENDING'
  | 'AUTHORIZED'
  | 'SUCCESS'
  | 'FAILED'
  | 'REFUNDED'
  | 'PARTIALLY_REFUNDED'
  | 'DISPUTED';

export type SubscriptionStatus =
  | 'ACTIVE'
  | 'PAST_DUE'
  | 'CANCELED'
  | 'UNPAID'
  | 'TRIALING';

export type PaymentType =
  | 'SUBSCRIPTION'
  | 'MARKETPLACE_BOOKING'
  | 'LEAD_PURCHASE'
  | 'FEATURED_LISTING';

export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';

export interface CreatePaymentIntentDTO {
  userId: string;
  organizationId?: string;
  type: PaymentType;
  provider: PaymentProvider;
  amount: number;
  currency: Currency;
  vendorCategoryCode?: string;
  couponCode?: string;
  idempotencyKey: string;
  buyer: {
    id: string;
    fullName: string;
    email: string;
    identityNumber?: string;
    ipAddress: string;
    billingAddress: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    category?: string;
  }[];
}

export interface PaymentResultDTO {
  success: boolean;
  transactionId: string;
  providerTransactionId?: string;
  status: PaymentStatus;
  checkoutFormContent?: string;
  clientSecret?: string;
  grossAmount: number;
  platformCommission: number;
  vendorNetAmount: number;
  taxAmount: number;
  errorMessage?: string;
}

export interface RefundRequestDTO {
  transactionId: string;
  refundAmount?: number;
  reason: string;
  requestedByUserId: string;
}

export interface CommissionBreakdown {
  grossAmount: number;
  commissionRatePercent: number;
  platformCommissionAmount: number;
  taxAmount: number;
  vendorNetAmount: number;
}