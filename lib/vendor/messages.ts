import { prisma } from '@/lib/db';
import { auditVendor } from '@/lib/vendor/workspace';

const db = prisma as any;

export async function ensureThread(input: {
  vendorId: string;
  vendorUserId: string;
  vendorName: string;
  coupleUserId: string;
  coupleNames: string;
}) {
  const existing = await db.vendorCoupleThread.findFirst({
    where: { vendorId: input.vendorId, coupleUserId: input.coupleUserId },
  }).catch(() => null);
  if (existing) return existing;

  const conversation = await db.conversation.create({
    data: {
      type: 'COUPLE_VENDOR',
      title: `${input.coupleNames} × ${input.vendorName}`,
      relatedEntityId: input.vendorId,
      participants: {
        create: [
          { userId: input.coupleUserId, role: 'OWNER' },
          { userId: input.vendorUserId, role: 'MEMBER' },
        ],
      },
    },
  }).catch(() => null);
  if (!conversation) return null;

  const thread = await db.vendorCoupleThread.create({
    data: {
      vendorId: input.vendorId,
      coupleUserId: input.coupleUserId,
      conversationId: conversation.id,
      coupleNames: input.coupleNames,
    },
  }).catch(() => null);

  await auditVendor('VENDOR_THREAD_OPENED', {
    actorUserId: input.vendorUserId,
    category: 'MESSAGING',
    targetEntity: 'Conversation',
    targetEntityId: conversation.id,
    metadata: { vendorId: input.vendorId, coupleUserId: input.coupleUserId },
  });

  return thread;
}

export async function postThreadMessage(input: {
  conversationId: string;
  senderUserId: string;
  body: string;
}) {
  const text = input.body.trim();
  if (!text) return null;
  const message = await db.message.create({
    data: {
      conversationId: input.conversationId,
      senderUserId: input.senderUserId,
      type: 'TEXT',
      bodyText: text,
      deliveryStatus: 'SENT',
    },
  }).catch(() => null);
  await db.conversation.update({
    where: { id: input.conversationId },
    data: { lastMessageAt: new Date() },
  }).catch(() => null);
  await db.conversationParticipant.updateMany({
    where: { conversationId: input.conversationId, userId: { not: input.senderUserId } },
    data: { unreadCount: { increment: 1 } },
  }).catch(() => null);
  await db.vendorCoupleThread.updateMany({
    where: { conversationId: input.conversationId },
    data: { updatedAt: new Date() },
  }).catch(() => null);
  await auditVendor('VENDOR_MESSAGE_SENT', {
    actorUserId: input.senderUserId,
    category: 'MESSAGING',
    targetEntity: 'Message',
    targetEntityId: input.conversationId,
  });
  return message;
}

