const inMemoryStore = new Map<string, Record<string, string>>();

export class MemoryManager {
  /**
   * Saves long-term user fact or preference
   */
  static async rememberFact(userId: string, key: string, value: string): Promise<void> {
    const userMemory = inMemoryStore.get(userId) || {};
    userMemory[key] = value;
    inMemoryStore.set(userId, userMemory);
  }

  /**
   * Recalls user memory object
   */
  static async getMemorySummary(userId: string): Promise<string> {
    const memory = inMemoryStore.get(userId);
    if (!memory) return '';

    return Object.entries(memory)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');
  }
}