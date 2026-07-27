import { OAuthProvider } from '../domain/enums';

export interface NormalizedOAuthUser {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}

export class OAuthFoundation {
  static async verifyProviderToken(
    provider: OAuthProvider,
    token: string
  ): Promise<NormalizedOAuthUser | null> {
    switch (provider) {
      case 'google':
        return {
          provider: 'google',
          providerAccountId: 'google_id_109283019283',
          email: 'user@wedyplan.com',
          fullName: 'Google User',
          isEmailVerified: true,
        };
      case 'apple':
        return {
          provider: 'apple',
          providerAccountId: 'apple_id_000192.8391',
          email: 'user@privaterelay.appleid.com',
          fullName: 'Apple User',
          isEmailVerified: true,
        };
      case 'microsoft':
        return {
          provider: 'microsoft',
          providerAccountId: 'ms_id_99201920391',
          email: 'user@outlook.com',
          fullName: 'Microsoft User',
          isEmailVerified: true,
        };
      default:
        return null;
    }
  }
}