'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { requireAdmin } from '@/lib/admin/require-admin';
import { writeAdminAudit } from '@/lib/admin/audit';

const db = prisma as any;

function revalidateAdmin() {
  revalidatePath('/admin');
  revalidatePath('/admin/firmalar');
  revalidatePath('/admin/ciftler');
  revalidatePath('/admin/onaylar');
  revalidatePath('/admin/hizmetler');
  revalidatePath('/admin/talepler');
  revalidatePath('/admin/kullanicilar');
  revalidatePath('/admin/sistem');
  revalidatePath('/admin/finans');
  revalidatePath('/admin/denetim');
}

function tempPassword() {
  return `Wedy-${Math.random().toString(36).slice(2, 8)}-26`;
}

export async function updateVendorAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get('id') || '');
  const servicesRaw = String(formData.get('services') || '');
  const services = servicesRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  await db.vendor.update({
    where: { id },
    data: {
      businessName: String(formData.get('businessName') || ''),
      businessCategory: String(formData.get('businessCategory') || 'OTHER'),
      city: String(formData.get('city') || '') || null,
      district: String(formData.get('district') || '') || null,
      phone: String(formData.get('phone') || '') || null,
      website: String(formData.get('website') || '') || null,
      description: String(formData.get('description') || '') || null,
      notes: String(formData.get('notes') || '') || null,
      services,
    },
  });

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'VENDOR_UPDATED',
    category: 'VENDOR_UPDATE',
    targetEntity: 'Vendor',
    targetEntityId: id,
  });
  revalidateAdmin();
  return;
}

export async function setVendorStatusAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || 'PENDING');
  const isVerified = status === 'APPROVED';

  await db.vendor.update({
    where: { id },
    data: { status, isVerified },
  });

  const vendor = await db.vendor.findUnique({ where: { id } });
  if (vendor) {
    await db.identityUser.update({
      where: { id: vendor.userId },
      data: { status: status === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE' },
    }).catch(() => {});
  }

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: `VENDOR_${status}`,
    category: 'VENDOR_UPDATE',
    targetEntity: 'Vendor',
    targetEntityId: id,
  });
  revalidateAdmin();
  return;
}

export async function addVendorNoteAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const vendorId = String(formData.get('vendorId') || '');
  const body = String(formData.get('body') || '').trim();
  if (!body) return;

  await db.vendorModerationNote.create({
    data: {
      vendorId,
      body,
      severity: String(formData.get('severity') || 'INFO'),
      createdByUserId: admin.userId,
    },
  });
  revalidateAdmin();
  return;
}

export async function createVendorAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const businessName = String(formData.get('businessName') || '').trim();
  if (!email || !businessName) return;

  const existing = await db.identityUser.findUnique({ where: { email } });
  if (existing) return;

  const password = String(formData.get('password') || '') || tempPassword();
  const user = await db.identityUser.create({
    data: {
      email,
      fullName: businessName,
      passwordHash: await hashPassword(password),
      status: 'ACTIVE',
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  await db.portalProfile.create({
    data: { userId: user.id, portal: 'VENDOR', isPrimary: true },
  }).catch(() => {});

  const vendor = await db.vendor.create({
    data: {
      userId: user.id,
      businessName,
      businessCategory: String(formData.get('businessCategory') || 'OTHER'),
      city: String(formData.get('city') || '') || null,
      status: String(formData.get('status') || 'APPROVED'),
      isVerified: String(formData.get('status') || 'APPROVED') === 'APPROVED',
      services: String(formData.get('services') || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    },
  });

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'VENDOR_CREATED',
    category: 'VENDOR_UPDATE',
    targetEntity: 'Vendor',
    targetEntityId: vendor.id,
    metadata: { email },
  });
  revalidateAdmin();
  return;
}

export async function updateCoupleAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get('id') || '');
  const weddingDateRaw = String(formData.get('weddingDate') || '');
  await db.couple.update({
    where: { id },
    data: {
      partnerOneName: String(formData.get('partnerOneName') || ''),
      partnerTwoName: String(formData.get('partnerTwoName') || '') || null,
      city: String(formData.get('city') || '') || null,
      targetBudget: Number(formData.get('targetBudget') || 0) || 0,
      status: String(formData.get('status') || 'ACTIVE'),
      notes: String(formData.get('notes') || '') || null,
      weddingDate: weddingDateRaw ? new Date(weddingDateRaw) : null,
    },
  });
  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'COUPLE_UPDATED',
    category: 'CUSTOMER_UPDATE',
    targetEntity: 'Couple',
    targetEntityId: id,
  });
  revalidateAdmin();
  return;
}

