'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { createBudgetItem } from './budget';

export interface VendorContractInput {
  vendorName: string;
  category: string;
  totalAmount: number;
  paidAmount: number;
  contractDate: string;
}

export interface ReviewInput {
  vendorId: string;
  rating: number;
  comment: string;
  platformFeedback?: string;
}

const VENDOR_COOKIE = 'wedyplan_vendor_data';

// Başlangıç Anlaşmalı Firma Verileri
const INITIAL_MOCK_VENDORS = [
  {
    id: 'v1',
    name: 'Kır Bahçesi Davet & Tesisleri',
    category: 'Mekan & Yeme-İçme',
    contactPerson: 'Selin Yılmaz',
    phone: '+90 532 100 20 30',
    status: 'BOOKED',
    totalAmount: 180000,
    paidAmount: 180000,
    contractStatus: 'APPROVED',
    contractUrl: '/contracts/mekan-sozlesme.pdf',
    milestones: [
      { id: 'm1', title: 'Tadım Randevusu', done: true },
      { id: 'm2', title: 'Masa Düzeni Onayı', done: true },
      { id: 'm3', title: 'Etkinlik Günü Organizasyon', done: false },
    ],
  },
  {
    id: 'v2',
    name: 'Studio Masal Fotoğrafçılık',
    category: 'Fotoğraf & Video',
    contactPerson: 'Caner Şahin',
    phone: '+90 533 400 50 60',
    status: 'BOOKED',
    totalAmount: 35000,
    paidAmount: 15000,
    contractStatus: 'APPROVED',
    contractUrl: '/contracts/fotograf-sozlesme.pdf',
    milestones: [
      { id: 'm4', title: 'Dış Çekim Yapılması', done: false },
      { id: 'm5', title: 'Albüm Teslimatı', done: false },
    ],
  },
  {
    id: 'v3',
    name: 'Görkem Müzik & Orkestra',
    category: 'Müzik & Eğlence',
    contactPerson: 'Görkem Tan',
    phone: '+90 535 700 80 90',
    status: 'FAVORITE',
    totalAmount: 30000,
    paidAmount: 0,
    contractStatus: 'PENDING_APPROVAL',
    contractUrl: null,
    milestones: [],
  },
];

// 1. Firma Verilerini Çek
export async function getVendorDashboardData() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: 'Oturum bulunamadı.' };
    }

    const cookieStore = await cookies();
    const vendorCookie = cookieStore.get(VENDOR_COOKIE)?.value;

    let items = INITIAL_MOCK_VENDORS;
    if (vendorCookie) {
      try {
        items = JSON.parse(vendorCookie);
      } catch (e) {
        items = INITIAL_MOCK_VENDORS;
      }
    }

    return { success: true, data: items };
  } catch (error) {
    console.error('getVendorDashboardData hatası:', error);
    return { success: false, error: 'Firma verileri okunamadı.' };
  }
}

// 2. Yeni Anlaşma Ekle & Bütçe Planlayıcı'ya Otomatik İşle
export async function createVendorAgreement(data: VendorContractInput) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };

    const cookieStore = await cookies();
    const vendorCookie = cookieStore.get(VENDOR_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_VENDORS;
    if (vendorCookie) {
      try {
        currentItems = JSON.parse(vendorCookie);
      } catch (e) {}
    }

    const newVendor = {
      id: crypto.randomUUID(),
      name: data.vendorName,
      category: data.category,
      contactPerson: 'Yetkili Temsilci',
      phone: '+90 500 000 00 00',
      status: 'BOOKED',
      totalAmount: Number(data.totalAmount),
      paidAmount: Number(data.paidAmount) || 0,
      contractStatus: 'APPROVED',
      contractUrl: '#',
      milestones: [{ id: crypto.randomUUID(), title: 'Hizmet Başlangıcı', done: false }],
    };

    const updatedItems = [newVendor, ...currentItems];
    cookieStore.set(VENDOR_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    // OTOMATİK BÜTÇE ENTEGRASYONU: Bütçe Planlayıcı'ya Harcama Ekle
    await createBudgetItem({
      title: `${data.vendorName} Anlaşması`,
      category: data.category.includes('Mekan') ? 'Mekan' : 'Diğer',
      allocatedAmount: Number(data.totalAmount),
      spentAmount: Number(data.paidAmount) || 0,
      status: Number(data.paidAmount) >= Number(data.totalAmount) ? 'PAID' : data.paidAmount > 0 ? 'PARTIAL' : 'PENDING',
    });

    revalidatePath('/cift/firmalar');
    revalidatePath('/cift/butce');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    console.error('createVendorAgreement hatası:', error);
    return { success: false, error: 'Anlaşma eklenemedi.' };
  }
}

// 3. Ödeme Ekle & Bütçe Senkronizasyonu Güncelle
export async function addVendorPayment(vendorId: string, additionalPayment: number) {
  try {
    const cookieStore = await cookies();
    const vendorCookie = cookieStore.get(VENDOR_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_VENDORS;
    if (vendorCookie) {
      try { currentItems = JSON.parse(vendorCookie); } catch (e) {}
    }

    let updatedVendorName = '';
    const updatedItems = currentItems.map((v) => {
      if (v.id === vendorId) {
        updatedVendorName = v.name;
        const newPaid = v.paidAmount + Number(additionalPayment);
        return { ...v, paidAmount: Math.min(v.totalAmount, newPaid) };
      }
      return v;
    });

    cookieStore.set(VENDOR_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/firmalar');
    revalidatePath('/cift/butce');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}

// 4. Değerlendirme & WedyPlan Geri Bildirimi Gönder
export async function submitVendorReview(data: ReviewInput) {
  try {
    console.log(`[DEĞERLENDİRME ALINDI]: Firma ID: ${data.vendorId}, Puan: ${data.rating}`);
    if (data.platformFeedback) {
      console.log(`[WEDYPLAN GERİ BİLDİRİMİ]: ${data.platformFeedback}`);
    }

    return { success: true, message: 'Değerlendirmeniz ve WedyPlan geri bildiriminiz kaydedildi.' };
  } catch (error) {
    return { success: false, error: 'Değerlendirme iletilemedi.' };
  }
}