'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { coupleSlugify, requireCoupleContext } from '@/lib/couple/workspace';

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

export async function generateAIInvitationCopyAction() {
  const ctx = await requireCoupleContext();
  const names = ctx ? `${ctx.couple.partnerOneName}${ctx.couple.partnerTwoName ? ` & ${ctx.couple.partnerTwoName}` : ''}` : 'biz';
  return {
    success: true,
    data: {
      welcomeMessage: `${names} olarak hayatımızın en özel gününde yanımızda olmanızı dileriz.`,
    },
  };
}
