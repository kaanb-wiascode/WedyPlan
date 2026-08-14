'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { getSession, updateSession } from '@/lib/auth/session';
import { hashPassword, validatePassword, verifyPassword } from '@/lib/auth/password';
import { writeAdminAudit } from '@/lib/admin/audit';

const db = prisma as any;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function refreshAccountPaths() {
  revalidatePath('/cift/ayarlar');
  revalidatePath('/firma/ayarlar');
  revalidatePath('/admin/hesap');
  revalidatePath('/admin');
}

async function requireUser() {
  const session = await getSession();
  if (!session?.userId) return null;
  const user = await db.identityUser.findUnique({ where: { id: session.userId } }).catch(() => null);
  if (!user) return null;
  return { session, user };
}

export async function getAccountSecurity() {
  const ctx = await requireUser();
  if (!ctx) return { success: false as const, error: 'Oturum açılmalı.' };
  return {
    success: true as const,
    data: {
      email: ctx.user.email as string,
      hasPassword: Boolean(ctx.user.passwordHash),
      fullName: ctx.user.fullName as string,
      phone: (ctx.user.phoneNumber as string | null) || '',
    },
  };
}

export async function changeAccountEmailAction(input: {
  newEmail: string;
  currentPassword?: string;
  confirmCurrentEmail?: string;
}) {
  const ctx = await requireUser();
  if (!ctx) return { success: false as const, error: 'Oturum açılmalı.' };

  const newEmail = String(input.newEmail || '').trim().toLowerCase();
  if (!EMAIL_RE.test(newEmail)) {
    return { success: false as const, error: 'Geçerli bir e-posta girin.' };
  }
  if (newEmail === String(ctx.user.email || '').toLowerCase()) {
    return { success: false as const, error: 'Yeni e-posta mevcut adresle aynı.' };
  }

  if (ctx.user.passwordHash) {
    if (!input.currentPassword) {
      return { success: false as const, error: 'E-postayı değiştirmek için mevcut şifreniz gerekir.' };
    }
    const ok = await verifyPassword(input.currentPassword, ctx.user.passwordHash);
    if (!ok) return { success: false as const, error: 'Mevcut şifre hatalı.' };
  } else {
    const confirm = String(input.confirmCurrentEmail || '').trim().toLowerCase();
    if (confirm !== String(ctx.user.email || '').toLowerCase()) {
      return { success: false as const, error: 'Onay için mevcut e-postanızı yazın.' };
    }
  }

  const taken = await db.identityUser
    .findFirst({ where: { email: newEmail, NOT: { id: ctx.user.id } } })
    .catch(() => null);
  if (taken) {
    return { success: false as const, error: 'Bu e-posta başka bir hesapta kayıtlı.' };
  }

  try {
    await db.identityUser.update({
      where: { id: ctx.user.id },
      data: {
        email: newEmail,
        isEmailVerified: false,
        emailVerifiedAt: null,
      },
    });
  } catch {
    return { success: false as const, error: 'E-posta güncellenemedi.' };
  }

  await updateSession({ email: newEmail });
  await writeAdminAudit({
    actorUserId: ctx.session.userId,
    actorRole: ctx.session.role,
    action: 'ACCOUNT_EMAIL_UPDATED',
    category: 'AUTHENTICATION',
    targetEntity: 'IdentityUser',
    targetEntityId: ctx.user.id,
    metadata: { from: ctx.user.email, to: newEmail },
  });
  refreshAccountPaths();
  return { success: true as const, message: 'E-posta adresiniz güncellendi. Bundan sonra bu adresle giriş yapın.' };
}

export async function changeAccountPasswordAction(input: {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const ctx = await requireUser();
  if (!ctx) return { success: false as const, error: 'Oturum açılmalı.' };

  if (input.newPassword !== input.confirmPassword) {
    return { success: false as const, error: 'Yeni şifreler eşleşmiyor.' };
  }
  const check = validatePassword(input.newPassword);
  if (!check.isValid) {
    return { success: false as const, error: check.errors[0] || 'Şifre geçersiz.' };
  }

  if (ctx.user.passwordHash) {
    if (!input.currentPassword) {
      return { success: false as const, error: 'Mevcut şifrenizi girin.' };
    }
    const ok = await verifyPassword(input.currentPassword, ctx.user.passwordHash);
    if (!ok) return { success: false as const, error: 'Mevcut şifre hatalı.' };
  }

  try {
    await db.identityUser.update({
      where: { id: ctx.user.id },
      data: { passwordHash: await hashPassword(input.newPassword) },
    });
    await db.userSecurityProfile.upsert({
      where: { userId: ctx.user.id },
      update: { lastPasswordChangeAt: new Date(), failedLoginAttempts: 0, lockedUntil: null },
      create: { userId: ctx.user.id, lastPasswordChangeAt: new Date() },
    });
  } catch {
    return { success: false as const, error: 'Şifre güncellenemedi.' };
  }

  await writeAdminAudit({
    actorUserId: ctx.session.userId,
    actorRole: ctx.session.role,
    action: ctx.user.passwordHash ? 'ACCOUNT_PASSWORD_UPDATED' : 'ACCOUNT_PASSWORD_SET',
    category: 'AUTHENTICATION',
    targetEntity: 'IdentityUser',
    targetEntityId: ctx.user.id,
  });
  refreshAccountPaths();
  return {
    success: true as const,
    message: ctx.user.passwordHash ? 'Şifreniz güncellendi.' : 'Şifreniz belirlendi. Artık e-posta ile de giriş yapabilirsiniz.',
  };
}
