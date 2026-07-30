'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface CreateGuestInput {
  userId: string;
  fullName: string;
  email?: string;
  phone?: string;
  group?: string; // Aile, Arkadaş, İş Vb.
  plusOne?: boolean;
  tableNumber?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

export interface GuestRecord {
  id: string;
  userId: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  group?: string | null;
  plusOne?: boolean;
  tableNumber?: string | null;
  status: string;
  createdAt?: Date;
}

/**
 * Kullanıcıya/Çifte ait tüm davetlileri ve LCV durum istatistiklerini getirir.
 */
export async function getGuestsAction(userId: string) {
  try {
    const guestModel = (db as any).guest || (db as any).guestListItem || (db as any).coupleGuest;

    let guests: GuestRecord[] = [];

    if (guestModel) {
      guests = await guestModel.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    }

    const acceptedCount = guests.filter((g: GuestRecord) => g.status === 'ACCEPTED').length;
    const declinedCount = guests.filter((g: GuestRecord) => g.status === 'DECLINED').length;
    const pendingCount = guests.filter((g: GuestRecord) => g.status === 'PENDING' || !g.status).length;

    return {
      success: true,
      data: {
        guests,
        stats: {
          total: guests.length,
          accepted: acceptedCount,
          declined: declinedCount,
          pending: pendingCount,
        },
      },
    };
  } catch (error: unknown) {
    console.error('❌ getGuestsAction hatası:', error);
    return {
      success: false,
      error: 'Davetli listesi yüklenirken bir hata oluştu.',
      data: { guests: [], stats: { total: 0, accepted: 0, declined: 0, pending: 0 } },
    };
  }
}

/**
 * Yeni davetli ekler.
 */
export async function createGuestAction(input: CreateGuestInput) {
  try {
    const guestModel = (db as any).guest || (db as any).guestListItem || (db as any).coupleGuest;

    if (!guestModel) {
      throw new Error('Davetli modeli Prisma şemasında bulunamadı.');
    }

    const newGuest = await guestModel.create({
      data: {
        userId: input.userId,
        fullName: input.fullName,
        email: input.email || null,
        phone: input.phone || null,
        group: input.group || 'Genel',
        plusOne: input.plusOne || false,
        tableNumber: input.tableNumber || null,
        status: input.status || 'PENDING',
      },
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/guests');

    return { success: true, data: newGuest };
  } catch (error: unknown) {
    console.error('❌ createGuestAction hatası:', error);
    return { success: false, error: 'Davetli eklenirken bir hata oluştu.' };
  }
}

/**
 * Davetlinin LCV durumunu (Katılıyor / Katılmıyor / Beklemede) ve masa numarasını günceller.
 */
export async function updateGuestStatusAction(
  guestId: string,
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED',
  tableNumber?: string
) {
  try {
    const guestModel = (db as any).guest || (db as any).guestListItem || (db as any).coupleGuest;

    if (!guestModel) {
      throw new Error('Davetli modeli Prisma şemasında bulunamadı.');
    }

    const updated = await guestModel.update({
      where: { id: guestId },
      data: {
        status,
        ...(tableNumber !== undefined && { tableNumber }),
      },
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/guests');

    return { success: true, data: updated };
  } catch (error: unknown) {
    console.error('❌ updateGuestStatusAction hatası:', error);
    return { success: false, error: 'Davetli durumu güncellenemedi.' };
  }
}

/**
 * Davetliyi siler.
 */
export async function deleteGuestAction(guestId: string) {
  try {
    const guestModel = (db as any).guest || (db as any).guestListItem || (db as any).coupleGuest;

    if (!guestModel) {
      throw new Error('Davetli modeli Prisma şemasında bulunamadı.');
    }

    await guestModel.delete({
      where: { id: guestId },
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/guests');

    return { success: true };
  } catch (error: unknown) {
    console.error('❌ deleteGuestAction hatası:', error);
    return { success: false, error: 'Davetli silinemedi.' };
  }
}