// lib/sse/server.ts
import { prisma } from '@/lib/db';

/**
 * SSE (Server-Sent Events) clients registry
 * Format: { userId: Set<ReadableStreamController> }
 */
const sseClients = new Map<string, Set<ReadableStreamController<Uint8Array>>>();

/**
 * SSE client'ı kaydet
 */
export function registerSSEClient(
  userId: string,
  controller: ReadableStreamController<Uint8Array>
): void {
  if (!sseClients.has(userId)) {
    sseClients.set(userId, new Set());
  }
  sseClients.get(userId)?.add(controller);
}

/**
 * SSE client'ı kaldır
 */
export function unregisterSSEClient(
  userId: string,
  controller: ReadableStreamController<Uint8Array>
): void {
  const clients = sseClients.get(userId);
  if (clients) {
    clients.delete(controller);
    if (clients.size === 0) {
      sseClients.delete(userId);
    }
  }
}

/**
 * Kullanıcıya SSE event gönder
 */
export function sendSSEEvent(
  userId: string,
  event: string,
  data: any
): void {
  const clients = sseClients.get(userId);

  if (!clients || clients.size === 0) {
    console.log(`[SSE] No clients for user ${userId}`);
    return;
  }

  const eventData = `data: ${JSON.stringify({
    event,
    data,
    timestamp: new Date().toISOString(),
  })}\n\n`;

  const encoder = new TextEncoder();
  const encoded = encoder.encode(eventData);

  clients.forEach((controller) => {
    try {
      controller.enqueue(encoded);
    } catch (error) {
      console.error(`[SSE] Error sending event to ${userId}:`, error);
      clients.delete(controller);
    }
  });
}

/**
 * Tüm clients'larına event gönder (broadcast)
 */
export function broadcastSSEEvent(event: string, data: any): void {
  sseClients.forEach((clients, userId) => {
    sendSSEEvent(userId, event, data);
  });
}

/**
 * Rol bazlı broadcast
 */
export async function broadcastToRole(
  role: 'COUPLE' | 'VENDOR' | 'ADMIN',
  event: string,
  data: any
): Promise<void> {
  const users = await (prisma as any).identityUser.findMany({
    where: {
      profiles: {
        some: {
          portal: role,
        },
      },
    },
    select: { id: true },
  });

  users.forEach((user: { id: string }) => {
    sendSSEEvent(user.id, event, data);
  });
}