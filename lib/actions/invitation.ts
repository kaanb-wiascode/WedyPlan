'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { auditCouple, coupleSlugify, requireCoupleContext } from '@/lib/couple/workspace';

const db = prisma as any;

export interface InvitationConfigInput {
  slug: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  theme: string;
  coverImage: string;
  welcomeMessage: string;
  askDietary: boolean;
  askSongRequest: boolean;
  showWishlist: boolean;
}

function toConfig(row: any, fallback: InvitationConfigInput): InvitationConfigInput {
  if (!row) return fallback;
  return {
    slug: row.slug,
    title: row.title,
    date: row.dateLabel,
    time: row.timeLabel,
    venueName: row.venueName,
    address: row.address,
    theme: row.theme,
    coverImage: row.coverImage,
    welcomeMessage: row.welcomeMessage,
    askDietary: row.askDietary,
    askSongRequest: row.askSongRequest,
    showWishlist: row.showWishlist,
  };
}

export async function getInvitationConfig() {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false, error: 'Oturum bulunamadı.' };
  const { couple, session } = ctx;
  const fallback: InvitationConfigInput = {
    slug: couple.slug || coupleSlugify(`${couple.partnerOneName}-${couple.partnerTwoName || 'dugun'}`),
    title: `${couple.partnerOneName}${couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''} Evleniyor`,
    date: couple.weddingDate ? new Date(couple.weddingDate).toLocaleDateString('tr-TR') : '',
    time: '19:00',
    venueName: couple.venueName || '',
    address: couple.city || '',
    theme: 'minimalist-white',
    coverImage: '',
    welcomeMessage: 'Hayatımızın en özel gününde yanımızda olmanızı dileriz.',
    askDietary: true,
    askSongRequest: true,
    showWishlist: true,
  };
  const row = await (prisma as any).coupleInvitation.findUnique({ where: { coupleId: couple.id } }).catch(() => null);
  if (!row) {
    const created = await (prisma as any).coupleInvitation.create({
      data: {
        coupleId: couple.id,
        userId: session.userId,
        slug: fallback.slug,
        title: fallback.title,
        dateLabel: fallback.date,
        timeLabel: fallback.time,
        venueName: fallback.venueName,
        address: fallback.address,
        welcomeMessage: fallback.welcomeMessage,
      },
    }).catch(() => null);
    return { success: true, data: toConfig(created, fallback) };
  }
  return { success: true, data: toConfig(row, fallback) };
}

export async function saveInvitationConfig(data: InvitationConfigInput) {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false, error: 'Oturum açılmalı.' };
  const slug = coupleSlugify(data.slug || ctx.couple.slug || ctx.couple.partnerOneName);
  await (prisma as any).coupleInvitation.upsert({
    where: { coupleId: ctx.couple.id },
    update: {
      slug,
      title: data.title,
      dateLabel: data.date,
      timeLabel: data.time,
      venueName: data.venueName,
      address: data.address,
      theme: data.theme,
      coverImage: data.coverImage,
      welcomeMessage: data.welcomeMessage,
      askDietary: data.askDietary,
      askSongRequest: data.askSongRequest,
      showWishlist: data.showWishlist,
      published: true,
    },
    create: {
      coupleId: ctx.couple.id,
      userId: ctx.session.userId,
      slug,
      title: data.title,
      dateLabel: data.date,
      timeLabel: data.time,
      venueName: data.venueName,
      address: data.address,
      theme: data.theme,
      coverImage: data.coverImage,
      welcomeMessage: data.welcomeMessage,
      askDietary: data.askDietary,
      askSongRequest: data.askSongRequest,
      showWishlist: data.showWishlist,
      published: true,
    },
  }).catch(() => null);
  await (prisma as any).couple.update({
    where: { id: ctx.couple.id },
    data: { slug, venueName: data.venueName },
  }).catch(() => null);
  revalidatePath('/cift/dijital-davetiye');
  revalidatePath(`/dugun/${slug}`);
  return getInvitationConfig();
}

export async function generateAIInvitationCopyAction(
  tone?: string,
  coupleNames?: string,
  venueName?: string,
) {
  const ctx = await requireCoupleContext().catch(() => null);
  const names =
    coupleNames ||
    (ctx
      ? `${ctx.couple.partnerOneName}${ctx.couple.partnerTwoName ? ` & ${ctx.couple.partnerTwoName}` : ''}`
      : 'biz');
  const venue = venueName || ctx?.couple.venueName || 'düğünümüz';
  const key = String(tone || 'romantic').toUpperCase();
  const copies: Record<string, string> = {
    ROMANTIC: `${names} olarak hayatımızın en özel gününde, ${venue} mekanında yanımızda olmanızı dileriz.`,
    FORMAL: `${names} çifti, ${venue} adresindeki düğün törenlerine katılımınızı rica eder.`,
    FUN: `${names} evleniyor! ${venue}'de müzik, dans ve sohbet için sizi bekliyoruz.`,
    MINIMAL: `${names} — ${venue}. Katılımınızı bekleriz.`,
  };
  const generatedText = copies[key] || copies.ROMANTIC;
  return {
    success: true,
    generatedText,
    copy: generatedText,
    data: { welcomeMessage: generatedText },
  };
}

