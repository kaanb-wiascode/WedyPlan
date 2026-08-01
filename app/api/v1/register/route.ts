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

    // 6. Role ve Portal eşleme
    const validRoles: Record<string, 'COUPLE' | 'VENDOR' | 'ADMIN'> = {
      COUPLE: 'COUPLE',
      VENDOR: 'VENDOR',
      ADMIN: 'ADMIN',
    };

    const userRole = validRoles[role] || 'COUPLE';
    const portalType = userRole;

    // 7. Ana Kullanıcı Hesabını Oluştur (Temel Kayıt)
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
      },
    });

    // 8. Portal Profili Oluştur (İkincil Tablo - Hata Verirse Kaydı Engellemez)
    try {
      await (prisma as any).portalProfile.create({
        data: {
          userId: user.id,
          portal: portalType,
          isPrimary: true,
        },
      });
    } catch (portalErr) {
      console.warn('PortalProfile uyarısı (kayıt devam ediyor):', portalErr);
    }

    // 9. Çift veya Satıcı Profili Oluştur (İkincil Tablo)
    if (userRole === 'COUPLE') {
      const [partnerOne, partnerTwo] = fullName.split(' & ').map((n: string) => n.trim());
      try {
        await (prisma as any).couple.create({
          data: {
            userId: user.id,
            partnerOneName: partnerOne || fullName,
            partnerTwoName: partnerTwo || null,
            weddingDate: weddingDate ? new Date(weddingDate) : null,
          },
        });
      } catch (coupleErr) {
        console.warn('Couple profili uyarısı (kayıt devam ediyor):', coupleErr);
      }
    } else if (userRole === 'VENDOR') {
      try {
        await (prisma as any).vendor.create({
          data: {
            userId: user.id,
            businessName: fullName,
            businessCategory: 'OTHER',
          },
        });
      } catch (vendorErr) {
        console.warn('Vendor profili uyarısı (kayıt devam ediyor):', vendorErr);
      }
    }

    // 10. Oturum Aç (Session Cookie)
    await createSession({
      userId: user.id,
      email: user.email,
      role: userRole,
      portalContext: portalType,
    });

    // 11. Audit Log Kaydı
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
      console.warn('Audit log uyarısı:', auditError);
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