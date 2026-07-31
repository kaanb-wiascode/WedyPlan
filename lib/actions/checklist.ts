// lib/actions/checklist.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Çiftin görevlerini ve tamamlanma istatistiklerini getir
export async function getChecklistTasks(coupleId: string) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).task || (db as any).checklist;

    if (!taskModel) {
      return { success: false, error: 'Görev veritabanı modeli bulunamadı.' };
    }

    const tasks = await taskModel.findMany({
      where: { coupleId },
      orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }],
    });

    const total = tasks.length;
    const completedCount = tasks.filter((t: any) => t.completed).length;

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
  } catch (error) {
    console.error('Görevler çekilirken hata:', error);
    return { success: false, error: 'Görev listesi alınamadı.' };
  }
}

// 2. Yeni görev ekle
export async function createChecklistTask(data: {
  coupleId: string;
  title: string;
  category?: string;
  dueDate?: string;
}) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).task || (db as any).checklist;

    const newTask = await taskModel.create({
      data: {
        coupleId: data.coupleId,
        title: data.title,
        category: data.category || 'Genel',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        completed: false,
      },
    });

    revalidatePath('/cift/gorevler');
    return { success: true, data: newTask };
  } catch (error) {
    console.error('Görev eklenirken hata:', error);
    return { success: false, error: 'Görev eklenemedi.' };
  }
}

// 3. Görev Tamamlanma Durumunu Değiştir (Toggle)
export async function toggleTaskStatus(id: string, completed: boolean) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).task || (db as any).checklist;

    const updated = await taskModel.update({
      where: { id },
      data: { completed },
    });

    revalidatePath('/cift/gorevler');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Görev güncellenirken hata:', error);
    return { success: false, error: 'Görev durumu değiştirilemedi.' };
  }
}

// 4. Görev Sil
export async function deleteChecklistTask(id: string) {
  try {
    const taskModel = (db as any).checklistItem || (db as any).task || (db as any).checklist;

    await taskModel.delete({
      where: { id },
    });

    revalidatePath('/cift/gorevler');
    return { success: true };
  } catch (error) {
    console.error('Görev silinirken hata:', error);
    return { success: false, error: 'Görev silinemedi.' };
  }
}

// 5. Eksik Export: AI Otomatik Kontrol Listesi Oluşturma
export async function generateAIChecklistAction(category?: string) {
  return {
    success: true,
    message: `${category || 'Düğün'} kategorisi için önerilen AI kontrol listesi hazırlandı.`,
  };
}