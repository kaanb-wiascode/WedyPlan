'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export interface ChecklistItemInput {
  title: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  assignedToName?: string;
  dueDate?: string;
  sendEmailNotification?: boolean;
}

export async function getChecklistItems() {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };
  const dbItems = await (prisma as any).checklistItem.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  return { success: true, data: dbItems || [] };
}

export async function getChecklistTasks() {
  const res = await getChecklistItems();
  if (!res.success || !res.data) return { success: false, error: res.error };
  const tasks = res.data;
  const total = tasks.length;
  const completedCount = tasks.filter((t: any) => t.isCompleted || t.completed).length;
  return {
    success: true,
    data: {
      tasks,
      stats: {
        total,
        completedCount,
        pendingCount: total - completedCount,
        percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0,
      },
    },
  };
}

export async function createChecklistItem(data: ChecklistItemInput) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };
  await (prisma as any).checklistItem.create({
    data: {
      userId: session.userId,
      title: data.title,
      category: data.category,
      priority: data.priority,
      assignedToName: data.assignedToName || 'Birlikte',
      dueDate: data.dueDate || null,
      isCompleted: false,
    },
  }).catch(() => null);
  revalidatePath('/cift/gorevler');
  revalidatePath('/cift/dashboard');
  return getChecklistItems();
}

export async function createChecklistTask(data: any) {
  return createChecklistItem({
    title: data.title,
    category: data.category,
    priority: 'MEDIUM',
    dueDate: data.dueDate,
  });
}

export async function toggleChecklistItem(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  const current = await (prisma as any).checklistItem.findFirst({ where: { id, userId: session.userId } }).catch(() => null);
  if (!current) return { success: false };
  await (prisma as any).checklistItem.update({
    where: { id },
    data: { isCompleted: !current.isCompleted },
  }).catch(() => null);
  revalidatePath('/cift/gorevler');
  revalidatePath('/cift/dashboard');
  return getChecklistItems();
}

export async function toggleTaskStatus(id: string) {
  return toggleChecklistItem(id);
}

export async function deleteChecklistItem(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  await (prisma as any).checklistItem.deleteMany({ where: { id, userId: session.userId } }).catch(() => null);
  revalidatePath('/cift/gorevler');
  revalidatePath('/cift/dashboard');
  return getChecklistItems();
}

export async function deleteChecklistTask(id: string) {
  return deleteChecklistItem(id);
}

export async function generateAIChecklistAction() {
  return { success: true, message: 'Görevler listenizden ve firma anlaşmalarınızdan üretilir.' };
}
