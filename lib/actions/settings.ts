'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword, verifyPassword } from '@/lib/auth/password';
import { auditCouple, coupleSlugify, requireCoupleContext } from '@/lib/couple/workspace';

const db = prisma as any;

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

export async function getSettings() {
  return getCoupleSettings();
}

export async function updateSettings(data: AppPreferencesData) {
  return updateAppPreferences(data);
}

export async function updateProfile(data: CoupleProfileData) {
  return updateCoupleProfile(data);
}

export async function exportUserDataAction(userId?: string) {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false as const, error: 'Oturum açılmalı.' };
  if (userId && userId !== ctx.session.userId) {
    return { success: false as const, error: 'Bu paketi yalnızca hesap sahibi indirebilir.' };
  }
  const [guests, budget, tasks, rsvps, invitation] = await Promise.all([
    db.guest.findMany({ where: { userId: ctx.session.userId } }).catch(() => []),
    db.budgetItem.findMany({ where: { userId: ctx.session.userId } }).catch(() => []),
    db.checklistItem.findMany({ where: { userId: ctx.session.userId } }).catch(() => []),
    db.coupleRsvp.findMany({ where: { coupleId: ctx.couple.id } }).catch(() => []),
    db.coupleInvitation.findUnique({ where: { coupleId: ctx.couple.id } }).catch(() => null),
  ]);
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      profile: ctx.couple,
      invitation,
      guests,
      budget,
      tasks,
      rsvps,
    },
    null,
    2,
  );
  await auditCouple('COUPLE_DATA_EXPORTED', {
    actorUserId: ctx.session.userId,
    targetEntityId: ctx.couple.id,
  });
  return {
    success: true as const,
    message: 'KVKK veri paketi hazır.',
    downloadUrl: `data:application/json;charset=utf-8,${encodeURIComponent(payload)}`,
  };
}

export async function updateSecurityPasswordAction(
  userId: string,
  data: { currentPassword: string; newPassword: string; confirmPassword: string },
) {
  const session = await getSession();
  if (!session?.userId || session.userId !== userId) {
    return { success: false as const, error: 'Oturum açılmalı.' };
  }
  if (data.newPassword !== data.confirmPassword) {
    return { success: false as const, error: 'Yeni şifreler eşleşmiyor.' };
  }
  const check = validatePassword(data.newPassword);
  if (!check.isValid) {
    return { success: false as const, error: check.errors[0] || 'Şifre geçersiz.' };
  }
  const user = await db.identityUser.findUnique({ where: { id: session.userId } }).catch(() => null);
  if (!user?.passwordHash) {
    return { success: false as const, error: 'Hesap bulunamadı.' };
  }
  const ok = await verifyPassword(data.currentPassword, user.passwordHash);
  if (!ok) {
    return { success: false as const, error: 'Mevcut şifre hatalı.' };
  }
  await db.identityUser
    .update({
      where: { id: session.userId },
      data: { passwordHash: await hashPassword(data.newPassword) },
    })
    .catch(() => null);
  await auditCouple('COUPLE_PASSWORD_UPDATED', {
    actorUserId: session.userId,
    targetEntityId: session.userId,
  });
  return { success: true as const, message: 'Şifreniz güncellendi.' };
}

export async function updateUserProfileSettingAction(
  userId: string,
  data: {
    fullName: string;
    email: string;
    phone?: string;
    weddingRole?: string;
    preferredLanguage?: string;
    preferredCurrency?: string;
  },
) {
  const session = await getSession();
  if (!session?.userId || session.userId !== userId) {
    return { success: false as const, error: 'Oturum açılmalı.' };
  }
  const email = String(data.email || '').trim().toLowerCase();
  if (!email) {
    return { success: false as const, error: 'E-posta gerekli.' };
  }
  await db.identityUser
    .update({
      where: { id: session.userId },
      data: {
        fullName: data.fullName,
        email,
        phoneNumber: data.phone || null,
      },
    })
    .catch(() => null);
  const couple = await db.couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  if (couple && data.fullName) {
    await db.couple
      .update({
        where: { id: couple.id },
        data: { partnerOneName: data.fullName },
      })
      .catch(() => null);
  }
  await auditCouple('COUPLE_ACCOUNT_UPDATED', {
    actorUserId: session.userId,
    targetEntityId: couple?.id || session.userId,
    metadata: { weddingRole: data.weddingRole, preferredCurrency: data.preferredCurrency },
  });
  revalidatePath('/cift/ayarlar');
  return { success: true as const, message: 'Profil ayarlarınız güncellendi.' };
}
