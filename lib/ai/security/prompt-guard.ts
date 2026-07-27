export class PromptGuard {
    private static INJECTION_PATTERNS = [
      /ignore previous instructions/i,
      /bypass system prompt/i,
      /you are nowDAN/i,
      /reveal system secret/i
    ];
  
    /**
     * Evaluates input for prompt injection attempts
     */
    static isSafe(promptText: string): { isSafe: boolean; reason?: string } {
      for (const pattern of this.INJECTION_PATTERNS) {
        if (pattern.test(promptText)) {
          return {
            isSafe: false,
            reason: `Potential prompt injection pattern detected: ${pattern}`
          };
        }
      }
      return { isSafe: true };
    }
  }