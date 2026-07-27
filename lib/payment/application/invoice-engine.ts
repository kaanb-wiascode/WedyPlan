import { PAYMENT_CONFIG } from '../domain/payment.constants';

export class InvoiceEngine {
  /**
   * Generates invoice structure compliant with E-Fatura standards
   */
  static generateInvoiceData(transactionId: string, userId: string, grossAmount: number) {
    const subTotal = Number((grossAmount / (1 + PAYMENT_CONFIG.DEFAULT_VAT_PERCENT / 100)).toFixed(2));
    const taxTotal = Number((grossAmount - subTotal).toFixed(2));

    return {
      invoiceNumber: `WED${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      transactionId,
      userId,
      subTotal,
      taxTotal,
      grandTotal: grossAmount,
      billingAddress: 'Sertifikalı Müşteri Fatura Adresi',
      items: [
        {
          description: 'WedyPlan Dijital Platform Hizmet Bedeli',
          quantity: 1,
          unitPrice: subTotal,
          taxRatePercent: PAYMENT_CONFIG.DEFAULT_VAT_PERCENT,
          totalAmount: grossAmount
        }
      ]
    };
  }
}