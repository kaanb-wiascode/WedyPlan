import { TypingEventDTO, MessageDTO } from '@/types/enterprise-messaging';

export class RealtimeMessagingGateway {
  private static activeConnections = new Map<string, any[]>();

  /**
   * Broadcasts new incoming message to active conversation participants via WebSocket
   */
  static broadcastNewMessage(recipientUserIds: string[], message: MessageDTO): void {
    recipientUserIds.forEach((userId) => {
      const sockets = this.activeConnections.get(userId);
      if (sockets && sockets.length > 0) {
        sockets.forEach((s) => {
          try {
            s.send(JSON.stringify({ event: 'messaging:message_new', data: message }));
          } catch {
            // Socket handle fallback
          }
        });
      }
    });
  }

  /**
   * Broadcasts typing status
   */
  static broadcastTypingStatus(recipientUserIds: string[], typingEvent: TypingEventDTO): void {
    recipientUserIds.forEach((userId) => {
      if (userId === typingEvent.userId) return;
      const sockets = this.activeConnections.get(userId);
      if (sockets) {
        sockets.forEach((s) => {
          try {
            s.send(JSON.stringify({ event: 'messaging:typing', data: typingEvent }));
          } catch {
            // Socket handle fallback
          }
        });
      }
    });
  }
}