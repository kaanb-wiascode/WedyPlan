import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, weddingDate, role = 'COUPLE' } = body;

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
        { 
          success: false, 
          error: passwordValidation.errors?.[0] || 'Şifre gereksinimleri karşılanmamıştır.', 
          errors: passwordValidation.errors 
        },
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
    const portalType = userRole;

    // Partner isimlerini ayır
    const [partnerOne, partnerTwo] = fullName.split(' & ').map((n: string) => n.trim());

    // 7. TEK SORGULA TEK ATOMİK İŞLEM (Nested Create)
    // Bu yapı Foreign Key çakışmalarını sıfıra indirir.
    const user = await (prisma as any).identityUser.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        fullName,
        status: 'ACTIVE',
        isEmailVerified: true,
        securityProfile: {
          create: {},
        },
        portalProfiles: {
          create: {
            portal: portalType,
            isPrimary: true,
          },
        },
        ...(userRole === 'COUPLE'
          ? {
              couples: {
                create: {
                  partnerOneName: partnerOne || fullName,
                  partnerTwoName: partnerTwo || null,
                  weddingDate: weddingDate ? new Date(weddingDate) : null,
                },
              },
            }
          : {
              vendors: {
                create: {
                  businessName: fullName,
                  businessCategory: 'OTHER',
                },
              },
            }),
      },
    });

    // 8. Session oluştur
    await createSession({
      userId: user.id,
      email: user.email,
      role: userRole,
      portalContext: portalType,
    });

    // 9. Registration audit log (Hata verirse kayıt akışını bozmaz)
    try {
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
    } catch (auditError) {
      console.warn('Audit log kaydedilemedi (kayıt etkilenmedi):', auditError);
    }

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
  } catch (error: any) {
    console.error('Registration error:', error);

    const errorMessage = error?.message || String(error);

    if (errorMessage.includes('Unique constraint failed')) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlıdır.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: `Kayıt Hatası: ${errorMessage}` },
      { status: 500 }
    );
  }
}