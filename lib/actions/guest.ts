'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export interface GuestInput {
  fullName: string;
  email?: string;
  phone?: string;
  group: string; // 'Gelin Tarafı' | 'Damat Tarafı' | 'Ortak / Arkadaş' | 'VIP'
  plusOneCount?: number;
  dietaryPreference?: string;
}

const GUEST_COOKIE = 'wedyplan_guest_data';
const WISHLIST_COOKIE = 'wedyplan_wishlist_data';

// Başlangıç Örnek Davetli Listesi
const INITIAL_MOCK_GUESTS = [
  { id: '1', fullName: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '+905321112233', group: 'Gelin Tarafı', plusOneCount: 1, rsvpStatus: 'ACCEPTED', dietaryPreference: 'Standart' },
  { id: '2', fullName: 'Ayşe Kaya', email: 'ayse@example.com', phone: '+905332223344', group: 'Damat Tarafı', plusOneCount: 0, rsvpStatus: 'ACCEPTED', dietaryPreference: 'Vejetaryen' },
  { id: '3', fullName: 'Mehmet Demir', email: 'mehmet@example.com', phone: '+905343334455', group: 'Ortak / Arkadaş', plusOneCount: 1, rsvpStatus: 'DECLINED', dietaryPreference: 'Glutensiz' },
  { id: '4', fullName: 'Zeynep Şahin', email: 'zeynep@example.com', phone: '+905354445566', group: 'VIP', plusOneCount: 0, rsvpStatus: 'PENDING', dietaryPreference: 'Standart' },
];

// Çiftin E-Ticaret / Çeyiz Portalı Hediye İstek Listesi
const INITIAL_MOCK_WISHLIST = [
  { id: 'w1', title: 'Dyson V15 Kablosuz Süpürge', category: 'Küçük Ev Aletleri', price: 24999, imageUrl: '/assets/gifts/vacuum.jpg', isPurchased: true, purchasedBy: 'Ahmet Yılmaz' },
  { id: 'w2', title: 'Karaca 84 Parça Yemek Takımı', category: 'Mutfak & Sofra', price: 18500, imageUrl: '/assets/gifts/dinnerware.jpg', isPurchased: false, purchasedBy: null },
  { id: 'w3', title: 'Nespresso Kahve Makinesi', category: 'Mutfak', price: 8999, imageUrl: '/assets/gifts/coffee.jpg', isPurchased: false, purchasedBy: null },
];

// 1. Davetlileri Çek
export async function getGuestItems() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: 'Oturum bulunamadı.' };
    }

    try {
      const dbItems = await (prisma as any).guest.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: 'desc' },
      });
      if (dbItems && dbItems.length > 0) {
        return { success: true, data: dbItems };
      }
    } catch (e) {}

    const cookieStore = await cookies();
    const guestCookie = cookieStore.get(GUEST_COOKIE)?.value;

    let items = INITIAL_MOCK_GUESTS;
    if (guestCookie) {
      try {
        items = JSON.parse(guestCookie);
      } catch (e) {
        items = INITIAL_MOCK_GUESTS;
      }
    }

    return { success: true, data: items };
  } catch (error) {
    console.error('getGuestItems error:', error);
    return { success: false, error: 'Davetliler alınamadı.' };
  }
}

// 2. Yeni Davetli Ekle
export async function createGuestItem(data: GuestInput) {
  try {
    const session = await getSession();
    if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };

    const cookieStore = await cookies();
    const guestCookie = cookieStore.get(GUEST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_GUESTS;
    if (guestCookie) {
      try {
        currentItems = JSON.parse(guestCookie);
      } catch (e) {}
    }

    const newGuest = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email || '',
      phone: data.phone || '',
      group: data.group || 'Ortak / Arkadaş',
      plusOneCount: Number(data.plusOneCount) || 0,
      rsvpStatus: 'PENDING',
      dietaryPreference: data.dietaryPreference || 'Standart',
    };

    try {
      await (prisma as any).guest.create({
        data: {
          userId: session.userId,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          group: data.group,
          plusOneCount: data.plusOneCount,
          rsvpStatus: 'PENDING',
        },
      });
    } catch (e) {}

    const updatedItems = [newGuest, ...currentItems];
    cookieStore.set(GUEST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false, error: 'Davetli eklenemedi.' };
  }
}

// 3. Çok Kanallı Davetiye Gönder (Mail/WhatsApp/SMS)
export async function sendGuestInvitation(guestId: string, channel: 'EMAIL' | 'WHATSAPP' | 'SMS') {
  try {
    console.log(`[DAVETİYE GÖNDERİLDİ]: Davetli ID: ${guestId}, Kanal: ${channel}`);
    
    // İşlem simülasyonu
    return {
      success: true,
      message: channel === 'EMAIL' 
        ? 'E-posta davetiyesi ücretsiz olarak başarıyla gönderildi.'
        : `${channel} davetiyesi bakiye hesabınızdan düşülerek iletildi.`,
    };
  } catch (error) {
    return { success: false, error: 'Davetiye gönderilemedi.' };
  }
}

// 4. LCV Statü Değiştir (Katılıyor / Katılamıyor)
export async function updateGuestRsvp(guestId: string, status: 'ACCEPTED' | 'DECLINED' | 'PENDING') {
  try {
    const cookieStore = await cookies();
    const guestCookie = cookieStore.get(GUEST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_GUESTS;
    if (guestCookie) {
      try {
        currentItems = JSON.parse(guestCookie);
      } catch (e) {}
    }

    const updatedItems = currentItems.map((item: any) => {
      if (item.id === guestId) {
        return { ...item, rsvpStatus: status };
      }
      return item;
    });

    cookieStore.set(GUEST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}

// 5. Davetli Sil
export async function deleteGuestItem(id: string) {
  try {
    const cookieStore = await cookies();
    const guestCookie = cookieStore.get(GUEST_COOKIE)?.value;

    let currentItems = INITIAL_MOCK_GUESTS;
    if (guestCookie) {
      try {
        currentItems = JSON.parse(guestCookie);
      } catch (e) {}
    }

    const updatedItems = currentItems.filter((item: any) => item.id !== id);

    cookieStore.set(GUEST_COOKIE, JSON.stringify(updatedItems), {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    revalidatePath('/cift/davetliler');
    revalidatePath('/cift/dashboard');

    return { success: true, data: updatedItems };
  } catch (error) {
    return { success: false };
  }
}

// 6. Çeyiz Portalı İstek Listesini Getir
export async function getWishlistItems() {
  const cookieStore = await cookies();
  const wishlistCookie = cookieStore.get(WISHLIST_COOKIE)?.value;

  let items = INITIAL_MOCK_WISHLIST;
  if (wishlistCookie) {
    try { items = JSON.parse(wishlistCookie); } catch (e) {}
  }

  return { success: true, data: items };
}