export async function getPublicInvitation(slugOrId: string) {
  const invitation = await db.coupleInvitation
    .findFirst({
      where: {
        OR: [{ slug: slugOrId }, { coupleId: slugOrId }, { id: slugOrId }],
      },
    })
    .catch(() => null);
  const couple = invitation
    ? await db.couple.findUnique({ where: { id: invitation.coupleId } }).catch(() => null)
    : await db.couple
        .findFirst({ where: { OR: [{ id: slugOrId }, { slug: slugOrId }] } })
        .catch(() => null);
  if (!couple) {
    return { success: false as const, error: 'Davetiye bulunamadı.' };
  }
  const title =
    invitation?.title ||
    `${couple.partnerOneName}${couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}`;
  return {
    success: true as const,
    data: {
      coupleId: couple.id,
      coupleName: title,
      weddingDate: couple.weddingDate,
      time: invitation?.timeLabel || '19:00',
      venueName: invitation?.venueName || couple.venueName || '',
      venueAddress: invitation?.address || couple.city || '',
      message: invitation?.welcomeMessage || 'Hayatımızın en özel gününde yanımızda olmanızı dileriz.',
      theme: invitation?.theme || 'minimalist-white',
      coverImage: invitation?.coverImage || '',
      askDietary: invitation?.askDietary ?? true,
      askSongRequest: invitation?.askSongRequest ?? true,
      showWishlist: invitation?.showWishlist ?? true,
    },
  };
}

export async function submitPublicRsvp(data: {
  coupleId?: string;
  fullName: string;
  email?: string;
  phone?: string;
  status: 'ACCEPTED' | 'DECLINED' | 'ATTENDING';
  plusOneCount?: number;
  plusOne?: boolean;
  notes?: string;
  dietaryPreference?: string;
  songRequest?: string;
}) {
  const coupleId = String(data.coupleId || '');
  if (!coupleId || !data.fullName?.trim()) {
    return { success: false as const, error: 'Davetiye veya isim eksik.' };
  }
  const couple = await db.couple.findUnique({ where: { id: coupleId } }).catch(() => null);
  if (!couple) {
    return { success: false as const, error: 'Davetiye bulunamadı.' };
  }
  const attending = data.status === 'ATTENDING' || data.status === 'ACCEPTED';
  const plusOneCount = Number(data.plusOneCount) || (data.plusOne ? 1 : 0);
  await db.coupleRsvp
    .create({
      data: {
        coupleId: couple.id,
        userId: couple.userId,
        guestName: data.fullName.trim(),
        email: data.email || null,
        phone: data.phone || null,
        attending,
        plusOneCount,
        dietary: data.dietaryPreference || '',
        songRequest: data.songRequest || '',
        note: data.notes || '',
      },
    })
    .catch(() => null);
  await db.guest
    .create({
      data: {
        userId: couple.userId,
        fullName: data.fullName.trim(),
        email: data.email || null,
        phone: data.phone || null,
        group: 'Davetiye LCV',
        plusOneCount,
        rsvpStatus: attending ? 'ACCEPTED' : 'DECLINED',
        dietaryPreference: data.dietaryPreference || null,
      },
    })
    .catch(() => null);
  await auditCouple('COUPLE_RSVP_RECEIVED', {
    actorRole: 'GUEST',
    targetEntity: 'Couple',
    targetEntityId: couple.id,
    metadata: { guestName: data.fullName.trim(), attending },
  });
  revalidatePath('/cift/davetliler');
  revalidatePath('/cift/dashboard');
  if (couple.slug) revalidatePath(`/dugun/${couple.slug}`);
  return { success: true as const, message: 'LCV yanıtınız başarıyla kaydedildi.' };
}

export async function sendRSVPReminderAction(
  _userIdOrGuestId?: string,
  options?: { guestIds?: string[]; reminderChannel?: string; [key: string]: any },
) {
  const ctx = await requireCoupleContext();
  if (!ctx) return { success: false as const, error: 'Oturum açılmalı.' };
  const pending = await db.guest
    .findMany({
      where: {
        userId: ctx.session.userId,
        rsvpStatus: 'PENDING',
        ...(options?.guestIds?.length ? { id: { in: options.guestIds } } : {}),
      },
      select: { id: true, fullName: true },
    })
    .catch(() => []);
  await auditCouple('COUPLE_RSVP_REMINDER_REQUESTED', {
    actorUserId: ctx.session.userId,
    targetEntityId: ctx.couple.id,
    metadata: { pendingCount: pending.length, channel: options?.reminderChannel || 'IN_APP' },
  });
  return {
    success: true as const,
    message:
      pending.length > 0
        ? `${pending.length} davetli henüz yanıt vermedi. WhatsApp gönderimi henüz bağlı değil; davetiye linkini paylaşabilirsiniz.`
        : 'Bekleyen LCV yok.',
  };
}
