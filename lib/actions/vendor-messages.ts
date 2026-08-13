'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth/session';
import { requireStaff } from '@/lib/ops/staff';
import {
  ensureThread,
  flagMessage,
  listAllVendorThreadsForAdmin,
  listThreadsForUser,
  markThreadRead,
  postThreadMessage,
} from '@/lib/vendor/messages';
import { prisma } from '@/lib/db';

const db = prisma as any;

function refreshChat() {
  revalidatePath('/firma/mesajlar');
  revalidatePath('/cift/messages');
  revalidatePath('/cift/dashboard');
  revalidatePath('/admin/mesaj-denetim');
}

export async function getInboxAction() {
  const session = await getSession();
  if (!session?.userId) return { success: false, threads: [] as any[] };
  const threads = await listThreadsForUser(session.userId, session.role);
  return { success: true, userId: session.userId, role: session.role, threads };
}

export async function sendInboxMessageAction(conversationId: string, body: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  await postThreadMessage({ conversationId, senderUserId: session.userId, body });
  refreshChat();
  return { success: true };
}

export async function markInboxReadAction(conversationId: string) {
  const session = await getSession();
  if (!session?.userId) return { success: false };
  await markThreadRead(conversationId, session.userId);
  return { success: true };
}

export async function startVendorCoupleChatAction(vendorId: string) {
  const session = await getSession();
  if (!session?.userId || session.role !== 'COUPLE') return { success: false };
  const vendor = await db.vendor.findUnique({ where: { id: vendorId } }).catch(() => null);
  if (!vendor) return { success: false };
  const couple = await db.couple.findFirst({ where: { userId: session.userId } }).catch(() => null);
  const names = couple
    ? `${couple.partnerOneName}${couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}`
    : session.email;
  const thread = await ensureThread({
    vendorId: vendor.id,
    vendorUserId: vendor.userId,
    vendorName: vendor.businessName,
    coupleUserId: session.userId,
    coupleNames: names,
  });
  refreshChat();
  return { success: true, conversationId: thread?.conversationId };
}

export async function getAdminInboxAction() {
  await requireStaff(['SUPER', 'CRM', 'REGION']);
  const threads = await listAllVendorThreadsForAdmin();
  return { success: true, threads };
}

export async function flagInboxMessageAction(messageId: string, reason: string) {
  const staff = await requireStaff(['SUPER', 'CRM', 'REGION']);
  await flagMessage(messageId, reason || 'Admin incelemesi', staff.userId);
  refreshChat();
  return { success: true };
}

export async function adminReplyInboxAction(conversationId: string, body: string) {
  const staff = await requireStaff(['SUPER', 'CRM', 'REGION']);
  await postThreadMessage({
    conversationId,
    senderUserId: staff.userId,
    body: `[WedyPlan denetim] ${body}`,
  });
  refreshChat();
  return { success: true };
}
