import { randomUUID } from 'node:crypto';
import {
  CreatePaymentIntentDTO,
  PaymentResultDTO,
  PaymentProvider,
} from '@/types/enterprise-payment';

export interface IPaymentGateway {
  initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO>;
  processRefund(providerTransactionId: string, amount: number): Promise<boolean>;
}

type IyzipayResult = {
  status?: string;
  paymentPageUrl?: string;
  checkoutFormContent?: string;
  token?: string;
  conversationId?: string;
  errorMessage?: string;
  errorCode?: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} yapılandırılmadan gerçek ödeme işlemi başlatılamaz.`);
  }
  return value;
}

function money(value: number): string {
  return value.toFixed(2);
}

function splitName(fullName: string): { name: string; surname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { name: parts[0] || 'WedyPlan', surname: 'Müşteri' };
  }

  return {
    name: parts.slice(0, -1).join(' '),
    surname: parts.at(-1) || 'Müşteri',
  };
}

export class IyzicoAdapter implements IPaymentGateway {
  private createClient() {
    // iyzipay has no maintained TypeScript declarations. Keep the untyped boundary
    // isolated inside this adapter instead of leaking `any` through the payment domain.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Iyzipay = require('iyzipay');

    return {
      client: new Iyzipay({
        apiKey: requiredEnv('IYZICO_API_KEY'),
        secretKey: requiredEnv('IYZICO_SECRET_KEY'),
        uri: requiredEnv('IYZICO_BASE_URL'),
      }),
      Iyzipay,
    };
  }

  async initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO> {
    const { client, Iyzipay } = this.createClient();
    const callbackUrl = requiredEnv('IYZICO_CALLBACK_URL');

    if (!dto.buyer.identityNumber?.trim()) {
      throw new Error('Iyzico ödemesi için alıcı T.C. kimlik/vergi numarası gereklidir.');
    }

    const { name, surname } = splitName(dto.buyer.fullName);
    const conversationId = randomUUID();

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: money(dto.amount),
      paidPrice: money(dto.amount),
      currency: dto.currency,
      basketId: conversationId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl,
      buyer: {
        id: dto.buyer.id,
        name,
        surname,
        email: dto.buyer.email,
        identityNumber: dto.buyer.identityNumber,
        registrationAddress: dto.buyer.billingAddress,
        ip: dto.buyer.ipAddress,
        city: 'Istanbul',
        country: 'Turkey',
      },
      shippingAddress: {
        contactName: dto.buyer.fullName,
        city: 'Istanbul',
        country: 'Turkey',
        address: dto.buyer.billingAddress,
      },
      billingAddress: {
        contactName: dto.buyer.fullName,
        city: 'Istanbul',
        country: 'Turkey',
        address: dto.buyer.billingAddress,
      },
      basketItems: dto.items.map((item) => ({
        id: item.id,
        name: item.name,
        category1: item.category || 'WedyPlan',
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: money(item.price),
      })),
    };

    const result = await new Promise<IyzipayResult>((resolve, reject) => {
      client.checkoutFormInitialize.create(
        request,
        (error: Error | null, response: IyzipayResult) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        },
      );
    });

    if (result.status !== 'success') {
      return {
        success: false,
        transactionId: conversationId,
        status: 'FAILED',
        grossAmount: dto.amount,
        platformCommission: 0,
        vendorNetAmount: 0,
        taxAmount: 0,
        errorMessage:
          result.errorMessage ||
          (result.errorCode ? `Iyzico hata kodu: ${result.errorCode}` : 'Ödeme başlatılamadı.'),
      };
    }

    return {
      success: true,
      transactionId: conversationId,
      providerTransactionId: result.token,
      status: 'PENDING',
      checkoutFormContent: result.checkoutFormContent,
      grossAmount: dto.amount,
      platformCommission: 0,
      vendorNetAmount: 0,
      taxAmount: 0,
    };
  }

  async processRefund(providerTransactionId: string, amount: number): Promise<boolean> {
    if (!providerTransactionId) {
      throw new Error('İade için provider işlem kimliği gereklidir.');
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('İade tutarı sıfırdan büyük olmalıdır.');
    }

    // Refund will be enabled after the checkout callback stores the Iyzico paymentId.
    // Failing closed is safer than returning a false-positive refund result.
    throw new Error('Iyzico iade akışı henüz aktive edilmedi; manuel onay gereklidir.');
  }
}

class UnsupportedPaymentProviderAdapter implements IPaymentGateway {
  constructor(private readonly provider: PaymentProvider) {}

  async initializePayment(): Promise<PaymentResultDTO> {
    throw new Error(`${this.provider} ödeme sağlayıcısı henüz aktif değil.`);
  }

  async processRefund(): Promise<boolean> {
    throw new Error(`${this.provider} iade sağlayıcısı henüz aktif değil.`);
  }
}

export class PaymentProviderFactory {
  static getGateway(provider: PaymentProvider): IPaymentGateway {
    switch (provider) {
      case 'IYZICO':
        return new IyzicoAdapter();
      case 'PAYTR':
      case 'STRIPE':
      case 'PAYPAL':
      case 'APPLE_PAY':
      case 'GOOGLE_PAY':
        return new UnsupportedPaymentProviderAdapter(provider);
      default: {
        const exhaustiveCheck: never = provider;
        throw new Error(`Desteklenmeyen ödeme sağlayıcısı: ${exhaustiveCheck}`);
      }
    }
  }
}
