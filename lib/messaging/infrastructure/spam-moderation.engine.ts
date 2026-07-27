import { MESSAGING_CONFIG } from '../domain/messaging.constants';

export class SpamModerationEngine {
  /**
   * Scans message body for off-platform contact or payment redirects
   */
  static evaluateSpam(text: string): { isFlagged: boolean; reason?: string } {
    if (!text) return { isFlagged: false };

    for (const pattern of MESSAGING_CONFIG.SPAM_SUSPECT_PATTERNS) {
      if (pattern.test(text)) {
        return {
          isFlagged: true,
          reason: `Security Policy Violation: Message contains off-platform contact/payment patterns (${pattern}).`
        };
      }
    }

    return { isFlagged: false };
  }
}