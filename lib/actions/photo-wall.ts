'use server';

import { prisma } from '@/lib/db';
import { getActiveCoupleId, getSession } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function getPhotoWallItems() {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };
    const coupleId = await getActiveCoupleId();
    const photos = await (prisma as any).couplePhoto.findMany({
      where: { coupleId },
      orderBy: { createdAt: 'desc' },
    }).catch(() => []);
    return { success: true, data: photos || [] };
  } catch (error) {
    console.error('Fotoğraflar çekilirken hata:', error);
    return { success: false, error: 'Fotoğraf galerisi yüklenemedi.', data: [] };
  }
}

export async function createPhotoWallItem(data: {
  coupleId?: string;
  url: string;
  caption?: string;
  uploaderName?: string;
}) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };
    const coupleId = await getActiveCoupleId(data.coupleId);
    await (prisma as any).couplePhoto.create({
      data: {
        coupleId,
        userId: session.userId,
        url: data.url,
        caption: data.caption || '',
        uploaderName: data.uploaderName || 'Çift',
      },
    });
    revalidatePath('/cift/fotograf-duvari');
    return getPhotoWallItems();
  } catch (error) {
    console.error('Fotoğraf eklenirken hata:', error);
    return { success: false, error: 'Fotoğraf yüklenemedi.' };
  }
}

export async function deletePhotoWallItem(id: string) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false };
    await (prisma as any).couplePhoto.deleteMany({ where: { id, userId: session.userId } }).catch(() => null);
    revalidatePath('/cift/fotograf-duvari');
    return getPhotoWallItems();
  } catch (error) {
    return { success: false, error: 'Silinemedi.' };
  }
}
