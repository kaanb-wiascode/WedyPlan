'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export interface BudgetItemInput {
  title: string;
  category: string;
  allocatedAmount: number;
  spentAmount?: number;
  status?: 'PAID' | 'PENDING' | 'PARTIAL';
}

export async function getBudgetItems() {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };
  const dbItems = await (prisma as any).budgetItem.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  return { success: true, data: dbItems || [] };
}

export async function createBudgetItem(data: BudgetItemInput) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };
  const created = await (prisma as any).budgetItem.create({
    data: {
      userId: session.userId,
      title: data.title,
      category: data.category,
      allocatedAmount: Number(data.allocatedAmount) || 0,
      spentAmount: Number(data.spentAmount) || 0,
      status: data.status || 'PENDING',
    },
  }).catch(() => null);
  revalidatePath('/cift/butce');
  revalidatePath('/cift/dashboard');
  if (!created) return { success: false, error: 'Kalem eklenemedi.' };
  const items = await getBudgetItems();
  return { success: true, data: items.data };
}

export async function deleteBudgetItem(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };
  await (prisma as any).budgetItem.deleteMany({ where: { id, userId: session.userId } }).catch(() => null);
  revalidatePath('/cift/butce');
  revalidatePath('/cift/dashboard');
  const items = await getBudgetItems();
  return { success: true, data: items.data };
}
