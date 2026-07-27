import { AUDIT_CONFIG } from '../domain/audit.constants';

export class StructuredLogger {
  /**
   * Sanitizes and masks sensitive data keys recursively
   */
  static sanitizePayload(payload: any): any {
    if (!payload || typeof payload !== 'object') return payload;

    if (Array.isArray(payload)) {
      return payload.map((item) => this.sanitizePayload(item));
    }

    const sanitized: Record<string, any> = {};

    Object.keys(payload).forEach((key) => {
      const lowerKey = key.toLowerCase();
      const isSensitive = AUDIT_CONFIG.SENSITIVE_KEYS_TO_MASK.some((s) => lowerKey.includes(s.toLowerCase()));

      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof payload[key] === 'object' && payload[key] !== null) {
        sanitized[key] = this.sanitizePayload(payload[key]);
      } else {
        sanitized[key] = payload[key];
      }
    });

    return sanitized;
  }

  /**
   * Generates or extracts correlation ID
   */
  static getCorrelationId(incomingHeader?: string): string {
    return incomingHeader || `corr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  }
}