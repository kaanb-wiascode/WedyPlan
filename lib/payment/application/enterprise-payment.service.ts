import {
    CreatePaymentIntentDTO,
    PaymentResultDTO,
    RefundRequestDTO
  } from '@/types/enterprise-payment';
  import { PaymentProviderFactory } from '../infrastructure/payment-providers';
  import { CommissionEngine } from './commission-engine';
  import { InvoiceEngine } from './invoice-engine';
  
  // In-Memory Transaction Mock Store
  const paymentTransactionsStore = new Map<string, any>();
  
  export class EnterprisePaymentService {
    /**
     * Entry Point for initializing marketplace & subscription payments
     */
    static async initializePayment(dto: CreatePaymentIntentDTO): Promise<PaymentResultDTO> {
      // 1. Idempotency Check
      if (paymentTransactionsStore.has(dto.idempotencyKey)) {
        return paymentTransactionsStore.get(dto.idempotencyKey);
      }
  
      // 2. Calculate Commission & Net Amounts
      const breakdown = CommissionEngine.calculateBreakdown(dto.amount, dto.vendorCategoryCode);
  
      // 3. Dispatch to Gateway Provider
      const gateway = PaymentProviderFactory.getGateway(dto.provider);
      const result = await gateway.initializePayment(dto);
  
      const fullResult: PaymentResultDTO = {
        ...result,
        grossAmount: breakdown.grossAmount,
        platformCommission: breakdown.platformCommissionAmount,
        vendorNetAmount: breakdown.vendorNetAmount,
        taxAmount: breakdown.taxAmount
      };
  
      // 4. Save Transaction & Auto-Generate Invoice structure
      paymentTransactionsStore.set(dto.idempotencyKey, fullResult);
      InvoiceEngine.generateInvoiceData(result.transactionId, dto.userId, dto.amount);
  
      return fullResult;
    }
  
    /**
     * Processes refund for cancellation or disputes
     */
    static async processRefund(dto: RefundRequestDTO): Promise<boolean> {
      const gateway = PaymentProviderFactory.getGateway('IYZICO');
      return await gateway.processRefund(dto.transactionId, dto.refundAmount || 0);
    }
  }