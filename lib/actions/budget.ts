'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface CreateBudgetItemInput {
  userId: string;
  category: string;
  title: string;
  estimatedCost: number;
  actualCost?: number;
  paidAmount?: number;
  notes?: string;
}

export interface BudgetItemRecord {
  id: string;
  userId: string;
  category: string;
  title: string;
  estimatedCost: number;
  actualCost: number;
  paidAmount: number;
  notes?: string;
  createdAt?: Date;
}

/**
 * Kullanıcıya/Çifte ait tüm bütçe kalemlerini ve özet istatistikleri getirir.
 */
export async function getBudgetSummaryAction(userId: string) {
  try {
    // Model ismi şemadaki tanımlara göre BudgetItem veya Expense olarak esnek sorgulanır
    const budgetModel = (db as any).budgetItem || (db as any).expense || (db as any).coupleBudget;
    
    let items: BudgetItemRecord[] = [];
    
    if (budgetModel) {
      items = await budgetModel.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    }

    const totalEstimated = items.reduce((acc: number, item: BudgetItemRecord) => acc + (Number(item.estimatedCost) || 0), 0);
    const totalActual = items.reduce((acc: number, item: BudgetItemRecord) => acc + (Number(item.actualCost) || 0), 0);
    const totalPaid = items.reduce((acc: number, item: BudgetItemRecord) => acc + (Number(item.paidAmount) || 0), 0);

    return {
      success: true,
      data: {
        items,
        summary: {
          totalEstimated,
          totalActual,
          totalPaid,
          remainingBalance: totalActual - totalPaid,
        },
      },
    };
  } catch (error: unknown) {
    console.error('❌ getBudgetSummaryAction hatası:', error);
    return {
      success: false,
      error: 'Bütçe verileri yüklenirken bir hata oluştu.',
      data: { items: [], summary: { totalEstimated: 0, totalActual: 0, totalPaid: 0, remainingBalance: 0 } },
    };
  }
}

/**
 * Yeni bir bütçe harcama kalemi ekler.
 */
export async function createBudgetItemAction(input: CreateBudgetItemInput) {
  try {
    const budgetModel = (db as any).budgetItem || (db as any).expense || (db as any).coupleBudget;

    if (!budgetModel) {
      throw new Error('Bütçe modeli Prisma şemasında bulunamadı.');
    }

    const newItem = await budgetModel.create({
      data: {
        userId: input.userId,
        category: input.category,
        title: input.title,
        estimatedCost: input.estimatedCost,
        actualCost: input.actualCost ?? input.estimatedCost,
        paidAmount: input.paidAmount ?? 0,
        notes: input.notes ?? '',
      },
    });

    revalidatePath('/cift/butce');
    revalidatePath('/budget');

    return { success: true, data: newItem };
  } catch (error: unknown) {
    console.error('❌ createBudgetItemAction hatası:', error);
    return { success: false, error: 'Bütçe kalemi eklenirken bir hata oluştu.' };
  }
}

/**
 * Bütçe kaleminin ödeme/harcama miktarını günceller.
 */
export async function updateBudgetItemAction(
  id: string,
  data: Partial<CreateBudgetItemInput>
) {
  try {
    const budgetModel = (db as any).budgetItem || (db as any).expense || (db as any).coupleBudget;

    if (!budgetModel) {
      throw new Error('Bütçe modeli Prisma şemasında bulunamadı.');
    }

    const updated = await budgetModel.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.category && { category: data.category }),
        ...(data.estimatedCost !== undefined && { estimatedCost: data.estimatedCost }),
        ...(data.actualCost !== undefined && { actualCost: data.actualCost }),
        ...(data.paidAmount !== undefined && { paidAmount: data.paidAmount }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
    });

    revalidatePath('/cift/butce');
    revalidatePath('/budget');

    return { success: true, data: updated };
  } catch (error: unknown) {
    console.error('❌ updateBudgetItemAction hatası:', error);
    return { success: false, error: 'Bütçe kalemi güncellenemedi.' };
  }
}

/**
 * Bütçe kalemini siler.
 */
export async function deleteBudgetItemAction(id: string) {
  try {
    const budgetModel = (db as any).budgetItem || (db as any).expense || (db as any).coupleBudget;

    if (!budgetModel) {
      throw new Error('Bütçe modeli Prisma şemasında bulunamadı.');
    }

    await budgetModel.delete({
      where: { id },
    });

    revalidatePath('/cift/butce');
    revalidatePath('/budget');

    return { success: true };
  } catch (error: unknown) {
    console.error('❌ deleteBudgetItemAction hatası:', error);
    return { success: false, error: 'Bütçe kalemi silinemedi.' };
  }
}