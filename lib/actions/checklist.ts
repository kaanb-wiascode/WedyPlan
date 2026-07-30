'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { generateAiResponseAction } from '@/lib/ai/ai-core-platform';

export interface CreateTaskInput {
  userId: string;
  title: string;
  category: string;
  dueDate?: Date | string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ChecklistTaskRecord {
  id: string;
  userId: string;
  title: string;
  category: string;
  isCompleted: boolean;
  dueDate?: Date | null;
  priority?: string;
  createdAt?: Date;
}

export async function getChecklistTasksAction(userId: string) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).coupleTask || (db as any).task;
    let tasks: ChecklistTaskRecord[] = [];

    if (taskModel) {
      tasks = await taskModel.findMany({
        where: { userId },
        orderBy: [{ isCompleted: 'asc' }, { dueDate: 'asc' }],
      });
    }

    const completedCount = tasks.filter((t: ChecklistTaskRecord) => t.isCompleted).length;

    return {
      success: true,
      data: {
        tasks,
        stats: {
          total: tasks.length,
          completed: completedCount,
          pending: tasks.length - completedCount,
          progressPercentage: tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0,
        },
      },
    };
  } catch (error: unknown) {
    console.error('❌ getChecklistTasksAction hatası:', error);
    return {
      success: false,
      error: 'Görev listesi yüklenirken bir hata oluştu.',
      data: { tasks: [], stats: { total: 0, completed: 0, pending: 0, progressPercentage: 0 } },
    };
  }
}

export async function toggleTaskCompletionAction(taskId: string, isCompleted: boolean) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).coupleTask || (db as any).task;

    if (!taskModel) {
      throw new Error('Görev modeli Prisma şemasında bulunamadı.');
    }

    const updatedTask = await taskModel.update({
      where: { id: taskId },
      data: { isCompleted },
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/checklist');

    return { success: true, data: updatedTask };
  } catch (error: unknown) {
    console.error('❌ toggleTaskCompletionAction hatası:', error);
    return { success: false, error: 'Görev durumu güncellenemedi.' };
  }
}

export async function createChecklistTaskAction(input: CreateTaskInput) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).coupleTask || (db as any).task;

    if (!taskModel) {
      throw new Error('Görev modeli Prisma şemasında bulunamadı.');
    }

    const newTask = await taskModel.create({
      data: {
        userId: input.userId,
        title: input.title,
        category: input.category,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        priority: input.priority || 'MEDIUM',
        isCompleted: false,
      },
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/checklist');

    return { success: true, data: newTask };
  } catch (error: unknown) {
    console.error('❌ createChecklistTaskAction hatası:', error);
    return { success: false, error: 'Görev oluşturulurken bir hata oluştu.' };
  }
}

export async function deleteChecklistTaskAction(taskId: string) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).coupleTask || (db as any).task;

    if (!taskModel) {
      throw new Error('Görev modeli Prisma şemasında bulunamadı.');
    }

    await taskModel.delete({
      where: { id: taskId },
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/checklist');

    return { success: true };
  } catch (error: unknown) {
    console.error('❌ deleteChecklistTaskAction hatası:', error);
    return { success: false, error: 'Görev silinemedi.' };
  }
}

/**
 * AI Otomatik Kontrol Listesi Üretici Aksiyonu
 */
export async function generateAIChecklistAction(weddingDate: string, theme?: string) {
  try {
    const prompt = `Düğün tarihi ${weddingDate} olan ve konsepti "${theme || 'Klasik'}" olan bir çift için hazırlanması gereken kritik düğün kontrol listesi adımlarını çıkar.`;
    const aiResponse = await generateAiResponseAction({ prompt });
    return { success: true, checklist: aiResponse.text };
  } catch (error: unknown) {
    console.error('❌ generateAIChecklistAction hatası:', error);
    return { success: false, error: 'AI kontrol listesi üretilemedi.' };
  }
}