export async function listThreadsForUser(userId: string, role: string) {
  let threads: any[] = [];
  if (role === 'VENDOR' || role === 'ADMIN') {
    const vendor = await db.vendor.findFirst({ where: { userId } }).catch(() => null);
    if (vendor) {
      threads = await db.vendorCoupleThread.findMany({
        where: { vendorId: vendor.id },
        orderBy: { updatedAt: 'desc' },
      }).catch(() => []);
    }
    if (role === 'ADMIN' && threads.length === 0) {
      threads = await db.vendorCoupleThread.findMany({ orderBy: { updatedAt: 'desc' }, take: 100 }).catch(() => []);
    }
  } else {
    threads = await db.vendorCoupleThread.findMany({
      where: { coupleUserId: userId },
      orderBy: { updatedAt: 'desc' },
    }).catch(() => []);
  }

  const conversationIds = threads.map((row) => row.conversationId);
  const conversations = conversationIds.length
    ? await db.conversation.findMany({
        where: { id: { in: conversationIds } },
        include: {
          messages: { orderBy: { createdAt: 'asc' }, take: 80 },
          participants: true,
        },
      }).catch(() => [])
    : [];
  const convMap = new Map((conversations as any[]).map((row) => [row.id, row]));
  const vendorIds = [...new Set(threads.map((row) => row.vendorId))];
  const vendors = vendorIds.length
    ? await db.vendor.findMany({ where: { id: { in: vendorIds } } }).catch(() => [])
    : [];
  const vendorMap = new Map((vendors as any[]).map((row) => [row.id, row]));

  return threads.map((thread) => {
    const conversation = convMap.get(thread.conversationId);
    const vendor = vendorMap.get(thread.vendorId);
    const participant = (conversation?.participants || []).find((p: any) => p.userId === userId);
    return {
      id: thread.id,
      conversationId: thread.conversationId,
      vendorId: thread.vendorId,
      vendorName: vendor?.businessName || 'Firma',
      coupleUserId: thread.coupleUserId,
      coupleNames: thread.coupleNames,
      unreadCount: Number(participant?.unreadCount || 0),
      lastMessageAt: conversation?.lastMessageAt,
      messages: (conversation?.messages || []).map((msg: any) => ({
        id: msg.id,
        senderUserId: msg.senderUserId,
        body: msg.bodyText,
        createdAt: msg.createdAt,
        isMine: msg.senderUserId === userId,
        isSpam: Boolean(msg.isSpamFlagged),
      })),
    };
  });
}

export async function listAllVendorThreadsForAdmin() {
  const threads = await db.vendorCoupleThread.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 150,
  }).catch(() => []);
  return listThreadsHydrated(threads);
}

async function listThreadsHydrated(threads: any[]) {
  const conversationIds = threads.map((row) => row.conversationId);
  const conversations = conversationIds.length
    ? await db.conversation.findMany({
        where: { id: { in: conversationIds } },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 100 } },
      }).catch(() => [])
    : [];
  const convMap = new Map((conversations as any[]).map((row) => [row.id, row]));
  const vendorIds = [...new Set(threads.map((row) => row.vendorId))];
  const vendors = vendorIds.length
    ? await db.vendor.findMany({ where: { id: { in: vendorIds } } }).catch(() => [])
    : [];
  const vendorMap = new Map((vendors as any[]).map((row) => [row.id, row]));
  return threads.map((thread) => {
    const conversation = convMap.get(thread.conversationId);
    const vendor = vendorMap.get(thread.vendorId);
    const last = (conversation?.messages || []).slice(-1)[0];
    return {
      id: thread.id,
      conversationId: thread.conversationId,
      vendorId: thread.vendorId,
      vendorName: vendor?.businessName || 'Firma',
      coupleNames: thread.coupleNames,
      coupleUserId: thread.coupleUserId,
      lastMessageAt: conversation?.lastMessageAt,
      lastBody: last?.bodyText || '',
      messageCount: conversation?.messages?.length || 0,
      flagged: (conversation?.messages || []).some((msg: any) => msg.isSpamFlagged),
      messages: (conversation?.messages || []).map((msg: any) => ({
        id: msg.id,
        senderUserId: msg.senderUserId,
        body: msg.bodyText,
        createdAt: msg.createdAt,
        isSpam: Boolean(msg.isSpamFlagged),
      })),
    };
  });
}

export async function markThreadRead(conversationId: string, userId: string) {
  await db.conversationParticipant.updateMany({
    where: { conversationId, userId },
    data: { unreadCount: 0, lastReadAt: new Date() },
  }).catch(() => null);
}

export async function flagMessage(messageId: string, reason: string, actorUserId: string) {
  await db.message.update({ where: { id: messageId }, data: { isSpamFlagged: true } }).catch(() => null);
  await db.spamFlagLog.create({
    data: { messageId, senderUserId: actorUserId, reason, flaggedText: reason },
  }).catch(() => null);
  await auditVendor('VENDOR_MESSAGE_FLAGGED', {
    actorUserId,
    actorRole: 'ADMIN',
    category: 'MESSAGING',
    targetEntity: 'Message',
    targetEntityId: messageId,
    metadata: { reason },
  });
}
