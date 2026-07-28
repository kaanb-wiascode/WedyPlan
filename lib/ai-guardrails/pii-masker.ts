export function maskPiiData(text: string): { maskedText: string; maskedCount: number } {
  let masked = text;
  let count = 0;

  // Telefon Numarası Maskeleme
  const phoneRegex = /(\+?\d{1,3}[- .]?)?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}/g;
  if (phoneRegex.test(masked)) {
    masked = masked.replace(phoneRegex, "[PROTECTED_PHONE]");
    count++;
  }

  // E-Posta Maskeleme
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(masked)) {
    masked = masked.replace(emailRegex, "[PROTECTED_EMAIL]");
    count++;
  }

  // TCKN Maskeleme (11 Haneli)
  const tcknRegex = /\b[1-9]\d{10}\b/g;
  if (tcknRegex.test(masked)) {
    masked = masked.replace(tcknRegex, "[PROTECTED_TCKN]");
    count++;
  }

  return { maskedText: masked, maskedCount: count };
}
