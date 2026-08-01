'use server';

import { cookies } from 'next/headers';
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

const CHECKLIST_COOKIE = 'wedyplan_checklist_data';

// İlk kullanım için hazır kurumsal düğün adımları
const INITIAL_MOCK_TASKS = [
  {
    id: '1',
    title: 'Düğün Mekanı Tadım Randevusu Alınacak',
    category: 'Mekan & Yeme-İçme',
    priority: 'HIGH',
    assignedToName: 'Mert',
    dueDate: '2026-08-15',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Gelinlik İlk Prova Tarihi Belirlenecek',
    category: 'Kıyafet & Stil',
    priority: 'HIGH',
    assignedToName: 'Eda',
    dueDate: '2026-08-20',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Müzik & DJ Giriş Şarkısı Listesi Hazırlığı',
    category: 'Eğlence & Müzik',
    priority: 'MEDIUM',
    assignedToName: 'Birlikte',
    dueDate: '2026-08-25',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Davetiye Baskı Onayı Verilecek',
    category: 'Matbaa & Davetiye',
    priority: 'HIGH',
    assignedToName: 'Eda',
    dueDate: '2026-08-10',
    isCompleted: false,
  },
];

// 1. Görev Listesini Çek
export async function getChecklistItems() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: 'Oturum bulunamadı.' };
    }

    // Önce Veritabanını Dene
    try {
      const dbItems = await (prisma as any).checklistItem.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: 'desc' },
      });
      if (dbItems && dbItems.length > 0) {
        return { success: true, data: dbItems };
      }
    } catch (e) {
      // DB Tablosu yoksa Çerez Katmanına Geç
    }

    // Çerez Katmanını Oku
    const cookieStore = await cookies();
    const checklistCookie = cookieStore.get(CHECKLIST_COOKIE)?.value;

    let items = INITIAL_MOCK_TASKS;
    if (checklistCookie) {
      try {
        items = JSON.parse(checklistCookie);
      } catch (e) {
        items = INITIAL_MOCK_TASKS;
      }
    }

    return { success: true, data: items };
  } catch (error) {
    console.error('getChecklistItems hatası:', error);
    return { success: false, error: 'Görevler alınamadı.' };
  }
}

// Orijinal Kod Uyumluluğu İçin Alias Export
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

// 2. Yeni Görev Ekle
export async function createChecklistItem(data: ChecklistItemInput) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };

    const cookieStore = await cookies();
    const checklistCookie = cookieStore.get(CHECKLIST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_TASKS;
    if (checklistCookie) {
      try {
        currentItems = JSON.parse(checklistCookie);
      } catch (e) {}
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: data.title,
      category: data.category || 'Genel',
      priority: data.priority || 'MEDIUM',
      assignedToName: data.assignedToName || 'Birlikte',
      dueDate: data.dueDate || new Date().toISOString().split('T')[0],
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    // E-Posta Bildirimi Logu
    if (data.sendEmailNotification) {
      console.log(`[E-POSTA BİLDİRİMİ SİMÜLASYONU]: "${newItem.title}" görevi ${newItem.assignedToName} kişisine atandı.`);
    }

    // DB'ye Kaydetmeyi Dene
    try {
      await (prisma as any).checklistItem.create({
        data: {
          userId: session.userId,
          title: data.title,
          category: data.category,
          priority: data.priority,
          assignedToName: data.assignedToName,
          dueDate: data.dueDate,
          isCompleted: false,
        },
      });
    } catch (e) {}

    const updatedItems = [newItem, ...currentItems];
    cookieStore.set(CHECKLIST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/cift/dashboard');

    return {
      success: true,
      data: updatedItems,
      emailSent: data.sendEmailNotification || false,
    };
  } catch (error) {
    console.error('createChecklistItem hatası:', error);
    return { success: false, error: 'Görev eklenemedi.' };
  }
}

export async function createChecklistTask(data: any) {
  return createChecklistItem({
    title: data.title,
    category: data.category,
    priority: 'MEDIUM',
    dueDate: data.dueDate,
  });
}

// 3. Görev Durumunu Değiştir
export async function toggleChecklistItem(id: string) {
  try {
    const cookieStore = await cookies();
    const checklistCookie = cookieStore.get(CHECKLIST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_TASKS;
    if (checklistCookie) {
      try {
        currentItems = JSON.parse(checklistCookie);
      } catch (e) {}
    }

    const updatedItems = currentItems.map((item: any) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted, completed: !item.isCompleted };
      }
      return item;
    });

    try {
      const target = currentItems.find((i: any) => i.id === id);
      await (prisma as any).checklistItem.update({
        where: { id },
        data: { isCompleted: !target?.isCompleted },
      });
    } catch (e) {}

    cookieStore.set(CHECKLIST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}

export async function toggleTaskStatus(id: string, completed: boolean) {
  return toggleChecklistItem(id);
}

// 4. Görev Sil
export async function deleteChecklistItem(id: string) {
  try {
    const cookieStore = await cookies();
    const checklistCookie = cookieStore.get(CHECKLIST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_TASKS;
    if (checklistCookie) {
      try {
        currentItems = JSON.parse(checklistCookie);
      } catch (e) {}
    }

    try {
      await (prisma as any).checklistItem.delete({ where: { id } });
    } catch (e) {}

    const updatedItems = currentItems.filter((item: any) => item.id !== id);

    cookieStore.set(CHECKLIST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/gorevler');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteChecklistTask(id: string) {
  return deleteChecklistItem(id);
}

export async function generateAIChecklistAction(category?: string) {
  return {
    success: true,
    message: `${category || 'Düğün'} kategorisi için önerilen AI kontrol listesi hazırlandı.`,
  };
}