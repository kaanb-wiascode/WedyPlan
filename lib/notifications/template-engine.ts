export class TemplateEngine {
    /**
     * Compiles template string by replacing {{variableName}} tags
     */
    static render(template: string, variables: Record<string, string | number | boolean>): string {
      let compiled = template;
  
      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        compiled = compiled.replace(placeholder, String(value));
      });
  
      return compiled;
    }
  
    /**
     * Cleans unmapped variables from string
     */
    static sanitize(template: string): string {
      return template.replace(/{{\s*[\w.]+\s*}}/g, '');
    }
  }