'use server';

import { cookies } from 'next/headers';
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

const BUDGET_COOKIE = 'wedyplan_budget_data';

const INITIAL_MOCK_ITEMS = [
  { id: '1', title: 'Mekan Kır Bahçesi Anlaşması', category: 'Mekan', allocatedAmount: 180000, spentAmount: 180000, status: 'PAID' },
  { id: '2', title: 'Dış Çekim Fotoğrafçı', category: 'Fotograf', allocatedAmount: 35000, spentAmount: 15000, status: 'PARTIAL' },
  { id: '3', title: 'Gelinlik & Aksesuar', category: 'Giyim', allocatedAmount: 45000, spentAmount: 0, status: 'PENDING' },
  { id: '4', title: 'Orkestra & DJ Performansı', category: 'Müzik', allocatedAmount: 30000, spentAmount: 30000, status: 'PAID' },
];

// 1. Bütçe Verilerini Getir (DB veya Cookie)
export async function getBudgetItems() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: 'Oturum bulunamadı.' };
    }

    // Önce Veritabanını Dene
    try {
      const dbItems = await (prisma as any).budgetItem.findMany({
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
    const budgetCookie = cookieStore.get(BUDGET_COOKIE)?.value;

    let items = INITIAL_MOCK_ITEMS;
    if (budgetCookie) {
      try {
        items = JSON.parse(budgetCookie);
      } catch (e) {
        items = INITIAL_MOCK_ITEMS;
      }
    }

    return { success: true, data: items };
  } catch (error: any) {
    console.error('getBudgetItems error:', error);
    return { success: false, error: 'Bütçe verileri alınamadı.' };
  }
}

// 2. Yeni Bütçe Kalemi Ekle (DB + Cookie + Revalidate)
export async function createBudgetItem(data: BudgetItemInput) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };

    const cookieStore = await cookies();
    const budgetCookie = cookieStore.get(BUDGET_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_ITEMS;
    if (budgetCookie) {
      try {
        currentItems = JSON.parse(budgetCookie);
      } catch (e) {}
    }

    const newItem = {
      id: crypto.randomUUID(),
      title: data.title,
      category: data.category,
      allocatedAmount: Number(data.allocatedAmount),
      spentAmount: Number(data.spentAmount) || 0,
      status: data.status || 'PENDING',
    };

    // 1. DB'ye Kaydetmeyi Dene
    try {
      await (prisma as any).budgetItem.create({
        data: {
          userId: session.userId,
          title: data.title,
          category: data.category,
          allocatedAmount: data.allocatedAmount,
          spentAmount: data.spentAmount || 0,
          status: data.status || 'PENDING',
        },
      });
    } catch (e) {
      // DB hazır değilse sorun yok, çereze yazılacak
    }

    // 2. Çereze Yaz (Dashboard'un Görebilmesi İçin Şart)
    const updatedItems = [newItem, ...currentItems];
    cookieStore.set(BUDGET_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 gün
    });

    // Sayfaların Önbelleğini Temizle
    revalidatePath('/cift/butce');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    console.error('createBudgetItem error:', error);
    return { success: false, error: 'Kalem eklenemedi.' };
  }
}

// 3. Bütçe Kalemi Sil
export async function deleteBudgetItem(id: string) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };

    const cookieStore = await cookies();
    const budgetCookie = cookieStore.get(BUDGET_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_ITEMS;
    if (budgetCookie) {
      try {
        currentItems = JSON.parse(budgetCookie);
      } catch (e) {}
    }

    // DB'den Sil
    try {
      await (prisma as any).budgetItem.delete({ where: { id } });
    } catch (e) {}

    // Çerezden Sil
    const updatedItems = currentItems.filter((item: any) => item.id !== id);
    cookieStore.set(BUDGET_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/butce');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    console.error('deleteBudgetItem error:', error);
    return { success: false, error: 'Kalem silinemedi.' };
  }
}