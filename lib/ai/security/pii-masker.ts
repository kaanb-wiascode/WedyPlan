export class PiiMasker {
    /**
     * Masks sensitive PII (Phone, Email, TC Identification, Credit Card)
     */
    static mask(text: string): { maskedText: string; hasPii: boolean } {
      if (!text) return { maskedText: '', hasPii: false };
  
      let maskedText = text;
      let hasPii = false;
  
      // Phone Numbers
      const phoneRegex = /(\+?90|0)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}/g;
      if (phoneRegex.test(maskedText)) {
        hasPii = true;
        maskedText = maskedText.replace(phoneRegex, '[REDACTED_PHONE]');
      }
  
      // Email Addresses
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      if (emailRegex.test(maskedText)) {
        hasPii = true;
        maskedText = maskedText.replace(emailRegex, '[REDACTED_EMAIL]');
      }
  
      // TC Identification Numbers (11 Digits)
      const tcknRegex = /\b[1-9]\d{10}\b/g;
      if (tcknRegex.test(maskedText)) {
        hasPii = true;
        maskedText = maskedText.replace(tcknRegex, '[REDACTED_TCKN]');
      }
  
      return { maskedText, hasPii };
    }
  }