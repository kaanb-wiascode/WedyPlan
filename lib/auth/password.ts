import bcrypt from 'bcryptjs';

/**
 * Şifre hash'le (Pure JS - Serverless / Vercel ile %100 uyumlu)
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error('Şifre hashleme hatası:', error);
    throw new Error('Şifre işlenirken hata oluştu');
  }
}

/**
 * Şifreyi doğrula
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    // Veritabanında eski bir Argon2 hash'i varsa güvenli geçiş yap
    if (hash.startsWith('$argon2')) {
      try {
        const argon2 = require('argon2');
        return await argon2.verify(hash, password);
      } catch {
        return false;
      }
    }
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
}

/**
 * Minimum şifre gereksinimleri
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!password || password.length < 6) {
    errors.push('Şifre en az 6 karakter olmalıdır');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}