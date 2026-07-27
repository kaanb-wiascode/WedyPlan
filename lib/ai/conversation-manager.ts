export class ConversationManager {
    /**
     * Truncates message history to stay within token limits
     */
    static trimHistory(
      messages: { role: string; content: string }[],
      maxMessages: number = 10
    ): { role: string; content: string }[] {
      if (messages.length <= maxMessages) return messages;
      return messages.slice(-maxMessages);
    }
  }