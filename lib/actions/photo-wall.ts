// lib/actions/photo-wall.ts
'use server';

import { db } from '@/lib/db';
import { getActiveCoupleId } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

// 1. Çifte ait fotoğraf duvarı görsellerini getir
export async function getPhotoWallItems(coupleId?: string) {
  try {
    const activeCoupleId = await getActiveCoupleId(coupleId);
    const photoModel =
      (db as any).photoWall || (db as any).media || (db as any).photo;

    if (!photoModel) {
      return { success: false, error: 'Fotoğraf duvarı veritabanı modeli bulunamadı.' };
    }

    const photos = await photoModel.findMany({
      where: { coupleId: activeCoupleId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: photos,
    };
  } catch (error) {
    console.error('Fotoğraflar çekilirken hata:', error);
    return { success: false, error: 'Fotoğraf galerisi yüklenemedi.' };
  }
}

// 2. Fotoğraf duvarına yeni görsel ekle
export async function createPhotoWallItem(data: {
  coupleId?: string;
  url: string;
  caption?: string;
  uploaderName?: string;
}) {
  try {
    const activeCoupleId = await getActiveCoupleId(data.coupleId);
    const photoModel =
      (db as any).photoWall || (db as any).media || (db as any).photo;

    if (!photoModel) {
      return { success: false, error: 'Fotoğraf duvarı veritabanı modeli bulunamadı.' };
    }

    const newPhoto = await photoModel.create({
      data: {
        coupleId: activeCoupleId,
        url: data.url,
        caption: data.caption || '',
        uploaderName: data.uploaderName || 'Çift',
        likesCount: 0,
      },
    });

    revalidatePath('/cift/fotograf-duvari');
    return {
      success: true,
      data: newPhoto,
    };
  } catch (error) {
    console.error('Fotoğraf eklenirken hata:', error);
    return { success: false, error: 'Fotoğraf yüklenemedi.' };
  }
}

// 3. Fotoğraf duvarından görsel sil
export async function deletePhotoWallItem(id: string) {
  try {
    const photoModel =
      (db as any).photoWall || (db as any).media || (db as any).photo;

    if (!photoModel) {
      return { success: false, error: 'Fotoğraf duvarı veritabanı modeli bulunamadı.' };
    }

    await photoModel.delete({
      where: { id },
    });

    revalidatePath('/cift/fotograf-duvari');
    return { success: true };
  } catch (error) {
    console.error('Fotoğraf silinirken hata:', error);
    return { success: false, error: 'Fotoğraf silinemedi.' };
  }
}