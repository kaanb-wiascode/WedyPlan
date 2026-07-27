import { CreateConversationDTO } from '@/types/enterprise-messaging';

export class ConversationEngine {
  /**
   * Validates participant eligibility and generates unique conversation key
   */
  static validateParticipants(dto: CreateConversationDTO): boolean {
    if (!dto.participantUserIds || dto.participantUserIds.length < 2) {
      throw new Error('A conversation requires at least 2 active participants.');
    }
    return true;
  }
}