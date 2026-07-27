import argon2 from 'argon2';

export class Argon2Hasher {
  /**
   * Hashes a plain password using OWASP recommended Argon2id parameters
   */
  static async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3,
      parallelism: 4,
    });
  }

  /**
   * Verifies plain password against Argon2id hash
   */
  static async verify(hash: string, plain: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }
}