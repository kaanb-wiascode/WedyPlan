import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, verifyPassword, validatePassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { InvalidCredentialsError, UserNotFoundError } from '@/lib/auth/errors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validasyon
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'E-posta ve şifre gereklidir.' },
        { status: 400 }
      );
    }

    // 2. Email formatı kontrol
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    // 3. Veritabanından user'ı bul
    const user = await (prisma as any).identityUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    // 4. Hesap durumunu kontrol et
    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { success: false, error: 'Hesabınız askıya alınmıştır. Destek ekibine başvurunuz.' },
        { status: 403 }
      );
    }

    if (user.status === 'LOCKED') {
      return NextResponse.json(
        { success: false, error: 'Hesabınız kilitlenmiştir. Parola sıfırlayınız.' },
        { status: 403 }
      );
    }

    // 5. Şifre kontrolü
    if (!user.passwordHash) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      // Failed login attempt kaydet
      const securityProfile = await (prisma as any).userSecurityProfile.findUnique({
        where: { userId: user.id },
      });

      const failedAttempts = (securityProfile?.failedLoginAttempts || 0) + 1;
      const isLocked = failedAttempts >= 5;

      await (prisma as any).userSecurityProfile.upsert({
        where: { userId: user.id },
        update: {
          failedLoginAttempts: failedAttempts,
          lockedUntil: isLocked ? new Date(Date.now() + 30 * 60 * 1000) : null, // 30 min lock
        },
        create: {
          userId: user.id,
          failedLoginAttempts: failedAttempts,
          lockedUntil: isLocked ? new Date(Date.now() + 30 * 60 * 1000) : null,
        },
      });

      if (isLocked) {
        return NextResponse.json(
          { success: false, error: 'Çok fazla hatalı giriş. Hesap 30 dakika kilitlenmiştir.' },
          { status: 429 }
        );
      }

      throw new InvalidCredentialsError();
    }

    // 6. Failed attempts reset et
    await (prisma as any).userSecurityProfile.upsert({
      where: { userId: user.id },
      update: { failedLoginAttempts: 0, lockedUntil: null },
      create: { userId: user.id },
    });

    // 7. User portal'ını al (role)
    const profile = await (prisma as any).portalProfile.findFirst({
      where: { userId: user.id, isPrimary: true },
    });

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı profili bulunamadı.' },
        { status: 404 }
      );
    }

    // Role mapping (PortalType -> JWT role)
    const roleMap: Record<string, 'COUPLE' | 'VENDOR' | 'ADMIN'> = {
      COUPLE: 'COUPLE',
      VENDOR: 'VENDOR',
      ADMIN: 'ADMIN',
      PUBLIC: 'COUPLE', // Default
    };

    const role = roleMap[profile.portal] || 'COUPLE';

    // 8. Session oluştur
    await createSession({
      userId: user.id,
      email: user.email,
      role,
      portalContext: profile.portal,
    });

    // 9. Login audit log kaydet
    await (prisma as any).auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: 'AUTHENTICATION',
        action: 'LOGIN_SUCCESS',
        actorUserId: user.id,
        actorRole: role,
        actorIpAddress: request.headers.get('x-forwarded-for') || 'unknown',
        actorUserAgent: request.headers.get('user-agent') || 'unknown',
        severity: 'INFO',
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }

    if (error instanceof UserNotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Giriş yapılamadı. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
