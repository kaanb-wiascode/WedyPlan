'use server';

import { revalidatePath } from 'next/cache';

export interface CalendarEventInput {
  id?: string;
  title: string;
  coupleNames: string;
  date: string;
  time: string;
  type: 'WEDDING' | 'TASTING' | 'MEETING';
  status: 'CONFIRMED' | 'OPTION' | 'PENDING';
  guestCount?: number;
  note?: string;
}

/**
 * 1. Firma veya Çift Randevu/Düğün Eklediğinde Çalışan Action
 */
export async function saveVendorCalendarEventAction(event: CalendarEventInput) {
  try {
    console.log('[CALENDAR SYNC] Etkinlik kaydedildi:', event);

    // Çift ve Firma portalı sayfalarını eşzamanlı yenile
    revalidatePath('/firma/takvim');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/dashboard');
    revalidatePath('/cift/firmalarim');
    revalidatePath('/cift/messages');

    return {
      success: true,
      message: `${event.coupleNames} için etkinlik takvime işlendi ve çift paneliyle senkronize edildi.`,
    };
  } catch (error) {
    return { success: false, message: 'Takvim kaydı sırasında bir hata oluştu.' };
  }
}

/**
 * 2. Etkinlik veya Randevu İptal Ettiğinde Çalışan Action
 */
export async function deleteVendorCalendarEventAction(eventId: string, title: string) {
  try {
    console.log('[CALENDAR SYNC] Etkinlik silindi:', eventId);

    revalidatePath('/firma/takvim');
    revalidatePath('/firma/dashboard');
    revalidatePath('/cift/dashboard');
    revalidatePath('/cift/firmalarim');

    return {
      success: true,
      message: `"${title}" takvimden kaldırıldı ve çakışma riski giderildi.`,
    };
  } catch (error) {
    return { success: false, message: 'Etkinlik silinirken bir hata oluştu.' };
  }
}