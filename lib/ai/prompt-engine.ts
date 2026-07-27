export class PromptEngine {
    /**
     * Compiles template string with variables and sanitizes input
     */
    static compile(template: string, variables: Record<string, string | number | boolean>): string {
      let result = template;
  
      Object.entries(variables).forEach(([key, val]) => {
        const sanitizedVal = this.sanitizeInput(String(val));
        result = result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), sanitizedVal);
      });
  
      return result;
    }
  
    /**
     * Detects and neutralizes prompt injection attempts
     */
    static sanitizeInput(input: string): string {
      if (!input) return '';
  
      return input
        .replace(/<system>/gi, '[system_tag_removed]')
        .replace(/<\/system>/gi, '[system_tag_removed]')
        .replace(/ignore previous instructions/gi, '[injection_blocked]')
        .trim();
    }
  }