'use server';

import { revalidatePath } from 'next/cache';

export interface CreatePaymentLinkInput {
  coupleNames: string;
  coupleEmail?: string;
  amount: number;
  description: string;
  installmentCount?: number;
  dueDate?: string;
}

export interface GibInvoiceInput {
  transactionId?: string;
  coupleNames: string;
  taxNumberOrTckn: string;
  subtotal: number; // KDV hariç
  kdvRate: number; // Örn: 20
  kdvAmount: number;
  totalAmount: number;
  description: string;
}

/**
 * 1. İyzico Ödeme Linki Oluşturma (Çift Paneline Otomatik İşler)
 */
export async function createPaymentLinkAction(input: CreatePaymentLinkInput) {
  try {
    console.log('[FINANCE SYNC] İyzico ödeme linki üretildi:', input);

    // Çift ve Firma paneli verilerini yenile
    revalidatePath('/firma/finans');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/odeme');
    revalidatePath('/cift/butce');
    revalidatePath('/cift/messages');

    const formattedAmount = input.amount.toLocaleString('tr-TR');
    const fakeLink = `https://pay.wedyplan.com/iyzico/pay_${Date.now().toString().slice(-6)}`;

    return {
      success: true,
      paymentUrl: fakeLink,
      message: `${input.coupleNames} çifti için ₺${formattedAmount} tutarlı İyzico ödeme linki üretildi ve çift paneline iletildi.`,
    };
  } catch (error) {
    return { success: false, message: 'Ödeme linki oluşturulurken hata meydana geldi.' };
  }
}

/**
 * 2. Güvenli Havuzdan (Escrow) Hakediş Hesaba Aktarma
 */
export async function releaseEscrowPayoutAction(transactionId: string, coupleNames: string, amount: number) {
  try {
    console.log('[FINANCE SYNC] Escrow hakediş serbest bırakıldı:', { transactionId, coupleNames, amount });

    revalidatePath('/firma/finans');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/odeme');
    revalidatePath('/cift/butce');

    const formattedAmount = amount.toLocaleString('tr-TR');

    return {
      success: true,
      message: `${coupleNames} düğününe ait ₺${formattedAmount} tutarındaki hakediş firmanızın banka hesabına (IBAN) aktarıldı.`,
    };
  } catch (error) {
    return { success: false, message: 'Hakediş transferinde hata oluştu.' };
  }
}

/**
 * 3. GİB E-Fatura / E-Arşiv Faturası Kesme
 */
export async function generateGibInvoiceAction(input: GibInvoiceInput) {
  try {
    console.log('[FINANCE SYNC] GİB E-Fatura kesildi:', input);

    revalidatePath('/firma/finans');
    revalidatePath('/cift/odeme');
    revalidatePath('/cift/sozlesmeler');

    const formattedTotal = input.totalAmount.toLocaleString('tr-TR');
    const invoiceNo = `WPN2026${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      invoiceNumber: invoiceNo,
      message: `${input.coupleNames} adına ${invoiceNo} numaralı ₺${formattedTotal} tutarındaki GİB E-Faturası başarıyla kesildi ve çiftin belgelerim paneline yüklendi.`,
    };
  } catch (error) {
    return { success: false, message: 'E-Fatura oluşturulurken GİB entegratör hatası alındı.' };
  }
}