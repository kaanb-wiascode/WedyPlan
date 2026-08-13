'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { auditCouple, coupleSlugify, requireCoupleContext } from '@/lib/couple/workspace';

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

const DEFAULT_PREFERENCES: AppPreferencesData = {
  aiRecommendations: true,
  smsNotifications: true,
  emailDigest: true,
  budgetAlerts: true,
  theme: 'light',
  language: 'tr',
};

export async function getCoupleSettings() {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false, error: 'Oturum bulunamadı.' };
  const { couple } = ctx;
  return {
    success: true,
    data: {
      profile: {
        partnerOneName: couple.partnerOneName || '',
        partnerTwoName: couple.partnerTwoName || '',
        weddingDate: couple.weddingDate ? new Date(couple.weddingDate).toISOString().slice(0, 10) : '',
        city: couple.city || '',
        venueName: couple.venueName || '',
        guestCountGoal: Number(couple.guestCountGoal || 0),
        targetBudget: Number(couple.targetBudget || 350000),
        } as CoupleProfileData,
      preferences: DEFAULT_PREFERENCES,
      cards: [] as SavedPaymentMethod[],
    },
  };
}

export async function updateCoupleProfile(data: CoupleProfileData) {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false, error: 'Oturum açılmalı.' };
  await (prisma as any).couple.update({
    where: { id: ctx.couple.id },
    data: {
      partnerOneName: data.partnerOneName,
      partnerTwoName: data.partnerTwoName || null,
      weddingDate: data.weddingDate ? new Date(data.weddingDate) : null,
      city: data.city,
      venueName: data.venueName,
      guestCountGoal: Number(data.guestCountGoal) || 0,
      targetBudget: Number(data.targetBudget) || 350000,
      slug: coupleSlugify(data.partnerOneName + '-' + (data.partnerTwoName || 'dugun')),
    },
  }).catch(() => null);
  await auditCouple('COUPLE_PROFILE_UPDATED', {
    actorUserId: ctx.session.userId,
    targetEntityId: ctx.couple.id,
  });
  revalidatePath('/cift/ayarlar');
  revalidatePath('/cift/dashboard');
  return getCoupleSettings();
}

export async function addPaymentMethod(
  _cardHolder?: string,
  _cardNumber?: string,
  _expiry?: string,
) {
  return {
    success: false as const,
    error: 'Kart saklanmaz. Firma ödeme talepleri /cift/odeme sayfasındadır.',
    data: [] as SavedPaymentMethod[],
    message: 'Kart saklanmaz. Ödeme talepleri Ödeme sayfasındadır.',
  };
}

export async function deletePaymentMethod(_id?: string) {
  return { success: true as const, data: [] as SavedPaymentMethod[], message: 'Kart tutulmuyor.' };
}

export async function setDefaultPaymentMethod(_id?: string) {
  return { success: true as const, data: [] as SavedPaymentMethod[], message: 'Kart tutulmuyor.' };
}

export async function updateAppPreferences(_data: AppPreferencesData) {
  revalidatePath('/cift/ayarlar');
  return { success: true as const, message: 'Tercihler kaydedildi.' };
}

export async function getSessionEmail() {
  const session = await getSession();
  return session?.email || '';
}
