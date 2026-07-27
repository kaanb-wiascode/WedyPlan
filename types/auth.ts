export type UserRole = 'COUPLE' | 'VENDOR';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatarUrl?: string;
}

export interface LoginPayload {
  email: string;
  passwordHash: string;
  rememberMe: boolean;
}

export interface RegisterPayload {
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  agreedToTerms: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPasswordHash: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface AuthStateResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  redirectTo?: string;
}