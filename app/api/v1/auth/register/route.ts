import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, role = 'COUPLE' } = body;

    // 1. Validasyon
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Ad, e-posta ve şifre gereklidir.' },
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

    // 3. Şifre güvenliği kontrol
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, error: 'Şifre gereksinimleri karşılanmamıştır.', errors: passwordValidation.errors },
        { status: 400 }
      );
    }

    // 4. E-posta zaten kullanılıyor mu?
    const existingUser = await (prisma as any).identityUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlıdır.' },
        { status: 409 }
      );
    }

    // 5. Şifre hash'le
    const passwordHash = await hashPassword(password);

    // 6. Role validasyonu
    const validRoles: Record<string, 'COUPLE' | 'VENDOR' | 'ADMIN'> = {
      COUPLE: 'COUPLE',
      VENDOR: 'VENDOR',
      ADMIN: 'ADMIN',
    };

    const userRole = validRoles[role] || 'COUPLE';

    // 7. Portaltype mapping
    const portalTypeMap: Record<string, 'COUPLE' | 'VENDOR' | 'ADMIN'> = {
      COUPLE: 'COUPLE',
      VENDOR: 'VENDOR',
      ADMIN: 'ADMIN',
    };

    const portalType = portalTypeMap[userRole];

    // 8. User oluştur (transaction'da)
    const user = await (prisma as any).identityUser.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        fullName,
        status: 'ACTIVE', // Email verification atlanıyor demo için
        isEmailVerified: true,
        securityProfile: {
          create: {},
        },
      },
    });

    // 9. Portal Profile oluştur
    await (prisma as any).portalProfile.create({
      data: {
        userId: user.id,
        portal: portalType,
        isPrimary: true,
      },
    });

    // 10. Couple veya Vendor profili oluştur
    if (userRole === 'COUPLE') {
      const [partnerOne, partnerTwo] = fullName.split(' & ').map((n: string) => n.trim());
      await (prisma as any).couple.create({
        data: {
          userId: user.id,
          partnerOneName: partnerOne || fullName,
          partnerTwoName: partnerTwo,
        },
      });
    } else if (userRole === 'VENDOR') {
      await (prisma as any).vendor.create({
        data: {
          userId: user.id,
          businessName: fullName,
          businessCategory: 'OTHER',
        },
      });
    }

    // 11. Session oluştur
    await createSession({
      userId: user.id,
      email: user.email,
      role: userRole,
      portalContext: portalType,
    });

    // 12. Registration audit log
    await (prisma as any).auditLog.create({
      data: {
        correlationId: crypto.randomUUID(),
        category: 'AUTHENTICATION',
        action: 'REGISTRATION_SUCCESS',
        actorUserId: user.id,
        actorRole: userRole,
        actorIpAddress: request.headers.get('x-forwarded-for') || 'unknown',
        actorUserAgent: request.headers.get('user-agent') || 'unknown',
        severity: 'INFO',
        metadata: { role: userRole },
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: userRole,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    // Duplicate email hatası
    if (
      error instanceof Error &&
      error.message.includes('Unique constraint failed')
    ) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlıdır.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Kayıt yapılamadı. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
