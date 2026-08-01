'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { addVendorPayment } from './vendors';
import { createBudgetItem } from './budget';

export interface PaymentScheduleItem {
  id: string;
  title: string;
  recipient: string;
  category: string;
  type: 'VENDOR' | 'IN_APP_SERVICE';
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'PARTIAL';
  installmentInfo: string;
  vendorId?: string;
}

const PAYMENT_COOKIE = 'wedyplan_payment_schedules';

const INITIAL_PAYMENTS: PaymentScheduleItem[] = [
  {
    id: 'p1',
    title: 'Kır Bahçesi Davet - 2. Taksit',
    recipient: 'Kır Bahçesi Davet & Tesisleri',
    category: 'Mekan & Yeme-İçme',
    type: 'VENDOR',
    amount: 60000,
    paidAmount: 60000,
    dueDate: '2026-07-15',
    status: 'PAID',
    installmentInfo: '1 / 3 Taksit (Kapora)',
    vendorId: 'v1',
  },
  {
    id: 'p2',
    title: 'Kır Bahçesi Davet - Ana Ödeme',
    recipient: 'Kır Bahçesi Davet & Tesisleri',
    category: 'Mekan & Yeme-İçme',
    type: 'VENDOR',
    amount: 120000,
    paidAmount: 0,
    dueDate: '2026-08-20',
    status: 'PENDING',
    installmentInfo: '2 / 3 Taksit',
    vendorId: 'v1',
  },
  {
    id: 'p3',
    title: 'Studio Masal Fotoğrafçılık - Çekim Ödemesi',
    recipient: 'Studio Masal Fotoğrafçılık',
    category: 'Fotoğraf & Video',
    type: 'VENDOR',
    amount: 20000,
    paidAmount: 0,
    dueDate: '2026-08-10',
    status: 'PENDING',
    installmentInfo: 'Kalan Bakiye',
    vendorId: 'v2',
  },
  {
    id: 'p4',
    title: 'Özel Düğün Domaini (.com)',
    recipient: 'WedyPlan Altyapı Servisi',
    category: 'Dijital Hizmetler',
    type: 'IN_APP_SERVICE',
    amount: 450,
    paidAmount: 450,
    dueDate: '2026-06-01',
    status: 'PAID',
    installmentInfo: 'Tek Seferlik',
  },
  {
    id: 'p5',
    title: 'WedyAI Pro & LCV SMS 500 Paketi',
    recipient: 'WedyPlan Platformu',
    category: 'Uygulama İçi Eklenti',
    type: 'IN_APP_SERVICE',
    amount: 1250,
    paidAmount: 0,
    dueDate: '2026-08-05',
    status: 'PENDING',
    installmentInfo: 'Opsiyonel Eklenti',
  },
];

// 1. Ödeme Planını Getir
export async function getPaymentSchedules() {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };

    const cookieStore = await cookies();
    const paymentCookie = cookieStore.get(PAYMENT_COOKIE)?.value;

    let items = INITIAL_PAYMENTS;
    if (paymentCookie) {
      try { items = JSON.parse(paymentCookie); } catch (e) { items = INITIAL_PAYMENTS; }
    }

    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: 'Ödeme planı okunamadı.' };
  }
}

// 2. Ödeme İşleme (Tedarikçi & Bütçe İle Otomatik Senkronize)
export async function processPaymentAction(paymentId: string, payAmount: number, isOnlineCard: boolean = true) {
  try {
    const cookieStore = await cookies();
    const paymentCookie = cookieStore.get(PAYMENT_COOKIE)?.value;

    let items = INITIAL_PAYMENTS;
    if (paymentCookie) {
      try { items = JSON.parse(paymentCookie); } catch (e) {}
    }

    let targetVendorId: string | undefined;

    const updatedItems = items.map((item) => {
      if (item.id === paymentId) {
        targetVendorId = item.vendorId;
        const newPaid = item.paidAmount + Number(payAmount);
        const isCompleted = newPaid >= item.amount;

        return {
          ...item,
          paidAmount: Math.min(item.amount, newPaid),
          status: isCompleted ? 'PAID' : ('PARTIAL' as const),
        };
      }
      return item;
    });

    cookieStore.set(PAYMENT_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    // Eğer bir tedarikçi ödemesiyse, Tedarikçiler servisini ve Bütçeyi güncelle
    if (targetVendorId) {
      await addVendorPayment(targetVendorId, Number(payAmount));
    }

    revalidatePath('/cift/odeme-plani');
    revalidatePath('/cift/butce');
    revalidatePath('/cift/firmalar');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems, message: isOnlineCard ? 'Ödeme başarıyla alındı ve bütçenize işlendi.' : 'Ödeme kaydı oluşturuldu.' };
  } catch (error) {
    return { success: false, error: 'Ödeme işlemi başarısız.' };
  }
}

// 3. Yeni Hizmet Satın Alımı / Ödeme Kalemi Ekleme
export async function createInAppPurchase(title: string, category: string, amount: number) {
  try {
    const cookieStore = await cookies();
    const paymentCookie = cookieStore.get(PAYMENT_COOKIE)?.value;

    let items = INITIAL_PAYMENTS;
    if (paymentCookie) {
      try { items = JSON.parse(paymentCookie); } catch (e) {}
    }

    const newItem: PaymentScheduleItem = {
      id: crypto.randomUUID(),
      title,
      recipient: 'WedyPlan Platformu',
      category,
      type: 'IN_APP_SERVICE',
      amount: Number(amount),
      paidAmount: Number(amount),
      dueDate: new Date().toISOString().split('T')[0],
      status: 'PAID',
      installmentInfo: 'Tek Seferlik',
    };

    const updatedItems = [newItem, ...items];
    cookieStore.set(PAYMENT_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    await createBudgetItem({
      title: `${title} (WedyPlan Hizmeti)`,
      category: 'Dijital Hizmetler',
      allocatedAmount: Number(amount),
      spentAmount: Number(amount),
      status: 'PAID',
    });

    revalidatePath('/cift/odeme-plani');
    revalidatePath('/cift/butce');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}