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
 * 1. Firma Çifte Teklif Gönderdiğinde Çalışan Action
 * Çiftin mesaj paneline ve bütçe/firmalarım modüllerine anında veri işler.
 */
export async function sendVendorQuoteAction(input: SendQuoteInput) {
  try {
    // Gerçek DB entegrasyonunda burada Prisma / Supabase güncellenir.
    // 1. Lead statüsü -> 'OFFER_SENT'
    // 2. Couple Message -> New Quote Message
    // 3. Couple Vendor Status -> 'OFFER_RECEIVED'

    console.log('[SYNC] Teklif çifte iletildi:', input);

    // Çift ve Firma sayfalarının Önbelleğini (Cache) Yenile
    revalidatePath('/cift/messages');
    revalidatePath('/cift/firmalarim');
    revalidatePath('/cift/firmalar');
    revalidatePath('/firma/talepler');
    revalidatePath('/firma/dashboard');

    return {
      success: true,
      message: `${input.coupleNames} çiftine ₺${input.totalAmount.toLocaleString('tr-TR')} tutarındaki teklif sistemik olarak iletildi.`,
    };
  } catch (error) {
    return { success: false, message: 'Teklif gönderilirken bir hata oluştu.' };
  }
}

/**
 * 2. Firma Talebi İptal Ettiğinde veya Sildiğinde Çalışan Action
 */
export async function cancelVendorLeadAction(leadId: string, coupleNames: string) {
  try {
    console.log('[SYNC] Talep iptal edildi:', leadId);

    revalidatePath('/firma/talepler');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/firmalarim');

    return {
      success: true,
      message: `${coupleNames} çiftine ait talep iptal edildi ve sistem güncellendi.`,
    };
  } catch (error) {
    return { success: false, message: 'Talep iptal edilirken sistem hatası oluştu.' };
  }
}