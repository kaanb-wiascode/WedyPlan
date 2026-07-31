// lib/actions/budget.ts
'use server';

import { db } from '@/lib/db';
import { getActiveCoupleId } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

// 1. Çiftin bütçe kalemlerini ve özetini getir
export async function getBudgetItems(coupleId?: string) {
  try {
    const activeCoupleId = await getActiveCoupleId(coupleId);
    const budgetModel = (db as any).budgetItem || (db as any).budget;

    if (!budgetModel) {
      return { success: false, error: 'Veritabanı bütçe modeli bulunamadı.' };
    }

    const items = await budgetModel.findMany({
      where: { coupleId: activeCoupleId },
      orderBy: { createdAt: 'desc' },
    });

    const totalBudget = items.reduce(
      (acc: number, item: { allocatedAmount?: number }) => acc + (item.allocatedAmount || 0),
      0
    );
    const totalSpent = items.reduce(
      (acc: number, item: { spentAmount?: number }) => acc + (item.spentAmount || 0),
      0
    );

    return {
      success: true,
      data: {
        items,
        summary: {
          totalBudget,
          totalSpent,
          remaining: totalBudget - totalSpent,
        },
      },
    };
  } catch (error) {
    console.error('Bütçe kalemleri alınırken hata:', error);
    return { success: false, error: 'Bütçe verileri yüklenemedi.' };
  }
}

// 2. Yeni bütçe kalemi ekle
export async function createBudgetItem(data: {
  coupleId?: string;
  category: string;
  title: string;
  allocatedAmount: number;
  spentAmount?: number;
  notes?: string;
}) {
  try {
    const activeCoupleId = await getActiveCoupleId(data.coupleId);
    const budgetModel = (db as any).budgetItem || (db as any).budget;

    if (!budgetModel) {
      return { success: false, error: 'Veritabanı bütçe modeli bulunamadı.' };
    }

    const newItem = await budgetModel.create({
      data: {
        coupleId: activeCoupleId,
        category: data.category,
        title: data.title,
        allocatedAmount: data.allocatedAmount,
        spentAmount: data.spentAmount || 0,
        notes: data.notes || '',
      },
    });

    revalidatePath('/cift/butce');
    return { success: true, data: newItem };
  } catch (error) {
    console.error('Bütçe kalemi oluşturulurken hata:', error);
    return { success: false, error: 'Bütçe kalemi eklenemedi.' };
  }
}

// 3. Bütçe kalemini sil (Sayfada çağrılan dışa aktarım)
export async function deleteBudgetItem(id: string) {
  try {
    const budgetModel = (db as any).budgetItem || (db as any).budget;

    if (!budgetModel) {
      return { success: false, error: 'Veritabanı bütçe modeli bulunamadı.' };
    }

    await budgetModel.delete({
      where: { id },
    });

    revalidatePath('/cift/butce');
    return { success: true };
  } catch (error) {
    console.error('Bütçe kalemi silinirken hata:', error);
    return { success: false, error: 'Bütçe kalemi silinemedi.' };
  }
}