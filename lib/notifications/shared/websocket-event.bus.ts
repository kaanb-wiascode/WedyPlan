import { NotificationPriority } from '@/types/universal-notifications';

export interface WebSocketNotificationEvent {
  notificationId: string;
  userId: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  actionUrl?: string;
  timestamp: string;
}

export class WebSocketEventBus {
  private static connections = new Map<string, any[]>();

  /**
   * Publishes real-time notification to connected client WebSocket sockets
   */
  static broadcastToUser(userId: string, event: WebSocketNotificationEvent): boolean {
    const userSockets = this.connections.get(userId);
    if (!userSockets || userSockets.length === 0) {
      return false; // User not connected online via WebSocket
    }

    userSockets.forEach((socket) => {
      try {
        socket.send(JSON.stringify({ event: 'notification:new', data: event }));
      } catch {
        // Socket handle fallback
      }
    });

    return true;
  }
}