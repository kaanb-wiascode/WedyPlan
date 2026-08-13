'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import {
  auditCouple,
  coupleSlugify,
  ensureStarterChecklist,
  refreshCouplePaths,
  requireCoupleContext,
} from '@/lib/couple/workspace';

const db = prisma as any;

function refresh() {
  for (const path of refreshCouplePaths()) revalidatePath(path);
}

export async function completeCoupleOnboardingAction(formData: FormData): Promise<void> {
  const ctx = await requireCoupleContext();
  if (!ctx) return;
  const partnerOneName = String(formData.get('partner1') || formData.get('partnerOneName') || ctx.couple.partnerOneName);
  const partnerTwoName = String(formData.get('partner2') || formData.get('partnerTwoName') || '');
  const city = String(formData.get('city') || ctx.couple.city || '');
  const slug = coupleSlugify(`${partnerOneName}-${partnerTwoName || 'dugun'}-${ctx.couple.id.slice(0, 6)}`);
  const weddingDateRaw = String(formData.get('weddingDate') || '');
  await db.couple.update({
    where: { id: ctx.couple.id },
    data: {
      partnerOneName,
      partnerTwoName: partnerTwoName || null,
      city,
      guestCountGoal: Number(formData.get('guestCount') || 0),
      targetBudget: Number(formData.get('budgetAmount') || ctx.couple.targetBudget || 350000),
      vibe: String(formData.get('vibe') || ''),
      weddingDate: weddingDateRaw ? new Date(weddingDateRaw) : ctx.couple.weddingDate,
      slug,
      onboardingDone: true,
    },
  }).catch(() => null);
  await db.coupleInvitation.upsert({
    where: { coupleId: ctx.couple.id },
    update: {
      slug,
      title: `${partnerOneName}${partnerTwoName ? ` & ${partnerTwoName}` : ''} Evleniyor`,
      dateLabel: weddingDateRaw,
      venueName: city,
    },
    create: {
      coupleId: ctx.couple.id,
      userId: ctx.session.userId,
      slug,
      title: `${partnerOneName}${partnerTwoName ? ` & ${partnerTwoName}` : ''} Evleniyor`,
      dateLabel: weddingDateRaw,
      venueName: city,
      welcomeMessage: 'Hayatımızın en özel gününde yanımızda olmanızı dileriz.',
    },
  }).catch(() => null);
  await ensureStarterChecklist(ctx.session.userId);
  await auditCouple('COUPLE_ONBOARDING_COMPLETED', {
    actorUserId: ctx.session.userId,
    targetEntityId: ctx.couple.id,
    metadata: { city, slug },
  });
  refresh();
}

export async function saveCoupleProfileAction(formData: FormData): Promise<void> {
  const ctx = await requireCoupleContext();
  if (!ctx) return;
  const partnerOneName = String(formData.get('partnerOneName') || ctx.couple.partnerOneName);
  const partnerTwoName = String(formData.get('partnerTwoName') || '');
  const slugInput = String(formData.get('slug') || ctx.couple.slug || `${partnerOneName}-${partnerTwoName}`);
  await db.couple.update({
    where: { id: ctx.couple.id },
    data: {
      partnerOneName,
      partnerTwoName: partnerTwoName || null,
      weddingDate: formData.get('weddingDate') ? new Date(String(formData.get('weddingDate'))) : ctx.couple.weddingDate,
      city: String(formData.get('city') || ''),
      venueName: String(formData.get('venueName') || ''),
      guestCountGoal: Number(formData.get('guestCountGoal') || 0),
      targetBudget: Number(formData.get('targetBudget') || ctx.couple.targetBudget),
      slug: coupleSlugify(slugInput),
    },
  }).catch(() => null);
  await auditCouple('COUPLE_PROFILE_UPDATED', {
    actorUserId: ctx.session.userId,
    targetEntityId: ctx.couple.id,
  });
  refresh();
}

export async function submitPublicRsvpAction(formData: FormData): Promise<void> {
  const slug = String(formData.get('slug') || '');
  const invitation = await db.coupleInvitation.findUnique({ where: { slug } }).catch(() => null);
  if (!invitation) return;
  const guestName = String(formData.get('guestName') || '').trim();
  if (!guestName) return;
  const attending = String(formData.get('attending') || 'yes') !== 'no';
  const plusOneCount = Number(formData.get('plusOneCount') || 0);
  await db.coupleRsvp.create({
    data: {
      coupleId: invitation.coupleId,
      userId: invitation.userId,
      guestName,
      email: String(formData.get('email') || '') || null,
      phone: String(formData.get('phone') || '') || null,
      attending,
      plusOneCount,
      dietary: String(formData.get('dietary') || ''),
      songRequest: String(formData.get('songRequest') || ''),
      note: String(formData.get('note') || ''),
    },
  }).catch(() => null);
  await db.guest.create({
    data: {
      userId: invitation.userId,
      fullName: guestName,
      email: String(formData.get('email') || '') || null,
      phone: String(formData.get('phone') || '') || null,
      group: 'Davetiye LCV',
      plusOneCount,
      rsvpStatus: attending ? 'ACCEPTED' : 'DECLINED',
      dietaryPreference: String(formData.get('dietary') || '') || null,
    },
  }).catch(() => null);
  await auditCouple('COUPLE_RSVP_RECEIVED', {
    actorRole: 'GUEST',
    targetEntity: 'CoupleInvitation',
    targetEntityId: invitation.id,
    metadata: { guestName, attending },
  });
  refresh();
  revalidatePath(`/dugun/${slug}`);
}
