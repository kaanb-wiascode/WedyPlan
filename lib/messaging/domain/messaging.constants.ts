export const MESSAGING_CONFIG = {
    MAX_MESSAGE_LENGTH: 4000,
    MAX_ATTACHMENTS_PER_MESSAGE: 5,
    TYPING_TIMEOUT_MS: 3000,
  
    SPAM_SUSPECT_PATTERNS: [
      /iban/i,
      /tr\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}/i, // TR IBAN
      /0?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/,                          // TR Phone Number
      /whatsapp/i,
      /sahibinden/i
    ]
  } as const;