// lib/actions/vendor-calendar.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Satıcının takvim etkinliklerini ve randevularını getir
export async function getVendorEvents(vendorId?: string) {
  try {
    const calendarModel =
      (db as any).calendarEvent || (db as any).event || (db as any).booking;

    if (!calendarModel) {
      return { success: false, error: 'Takvim veritabanı modeli bulunamadı.' };
    }

    const whereClause = vendorId ? { vendorId } : {};

    const events = await calendarModel.findMany({
      where: whereClause,
      orderBy: { eventDate: 'asc' },
    });

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    console.error('Takvim etkinlikleri çekilirken hata:', error);
    return { success: false, error: 'Takvim verileri yüklenemedi.' };
  }
}

// 2. Yeni takvim etkinliği / randevu ekle
export async function createVendorEvent(data: {
  vendorId?: string;
  title: string;
  clientName?: string;
  eventDate: string;
  eventType?: string;
  notes?: string;
}) {
  try {
    const calendarModel =
      (db as any).calendarEvent || (db as any).event || (db as any).booking;

    if (!calendarModel) {
      return { success: false, error: 'Takvim veritabanı modeli bulunamadı.' };
    }

    const targetDate = new Date(data.eventDate || Date.now());

    // Aynı güne başka bir kesinleşmiş etkinlik var mı kontrolü (Çakışma Önleme)
    const existingConflict = await calendarModel.findFirst({
      where: {
        ...(data.vendorId ? { vendorId: data.vendorId } : {}),
        eventDate: targetDate,
      },
    });

    const newEvent = await calendarModel.create({
      data: {
        vendorId: data.vendorId || null,
        title: data.title || 'Yeni Etkinlik',
        clientName: data.clientName || 'Belirtilmedi',
        eventDate: targetDate,
        eventType: data.eventType || 'Düğün / Organizasyon',
        notes: data.notes || '',
        status: existingConflict ? 'WARNING_CONFLICT' : 'CONFIRMED',
      },
    });

    revalidatePath('/firma/takvim');
    return {
      success: true,
      data: newEvent,
      hasConflict: !!existingConflict,
    };
  } catch (error) {
    console.error('Takvim etkinliği eklenirken hata:', error);
    return { success: false, error: 'Randevu/Etkinlik eklenemedi.' };
  }
}

// 3. Takvim etkinliğini sil
export async function deleteVendorEvent(id: string) {
  try {
    const calendarModel =
      (db as any).calendarEvent || (db as any).event || (db as any).booking;

    if (!calendarModel) {
      return { success: false, error: 'Takvim veritabanı modeli bulunamadı.' };
    }

    await calendarModel.delete({
      where: { id },
    });

    revalidatePath('/firma/takvim');
    return { success: true };
  } catch (error) {
    console.error('Etkinlik silinirken hata:', error);
    return { success: false, error: 'Etkinlik silinemedi.' };
  }
}

// 4. VendorCalendarClient İçin Alias Export (Esnek Parametreli)
export async function createVendorCalendarEventAction(
  arg1?: any,
  arg2?: any
) {
  const vendorId = typeof arg1 === 'string' ? arg1 : (arg1?.vendorId || arg2?.vendorId);
  const data = typeof arg2 === 'object' && arg2 !== null ? arg2 : (typeof arg1 === 'object' && arg1 !== null ? arg1 : {});

  return createVendorEvent({
    vendorId,
    title: data.title || data.eventName || 'Yeni Etkinlik',
    clientName: data.clientName || data.client || 'Müşteri',
    eventDate: data.eventDate || data.date || new Date().toISOString(),
    eventType: data.eventType || data.type || 'Düğün',
    notes: data.notes || '',
  });
}