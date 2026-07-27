import { CreatePaymentIntentDTO, PaymentResultDTO, PaymentProvider } from '@/types/enterprise-payment';

export interface IPaymentGateway {
  initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO>;
  processRefund(providerTransactionId: string, amount: number): Promise<boolean>;
}

export class IyzicoAdapter implements IPaymentGateway {
  async initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO> {
    // Integration point for iyzico CheckoutFormInitialize
    const mockProviderTxId = `iyzi_tx_${Date.now()}`;
    return {
      success: true,
      transactionId: `tx_${Date.now()}`,
      providerTransactionId: mockProviderTxId,
      status: 'SUCCESS',
      checkoutFormContent: '<div id="iyzipay-checkout-form"></div>',
      grossAmount: dto.amount,
      platformCommission: dto.amount * 0.1,
      vendorNetAmount: dto.amount * 0.9,
      taxAmount: dto.amount * 0.2
    };
  }

  async processRefund(providerTransactionId: string, amount: number): Promise<boolean> {
    return true;
  }
}

export class StripeAdapter implements IPaymentGateway {
  async initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO> {
    // Integration point for Stripe PaymentIntents API
    return {
      success: true,
      transactionId: `tx_${Date.now()}`,
      providerTransactionId: `pi_stripe_${Date.now()}`,
      status: 'SUCCESS',
      clientSecret: `pi_stripe_${Date.now()}_secret_mock`,
      grossAmount: dto.amount,
      platformCommission: dto.amount * 0.1,
      vendorNetAmount: dto.amount * 0.9,
      taxAmount: dto.amount * 0.2
    };
  }

  async processRefund(providerTransactionId: string, amount: number): Promise<boolean> {
    return true;
  }
}

export class PaymentProviderFactory {
  static getGateway(provider: PaymentProvider): IPaymentGateway {
    switch (provider) {
      case 'IYZICO':
      case 'PAYTR':
        return new IyzicoAdapter();
      case 'STRIPE':
        return new StripeAdapter();
      default:
        return new IyzicoAdapter();
    }
  }
}