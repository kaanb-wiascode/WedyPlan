export class FieldMasker {
    /**
     * Masks or strips specified sensitive properties from an object or array
     */
    static maskFields<T extends Record<string, any>>(data: T, fieldsToMask: string[]): T {
      if (!data || fieldsToMask.length === 0) return data;
  
      const cloned = JSON.parse(JSON.stringify(data));
  
      fieldsToMask.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(cloned, field)) {
          cloned[field] = '[REDACTED]';
        }
      });
  
      return cloned;
    }
  }