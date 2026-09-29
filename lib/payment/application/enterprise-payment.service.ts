import { prisma } from '@/lib/db';
import {
  CreatePaymentIntentDTO,
  PaymentResultDTO,
  RefundRequestDTO,
} from '@/types/enterprise-payment';
import { PaymentProviderFactory } from '../infrastructure/payment-providers';
import { CommissionEngine } from './commission-engine';

type PaymentMetadata = {
  checkoutFormContent?: string;
  clientSecret?: string;
};

function metadataOf(value: unknown): PaymentMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as PaymentMetadata;
}

function toResult(transaction: {
  id: string;
  providerTransactionId: string | null;
  status: string;
  grossAmount: unknown;
  platformCommission: unknown;
  vendorNetAmount: unknown;
  taxAmount: unknown;
  failureReason: string | null;
  metadata: unknown;
}): PaymentResultDTO {
  const metadata = metadataOf(transaction.metadata);

  return {
    success: transaction.status !== 'FAILED',
    transactionId: transaction.id,
    providerTransactionId: transaction.providerTransactionId || undefined,
    status: transaction.status as PaymentResultDTO['status'],
    checkoutFormContent: metadata.checkoutFormContent,
    clientSecret: metadata.clientSecret,
    grossAmount: Number(transaction.grossAmount),
    platformCommission: Number(transaction.platformCommission),
    vendorNetAmount: Number(transaction.vendorNetAmount),
    taxAmount: Number(transaction.taxAmount),
    errorMessage: transaction.failureReason || undefined,
  };
}

export class EnterprisePaymentService {
  /**
   * Initializes a marketplace/subscription payment and persists idempotency in PostgreSQL.
   * A repeated idempotency key returns the original transaction instead of charging twice.
   */
  static async initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO> {
    const existing = await prisma.paymentTransaction.findUnique({
      where: { idempotencyKey: dto.idempotencyKey },
    });

    if (existing) {
      if (existing.userId !== dto.userId) {
        throw new Error('Bu idempotency anahtarı başka bir kullanıcıya ait.');
      }
      return toResult(existing);
    }

    const breakdown = CommissionEngine.calculateBreakdown(
      dto.amount,
      dto.vendorCategoryCode,
    );

    const transaction = await prisma.paymentTransaction.create({
      data: {
        userId: dto.userId,
        organizationId: dto.organizationId,
        type: dto.type,
        provider: dto.provider,
        idempotencyKey: dto.idempotencyKey,
        grossAmount: breakdown.grossAmount,
        platformCommission: breakdown.platformCommissionAmount,
        vendorNetAmount: breakdown.vendorNetAmount,
        taxAmount: breakdown.taxAmount,
        currency: dto.currency,
        status: 'PENDING',
        metadata: {
          itemCount: dto.items.length,
          itemIds: dto.items.map((item) => item.id),
        },
      },
    });

    try {
      const gateway = PaymentProviderFactory.getGateway(dto.provider);
      const providerResult = await gateway.initializePayment(dto);

      const providerMetadata: Record<string, string | number | string[]> = {
        itemCount: dto.items.length,
        itemIds: dto.items.map((item) => item.id),
      };
      if (providerResult.checkoutFormContent) {
        providerMetadata.checkoutFormContent = providerResult.checkoutFormContent;
      }
      if (providerResult.clientSecret) {
        providerMetadata.clientSecret = providerResult.clientSecret;
      }

      const updated = await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          providerTransactionId: providerResult.providerTransactionId,
          status: providerResult.status,
          failureReason: providerResult.errorMessage,
          metadata: providerMetadata,
        },
      });

      return toResult(updated);
    } catch (error: unknown) {
      const failureReason =
        error instanceof Error ? error.message : 'Ödeme sağlayıcısı hatası.';

      const failed = await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
          failureReason,
        },
      });

      return toResult(failed);
    }
  }

  /**
   * Refund requests are resolved from the persisted transaction so callers cannot
   * select an arbitrary payment provider or provider transaction identifier.
   */
  static async processRefund(dto: RefundRequestDTO): Promise<boolean> {
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { id: dto.transactionId },
    });

    if (!transaction) {
      throw new Error('Ödeme işlemi bulunamadı.');
    }

    if (transaction.userId !== dto.requestedByUserId) {
      throw new Error('Bu ödeme için iade talebi oluşturma yetkiniz yok.');
    }

    if (!transaction.providerTransactionId) {
      throw new Error('Ödeme sağlayıcısı işlem kimliği bulunamadı.');
    }

    const refundAmount = dto.refundAmount ?? Number(transaction.grossAmount);
    if (refundAmount > Number(transaction.grossAmount)) {
      throw new Error('İade tutarı ödeme tutarını aşamaz.');
    }

    const gateway = PaymentProviderFactory.getGateway(transaction.provider);
    const success = await gateway.processRefund(
      transaction.providerTransactionId,
      refundAmount,
    );

    if (success) {
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status:
            refundAmount === Number(transaction.grossAmount)
              ? 'REFUNDED'
              : 'PARTIALLY_REFUNDED',
          metadata: {
            ...metadataOf(transaction.metadata),
            refundReason: dto.reason,
            refundAmount,
          },
        },
      });
    }

    return success;
  }
}