export async function createCoupleAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const partnerOneName = String(formData.get('partnerOneName') || '').trim();
  if (!email || !partnerOneName) return;

  const existing = await db.identityUser.findUnique({ where: { email } });
  if (existing) return;

  const password = String(formData.get('password') || '') || tempPassword();
  const user = await db.identityUser.create({
    data: {
      email,
      fullName: `${partnerOneName}${formData.get('partnerTwoName') ? ` & ${formData.get('partnerTwoName')}` : ''}`,
      passwordHash: await hashPassword(password),
      status: 'ACTIVE',
      isEmailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  await db.portalProfile.create({
    data: { userId: user.id, portal: 'COUPLE', isPrimary: true },
  }).catch(() => {});

  const weddingDateRaw = String(formData.get('weddingDate') || '');
  const couple = await db.couple.create({
    data: {
      userId: user.id,
      partnerOneName,
      partnerTwoName: String(formData.get('partnerTwoName') || '') || null,
      city: String(formData.get('city') || '') || null,
      targetBudget: Number(formData.get('targetBudget') || 350000) || 350000,
      weddingDate: weddingDateRaw ? new Date(weddingDateRaw) : null,
      status: 'ACTIVE',
    },
  });

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'COUPLE_CREATED',
    category: 'CUSTOMER_UPDATE',
    targetEntity: 'Couple',
    targetEntityId: couple.id,
  });
  revalidateAdmin();
  return;
}

export async function setUserStatusAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || 'ACTIVE') as 'ACTIVE' | 'SUSPENDED' | 'LOCKED' | 'PENDING_VERIFICATION';
  await db.identityUser.update({ where: { id }, data: { status } });
  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'USER_STATUS_UPDATED',
    category: 'PERMISSION_CHANGE',
    targetEntity: 'IdentityUser',
    targetEntityId: id,
    metadata: { status },
  });
  revalidateAdmin();
  return;
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || 'PENDING');
  await db.marketplaceLead.update({ where: { id }, data: { status } });
  revalidateAdmin();
  return;
}

export async function savePlatformSettingAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const key = String(formData.get('key') || '');
  const raw = String(formData.get('value') || '');
  let value: string | number | boolean = raw;
  if (raw === 'true' || raw === 'false') value = raw === 'true';
  else if (!Number.isNaN(Number(raw)) && raw.trim() !== '') value = Number(raw);

  await db.platformSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'SETTING_UPDATED',
    category: 'API_REQUEST',
    targetEntity: 'PlatformSetting',
    targetEntityId: key,
    metadata: { value },
  });
  revalidateAdmin();
  return;
}

export async function toggleFeatureFlagAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const key = String(formData.get('key') || '');
  const isEnabled = String(formData.get('isEnabled') || 'false') === 'true';
  await db.featureFlag.update({ where: { key }, data: { isEnabled } });
  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'FEATURE_FLAG_TOGGLED',
    category: 'API_REQUEST',
    targetEntity: 'FeatureFlag',
    targetEntityId: key,
    metadata: { isEnabled },
  });
  revalidateAdmin();
  return;
}

export async function sendBroadcastAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const message = String(formData.get('message') || '').trim();
  const audience = String(formData.get('audience') || 'ALL');
  if (!message) return;

  await db.adminBroadcast.create({
    data: { message, audience, createdByUserId: admin.userId },
  });

  let userIds: string[] = [];
  if (audience === 'VENDOR') {
    userIds = (await db.vendor.findMany({ select: { userId: true } })).map((row) => row.userId);
  } else if (audience === 'COUPLE') {
    userIds = (await db.couple.findMany({ select: { userId: true } })).map((row) => row.userId);
  } else {
    userIds = (await db.identityUser.findMany({ select: { id: true } })).map((row) => row.id);
  }

  if (userIds.length > 0) {
    await db.inAppNotification.createMany({
      data: userIds.slice(0, 200).map((userId) => ({
        userId,
        title: 'WedyPlan duyurusu',
        message,
        category: 'SYSTEM',
        priority: 'HIGH',
        actionUrl: audience === 'VENDOR' ? '/firma/dashboard' : '/cift/dashboard',
      })),
    }).catch(() => {});
  }

  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'BROADCAST_SENT',
    category: 'CAMPAIGN',
    metadata: { audience, recipients: userIds.length },
  });
  revalidateAdmin();
  return;
}

export async function saveCommissionAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const rate = Number(formData.get('commissionRate') || 12);
  await db.platformSetting.upsert({
    where: { key: 'commission_rate' },
    update: { value: rate },
    create: { key: 'commission_rate', value: rate },
  });
  await db.commissionRule.upsert({
    where: { vendorCategoryCode: 'DEFAULT' },
    update: { commissionRatePercent: rate },
    create: { vendorCategoryCode: 'DEFAULT', commissionRatePercent: rate },
  }).catch(() => {});
  await writeAdminAudit({
    actorUserId: admin.userId,
    action: 'COMMISSION_UPDATED',
    category: 'PAYMENT',
    metadata: { rate },
  });
  revalidateAdmin();
  return;
}

export async function upsertSubscriptionPlanAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const code = String(formData.get('code') || '').trim().toUpperCase().replace(/\s+/g, '_');
  const name = String(formData.get('name') || '').trim();
  const price = Number(formData.get('price') || 0);
  if (!code || !name) return;

  await db.subscriptionPlan.upsert({
    where: { code },
    update: { name, price, billingCycle: String(formData.get('billingCycle') || 'MONTHLY'), isActive: true },
    create: { code, name, price, billingCycle: String(formData.get('billingCycle') || 'MONTHLY'), isActive: true },
  });
  revalidateAdmin();
  return;
}
