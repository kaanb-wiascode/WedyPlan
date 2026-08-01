'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';

export interface CoupleProfileData {
  partnerOneName: string;
  partnerTwoName: string;
  weddingDate: string;
  city: string;
  venueName: string;
  guestCountGoal: number;
  targetBudget: number;
}

export interface AppPreferencesData {
  aiRecommendations: boolean;
  smsNotifications: boolean;
  emailDigest: boolean;
  budgetAlerts: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface SavedPaymentMethod {
  id: string;
  cardHolder: string;
  cardNumberMasked: string;
  expiryDate: string;
  cardBrand: 'VISA' | 'MASTERCARD' | 'TROY';
  isDefault: boolean;
}

const SETTINGS_COOKIE = 'wedyplan_couple_settings';
const CARDS_COOKIE = 'wedyplan_saved_cards';

const DEFAULT_PROFILE: CoupleProfileData = {
  partnerOneName: 'Selin',
  partnerTwoName: 'Kaan',
  weddingDate: '2026-08-15',
  city: 'İstanbul',
  venueName: 'Beykoz Secret Garden',
  guestCountGoal: 250,
  targetBudget: 350000,
};

const DEFAULT_PREFERENCES: AppPreferencesData = {
  aiRecommendations: true,
  smsNotifications: true,
  emailDigest: true,
  budgetAlerts: true,
  theme: 'light',
  language: 'tr',
};

const DEFAULT_CARDS: SavedPaymentMethod[] = [
  {
    id: 'card-1',
    cardHolder: 'Kaan Yılmaz',
    cardNumberMasked: '**** **** **** 4242',
    expiryDate: '12/28',
    cardBrand: 'VISA',
    isDefault: true,
  },
  {
    id: 'card-2',
    cardHolder: 'Selin Kaya',
    cardNumberMasked: '**** **** **** 8819',
    expiryDate: '09/27',
    cardBrand: 'MASTERCARD',
    isDefault: false,
  },
];

// 1. Tüm Ayarları ve Profil Bilgilerini Getir
export async function getCoupleSettings() {
  try {
    const cookieStore = await cookies();
    
    const settingsCookie = cookieStore.get(SETTINGS_COOKIE)?.value;
    const cardsCookie = cookieStore.get(CARDS_COOKIE)?.value;

    let profile = DEFAULT_PROFILE;
    let preferences = DEFAULT_PREFERENCES;
    let cards = DEFAULT_CARDS;

    if (settingsCookie) {
      try {
        const parsed = JSON.parse(settingsCookie);
        profile = { ...DEFAULT_PROFILE, ...parsed.profile };
        preferences = { ...DEFAULT_PREFERENCES, ...parsed.preferences };
      } catch (e) {}
    }

    if (cardsCookie) {
      try { cards = JSON.parse(cardsCookie); } catch (e) {}
    }

    return {
      success: true,
      data: { profile, preferences, cards },
    };
  } catch (error) {
    return { success: false, error: 'Ayarlar okunamadı.' };
  }
}

// 2. Çift & Düğün Profil Bilgilerini Güncelle
export async function updateCoupleProfile(profileData: CoupleProfileData) {
  try {
    const cookieStore = await cookies();
    const settingsCookie = cookieStore.get(SETTINGS_COOKIE)?.value;

    let current = { profile: DEFAULT_PROFILE, preferences: DEFAULT_PREFERENCES };
    if (settingsCookie) {
      try { current = JSON.parse(settingsCookie); } catch (e) {}
    }

    const updated = {
      ...current,
      profile: { ...current.profile, ...profileData },
    };

    cookieStore.set(SETTINGS_COOKIE, JSON.stringify(updated), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    
    revalidatePath('/cift/ayarlar');
    revalidatePath('/cift/dashboard');
    revalidatePath('/cift/butce');

    return { success: true, message: 'Profil bilgileriniz başarıyla güncellendi.', data: updated.profile };
  } catch (error) {
    return { success: false, error: 'Profil güncellenemedi.' };
  }
}

// 3. Uygulama & Bildirim Tercihlerini Güncelle
export async function updateAppPreferences(prefData: AppPreferencesData) {
  try {
    const cookieStore = await cookies();
    const settingsCookie = cookieStore.get(SETTINGS_COOKIE)?.value;

    let current = { profile: DEFAULT_PROFILE, preferences: DEFAULT_PREFERENCES };
    if (settingsCookie) {
      try { current = JSON.parse(settingsCookie); } catch (e) {}
    }

    const updated = {
      ...current,
      preferences: { ...current.preferences, ...prefData },
    };

    cookieStore.set(SETTINGS_COOKIE, JSON.stringify(updated), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/ayarlar');

    return { success: true, message: 'Uygulama tercihleriniz kaydedildi.', data: updated.preferences };
  } catch (error) {
    return { success: false, error: 'Tercihler güncellenemedi.' };
  }
}

// 4. Yeni Ödeme Yöntemi (Kredi Kartı) Ekle
export async function addPaymentMethod(cardHolder: string, rawCardNumber: string, expiryDate: string) {
  try {
    const cookieStore = await cookies();
    const cardsCookie = cookieStore.get(CARDS_COOKIE)?.value;

    let cards = DEFAULT_CARDS;
    if (cardsCookie) {
      try { cards = JSON.parse(cardsCookie); } catch (e) {}
    }

    const last4 = rawCardNumber.replace(/\s/g, '').slice(-4) || '1234';
    const brand: 'VISA' | 'MASTERCARD' | 'TROY' = rawCardNumber.startsWith('5') ? 'MASTERCARD' : 'VISA';

    const newCard: SavedPaymentMethod = {
      id: crypto.randomUUID(),
      cardHolder,
      cardNumberMasked: `**** **** **** ${last4}`,
      expiryDate,
      cardBrand: brand,
      isDefault: cards.length === 0,
    };

    const updatedCards = [...cards, newCard];
    cookieStore.set(CARDS_COOKIE, JSON.stringify(updatedCards), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/ayarlar');
    revalidatePath('/cift/odeme');

    return { success: true, message: 'Ödeme kartınız güvenle eklendi.', data: updatedCards };
  } catch (error) {
    return { success: false, error: 'Kart eklenemedi.' };
  }
}

// 5. Ödeme Kartını Sil
export async function deletePaymentMethod(cardId: string) {
  try {
    const cookieStore = await cookies();
    const cardsCookie = cookieStore.get(CARDS_COOKIE)?.value;

    let cards = DEFAULT_CARDS;
    if (cardsCookie) {
      try { cards = JSON.parse(cardsCookie); } catch (e) {}
    }

    const updatedCards = cards.filter(c => c.id !== cardId);
    cookieStore.set(CARDS_COOKIE, JSON.stringify(updatedCards), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/ayarlar');

    return { success: true, message: 'Kart kaldırıldı.', data: updatedCards };
  } catch (error) {
    return { success: false };
  }
}

// 6. Varsayılan Kartı Ayarla
export async function setDefaultPaymentMethod(cardId: string) {
  try {
    const cookieStore = await cookies();
    const cardsCookie = cookieStore.get(CARDS_COOKIE)?.value;

    let cards = DEFAULT_CARDS;
    if (cardsCookie) {
      try { cards = JSON.parse(cardsCookie); } catch (e) {}
    }

    const updatedCards = cards.map(c => ({
      ...c,
      isDefault: c.id === cardId,
    }));

    cookieStore.set(CARDS_COOKIE, JSON.stringify(updatedCards), { path: '/', maxAge: 30 * 24 * 60 * 60 });
    revalidatePath('/cift/ayarlar');

    return { success: true, message: 'Varsayılan ödeme yöntemi güncellendi.', data: updatedCards };
  } catch (error) {
    return { success: false };
  }
}

// -------------------------------------------------------------
// ESKİ DOSYALAR İÇİN GERİYE DÖNÜK UYUMLULUK (Vercel Build Çökmesini Önler)
// -------------------------------------------------------------
export async function getSettings() { return getCoupleSettings(); }
export async function updateSettings(data: any) { return updateAppPreferences(data); }
export async function updateProfile(data: any) { return updateCoupleProfile(data); }