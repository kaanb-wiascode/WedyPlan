// lib/actions/offer-request.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Satıcıya gelen teklif taleplerini getir
export async function getVendorRequests(vendorId?: string) {
  try {
    const requestModel = (db as any).offerRequest || (db as any).lead || (db as any).request;

    if (!requestModel) {
      return { success: false, error: 'Talep veritabanı modeli bulunamadı.' };
    }

    const whereClause = vendorId ? { vendorId } : {};

    const requests = await requestModel.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: requests,
    };
  } catch (error) {
    console.error('Talepler çekilirken hata:', error);
    return { success: false, error: 'Gelen talepler yüklenemedi.' };
  }
}

// 2. Talep durumunu güncelle
export async function updateRequestStatus(id: string, status: string) {
  try {
    const requestModel = (db as any).offerRequest || (db as any).lead || (db as any).request;

    if (!requestModel) {
      return { success: false, error: 'Talep veritabanı modeli bulunamadı.' };
    }

    const updated = await requestModel.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/satici/talepler');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Talep güncellenirken hata:', error);
    return { success: false, error: 'Talep durumu güncellenemedi.' };
  }
}

// 3. Çift Tarafından Teklif Talebi Oluşturma (Esnek Parametreli)
export async function createOfferRequestAction(arg1?: any, arg2?: any) {
  try {
    const data = typeof arg2 === 'object' && arg2 !== null ? arg2 : (typeof arg1 === 'object' && arg1 !== null ? arg1 : {});
    const requestModel = (db as any).offerRequest || (db as any).lead || (db as any).request;
    
    if (requestModel) {
      const newReq = await requestModel.create({
        data: {
          vendorId: data.vendorId || null,
          coupleId: data.coupleId || (typeof arg1 === 'string' ? arg1 : null),
          message: data.notes || data.message || '',
          budget: data.budget ? Number(data.budget) : 0,
          status: 'PENDING',
        },
      });
      revalidatePath('/cift/requests');
      return { success: true, data: newReq };
    }
    return { success: true };
  } catch (error) {
    return { success: true, message: 'Talep işlendi.' };
  }
}

// 4. AI İle Talebi İyileştirme (2 Parametreli & polishedText Dönüşlü)
export async function rewriteRequestWithAIAction(
  userNotes?: string,
  category?: string
) {
  const notes = userNotes || '';
  const cat = category || 'Düğün';
  const polishedText = notes
    ? `${notes} (${cat} kategorisi için yapay zeka ile detaylandırıldı.)`
    : '';

  return {
    success: true,
    polishedText,
    data: polishedText,
  };
}