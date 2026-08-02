'use server';

import { revalidatePath } from 'next/cache';

export interface QuoteLineItem {
  id: string;
  title: string;
  price: number;
}

export interface SendQuoteInput {
  leadId: string;
  vendorId?: string;
  coupleNames: string;
  totalAmount: number;
  quoteItems: QuoteLineItem[];
  note: string;
  weddingDate: string;
}

/**
 * 1. Firma Çifte Teklif Gönderdiğinde Çalışan Server Action
 */
export async function sendVendorQuoteAction(input: SendQuoteInput) {
  try {
    console.log('[SYNC] Teklif çifte iletildi:', input);

    // Çift ve Firma sayfalarının önbelleğini (Cache) yenile
    revalidatePath('/cift/messages');
    revalidatePath('/cift/firmalarim');
    revalidatePath('/cift/firmalar');
    revalidatePath('/firma/talepler');
    revalidatePath('/firma/dashboard');

    const formattedAmount = input.totalAmount.toLocaleString('tr-TR');

    return {
      success: true,
      message: input.coupleNames + ' çiftine ₺' + formattedAmount + ' tutarındaki teklif sistemik olarak iletildi.',
    };
  } catch (error) {
    return { success: false, message: 'Teklif gönderilirken bir hata oluştu.' };
  }
}

/**
 * 2. Firma Talebi İptal Ettiğinde veya Sildiğinde Çalışan Server Action
 */
export async function cancelVendorLeadAction(leadId: string, coupleNames: string) {
  try {
    console.log('[SYNC] Talep iptal edildi:', leadId);

    revalidatePath('/firma/talepler');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/firmalarim');

    return {
      success: true,
      message: coupleNames + ' çiftine ait talep iptal edildi ve sistem güncellendi.',
    };
  } catch (error) {
    return { success: false, message: 'Talep iptal edilirken sistem hatası oluştu.' };
  }
}