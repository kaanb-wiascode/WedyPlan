'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';

export interface GuestInput {
  fullName: string;
  email?: string;
  phone?: string;
  group: string;
  plusOneCount?: number;
  dietaryPreference?: string;
}

export async function getGuestItems() {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };
  const dbItems = await (prisma as any).guest.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  return { success: true, data: dbItems || [] };
}

export async function createGuestItem(data: GuestInput) {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum açılmalı.' };
  await (prisma as any).guest.create({
    data: {
      userId: session.userId,
      fullName: data.fullName,
      email: data.email || null,
      phone: data.phone || null,
      group: data.group,
      plusOneCount: Number(data.plusOneCount) || 0,
      dietaryPreference: data.dietaryPreference || null,
      rsvpStatus: 'PENDING',
    },
  }).catch(() => null);
  revalidatePath('/cift/davetliler');
  revalidatePath('/cift/dashboard');
  return getGuestItems();
}

export async function sendGuestInvitation(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  const guest = await (prisma as any).guest.findFirst({ where: { id, userId: session.userId } }).catch(() => null);
  if (!guest) return { success: false, error: 'Davetli bulunamadı.' };
  revalidatePath('/cift/davetliler');
  return { success: true, message: `${guest.fullName} için davetiye bağlantısı hazır.` };
}

export async function updateGuestRsvp(id: string, rsvpStatus: 'PENDING' | 'ACCEPTED' | 'DECLINED') {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  await (prisma as any).guest.updateMany({
    where: { id, userId: session.userId },
    data: { rsvpStatus },
  }).catch(() => null);
  revalidatePath('/cift/davetliler');
  revalidatePath('/cift/dashboard');
  return getGuestItems();
}

export async function deleteGuestItem(id: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  await (prisma as any).guest.deleteMany({ where: { id, userId: session.userId } }).catch(() => null);
  revalidatePath('/cift/davetliler');
  revalidatePath('/cift/dashboard');
  return getGuestItems();
}

export async function getWishlistItems() {
  const session = await getSession();
  if (!session?.userId) return { success: false, error: 'Oturum bulunamadı.' };
  const couple = await (prisma as any).couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  if (!couple) return { success: true, data: [] };
  const items = await (prisma as any).coupleGiftItem.findMany({
    where: { coupleId: couple.id },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  return { success: true, data: items || [] };
}

export async function createWishlistItem(data: { title: string; category?: string; price?: number; imageUrl?: string }) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  const couple = await (prisma as any).couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  if (!couple) return { success: false };
  await (prisma as any).coupleGiftItem.create({
    data: {
      coupleId: couple.id,
      userId: session.userId,
      title: data.title,
      category: data.category || 'Hediye',
      price: Number(data.price) || 0,
      imageUrl: data.imageUrl || '',
    },
  }).catch(() => null);
  revalidatePath('/cift/davetliler');
  return getWishlistItems();
}
