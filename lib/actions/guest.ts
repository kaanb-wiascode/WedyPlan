// lib/actions/guest.ts
'use server';

import { db } from '@/lib/db';
import { getActiveCoupleId } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

// 1. Çiftin tüm davetlilerini getir
export async function getGuests(coupleId?: string) {
  try {
    const activeCoupleId = await getActiveCoupleId(coupleId);
    const guestModel = (db as any).guest;

    if (!guestModel) {
      return { success: false, error: 'Davetli veritabanı modeli bulunamadı.' };
    }

    const guests = await guestModel.findMany({
      where: { coupleId: activeCoupleId },
      orderBy: { createdAt: 'desc' },
    });

    const totalGuests = guests.length;
    const attendingCount = guests.filter((g: any) => g.status === 'ATTENDING').length;
    const declinedCount = guests.filter((g: any) => g.status === 'DECLINED').length;
    const pendingCount = guests.filter((g: any) => g.status === 'PENDING' || !g.status).length;

    return {
      success: true,
      data: {
        guests,
        stats: {
          totalGuests,
          attendingCount,
          declinedCount,
          pendingCount,
        },
      },
    };
  } catch (error) {
    console.error('Davetliler çekilirken hata:', error);
    return { success: false, error: 'Davetli listesi alınamadı.' };
  }
}

// 2. Yeni davetli ekle
export async function createGuest(data: {
  coupleId?: string;
  fullName: string;
  email?: string;
  phone?: string;
  group?: string;
  plusOne?: boolean;
}) {
  try {
    const activeCoupleId = await getActiveCoupleId(data.coupleId);
    const guestModel = (db as any).guest;

    if (!guestModel) {
      return { success: false, error: 'Davetli veritabanı modeli bulunamadı.' };
    }

    const newGuest = await guestModel.create({
      data: {
        coupleId: activeCoupleId,
        fullName: data.fullName,
        email: data.email || null,
        phone: data.phone || null,
        group: data.group || 'Genel',
        plusOne: data.plusOne || false,
        status: 'PENDING',
      },
    });

    revalidatePath('/cift/davetliler');
    return { success: true, data: newGuest };
  } catch (error) {
    console.error('Davetli eklenirken hata:', error);
    return { success: false, error: 'Davetli eklenemedi.' };
  }
}

// 3. Davetli LCV (RSVP) Durumunu Güncelle
export async function updateGuestStatus(id: string, status: 'ATTENDING' | 'DECLINED' | 'PENDING') {
  try {
    const guestModel = (db as any).guest;

    if (!guestModel) {
      return { success: false, error: 'Davetli veritabanı modeli bulunamadı.' };
    }

    const updated = await guestModel.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/cift/davetliler');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Davetli durumu güncellenirken hata:', error);
    return { success: false, error: 'Durum güncellenemedi.' };
  }
}

// 4. Davetli Sil
export async function deleteGuest(id: string) {
  try {
    const guestModel = (db as any).guest;

    if (!guestModel) {
      return { success: false, error: 'Davetli veritabanı modeli bulunamadı.' };
    }

    await guestModel.delete({
      where: { id },
    });

    revalidatePath('/cift/davetliler');
    return { success: true };
  } catch (error) {
    console.error('Davetli silinirken hata:', error);
    return { success: false, error: 'Davetli silinemedi.' };
  }
}