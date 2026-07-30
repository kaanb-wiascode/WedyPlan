import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/notifications/email-service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre alanları zorunludur.' },
        { status: 400 }
      );
    }

    // 1. Güvenli, benzersiz 32 baytlık doğrulama token'ı üretimi
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // 2. Google SMTP Üzerinden E-Posta Gönderimi
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! Doğrulama bağlantısı e-posta adresinize gönderildi.',
    });
  } catch (error) {
    console.error('Kayıt/E-posta Hatası:', error);
    return NextResponse.json(
      { error: 'Kayıt esnasında veya doğrulama e-postası gönderilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}